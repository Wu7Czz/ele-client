<template>
  <div class="bespeak-meal-change">
    <van-tabs v-model="active">
      <van-tab title="步骤1">
        <van-panel title="标题" desc="描述信息" status="状态">
          <div>内容</div>
          <div slot="footer">
            <van-button size="small">按钮</van-button>
            <van-button size="small" type="danger">按钮</van-button>
          </div>
        </van-panel>
      </van-tab>
      <van-tab title="步骤2">
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BespeakMeal',
  props: {
    studentInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    lastBookData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      active: 0
    }
  },
  computed: {
    ...mapGetters([
      'colors'
    ])
  },
  components: {
  },
  watch: {
    lastBookData: {
      handler(val) {
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel')
    },
    confirm() {
      this.$emit('confirm')
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.bespeak-meal-change{
  height: 100%;
}
</style>
<style scoped>
.bespeak-meal-change >>> .van-tabs__content{
  height: 100%;
}
</style>

