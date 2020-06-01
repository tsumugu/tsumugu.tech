/*
  firebase_data_manager.js
  @detail: firebaseから取得したデータを保持する
*/
export default class FirebaseDataManager {
  constructor(firebase) {
    this.loadedDataFromFirebase = []
    this.db = firebase.firestore()
  }
  get(collectionName) {
    var collectionNameLowerCase = collectionName.toLowerCase()
    if (collectionNameLowerCase in this.loadedDataFromFirebase) {
      // this.loadedDataFromFirebaseにcollectionNameがあったらそのまま返す
      console.log("取得済み")
      return new Promise((resolve, reject) => {
        resolve(this.loadedDataFromFirebase[collectionNameLowerCase])
      })
    } else {
      // なかったらgetCollectionFromFirebaseを呼んで取得
      console.log("新規取得")
      return this.getCollectionFromFirebase(collectionName, collectionNameLowerCase)
    }
  }
  getCollectionFromFirebase(collectionName, collectionNameLowerCase) {
    return new Promise((resolve, reject) => {
      // works .orderBy("madeYear", "asc").orderBy("madeMonth", "asc")
      // about .orderBy("year", "asc")
      var dbcollection = null
      if (collectionNameLowerCase == "works") {
        dbcollection = this.db.collection(collectionName).orderBy("madeYear", "asc").orderBy("madeMonth", "asc")
      } else if (collectionNameLowerCase == "about") {
        dbcollection = this.db.collection(collectionName).orderBy("year", "asc")
      } else {
        dbcollection = this.db.collection(collectionName)
      }
      dbcollection.get().then((querySnapshot) => {
        this.loadedDataFromFirebase[collectionNameLowerCase] = querySnapshot
        resolve(querySnapshot)
      })
      .catch(function(error) {
        //onError
        reject(error)
      })
    })
  }
}
