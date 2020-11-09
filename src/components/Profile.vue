 <template>
  <div id="profile">
    <div id="profile__loading" v-show="loading">
      <Loading></Loading>
    </div>
    <ProfileContents v-for="item in items" :item="item"></ProfileContents>
    <component is="style" v-if="!isMobileSafari">
      .profileSection {
        /* Safariでバグる問題対策 */
        background-attachment: fixed;
      }
    </component>
  </div>
</template>
<script>
import firebase from 'firebase'
import FDM from '../assets/js/firebase_data_manager.js'
import Loading from './Loading.vue'
import ProfileContents from './ProfileContents.vue'

export default {
  components: {
    Loading,
    ProfileContents
  },
  props: {
    FirebaseDataManagerProps: null
  },
  data() {
    return {
      loading: true,
      isMobileSafari: false,
      items: []
    }
  },
  methods: {
  },
  mounted() {
    var userAgent = window.navigator.userAgent.toLowerCase()
    this.isMobileSafari = !(userAgent.indexOf('edge') != -1 || userAgent.indexOf('chrome') != -1) && (userAgent.indexOf('safari') != -1) && /iphone|ipad|macintosh/i.test(navigator.userAgent) && 'ontouchend' in document
    // FirebaseDataManager
    this.FirebaseDataManager = this.FirebaseDataManagerProps
    if (this.FirebaseDataManager == null) {
      this.FirebaseDataManager = new FDM(firebase)
    }
    var _this = this
    this.FirebaseDataManager.get('profile').then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var bgPos = doc.data().bgPos==undefined ? "center top" : doc.data().bgPos
        var bgImgSP = doc.data().bgImgSP==undefined ? doc.data().bgImg : doc.data().bgImgSP
        var docVal = {
          'class': 'profileSection profileSection'+doc.id,
          'classname': 'profileSection'+doc.id,
          'title': doc.data().title,
          'description': doc.data().description,
          'bgImgPC': 'url('+doc.data().bgImg+')',
          'bgImgSP': 'url('+bgImgSP+')',
          'bgPos': bgPos
         }
        _this.items.push(docVal)
      })
      _this.loading = false
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
  background-size: cover;
  overflow: hidden;
  &__infoWrapper {
    position: absolute;
    z-index: 3;
    &__inner {
      &__title {
        border-left: solid 5px $main;
        padding: 10px 0 10px 10px;
      }
    }
    &__description {
      &__readbutton{
        margin: 10px 15px 15px 0;
        > a {
          padding: 10px;
          border-radius: 10px;
          color: $white;
          background-color: $main;
          text-decoration: none;
        }
        > a:after {
          content: "▶";
        }
      }
    }
  }
}
/* レスポンシブ */
/* 1. 画面の大きなPC */
@media (min-width: 1500px) {
  /deep/ .profileSection__infoWrapper {
    bottom: 15%;
    padding: 30px;
    padding-left: calc(5% + 30px);
    max-width: 45%;
    color: $profile-text;
    background-color: $profile-text-bg;
  }
  /deep/ .profileSection__infoWrapper__inner {
    /*font-size: 1.3rem;*/
  }
  /deep/ .profileSection__infoWrapper__inner__title {
    margin-left: -15px;
    font-size: 3rem;
    line-height: 1;
  }
  /deep/ .profileSection__infoWrapper__top__title {
    margin-top: 10px;
    font-size: 1.2rem;
  }
  /deep/ .profileSection__infoWrapper__description {
    font-size: 1.2em;
  }
  /deep/ .profileSection__infoWrapper__description__title {
    margin-top: 10px;
    font-size: 1.5rem;
    line-height: 1;
  }
  /deep/ .profileSection__infoWrapper__description__readbutton{
    margin: 10px 15px 20px 0;
  }
  /deep/ .profileSection__infoWrapper__description__title > span {
    font-size: 2rem;
    color: #c00000;
  }
}
/* 2. PC */
@media (max-width: 1500px) and (min-width: 600px) {
  /deep/ .profileSection__infoWrapper {
    bottom: 5%;
    padding: 30px;
    padding-left: calc(5% + 30px);
    max-width: 55%;
    color: $profile-text;
    background-color: $profile-text-bg;
  }
  /deep/ .profileSection__infoWrapper__inner {
    font-size: 1.1rem;
  }
  /deep/ .profileSection__infoWrapper__inner__title {
    margin-left: -15px;
    font-size: 2.5rem;
    line-height: 1;
  }
  /deep/ .profileSection__infoWrapper__top__title {
    margin-top: 10px;
    font-size: 1.1rem;
  }
  /deep/ .profileSection__infoWrapper__description {
    font-size: 1.1em;
  }
  /deep/ .profileSection__infoWrapper__description__title {
    margin-top: 10px;
    font-size: 1.5rem;
    line-height: 1;
  }
  /deep/ .profileSection__infoWrapper__description__readbutton{
    margin: 5px 15px 15px 0;
  }
  /deep/ .profileSection__infoWrapper__description__title > span {
    font-size: 2rem;
    color: #c00000;
  }

}
/* 3. スマホなど */
@media screen and (max-width:600px) {
  /deep/ .profileSection__infoWrapper {
    bottom: 10%;
    width: 100%;
    color: $profile-text;
    background-color: $profile-text-bg;
    padding: 0px;
  }
  /deep/ .profileSection__infoWrapper__inner {
    font-size: 1rem;
  }
  /deep/ .profileSection__infoWrapper__inner__title {
    margin: 15px 15px 0 15px;
    font-size: 2rem;
    line-height: 1;
  }
  /deep/ .profileSection__infoWrapper__description {
    margin: 0 15px 15px 15px;
  }
  /deep/ .profileSection__infoWrapper__top__title {
    margin-top: 10px;
  }
  /deep/ .profileSection__infoWrapper__description__readbutton{
    margin: 5px 15px 15px 0;
  }
  /deep/ .profileSection__infoWrapper__description__title {
    margin-top: 10px;
    font-size: 1.1rem;
    line-height: 1;
  }
  /deep/ .profileSection__infoWrapper__description__title > span {
    font-size: 1.5rem;
    color: #c00000;
  }
}
</style>
