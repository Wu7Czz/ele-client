<template>
  <div class="student-picker">
      <van-picker
        show-toolbar
        ref="picker"
        :columns="columns"
        @cancel="onCancel"
        @change="onListChange"
        @confirm="onListConfirm"
      />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'StudentPiker',
  props: {
    studentsColumns: {
      type: Array,
      default() {
        return []
      }
    },
    isOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [],
      gradeList: [],
      classList: {
      },
      studentList: {},
      choosedStudent: null,
      isFristOpen: true,
      lastValues: []
    }
  },
  computed: {
    ...mapGetters([
      'gradeData',
      'classData',
      'studentData'
    ])
  },
  watch: {
    isOpen: {
      handler(val) {
        if (val) {
          var gradeIndex = 0
          var classIndex = 0
          var studentIndex = 0
          if (!this.isFristOpen) {
            const indexs = this.$refs.picker.getIndexes()
            gradeIndex = indexs[0]
            classIndex = indexs[1]
            studentIndex = indexs[2]
          } else {
            this.isFristOpen = false
          }
          const gradeArray = this.gradeData.map(i => i.name)
          this.classList = this.classData.map(item => item.gradeId === this.gradeData[gradeIndex]._id)
          const classArray = this.classList.map(i => i.className)
          this.studentList = (this.classList.length !== 0 ? this.studentData[this.classList[classIndex]._id] : []) || []
          const studentArray = this.studentList.map(i => i.name)
          this.lastValues = [gradeArray[gradeIndex], classArray[classIndex], studentArray[studentIndex]]
          this.choosedStudent = this._.cloneDeep(this.studentList[studentIndex])
          this.columns = [
            {
              values: gradeArray,
              className: 'grade',
              defaultIndex: gradeIndex
            },
            {
              values: classArray,
              className: 'class',
              defaultIndex: classIndex
            },
            {
              values: studentArray,
              className: 'student',
              defaultIndex: studentIndex
            }
          ]
        }
      },
      immediate: true
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onListConfirm() {
      this.$emit('confirm', this.choosedStudent)
    },
    onListChange(picker, values) {
      var studentArray = []
      if (this.lastValues[0] !== values[0]) {
        const gradeIndex = picker.getColumnIndex(0)
        this.classList = this.classData.map(item => item.gradeId === this.gradeData[gradeIndex]._id)
        const classArray = this.classList.map(i => i.className) || []
        this.studentList = this.classList.length === 0 ? [] : this.studentData[this.classList[0]._id]
        studentArray = this.studentList.map(i => i.name) || []
        picker.setColumnValues(1, classArray)
        picker.setColumnValues(2, studentArray)
      } else if (this.lastValues[1] !== values[1]) {
        const classIndex = picker.getColumnIndex(1)
        this.studentList = this.studentData[this.classList[classIndex]._id] || []
        studentArray = this.studentList.map(i => i.name) || []
        picker.setColumnValues(2, studentArray)
      }
      this.choosedStudent = this.studentList.length === 0 ? undefined : this._.cloneDeep(this.studentList[picker.getColumnIndex(2)])
      this.lastValues = values
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.student-picker{
  height: 100%;
  width: 100%;
}
</style>
