<template>
  <div class="add-grade">
    <van-nav-bar
      title="添加"
      left-text="返回"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell-group>
      <van-field
        v-model="baseInfo.name"
        label="班级"
      >
      </van-field>
      <van-field
        v-model="baseInfo.gradeName"
        label="年级"
        @click="showGrade"
        readonly
      >
      </van-field>
      <van-popup v-model="showGradeList" position="bottom" :close-on-click-overlay="false">
        <van-picker
          :columns="gradeList"
          @confirm="onGradeConfirm"
          @cancel="onGradeCancel"
          :show-toolbar='true'
          title="选择年级"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { httpSaveClass } from '@/api/index'
export default {
  name: 'AddStudent',
  props: {
  },
  data() {
    return {
      baseInfo: {},
      gradeList: [],
      showGradeList: false
    }
  },
  computed: {
    ...mapGetters([
      'gradeData'
    ])
  },
  watch: {
  },
  components: {
  },
  methods: {
    showGrade(show) {
      this.showGradeList = true
      this.gradeList = this.gradeData.map(i => {
        i.text = i.name
        return i
      })
    },
    onClickLeft() {
      this.$emit('cancel')
    },
    onClickRight() {
      httpSaveClass(this.baseInfo).then(res => {
        this.baseInfo = {}
        this.$store.dispatch('GetClassData')
        this.$emit('confirm', res.data)
      }, err => {
        this.baseInfo = {}
        this.$emit('cancel', err)
      })
    },
    onGradeConfirm(grade) {
      this.baseInfo.gradeName = grade.name
      this.baseInfo.gradeId = grade._id
      this.showGradeList = false
    },
    onGradeCancel(index) {
      this.showGradeList = false
    }
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.add-grade{
  padding-bottom: 120px;
}
</style>
