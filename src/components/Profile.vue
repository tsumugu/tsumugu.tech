<template>
  <div id="profile">
    <div id="section1">
      <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg">
    </div>
    <div id="section2">
      <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg">
    </div>
    <div id="section3">
      <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg">
    </div>
    <div id="section4">
      <img src="https://tsumugu.s3-ap-northeast-1.amazonaws.com/PFPC.jpg">
    </div>
  </div>
</template>
<script>
import firebase from 'firebase'
import FDM from '../assets/js/firebase_data_manager.js'

export default {
  props: {
    FirebaseDataManagerProps: null
  },
  data() {
    return {
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

    /*
    var getLanguage = new Promise(function(resolve, reject) {
      var langpfObjLocal = []
      _this.FirebaseDataManager.get('languages').then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          langpfObjLocal.push({titleShort: doc.id, title: doc.data().title, desc: doc.data().description})
        })
        _this.langpfObj = langpfObjLocal
        resolve();
      })
      .catch(function (error) {
        reject();
      })
    })
    Promise.all([getAbout, getLanguage]).then(function () {
      _this.isFinData = true
    }).catch(function (error) {
      console.log(error)
      alert("情報の取得に失敗しました。再読み込みしてください")
    });
    */
  }
}
</script>

<style lang="scss" scoped>
div {
  text-align:center;
}
img {
  width: 100%;
  vertical-align:top;
}

#section1,
#section2,
#section3,
#section4{
  padding: 50px 30px;
}

#section1, #section3 {
  background:pink;
}
#section2, #section3, #section4 {
  position: relative;
  z-index: 0;
}

#section2::after{
  content: '';
  position: absolute;
  left:0;
  top: 0;
  transform: skewY(-5deg);
  transform-origin: bottom left;

  z-index: -1;
  width:100%;
  height:100%;
  background:#fff;
}
#section3::after{
  background:pink;
  content: '';
  position: absolute;
  left:0;
  top: 0;
  transform: skewY(5deg);
  transform-origin: bottom left;

  z-index: -1;
  width:100%;
  height:100%;
  background:#fff;
}
#section4::after{
  content: '';
  position: absolute;
  left:0;
  top: 0;
  transform: skewY(-5deg);
  transform-origin: bottom left;

  z-index: -1;
  width:100%;
  height:100%;
  background:#fff;
}
</style>
