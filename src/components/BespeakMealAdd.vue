<template>
  <div class="bespeak-meal-add">
    <van-tabs v-model="active" @disabled="onClickDisabled">
      <van-tab title="步骤1">
        <van-cell-group>
          <van-cell title="起止日期" icon="clock-o" class="start-end-date">
              <v-date-picker
                mode='range'
                :min-date='minDate'
                :disabled-dates="new Date()"
                v-model='dateRange'
                >
              </v-date-picker>
          </van-cell>
          <van-cell title="选餐" class="meal">
            <template slot="title">
              <van-row>
                <van-col span="8">
                  <van-checkbox v-model="baseMeal[0]" >早餐</van-checkbox>
                </van-col>
                <van-col span="8">
                  <van-checkbox v-model="baseMeal[1]" >午餐</van-checkbox>
                </van-col>
                <van-col span="8">
                  <van-checkbox v-model="baseMeal[2]" >晚餐</van-checkbox>
                </van-col>
              </van-row>
            </template>
          </van-cell>
          <van-cell class="price">
            <van-row>
              <van-col span="8">
                <div>
                  <van-stepper
                    class="price-stepper"
                    :disabled="!baseMeal[0]"
                    v-model="baseMeal[0]"
                    :min="1"
                    :max="10"
                    :step="0.5"
                  />
                  <div class="meal-unit">元</div>
                </div>
              </van-col>
              <van-col span="8">
                <div>
                  <van-stepper
                    class="price-stepper"
                    :disabled="!baseMeal[1]"
                    v-model="baseMeal[1]"
                    :min="6"
                    :max="7.5"
                    :step="1.5"
                  />
                  <div class="meal-unit">元</div>
                </div>
              </van-col>
              <van-col span="8">
                <div>
                  <van-stepper
                    class="price-stepper"
                    :disabled="!baseMeal[2]"
                    v-model="baseMeal[2]"
                    :min="6"
                    :max="7.5"
                    :step="1.5"
                  />
                  <div class="meal-unit">元</div>
                </div>
              </van-col>
            </van-row>
          </van-cell>
          <van-cell class="weekends">
            <van-row >
              <van-col span="12">
                <van-checkbox v-model="inclSat" >含周六</van-checkbox>
              </van-col>
              <van-col span="12">
                <van-checkbox v-model="inclSun" >含周日</van-checkbox>
              </van-col>
            </van-row>
          </van-cell>
          <van-collapse v-model="activeNames" class="workday-holiday">
            <van-collapse-item title="假期" name="1" v-show="showHolidays.length > 0">
              <van-cell v-for="(day, index) in showHolidays" :key="index" :title="day.title">
                <template slot="title">
                  <span>{{day.title}}</span>
                  <i>：</i>
                  <span>{{parseTime(day.start, '{y}-{m}-{d}')}}至</span>
                  <span>{{parseTime(day.end, '{y}-{m}-{d}')}}</span>
                </template>
                <van-checkbox v-model="day.chose" ></van-checkbox>
              </van-cell>
            </van-collapse-item>
            <van-collapse-item title="调班" name="2" v-show="showWorkdays.length > 0">
              <van-cell v-for="(day, index) in showWorkdays" :key="index">
                <template slot="title">
                  <span>{{day.title}}</span>
                  <i>：</i>
                  <span>{{parseTime(day.start, '{y}-{m}-{d}')}}至</span>
                  <span>{{parseTime(day.end, '{y}-{m}-{d}')}}</span>
                </template>
                <van-checkbox v-model="day.chose" ></van-checkbox>
              </van-cell>
            </van-collapse-item>
          </van-collapse>
          <van-cell class="button-cell">
              <van-button type="info" @click="changeStep(1)">下一步</van-button>
          </van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab title="步骤2" :disabled="!stepOneData">
        <van-row class="meal-choose">
          <van-col span="6">
            <van-switch-cell v-model="choseMeal[0]" title="早餐" :active-color="colors.breakfast"/>
          </van-col>
          <van-col span="6">
            <van-switch-cell v-model="choseMeal[1]" title="午餐" :active-color="colors.lunch"/>
          </van-col>
          <van-col span="6">
            <van-switch-cell v-model="choseMeal[2]" title="晚餐" :active-color="colors.supper"/>
          </van-col>
          <van-col span="6">
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
          <van-cell title="早餐" :label="'次数：'+ breakfastDates.length"  :value="breakfastDates.length * baseMeal[0] + '元'" v-if="breakfastDates.length"/>
          <van-cell title="午餐" :label="'次数：'+ lunchDates.length"  :value="lunchDates.length * baseMeal[1] + '元'" v-if="lunchDates.length"/>
          <van-cell title="晚餐" :label="'次数：'+ supperDates.length"  :value="supperDates.length * baseMeal[2] + '元'" v-if="supperDates.length"/>
          <van-cell title="总价" :label="'总就餐天数：'+ mealDates.length"  :value="totalPrice + '元'"/>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { parseTime, addDays, getBetweenDateStr, getBetweenDateStrExWeekend } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'BespeakMealAdd',
  props: {
    studentInfo: {
      type: Object,
      default() {
        return {}
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
      minDate: null,
      maxDate: null,
      // 步骤序号
      active: 0,
      activeNames: ['1'],
      // 订餐时间范围
      dateRange: {
      },
      // 调班假日优先级
      priorityList: {
        'workdays-single': 1,
        'holidays-single': 2,
        'workdays-all': 3,
        'holidays-all': 4,
        'default': 99
      },
      // 基本
      baseMeal: [false, 7.5, 7.5],
      // 餐位价格
      // 当前选择学生及日期下的放假时间
      showHolidays: [],
      // 当前选择学生及日期下的调班时间
      showWorkdays: [],
      // 含周日
      inclSun: true,
      // 含周六
      inclSat: true,
      stepOneData: null,
      stepTwoData: null,
      breakfastDates: [],
      lunchDates: [],
      supperDates: [],
      mealDates: [],
      choseMeal: [true, true, true],
      cancelMeal: false
    }
  },
  computed: {
    ...mapGetters([
      'holidays',
      'workdays',
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
  components: {},
  watch: {
    // 餐位价格
    baseMeal: {
      handler(val) {
        this.stepOneData = null
        this.$nextTick(() => {
          this._.forEach(val, (value, index) => {
            if (value === true) {
              this.$set(this.baseMeal, index, index === 0 ? 2 : 7.5)
            }
          })
        })
      },
      immediate: true,
      deep: true
    },
    // 学生信息
    studentInfo: {
      handler() {
        this.active = 0
        this.getWorkHolidays()
      },
      immediate: true,
      deep: true
    },
    // 上次订餐信息
    lastBookData: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            const valEnd = addDays(newVal.end, 1)
            const today = new Date(new Date().toLocaleDateString())
            const nowEnd = addDays(new Date(today), 1)
            this.minDate = valEnd > nowEnd ? valEnd : nowEnd
            this.dateRange = {
              start: this.minDate,
              end: addDays(this.minDate, 3)
            }
          })
        }
      },
      immediate: true,
      deep: true
    },
    // 时间范围
    dateRange: {
      handler() {
        this.stepOneData = null
        this.getWorkHolidays()
      },
      immediate: true,
      deep: true
    },
    // 是否包含星期天
    inclSun() {
      this.stepOneData = null
    },
    // 是否包含星期六
    inclSat() {
      this.stepOneData = null
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
    cancel() {
      this.$emit('cancel')
    },
    parseTime,
    confirm() {
      this.$emit('confirm')
    },
    // 处理假期和调班日期 返回可用格式
    handleDays(sDates, range, gradeId, type = 'holidays') {
      const newArray = []
      const that = this
      if (sDates && gradeId && range) {
        this._.forEach(sDates, (list, key) => {
          if (key === 'all' && list.length) {
            this._.forEach(list, dates => {
              const intersectionDate = that.getIntersectionDateRange(dates, range)
              if (intersectionDate) {
                newArray.push({
                  chose: true,
                  type,
                  crowd: 'all',
                  priority: type + '-all',
                  ...dates,
                  ...intersectionDate
                })
              }
            })
          } else if (key === gradeId && list.length) {
            this._.forEach(list, dates => {
              const intersectionDate = that.getIntersectionDateRange(dates, range)
              if (intersectionDate) {
                newArray.push({
                  chose: true,
                  type,
                  crowd: 'single',
                  priority: type + '-single',
                  ...dates,
                  ...intersectionDate
                })
              }
            })
          }
        })
      }
      return newArray
    },
    getIntersectionDateRange(range1, range2) {
      const start1 = new Date(range1.start).getTime()
      const end2 = new Date(range2.end).getTime()
      const start2 = new Date(range2.start).getTime()
      const end1 = new Date(range1.end).getTime()
      if (start1 > end2) return undefined
      if (start2 > end1) return undefined
      return {
        startDate: new Date(Math.max(new Date(start2), new Date(start1))),
        endDate: new Date(Math.min(new Date(end2), new Date(end1)))
      }
    },
    getWorkHolidays() {
      if (this.studentInfo.gradeId && this.dateRange) {
        const gradeId = this.studentInfo.gradeId
        this.showHolidays = this.handleDays(this.holidays, this.dateRange, gradeId, 'holidays')
        this.showWorkdays = this.handleDays(this.workdays, this.dateRange, gradeId, 'workdays')
      }
    },
    // 步骤1 获取
    getStepOneData() {
      this.stepOneData = null
      if (this.studentInfo.gradeId && this.dateRange) {
        const range = this._.cloneDeep(this.dateRange)
        const defaultDays = getBetweenDateStrExWeekend(range.start, range.end, this.inclSat, this.inclSun)
        const days = this.getMealDate(defaultDays, this.showWorkdays, this.showHolidays)
        this.stepOneData = {
          days,
          meals: this.baseMeal
        }
        this.handleCalendarData(this.stepOneData)
        this.choseMeal = this.baseMeal.map(i => !!i)
      }
    },
    getMealDate(defaultDays, showWorkdays, showHolidays, range) {
      const workdays = this._.cloneDeep(showWorkdays)
      const holidays = this._.cloneDeep(showHolidays)
      this._.forEach(workdays, item => {
        if (item.chose) {
          const priority = this.priorityList[item.priority]
          const days = getBetweenDateStr(item.startDate, item.endDate)
          this._.forEach(days, day => {
            const currentDay = defaultDays[day]
            if (currentDay) {
              const _priority = this.priorityList[currentDay['priority']]
              if (priority < _priority) {
                defaultDays[day] = { priority: item.priority, isHoliday: false }
              }
            } else {
              defaultDays[day] = { priority: item.priority, isHoliday: false }
            }
          })
        }
      })
      this._.forEach(holidays, item => {
        if (item.chose) {
          const priority = this.priorityList[item.priority]
          const days = getBetweenDateStr(item.startDate, item.endDate)
          this._.forEach(days, day => {
            const currentDay = defaultDays[day]
            if (currentDay) {
              const _priority = this.priorityList[currentDay['priority']]
              if (priority < _priority) {
                defaultDays[day] = { priority: item.priority, isHoliday: true }
              }
            } else {
              defaultDays[day] = { priority: item.priority, isHoliday: true }
            }
          })
        }
      })
      const newArray = []
      this._.forEach(defaultDays, (i, day) => {
        if (!i.isHoliday) {
          newArray.push(day)
        }
      })
      return newArray
    },
    onClickDisabled(index) {
      // 第一步跳到第二步
      if (this.active === 0 && index === 1) {
        if (!this.studentInfo.name) {
          this.$toast('尚未选择就餐人员')
        } else if (!this.dateRange) {
          this.$toast('尚未选择就餐时间')
        } else if (!this.baseMeal.some(i => !!i)) {
          this.$toast('尚未选择就餐价位')
        } else {
          this.$toast('数据未生成，请先点击‘下一步’')
        }
      }
    },
    changeStep(index) {
      if (this.active === 0) {
        this.getStepOneData()
        if (this.stepOneData && index === 1) {
          this.$nextTick(() => {
            this.active = index
          })
        } else {
          this.onClickDisabled(index)
        }
      } else if (this.active === 1) {
        if (index === 0) {
          this.active = 0
          this.stepTwoClear()
        }
      }
    },
    handleCalendarData(baseData) {
      const days = baseData.days
      const meals = baseData.meals
      this._.forEach(meals, (price, index) => {
        if (price) {
          if (index === 0) {
            this.breakfastDates = days.map(i => i)
          } else if (index === 1) {
            this.lunchDates = days.map(i => i)
          } else if (index === 2) {
            this.supperDates = days.map(i => i)
          }
        }
      })
      this.getMealDates()
    },
    dayclick(day) {
      this.handleDayClick(day, 0, 'breakfast')
      this.handleDayClick(day, 1, 'lunch')
      this.handleDayClick(day, 2, 'supper')
      this.getMealDates()
    },
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
    getMealDates() {
      const arr = [...this.breakfastDates, ...this.lunchDates, ...this.supperDates]
      this.$nextTick(() => {
        this.mealDates = [...new Set(arr)]
      })
    },
    stepTwoClear() {
      this.breakfastDates = []
      this.lunchDates = []
      this.supperDates = []
      this.mealDates = []
      this.choseMeal = this.baseMeal.map(i => !!i)
      this.cancelMeal = false
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
  .price-stepper{
    display: inline-block;
  }
  .meal-unit{
    padding: 0 10px;
    color: #000;
    display: inline-block;
    vertical-align: sub;
  }
  .start-end-date .van-icon,.start-end-date .van-cell__title{
    line-height: 35px;
  }
  .start-end-date{
    .van-cell__value{
      flex: 3;
    }
  }
  .price, .meal, .weekends{
    .van-col{
      text-align: center;
    }
  }

}
</style>
<style scoped>
.bespeak-meal-add .start-end-date >>> .popover-container{
  text-align: left;
}
.bespeak-meal-add .start-end-date >>> .vc-popover-content-wrapper{
  width: 100% !important;
  /* transform: translate3d( -120px, 35px, 0) !important; */
}
.bespeak-meal-add .start-end-date >>> .popover-container input{
  min-width: 180px !important;
}
.button-cell >>> .van-cell__value{
  text-align: right;
}
.workday-holiday >>> .van-collapse-item__content{
  padding: 0 15px;
}
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
</style>

