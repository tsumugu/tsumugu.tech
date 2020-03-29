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
      <h1>モード</h1>
      <label><input type="radio" v-model="isPresenMode" value="true" :checked="isPresenModeBool">Presentation</label>
      <label><input type="radio" v-model="isPresenMode" value="false" :checked="isPresenModeBool">Normal</label><br>
      <button @click="getCookieVal('mode')">Check Mode</button><br>
      <button @click="removeCookie('mode')">remove Cookie</button>
      <h1>編集ボタン</h1>
      <label><input type="radio" v-model="isEditMode" value="true" :checked="isEditModeBool">表示</label>
      <label><input type="radio" v-model="isEditMode" value="false" :checked="isEditModeBool">非表示</label><br>
      <button @click="getCookieVal('edit')">Check Mode</button><br>
      <button @click="removeCookie('edit')">remove Cookie</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: function () {
    return {
      mail: null,
      pw: null,
      isLoading: true,
      isLogin: false,
      isPresenMode: "false",
      isPresenModeBool: false,
      isEditMode: "false",
      isEditModeBool: false
    }
  },
  watch: {
    isPresenMode() {
      this.isPresenModeBool = (this.isPresenMode == 'true') ? true : false;
      if (this.isPresenModeBool) {
        this.setCookie('mode', true)
      } else {
        this.setCookie('mode', false)
      }
    },
    isPresenModeBool() {
      this.isPresenMode = this.isPresenModeBool.toString()
    },
    isEditMode() {
      this.isEditModeBool = (this.isEditMode == 'true') ? true : false;
      if (this.isEditModeBool) {
        this.setCookie('edit', true)
      } else {
        this.setCookie('edit', false)
      }
    },
    isEditModeBool() {
      this.isEditMode = this.isEditModeBool.toString()
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
    setCookie(name, val) {
      this.$cookies.set(name, val)
    },
    getCookieVal(name) {
      alert(this.$cookies.get(name))
    },
    removeCookie(name) {
      this.$cookies.remove(name)
      this.isPresenMode = null
      this.isPresenModeBool = null
      this.isEditMode = null
      this.isEditModeBool = null
      alert('removed')
    }
  },
  created () {
    var _this = this
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        _this.isLogin = true
      }
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
