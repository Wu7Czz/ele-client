<template>
  <div class="class-tree-select">
    <van-nav-bar
      title="选择班级"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tree-select
      :items="items"
      :main-active-index="gradeIndex"
      :active-id="classId"
      @navclick="onGradeClick"
      @itemclick="onClassClick"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ClassTreeSelect',
  props: {
  },
  data() {
    return {
      items: [
        {
        // 导航名称
          text: '所有城市',
          // 该导航下所有的可选项
          children: [
            {
            // 名称
              text: '温州',
              // id，作为匹配选中状态的标识
              id: 1
            },
            {
              text: '杭州',
              id: 2
            }
          ]
        }
      ],
      // 左侧高亮元素的index
      gradeIndex: 0,
      // 被选中元素的id
      classId: 0
    }
  },
  computed: {
    ...mapGetters([
      'gradeData',
      'classData'
    ])
  },
  watch: {
  },
  methods: {
    onGradeClick(index) {
      this.gradeIndex = index
    },
    onClassClick(data) {
      this.classId = data.id
      this.$emit('confirm', data.data)
    },
    onClickLeft() {
      this.$emit('cancel')
    }
  },
  created() {
  },
  mounted() {
    this.items = this.gradeData.map(grade => {
      const newObject = {}
      newObject.text = grade.name
      const classlist = this.classData.map(item => item.gradeId === grade._id)
      if (classlist.length === 0) {
        newObject.children = []
      } else {
        this.classId = classlist[0]._id
        newObject.children = classlist.map(i => {
          return {
            text: i.className,
            id: i._id,
            data: i
          }
        })
      }
      return newObject
    })
  }
}
</script>

<style scoped lang="scss">
</style>
