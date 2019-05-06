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
    $route(to, from) {
      const index = this._.findIndex(this.pages, { 'name': this.getMainPath(to.fullPath) })
      this.active = index !== this.active ? index : this.active
    },
    active(newVal, oldVal) {
      if (newVal !== oldVal && this.getMainPath(this.$route.fullPath) !== this.pages[newVal].name) {
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
          name: 'home',
          icon: 'wap-home',
          info: '',
          dot: undefined
        },
        {
          title: '订餐',
          url: '/booking',
          name: 'booking',
          icon: 'records',
          info: '',
          dot: undefined
        },
        {
          title: '报表',
          url: '/statement',
          name: 'statement',
          icon: 'chart-trending-o',
          info: '',
          dot: undefined
        },
        {
          title: '我的',
          url: '/my',
          name: 'my',
          icon: 'contact',
          info: '',
          dot: undefined
        }
      ]
    }
  },
  mounted() {
    var i = 0
    this.pages.some((page, index) => {
      if (page.name === this.getMainPath(this.$route.fullPath)) {
        i = index
        return true
      } else {
        return false
      }
    })
    this.active = i
  },
  beforeDestroy() {

  },
  methods: {
    change(active) {
      this.title = active
    },
    getMainPath(fullPath) {
      return fullPath.split('/')[1]
    }
  }
}
</script>
<style lang="scss">
#app {
  height: 100%;
  position: relative;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 50px;
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
