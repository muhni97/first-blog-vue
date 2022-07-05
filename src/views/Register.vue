<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Bir hesabın var mı?
        <router-link class="router-link" :to="{ name: 'Login' }"
          >Giriş</router-link
        >
      </p>
      <h2>Tasarım Uzmanı Hesabını Oluştur</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="Adınız" v-model="firstName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Soyadınız" v-model="lastName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="Kullanıcı Adınız" v-model="userName" />
          <user class="icon" />
        </div>
        <div class="input">
          <input type="text" placeholder="E-mail" v-model="email" />
          <email class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Şifre" v-model="password" />
          <password class="icon" />
        </div>
        <div class="error" v-show="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Üye Ol</button>

      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from "../assets/Icons/envelope-regular.svg";
import password from "../assets/Icons/lock-alt-solid.svg";
import user from "../assets/Icons/user-alt-light.svg";
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

export default {
  name: "Register",
  components: { email, password, user },
  data() {
    return {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.userName !== "" &&
        this.email !== "" &&
        this.password !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth()
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.password)
        const result = await createUser
        const dataBase = db.collection("users").doc(result.user.uid)
        await dataBase.set({
            firstName : this.firstName,
            lastName : this.lastName,
            userName : this.userName,
            email : this.email,
            password : this.password
        })
        this.$router.push({name : 'Home'})
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields";
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>