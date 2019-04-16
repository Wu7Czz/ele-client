<template>
  <div class="bespeak-meal-add">
    <van-tabs v-model="cuttentIndex" @disabled="onClickDisabled" @change="stepChange">
      <van-tab title="步骤1">
        <GetBaseMealDates ref='stepOne' :student-info='studentInfo' :last-book-data='lastBookData' @next="jumpStep2"></GetBaseMealDates>
      </van-tab>
      <van-tab title="步骤2" :disabled="!stepOneData">
        <FineAdjustMeal ref='stepTwo' :base-data="stepOneData"></FineAdjustMeal>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

import GetBaseMealDates from '@/components/GetBaseMealDates'
import FineAdjustMeal from '@/components/FineAdjustMeal'
import { mapGetters } from 'vuex'
export default {
  name: 'BespeakMealAdd',
  props: {
    studentInfo: {
      type: Object,
      default() {
        return {
        }
      }
    },
    // 当前选中人员最后一次订餐记录
    lastBookData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // 步骤序号
      cuttentIndex: 0,
      stepOneData: null

    }
  },
  computed: {
    ...mapGetters([
      'colors'
    ])

  },
  components: {
    GetBaseMealDates,
    FineAdjustMeal
  },
  watch: {
    studentInfo: {
      handler() {
        this.stepOneData = null
        if (this.cuttentIndex !== 0) {
          this.$nextTick(() => {
            this.cuttentIndex = 0
          })
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
    },
    onClickDisabled(index) {
      // 第一步跳到第二步

    },
    jumpStep2(val) {
      this.stepOneData = val
      this.$nextTick(() => {
        this.cuttentIndex = 1
      })
    },
    stepChange(index) {
      if (index === 0) {
        this.stepOneData = null
        this.$refs.stepOne.clear()
      } else if (index === 1) {
      }
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.bespeak-meal-add{
  height: 100%;
  .van-tabs{
    height: 100%;
    .van-tab__pane{
      height: 100%;
    }
  }
  .van-cell{
    overflow: visible;
  }
  .van-cell__value{
    overflow: visible;
  }
}
</style>

