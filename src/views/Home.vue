<template>
  <div class="home">
    <van-cell title="今日订餐人次" size="large" value-class="today_num_value" title-class="today_num_title">
      <span>{{today_b}}</span>
      /
      <span>{{today_l}}</span>
      /
      <span>{{today_s}}</span>
    </van-cell>
    <van-row class="color-example">
      <van-col span="6">早餐
        <i :style="{background: colors.breakfast}"></i>
      </van-col>
      <van-col span="6">午餐
        <i :style="{background: colors.lunch}"></i>
      </van-col>
      <van-col span="6">晚餐
        <i :style="{background: colors.supper}"></i>
      </van-col>
      <van-col span="6">未订餐
        <i :style="{background: colors.none}"></i>
      </van-col>
    </van-row>
    <van-collapse v-model="showFloor">
      <van-collapse-item title="一楼" name="1st">
        <Tables :tables-data="tableData" :people-data="peopleData" :stage-width="stageWidth" table-id="1st" @load-cb="loadSeat"></Tables>
      </van-collapse-item>
      <van-collapse-item title="二楼" name="2nd">
        <Tables :tables-data="tableData" :people-data="peopleData" :stage-width="stageWidth" table-id="2st" @load-cb="loadSeat"></Tables>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
// import { testApi } from '@/api/index.js'
const Tables = () => import('@/components/Tables')
// import Tables from '@/components/Tables'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data() {
    return {
      today_b: 0, // 今日早饭人次
      today_l: 0, // 今日午饭人次
      today_s: 0, // 今日晚饭人次
      msg: 0,
      showFloor: ['1st'],
      stageWidth: window.innerWidth,
      tableData: [
        {
          id: 'fad',
          floor: 1,
          order_num: 1,
          shape: 'circle',
          sum: 12,
          choseNum: 3
        },
        {
          id: 'faffd',
          floor: 1,
          order_num: 2,
          shape: 'circle',
          sum: 13
        },
        {
          id: 'afdsf',
          floor: 1,
          order_num: 3,
          shape: 'circle',
          sum: 6
        },
        {
          id: 'gggw',
          floor: 1,
          order_num: 4,
          shape: 'circle',
          sum: 10
        }
      ],
      peopleData: [
        {
          id: '1212313',
          tableId: 'gggw',
          name: '小白',
          class: '01班',
          grade: 'g2021',
          booking: [false, false, false]
        },
        {
          id: '1212313',
          tableId: 'gggw',
          name: '小白',
          class: '01班',
          grade: 'g2021',
          booking: [true, true, true]
        },
        {
          id: '1212313',
          tableId: 'gggw',
          name: '小白',
          class: '02班',
          grade: 'g2021',
          booking: [false, true, true]
        },
        {
          tableId: 'gggw',
          id: 'fadfadsf',
          name: '小黑',
          class: '01班',
          grade: 'g2020',
          booking: [true, true, false]
        },
        {
          tableId: 'gggw',
          id: 'fadfadsf',
          name: '小黑',
          class: '01班',
          grade: 'g2020',
          booking: [true, false, true]
        }, {
          tableId: 'gggw',
          id: 'fadfadsf',
          name: '小黑',
          class: '02班',
          grade: 'g2020',
          booking: [false, true, false]
        },
        {
          tableId: 'gggw',
          id: 'fadfadsf',
          name: '小黑',
          class: '01班',
          grade: 'g2020',
          booking: [false, false, true]
        },
        {
          tableId: 'gggw',
          id: 'fadfadsf',
          name: '小黑',
          class: '01班',
          grade: 'g2020',
          booking: [true, false, false]
        }
      ]
    }
  },
  components: {
    Tables
  },
  computed: {
    ...mapGetters([
      'colors'
    ])
  },
  mounted() {
  },
  methods: {
    loadSeat(event) {
      // console.log(event)
    }
  }
}
</script>
<style lang="scss" scoped>
.today_num_title{
  font-size: 20px;
}
.today_num_value{
  font-size: 18px;
  span{
    &:nth-child(1){
      color: #FACB40;
    }
    &:nth-child(2){
      color: #4073FD
    }
    &:nth-child(3){
      color: #A453C2;
    }
  }
  color: blue
}
.color-example{
  text-align: center;
  font-size: 18px;
  .van-col{
    position: relative;
    i{
      display: inline-block;
      vertical-align: sub;
      width: 16px;
      height: 20px;
      border-radius: 4px;
    }
  }
}
</style>
<style scoped>
.home >>> .van-collapse-item__content{
  padding: 0;
}
</style>

