<template>
  <header>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'Home' }">
          Tasarım Uzmanı
        </router-link>
      </div>
      <div class="nav-links">
        <ul v-show="!mobile">
          <router-link class="link" :to="{ name: 'Home' }">Anasayfa</router-link>
          <router-link class="link" :to="{ name: 'Blogs' }">Blog</router-link>
          <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }"
            >Post Oluştur</router-link
          >
          <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
            >Giriş Yap / Kayıt Ol</router-link
          >
        </ul>
        <div
          @click="toggleProfileMenu"
          v-if="user"
          v-show="!mobile"
          class="profile"
          ref="profile"
        >
          <span class="pointer">{{ this.$store.state.profileInitials }}</span>
          <div v-show="profileMenu" class="profile-menu">
            <div class="info">
              <p class="initials">{{ this.$store.state.profileInitials }}</p>
              <div class="right">
                <p>
                  {{ this.$store.state.profileFirstName }}
                  {{ this.$store.state.profileLastName }}
                </p>
                <p>{{ this.$store.state.profileUserName }}</p>
                <p>{{ this.$store.state.profileEmail }}</p>
              </div>
            </div>
            <div class="options">
              <div class="option">
                <router-link class="option" :to="{ name: 'Profile' }">
                  <userIcon class="icon" />
                  <p>Profil</p>
                </router-link>
              </div>
              <div v-if="admin" class="option">
                <router-link class="option" :to="{ name: 'Admin' }">
                  <adminIcon class="icon" />
                  <p>Admin</p>
                </router-link>
              </div>
              <div class="option" @click="signOut">
                <router-link class="option" :to="{ name: 'Home' }">
                  <signOutIcon class="icon" />
                  <p>Çıkış Yap</p>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <menuIcon @click="toggleMobileNav" class="menu-icon" v-show="mobile" />
    <transition name="mobile-nav">
      <ul class="mobile-nav" v-show="mobileNav">
        <router-link class="link" :to="{ name: 'Home' }">Anasayfa</router-link>
        <router-link class="link" :to="{ name: 'Blogs' }">Blog</router-link>
        <router-link v-if="admin" class="link" :to="{ name: 'CreatePost' }"
          >Post Oluştur</router-link
        >
        <router-link v-if="!user" class="link" :to="{ name: 'Login' }"
          >Giriş Yap / Kayıt Ol</router-link
        >
        <div class="options" v-if="user">
          <div class="option">
            <router-link class="option" :to="{ name: 'Profile' }">
              <userIcon class="icon" />
              <p>Profil</p>
            </router-link>
          </div>
          <div v-if="admin" class="option">
            <router-link class="option" :to="{ name: 'Admin' }">
              <adminIcon class="icon" />
              <p>Admin</p>
            </router-link>
          </div>
          <div class="option" @click="signOut">
            <router-link class="option" :to="{ name: 'Home' }">
              <signOutIcon class="icon" />
              <p>Çıkış Yap</p>
            </router-link>
          </div>
        </div>
      </ul>
    </transition>
  </header>
</template>

<script>
import menuIcon from "../assets/Icons/bars-regular.svg";
import userIcon from "../assets/Icons/user-alt-light.svg";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import signOutIcon from "../assets/Icons/sign-out-alt-regular.svg";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "navigation",
  components: {
    menuIcon,
    userIcon,
    adminIcon,
    signOutIcon,
  },
  data() {
    return {
      mobile: null,
      mobileNav: null,
      windowWidth: null,
      profileMenu: null,
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
    toggleProfileMenu(e) {
      if (e.target === this.$refs.profile) {
        this.profileMenu = !this.profileMenu;
      }
    },
    signOut() {
      firebase.auth().signOut();
      window.location.reload();
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.profileAdmin;
    },
  },
};
</script>

<style lang="scss" scoped>
header {
  background-color: #fff;
  padding: 0 25px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;

  .link {
    font-weight: 500;
    padding: 0 8px;
    transition: 0.3s color ease;

    &:hover {
      color: #ed5565;
    }
  }
  nav {
    display: flex;
    padding: 25px 0;

    .branding {
      display: flex;
      align-items: center;

      .header {
        font-weight: 600;
        font-size: 24px;
        color: #000;
        text-decoration: none;
      }
    }

    .nav-links {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: flex-end;

      ul {
        margin-right: 50px;

        .link {
          margin-right: 30px;
        }

        .link:last-child {
          margin-right: 0;
        }
      }

      .profile {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #ed5565;
        z-index: 100;

        span {
          pointer-events: none;
        }

        .profile-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #ed5565;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);

          .info {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;

            .initials {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #ed5565;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              cursor: pointer;
            }

            .right {
              flex: 1;
              margin-left: 24px;

              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 12px;
              }
            }
          }

          .options {
            padding: 15px;

            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;

              .icon {
                width: 18px;
                height: auto;
                transition: all 0.4s ease;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
                transition: all 0.4s ease;
              }

              :hover p,
              :hover .icon {
                color: #000;
              }

              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }
  }

  .menu-icon {
    cursor: pointer;
    position: absolute;
    top: 32px;
    right: 25px;
    height: 25px;
    width: auto;
  }

  .mobile-nav {
    padding: 20px;
    width: 70%;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    background-color: #ed5565;
    top: 0;
    left: 0;

    .link {
      padding: 15px 0;
      color: #fff;
      transition: 0.4s color ease;

      &:hover {
        color: #000;
      }
    }
    .options {
      padding-top: 15px;

      .option {
        text-decoration: none;
        color: #fff;
        display: flex;
        align-items: center;
        margin-bottom: 12px;

        .icon {
          width: 18px;
          height: auto;
          transition: all 0.4s ease;
        }
        p {
          font-size: 14px;
          margin-left: 12px;
          transition: all 0.4s ease;
        }

        :hover p,
        :hover .icon {
          color: #000;
        }

        &:last-child {
          margin-bottom: 0px;
        }
      }
    }
  }

  .mobile-nav-enter-active,
  .mobile-nav-leave-active {
    transition: all 1s ease-in-out;
  }
  .mobile-nav-enter {
    transform: translateX(-250px);
  }
  .mobile-nav-enter-to {
    transform: translateX(0);
  }
  .mobile-nav-leave-to {
    transform: translateX(-250px);
  }
}
</style>