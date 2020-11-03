 <template>
  <div id="profile">
    <ProfileContents v-for="item in items" :item="item"></ProfileContents>
  </div>
</template>
<script>
import firebase from 'firebase'
import FDM from '../assets/js/firebase_data_manager.js'
import ProfileContents from './ProfileContents.vue'

export default {
  components: {
    ProfileContents
  },
  props: {
    FirebaseDataManagerProps: null
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
  },
  mounted() {
    // FirebaseDataManager
    this.FirebaseDataManager = this.FirebaseDataManagerProps
    if (this.FirebaseDataManager == null) {
      this.FirebaseDataManager = new FDM(firebase)
    }
    var _this = this
    this.FirebaseDataManager.get('profile').then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var docVal = {
          'title': doc.data().title,
          'description': doc.data().description,
          'bgImg': 'url('+doc.data().bgImg+')'
         }
        _this.items.push(docVal)
      })
    })
    .catch(function(error) {
      //onError
      console.log(error)
      alert("情報の取得に失敗しました。再読み込みしてください")
    })
  }
}
</script>

<style lang="scss" scoped>
#profile {
  width: 100%;
  height: 100%;
  overflow: auto;
}
/deep/ .profileSection {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  background-position: center top;
  background-size: cover;
  background-attachment: fixed;
  &__infoWrapper {
    position: absolute;
    bottom: 5%;
    padding-right: 45%;
    z-index: 3;
    color: $white;
    bottom: 22%;
    margin-left: 5%;
    &__inner {
      &__title {
        font-size: 3rem;
      }
      &__description {
      }
    }
  }
}
</style>
