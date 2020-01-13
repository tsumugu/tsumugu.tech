<template>
<div>
  <div v-if="loading">
  Loading
  </div>
  <div v-else>
    <h1>作品PHP</h1>
    <div id="items">
      <div class="item" v-for="(item, key) in items" :key="key">
        <a :href="item.siteurl">
          <img :src="item.thumbnail">
          <h2>{{item.title}}</h2>
          <p>{{item.Lang}}</p>
          <p>{{item.description}}</p>
          <p>{{item.kdwr}}</p>
        </a>
        <hr>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      db: null,
      loading: true,
      items: []
    }
  },
  created () {
    this.db = firebase.firestore()
    var _this = this
    this.db.collection('Works-PHP').get().then((querySnapshot) => {
      _this.items = []
      _this.loading = false
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

<style scoped>
h1, h2, p {
  margin: 5px;
}
img {
  width: 70%;
}
</style>
