<template>
  <div class="home">
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost v-for="(post, index) in blogPostsFeed" :key="index" :post="post" />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>Daha Fazla Blog Görüntüle</h3>
        <div class="blog-cards">
          <BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index"  />
        </div>
      </div>
    </div>
    <div v-if="!user"  class="updates">
      <div class="container">
        <h2>Postları kaçırma! Bugün hesabınız için kayıt olun!</h2>
        <router-link class="router-button" to="#">
          Tasarım Uzmanı İçin Kayıt Ol <Arrow class=" arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "../components/BlogPost.vue";
import BlogCard from "../components/BlogCard.vue";
import Arrow from "../assets/Icons/arrow-right-light.svg";
/* import store from "../store"; */

export default {
  name: "Home",
  components: { BlogPost, BlogCard, Arrow },
  data() {
    return {
      welcomeScreen: {
        title: "Hoş Geldiniz!",
        blogPost:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        welcomeScreen : true,
        photo : "coding",
      },
      /* sampleBlogPost : [
        {
          title : "This is a Filter Title!",
          blogHTML : "This is a filter blog post title!",
          blogCoverPhoto : "beautiful-stories",
        },
        {
          title : "This is a Filter Title2!",
          blogHTML : "This is a filter blog post title!",
          blogCoverPhoto : "designed-for-everyone",
        }
      ], */
    }
  },
  computed : {
    blogPostsFeed (){
      return this.$store.getters.blogPostsFeed
    },
    blogPostsCards (){
      return this.$store.getters.blogPostsCards
    },
    user(){
      return this.$store.state.user
    }
  },
};
</script>

<style lang="scss" scoped>

  .blog-card-wrap{
    h3{
      font-weight: 300;
      font-size: 20px;
      margin-bottom: 32px;
    }
  }

  .updates{
    .container{
      padding: 100px 25px;
      display: flex;
      flex-direction: column;
      align-items: center;

      @media (min-width : 800px){
        padding: 120px 25px;
        flex-direction: row;
      }

      .router-button{
        display: flex;
        font-size: 14px;
        text-decoration: none;

        @media (min-width: 800px){
          margin-left: auto;
        }
      }
      h2{
        font-weight: 300;
        font-size: 32px;
        max-width: 425px;
        width: 100%;
        text-align: center;
        text-transform: uppercase;

        @media (min-width : 800px){
          text-align: initial;
          font-size: 40px;
        }
      }
    }
  }

</style>