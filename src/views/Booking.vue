<template>
  <div class="booking">
    <van-cell-group>
      <van-field
        v-model="baseInfo.name"
        readonly
        label="姓名"
      >
        <van-button slot="button" size="small" type="info" round @click="selectStudent">选择</van-button>
      </van-field>
      <van-field
        :value="baseInfo.gradeName"
        label="年级"
      />
      <van-field
        :value="baseInfo.className"
        label="班级"
      />
    </van-cell-group>
    <van-popup v-model="showSelect" position="bottom">
      <StudentPicker
        :isOpen="showSelect"
        @cancel="onSelectCancel"
        @confirm="onSelectConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StudentPicker from '@/components/StudentPiker'
export default {
  name: 'Booking',
  data() {
    return {
      baseInfo: {
      },
      showAdd: false,
      showSelect: false
    }
  },
  components: {
    StudentPicker
  },
  computed: {
    ...mapGetters([
      'gradeData',
      'classData',
      'studentData'
    ])
  },
  methods: {
    selectStudent() {
      this.showSelect = true
    },
    onSelectCancel() {
      this.showSelect = false
    },
    onSelectConfirm(val) {
      this.showSelect = false
      val ? this.baseInfo = val : ''
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.van-button + .van-button {
  margin-left: 10px;
}
</style>
<style scoped>
.booking >>> .van-cell__title.van-field__label {
  line-height: 30px;
}
</style>

