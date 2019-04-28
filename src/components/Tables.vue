<template>
  <div class="tables">
    <div :id="canvasId"></div>
  </div>
</template>

<script>
import Konva from 'Konva'
import { mapGetters } from 'vuex'
export default {
  name: 'Table',
  props: {
    stageWidth: {
      type: Number,
      default: 400
    },
    tablesData: {
      type: [Object, Array],
      default() {
        return []
      }
    },
    peopleData: {
      type: Array,
      default() {
        return []
      }
    },
    chooseType: {
      type: String,
      default: ''
    },
    choseSeats: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      canvasId: 'table-' + (new Date()).getTime(),
      tableGroup: new Konva.Group(),
      peopleGroup: new Konva.Group(),
      seatGroup: new Konva.Group(),
      // 画布高度
      stageHeight: 400,
      // 画布
      stage: null,
      // 图层
      layer: null,
      // 餐桌大小限制
      tableSizeLimit: [100, 300],
      // 餐桌大小
      tableBaseSize: 0,
      // 餐桌列数
      columns: 1,
      // 餐桌行数
      rows: 1,
      // 所有餐桌及座位坐标
      positions: {},
      // 圆桌基本配置
      tableCircle: {
        x: 100,
        y: 100,
        radius: 70,
        fill: '#eee',
        stroke: '#7996FF',
        strokeWidth: 4
      },
      seatColors: {
        'void': '#DCF2FF',
        'chose': '#f44'
      }
    }
  },
  computed: {
    ...mapGetters([
      'colors'
    ])
  },
  watch: {
    peopleData(newVal) {
      this.updatePeople(newVal)
    }
  },
  methods: {
    getStageSize() {
      const tableNum = this.tablesData.length || 1
      const tableSizeMin = this.tableSizeLimit[0]
      const tableSizeMax = this.tableSizeLimit[1]
      if (this.stageWidth < tableSizeMin) {
        this.tableBaseSize = this.stageWidth
      } else {
        const y1 = parseInt(this.stageWidth / tableSizeMin)
        const y2 = parseInt(this.stageWidth / tableSizeMax)
        if (this.stageWidth % tableSizeMax) {
          this.tableBaseSize = Math.floor(this.stageWidth / Math.min(y1, y2 + 1))
        } else {
          this.tableBaseSize = tableSizeMax
        }
      }
      this.columns = this.stageWidth / this.tableBaseSize
      this.rows = Math.ceil(tableNum / this.columns)
      this.stageHeight = this.rows * this.tableBaseSize
    },
    getTablePos(index) {
      const order = index + 1
      const column = order % this.columns || this.columns
      const row = Math.ceil(order / this.columns)
      return [this.tableBaseSize * (2 * column - 1) / 2, this.tableBaseSize * (2 * row - 1) / 2]
    },
    getSeatPos(index, sum, tablePos) {
      const R = this.tableBaseSize * 9 / 24
      if (index) {
        const x = tablePos[0] + Math.sin(2 * Math.PI * index / sum) * R
        const y = tablePos[1] - Math.cos(2 * Math.PI * index / sum) * R
        return [x, y]
      } else {
        return [tablePos[0], tablePos[1] + R]
      }
    },
    drawVoidSeat(pos, tableData) {
      const voidSeat = new Konva.Circle({
        x: pos[0],
        y: pos[1],
        _type: 'void',
        _tableData: tableData,
        radius: this.tableBaseSize * 3 / 48,
        fill: this.seatColors.void,
        stroke: 'rgb(146, 195, 218)',
        strokeWidth: 2
      })
      this.seatGroup.add(voidSeat)
    },
    drawChoseSeat(pos, tableData) {
      const voidSeat = new Konva.Circle({
        x: pos[0],
        y: pos[1],
        _type: 'void',
        _tableData: tableData,
        radius: this.tableBaseSize * 3 / 48,
        fill: this.seatColors.chose,
        stroke: 'rgb(146, 195, 218)',
        strokeWidth: 2
      })
      this.seatGroup.add(voidSeat)
    },
    drawDisabledSeat(pos, tableData) {
      const disabledSeat = new Konva.Circle({
        x: pos[0],
        y: pos[1],
        _tableData: tableData,
        _type: 'disabled',
        radius: this.tableBaseSize * 3 / 48,
        stroke: '#333',
        strokeWidth: 2,
        fillLinearGradientStartPoint: { x: 60, y: 40 },
        fillLinearGradientEndPoint: { x: -60, y: -40 },
        fillLinearGradientColorStops: [0, '#fff', 0.47, '#fff', 0.47, '#333', 0.53, '#333', 0.53, '#fff', 1, '#fff']
      })
      this.seatGroup.add(disabledSeat)
    },
    addTable(table, layer) {

    },
    drawTable() {
      !this.tableBaseSize ? this.getStageSize() : ''
      this.stage = new Konva.Stage({
        container: this.canvasId,
        width: this.stageWidth,
        height: this.stageHeight
      })
      this.layer = new Konva.Layer()
      this.positions = {}
      this._.forEach(this.tablesData, (table, index) => {
        this.positions[table.id] = {}
        var tableKonva
        if (table.shape === 'circle') {
          const tablePos = this.getTablePos(index)
          var seatsSum = table.sum || 1
          this.positions[table.id] = {
            tablePos,
            count: seatsSum, // 之后绘制有人座位时计数用
            seatsPos: []
          }
          tableKonva = new Konva.Ring({
            x: tablePos[0],
            y: tablePos[1],
            innerRadius: this.tableBaseSize * 3 / 24,
            outerRadius: this.tableBaseSize * 7 / 24,
            fill: '#03A9F4',
            stroke: '#0288D1',
            strokeWidth: 3
          })
          this.tableGroup.add(tableKonva)
          const tableText = new Konva.Text({
            x: tablePos[0],
            y: tablePos[1],
            fontSize: 18,
            text: table.order_num,
            fill: 'green'
          })
          tableText.offsetX(tableText.width() / 2)
          tableText.offsetY(tableText.height() / 2)
          this.tableGroup.add(tableText)
          const disabledNum = Math.min((table.choseNum || 0), table.sum)
          const chooseType = this.chooseType
          var choseNum = 0
          if (this.choseSeats.length > 0) {
            if (chooseType === 'single') {
              if (this.choseSeats[0] === table.id) {
                choseNum = 1
              }
            } else {
              this.choseSeats.map(item => {
                item === table.id && choseNum++
              })
            }
            choseNum = Math.min(table.sum - disabledNum, choseNum)
          }
          while (seatsSum > 0) {
            const seatPos = this.getSeatPos(seatsSum, table.sum, tablePos)
            this.positions[table.id]['seatsPos'].push(seatPos)
            if (chooseType) {
              if ((seatsSum - disabledNum) <= 0) {
                this.drawDisabledSeat(seatPos, table)
              } else {
                if (choseNum) {
                  this.drawChoseSeat(seatPos, table)
                  choseNum--
                } else {
                  this.drawVoidSeat(seatPos, table)
                }
              }
            } else {
              this.drawVoidSeat(seatPos, table)
            }
            seatsSum--
          }
        } else {

        }
        this.layer.add(this.seatGroup)
        this.layer.add(this.tableGroup)
      })

      this.stage.add(this.layer)
    },
    getPeopleSeatColor(booking) {
      if (!booking) booking = [false, false, false]
      const b = booking[0]
      const l = booking[1]
      const s = booking[2]
      var stroke = this.colors.breakfast
      var strokeWidth = 4
      if (!b && !l && !s) {
        return {
        //   fillLinearGradientStartPoint: { x: -60, y: 0 },
        //   fillLinearGradientEndPoint: { x: 60, y: 0 },
        //   fillLinearGradientColorStops: [0, '#fff', 0.48, '#fff', 0.48, this.colors.none, 0.52, this.colors.none, 0.52, '#fff', 1, '#fff'],
          fill: this.colors.none,
          stroke: this.colors.none,
          strokeWidth: 4
        }
      } else {
        if (!b) strokeWidth = 0
        if (l && s) {
          return {
            fillLinearGradientStartPoint: { x: -50, y: -50 },
            fillLinearGradientEndPoint: { x: 50, y: 50 },
            fillLinearGradientColorStops: [0, this.colors.lunch, 0.5, this.colors.lunch, 0.5, this.colors.supper, 1, this.colors.supper],
            stroke,
            strokeWidth
          }
        }
        if (l || s) {
          return {
            fill: l ? this.colors.lunch : this.colors.supper,
            stroke,
            strokeWidth
          }
        }
        if (!l && !s) {
          // todo 只定了早餐的，应不暂位或统一移至特定的餐桌放置，待考虑
          return {
            fill: '#ccc',
            stroke,
            strokeWidth: 4
          }
        }
      }
    },
    updatePeople(people) {
      this.peopleGroup.destroy()
      if (people && this._.isArray(people) && people.length > 0) {
        this._.forEach(people, one => {
          this.drawPeople(one)
        })
      }
      this.layer.add(this.peopleGroup)
      this.layer.draw()
    },
    drawPeople(one) {
      if (!one) return false
      const id = one.id
      const tableId = one.tableId
      const booking = one.booking
      const count = this.positions[tableId]['count']
      if (!count) return false
      const pos = this.positions[tableId]['seatsPos'][count - 1]
      const peopleSeat = new Konva.Circle({
        _peopleData: one,
        _id: id,
        x: pos[0],
        y: pos[1],
        radius: this.tableBaseSize * 3 / 48,
        ...this.getPeopleSeatColor(booking)
      })
      this.peopleGroup.add(peopleSeat)
      this.positions[tableId]['count']--
    },
    singleClick(evt) {
      var shape = evt.target
      if (shape.attrs._type !== 'void') return false
      var group = evt.currentTarget
      group.children && group.children.map((item) => {
        item.attrs._type === 'void' && item.fill(this.seatColors.void)
      })
      shape.fill(this.seatColors.chose)
      group.draw()
      const choseTableIds = []
      choseTableIds.push(shape.attrs._tableData.id)
      this.$emit('change', choseTableIds)
    },
    multipleClick(evt) {
      var shape = evt.target
      if (shape.attrs._type !== 'void') return false
      var group = evt.currentTarget
      const fill = shape.attrs.fill === this.seatColors.chose ? this.seatColors.void : this.seatColors.chose
      shape.fill(fill)
      const choseTableIds = []
      group.children && group.children.map((item) => {
        item.attrs._type === 'void' && item.fill(this.seatColors.void)
        if (item.attrs._type === 'void' && item.fill === this.seatColors.chose) {
          choseTableIds.push(item.attrs._tableData.id)
        }
      })
      group.draw()
      this.$emit('change', choseTableIds)
    },
    clearChoseSeat() {
      this.seatGroup.children && this.seatGroup.children.map((item) => {
        item.attrs._type === 'void' && item.fill(this.seatColors.void)
      })
      this.seatGroup.draw()
    }
  },
  created() {
  },
  mounted() {
    this.drawTable()
    if (this.chooseType === 'single') { // 单选状态下 给voidseat加载选中选中事件
      this.layer.on('click', 'Group', this.singleClick)
    } else if (this.chooseType === 'multiple') { // 多选状态下 给voidseat加载选中选中事件
      this.layer.on('click', 'Group', this.multipleClick)
    } else if (!this.chooseType) { // 在非选择状态下，才绘制人员圈圈
      this.updatePeople(this.peopleData)
    }
    this.$emit('load-cb', true)
  }
}
</script>

<style scoped lang="scss">
</style>
