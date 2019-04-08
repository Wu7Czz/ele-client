<template>
  <div id="app">
    <van-nav-bar
      :title="pages[active].title"
      fixed
    />
    <router-view />
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item v-for="page in pages" :icon="page.icon" :info="page.info" :key="page.title">{{page.title}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'App',
  components: {
  },
  watch: {
    active(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$router.push(this.pages[newVal].url)
      }
    }
  },
  data() {
    return {
      active: 0,
      pages: [
        {
          title: '首页',
          url: '/home',
          icon: 'wap-home',
          info: '',
          dot: undefined
        },
        {
          title: '订餐',
          url: '/booking',
          icon: 'records',
          info: '',
          dot: undefined
        },
        {
          title: '报表',
          url: '/statement',
          icon: 'chart-trending-o',
          info: '',
          dot: undefined
        },
        {
          title: '我的',
          url: '/my',
          icon: 'contact',
          info: '',
          dot: undefined
        }
      ]
    }
  },
  mounted() {
  },
  beforeDestroy() {

  },
  methods: {
    change(active) {
      console.log(active)
      this.title = active
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-bottom: 50px;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
