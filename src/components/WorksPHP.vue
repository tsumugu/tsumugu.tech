<template>
<div>
  <h1>作品PHP</h1>
  <ul>
    <li id="itemlist" v-for="(item, key) in items" :key="key">
      {{item.title}}
    </li>
  </ul>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      db: null,
      items: []
    }
  },
  created () {
    this.db = firebase.firestore()
    var _this = this
    this.db.collection('Works-PHP').get().then((querySnapshot) => {
      console.log(querySnapshot)
      _this.items = []
      querySnapshot.forEach((doc) => {
        let data = {
          'id': doc.id,
          'thumbnail': doc.data().thumbnail,
          'title': doc.data().title,
          'siteurl': doc.data().siteurl,
          'description': doc.data().description,
          'Lang': doc.data().Lang,
          'kdwr': doc.data().kdwr
        }
        _this.items.push(data)
      })
    })
  }
}
</script>

<style>
</style>
