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
import db from '../../config/firebaseInit'
export default {
  data () {
    return {
      items: [],
      loading: true
    }
  },
  created () {
    db.collection('contacts').get().then((querySnapshot) => {
      this.loading = false
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
        this.items.push(data)
      })
    })
  }
}
</script>

<style>
</style>
