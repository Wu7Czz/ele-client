<template>
  <div class="class-tree-select">
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
      this.$emit('select', data.data)
    }
  },
  created() {
  },
  mounted() {
    this.items = this.gradeData.map(grade => {
      const newObject = {}
      newObject.text = grade.gradeName
      const classlist = this.classData[grade.gradeId] || []
      if (classlist.length === 0) {
        newObject.children = []
      } else {
        this.classId = classlist[0].classId
        newObject.children = classlist.map(i => {
          return {
            text: i.className,
            id: i.classId,
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
