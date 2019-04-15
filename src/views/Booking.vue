<template>
  <div class="booking">
    <van-cell-group>
      <van-field
        v-model="studentInfo.name"
        readonly
        label="姓名"
      >
        <van-button slot="button" size="small" type="info" round @click="selectStudent">选择</van-button>
      </van-field>
      <van-field
        :value="studentInfo.gradeName + '-' +studentInfo.className"
        label="班级"
      />
    </van-cell-group>
    <BespeakMeal
    class="bespealk-meal"
      :student-info="studentInfo"
      @cancel="onBespeakCancel"
      @confirm="onBespeakConfirm"
    />
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
import StudentPicker from '@/components/StudentPicker'
import BespeakMeal from '@/components/BespeakMeal'
export default {
  name: 'Booking',
  data() {
    return {
      studentInfo: {
        name: '',
        gradeName: '',
        className: ''
      },
      showAdd: false,
      showSelect: false
    }
  },
  components: {
    StudentPicker,
    BespeakMeal
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
      val ? this.studentInfo = val : ''
    },
    onBespeakCancel() {
    },
    onBespeakConfirm(val) {
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.booking{
  height: 100%;
  display: flex;
  flex-direction: column;
  .bespealk-meal{
    flex:1;
  }
}
.van-button + .van-button {
  margin-left: 10px;
}
</style>
<style scoped>
.booking >>> .van-cell__title.van-field__label {
  line-height: 30px;
}
</style>

