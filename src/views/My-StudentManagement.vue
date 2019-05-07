<template>
  <div class="My-student-m">
    <van-cell title="添加学生" left is-link @click="showAddStudent"/>
    <van-popup v-model="addStudent" position="right" v-if="addStudent">
      <AddStudent
        @cancel="onAddStudentCancel"
        @confirm="onAddStudentConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import AddStudent from '@/components/AddStudent'
export default {
  name: 'MyStudentM',
  data() {
    return {
      baseInfo: {
      },
      addStudent: false
    }
  },
  components: {
    AddStudent
  },
  computed: {
  },
  methods: {
    showAddStudent() {
      this.addStudent = true
    },
    onAddStudentCancel() {
      this.addStudent = false
    },
    onAddStudentConfirm() {
      this.addStudent = false
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>

</style>
<style scoped>

</style>

