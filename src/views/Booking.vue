<template>
  <div class="booking">
    <van-cell-group>
      <van-field
        v-model="baseInfo.name"
        readonly
        label="姓名"
      >
        <van-button slot="button" size="small" type="primary" @click="select">选择</van-button>
      </van-field>
    </van-cell-group>
    <van-popup v-model="showList" position="bottom">
      <StudentPicker
        :studentsColumns="studentsColumns"
        :isOpen="showList"
        @cancel="onListCancel"
        @confirm="onListConfirm"
      />
    </van-popup>
    <van-popup v-model="showAdd" position="right">
      <AddPeople
        @close="addClose"
      />
    </van-popup>
  </div>
</template>

<script>
import StudentPicker from '@/components/StudentPiker'
import AddPeople from '@/components/AddPeople'
export default {
  name: 'Booking',
  data() {
    return {
      baseInfo: {
      },
      showAdd: false,
      showList: false,
      studentsColumns: [
      ]
    }
  },
  components: {
    AddPeople,
    StudentPicker
  },
  computed: {

  },
  methods: {
    select() {
      this.showList = true
    },
    onListCancel() {
      this.showList = false
    },
    onListConfirm(val) {
      this.showList = false
      val ? this.baseInfo.name = val.name : ''
    },
    // 添加人员 关闭
    addClose(val) {
      this.showAdd = false
      console.log(val)
    }
  },
  mounted() {

  }
}
</script>
<style lang="sass" scoped>

</style>

