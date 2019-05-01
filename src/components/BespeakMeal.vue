<template>
  <div class="bespeak-meal">
    <van-tabs v-model="mainActive" animated type="card">
      <van-tab title="订餐">
        <BespeakMealAdd
          :student-info="studentInfo"
          :last-book-data="lastBookData"
          @cancel="cancel"
          @confirm="confirm"
        />
      </van-tab>
      <van-tab title="改餐">
        <BespeakMealChange
          :student-info="studentInfo"
          :last-book-data="lastBookData"
          @cancel="cancel"
          @confirm="confirm"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
const BespeakMealAdd = () => import('@/components/BespeakMealAdd')
const BespeakMealChange = () => import('@/components/BespeakMealChange')
import { mapGetters } from 'vuex'
export default {
  name: 'BespeakMeal',
  props: {
    studentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      mainActive: 0
    }
  },
  computed: {
    ...mapGetters([
      'colors'
    ])
  },
  components: {
    BespeakMealAdd,
    BespeakMealChange
  },
  watch: {
    studentInfo: {
      handler(val) {
        this.lastBookData = {
          start: new Date('2019-3-13'),
          end: new Date('2019-4-19')
        }
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
.van-tabs{
  height: 100%;
}
</style>
<style scoped>
 .bespeak-meal >>> .van-tabs__content{
    height: 100%;
  }
</style>

