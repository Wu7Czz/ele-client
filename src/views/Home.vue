<template>
  <div class="home">
    <van-button type="danger" @click="test1">危险按钮</van-button>
    {{msg}}
  </div>
</template>

<script>
import { testApi } from '@/api/index.js'
export default {
  name: 'Home',
  data() {
    return {
      msg: 0
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
    test1() {
      this.msg++
      testApi().then(resData => {
        this.msg = resData.info
      })
    }
  }
}
</script>
