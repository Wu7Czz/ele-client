<template>
  <div class="bespeak-meal-add">
    <van-tabs v-model="cuttentIndex" @disabled="onClickDisabled" @change="stepChange">
      <van-tab title="初选">
        <GetBaseMealDates ref='stepOne' :student-info='studentInfo' :last-book-data='lastBookData' @next="finishStep1"></GetBaseMealDates>
      </van-tab>
      <van-tab title="微调" :disabled="!stepOneData">
        <FineAdjustMeal ref='stepTwo' :base-data="stepOneData" @next="finishStep2"></FineAdjustMeal>
      </van-tab>
      <van-tab title="选座" :disabled="!stepTwoData">
        <ChooseSeat :seat-dates="stepTwoData" @next="finishStep3"></ChooseSeat>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>

import GetBaseMealDates from '@/components/GetBaseMealDates'
import FineAdjustMeal from '@/components/FineAdjustMeal'
import ChooseSeat from '@/components/ChooseSeat'
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
      // Object days:就餐天数array；meals:早中晚餐标array
      stepOneData: null,
      // Arrary 除早餐外的就餐日期
      stepTwoData: [],
      stepThreeData: null

    }
  },
  computed: {
    ...mapGetters([
      'colors'
    ])

  },
  components: {
    GetBaseMealDates,
    FineAdjustMeal,
    ChooseSeat
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
    onClickDisabled(nextIndex) {
      // 第一步跳到第二步
      if (this.cuttentIndex === 0 && nextIndex === 1) {
        if (!this.stepOneData) {
          this.$toast('数据未生成，请先点击‘下一步’')
        }
      } else if (this.cuttentIndex === 1 && nextIndex === 2) {
        if (!this.stepTwoData) {
          this.$toast('数据未生成，请先点击‘下一步’')
        }
      }
    },
    finishStep1(val) {
      if (val) {
        this.stepOneData = val
        this.$nextTick(() => {
          this.cuttentIndex = 1
        })
      }
    },
    finishStep2(val) {
      if (val) {
        this.stepTwoData = val
        this.$nextTick(() => {
          this.cuttentIndex = 2
        })
      }
    },
    finishStep3(val) {
      if (val) {

      }
    },
    stepChange(index) {
      if (index === 0) {
        this.stepOneData = null
        this.stepTwoData = null
        this.$refs.stepOne.clear()
      } else if (index === 1) {
        this.stepTwoData = null
      } else if (index === 2) {
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

