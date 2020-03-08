<template>
<div>
  <div v-if="isLoading">
    Loading
  </div>
  <div v-else>
    <div v-if="!isLogin">
      <input type="email" v-model="mail" placeholder="mail"><br>
      <input type="password" v-model="pw" placeholder="password"><br>
      <button v-on:click="login(mail, pw)">submit</button>
    </div>
    <div v-else>
      <button v-on:click="logout()">logout</button><br>
      <label><input type="radio" v-model="isPresenMode" value="true" :checked="isPresenModeBool">Presentation</label>
      <label><input type="radio" v-model="isPresenMode" value="false" :checked="isPresenModeBool">Normal</label><br>
      <button @click="getModeCookieVal">Check Mode</button><br>
      <button @click="removeMadeCookie">remove Cookie</button>
    </div>
  </div>
</div>
</template>

<script>
import firebase from 'firebase'

export default {
  data: function () {
    return {
      mail: null,
      pw: null,
      isLoading: true,
      isLogin: false,
      isPresenMode: "false",
      isPresenModeBool: false
    }
  },
  watch: {
    isPresenMode() {
      this.isPresenModeBool = (this.isPresenMode == 'true') ? true : false;
      if (this.isPresenModeBool) {
        this.setModeCookie(true)
      } else {
        this.setModeCookie(false)
      }
    },
    isPresenModeBool() {
      this.isPresenMode = this.isPresenModeBool.toString()
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
    },
    setModeCookie(val) {
      this.$cookies.set("mode", val)
    },
    getModeCookieVal() {
      alert(this.$cookies.get("mode"))
    },
    removeMadeCookie() {
      this.$cookies.remove("mode")
      this.isPresenMode = null
      this.isPresenModeBool = null
      alert('removed')
    }
  },
  created () {
    var _this = this
    firebase.auth().onAuthStateChanged((user) => {
      _this.isLogin = user
      _this.isLoading = false
    })
    this.isPresenModeBool = this.$cookies.get("mode")
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
