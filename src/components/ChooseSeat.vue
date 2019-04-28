<template>
  <div class="choose-seat">
    <van-collapse v-model="showFloor">
      <van-collapse-item title="一楼" name="1st">
        <Tables ref="1st" :tables-data="tableData1" :chose-seats="choseSeat" @change="changeSeat('1st',$event)" :stage-width="stageWidth" table-id="1st" choose-type="single"></Tables>
      </van-collapse-item>
      <van-collapse-item title="二楼" name="2nd">
        <Tables ref="2nd" :tables-data="tableData2" @change="changeSeat('2nd', $event)" :stage-width="stageWidth" table-id="2nd" choose-type="single"></Tables>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import Tables from '@/components/Tables'
import { mapGetters } from 'vuex'
export default {
  name: 'ChooseSeat',
  props: {
    seatDates: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      stageWidth: window.innerWidth,
      showFloor: ['1st', '2nd'],
      tableData1: [
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
          sum: 13,
          choseNum: 4
        },
        {
          id: 'afdsf',
          floor: 1,
          order_num: 3,
          shape: 'circle',
          sum: 6,
          choseNum: 5
        },
        {
          id: 'gggw',
          floor: 1,
          order_num: 4,
          shape: 'circle',
          sum: 10,
          choseNum: 1
        }
      ],
      tableData2: [{
        id: 'ggfffgw',
        floor: 1,
        order_num: 4,
        shape: 'circle',
        sum: 10,
        choseNum: 1
      }],
      choseSeat: ['fad', 'fad', 'gggw']
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
  watch: {
  },
  methods: {
    changeSeat(floor, tableIds) {
      if (floor === '1st') {
        this.$refs['2nd'].clearChoseSeat()
      } else {
        this.$refs['1st'].clearChoseSeat()
      }
      console.log(tableIds)
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.choose-seat{

}
</style>
