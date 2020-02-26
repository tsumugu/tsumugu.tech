<template>
<div>
  <button v-on:click="logout()">logout</button><br>
  <input type="email" v-model="mail" placeholder="mail"><br>
  <input type="password" v-model="pw" placeholder="password"><br>
  <button v-on:click="login(mail, pw)">submit</button>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  data: function () {
    return {
      mail: null,
      pw: null
    }
  },
  methods: {
    login(email, password) {
      var _this = this
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function() {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(result) {
          alert('succeed')
        }).catch(function(error) {
          console.log(error)
          alert('error')
        })
      })
      .catch(function(error) {
        alert('error')
      })
    },
    logout() {
      firebase.auth().signOut().then(function() {
        alert('succeed')
      }).catch(function(error) {
        console.log(error)
        alert('error')
      });
    }
  },
  created () {
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
#Info_wrap {
  width: 100%;
  height: 10000px;
  overflow-x: hide;
}
#chart {
  width: 80%;
}
</style>
