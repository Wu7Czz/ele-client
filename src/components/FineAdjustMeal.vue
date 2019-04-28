<template>
  <div class="fine-adjust-meal">
    <van-row class="meal-choose">
      <van-col span="8">
        <van-switch-cell v-model="choseMeal[0]" title="早餐" :active-color="colors.breakfast"/>
      </van-col>
      <van-col span="8">
        <van-switch-cell v-model="choseMeal[1]" title="午餐" :active-color="colors.lunch"/>
      </van-col>
      <van-col span="8">
        <van-switch-cell v-model="choseMeal[2]" title="晚餐" :active-color="colors.supper"/>
      </van-col>
    </van-row>
    <van-row class="meal-choose" type="flex" justify="space-around">
      <van-col span="12">
        <van-switch-cell v-model="cancelMeal" title="未订餐" active-color="#777"/>
      </van-col>
    </van-row>
    <van-row type="flex" justify="space-between" class="calendar">
      <van-col span="24">
        <v-calendar
          @dayclick="dayclick"
          :attributes='attrbutes'
        />
      </van-col>
    </van-row>
    <van-cell-group>
      <van-cell title="早餐" value-class="meal-price" :label="'次数：'+ breakfastDates.length"  :value="breakfastDates.length * baseMeal[0] + '元'" v-if="breakfastDates.length"/>
      <van-cell title="午餐" value-class="meal-price" :label="'次数：'+ lunchDates.length"  :value="lunchDates.length * baseMeal[1] + '元'" v-if="lunchDates.length"/>
      <van-cell title="晚餐" value-class="meal-price" :label="'次数：'+ supperDates.length"  :value="supperDates.length * baseMeal[2] + '元'" v-if="supperDates.length"/>
      <van-cell title="总价" value-class="total-price" :label="'总就餐天数：'+ mealDates.length"  :value="totalPrice + '元'"/>
    </van-cell-group>
    <van-cell class="button-cell">
        <van-button type="info" @click="next()">下一步</van-button>
    </van-cell>
  </div>
</template>
<script>
import { parseTime } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'GetBaseMealDates',
  props: {
    baseData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      baseMeal: [0, 0, 0],
      // 早餐天数集合
      breakfastDates: [],
      // 午餐天数集合
      lunchDates: [],
      // 晚餐天数集合
      supperDates: [],
      // 所有就餐天数集合
      mealDates: [],
      // 需有座位的就餐天数集合
      seatsDates: [],
      // 步骤二中选定的就餐状态
      choseMeal: [true, true, true],
      cancelMeal: false
    }
  },
  computed: {
    ...mapGetters([
      'colors'
    ]),
    attrbutes() {
      return [
        {
          bar: {
            backgroundColor: this.colors['breakfast'],
            className: 'breakfast'
          },
          dates: this.breakfastDates.map(i => new Date(i))
        },
        {
          bar: {
            backgroundColor: this.colors['lunch'],
            className: 'lunch'
          },
          dates: this.lunchDates.map(i => new Date(i))
        },
        {
          bar: {
            backgroundColor: this.colors['supper'],
            className: 'supper'
          },
          dates: this.supperDates.map(i => new Date(i))
        }
      ]
    },
    totalPrice() {
      return this.breakfastDates.length * this.baseMeal[0] + this.lunchDates.length * this.baseMeal[1] + this.supperDates.length * this.baseMeal[2]
    }
  },
  watch: {
    baseData: {
      handler(val) {
        if (val) {
          if (val.days && val.meals) {
            this.handleCalendarData(val)
          } else {
            this.baseMeal = [0, 0, 0]
          }
        }
      },
      immediate: true,
      deep: true
    },
    choseMeal: {
      handler(val) {
        this.cancelMeal = !val.some(i => i)
      },
      immediate: true,
      deep: true
    },
    cancelMeal(val) {
      if (!val) {
        if (!this.choseMeal.some(i => i)) {
          this.choseMeal = [true, true, true]
        }
      } else {
        this.choseMeal = [false, false, false]
      }
    }
  },
  methods: {
    // 步骤一跳转到步骤二时 对步骤一的数据处理 生成早中晚三顿的各自就餐天数
    handleCalendarData(baseData) {
      const days = baseData.days
      const meals = baseData.meals
      this.baseMeal = meals
      this.choseMeal = meals.map(i => !!i)
      const that = this
      this._.forEach(meals, (price, index) => {
        if (price) {
          if (index === 0) {
            that.breakfastDates = [...days]
          } else if (index === 1) {
            that.lunchDates = [...days]
          } else if (index === 2) {
            that.supperDates = [...days]
          }
        }
      })
      this.getMealDates()
    },
    // 步骤二中点击某天触发事件
    dayclick(day) {
      this.handleDayClick(day, 0, 'breakfast')
      this.handleDayClick(day, 1, 'lunch')
      this.handleDayClick(day, 2, 'supper')
      this.getMealDates()
    },
    // 步骤二中点击某天处理事件
    handleDayClick(day, index, mealName) {
      const choose = this.choseMeal[index]
      const chose = day.attributesMap[index]
      const now = parseTime(day.date, '{y}-{m}-{d}')
      if (!choose && chose) {
        this[mealName + 'Dates'] = this[mealName + 'Dates'].filter(i => now !== i)
      } else if (choose && !chose) {
        this[mealName + 'Dates'].push(now)
      }
    },
    // 获取无重复的就餐天数集合
    getMealDates() {
      const arr1 = [...this.lunchDates, ...this.supperDates]
      const arr = [...this.breakfastDates, ...arr1]
      this.$nextTick(() => {
        this.seatsDates = [...new Set(arr1)]
        this.mealDates = [...new Set(arr)]
      })
    },
    next() {
      this.$dialog.confirm({
        title: '共计' + this.totalPrice + '元！',
        message: `早${this.breakfastDates.length}次，午${this.lunchDates.length}次，晚${this.supperDates.length}次`
      }).then(() => {
        this.$emit('next', this.seatsDates)
      }).catch(() => {
        // on cancel
      })
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.fine-adjust-meal{
  padding-bottom: 20px;
  .total-price{
    font-size: 16px;
    color: red;
  }
  .meal-price{
    color: #000;
  }
}
</style>
<style scoped>
.calendar >>> .van-col{
  text-align: center;
}
.meal-choose >>> .van-cell > .van-cell__title{
  text-align: right;
  padding-right: 20px;
  display: inline-block;
}
.meal-choose >>> .van-cell .van-cell__value{
  display: inherit;
}
.button-cell >>> .van-cell__value{
  text-align: right;
}
</style>
