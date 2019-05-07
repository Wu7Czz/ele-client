<template>
  <transition name="slide">
    <div class="my-unit-m">
      <van-nav-bar
        left-arrow
        @click-left="onClickLeft"
        :title="titles[this.classify]"
        fixed
      />
      <div class="operation">
        <van-button type="info" round @click="showAdd=true" >新 增</van-button>
      </div>
      <div class="student-view" v-if="classify === 'student'"></div>
      <div class="class-view" v-else-if="classify === 'class'"></div>
      <div class="grade-view" v-else>
        <van-cell-group>
          <van-cell
              v-for="item in list"
              :key="item._id"
              :title="item.name"
            />
        </van-cell-group>
      </div>
      <van-popup v-model="showAdd">
          <div v-if="classify === 'student'"></div>
          <div v-else-if="classify === 'class'"></div>
          <AddGrade
            v-else
            @cancel="addCancel"
            @confirm="addConfirm"
          />
      </van-popup>
    </div>
  </transition>
</template>

<script>
import { httpGetGradeData, httpGetClassData, httpGetStudentData } from '@/api/index'
import AddGrade from '@/components/AddGrade'
export default {
  name: 'MyUnitM',
  data() {
    return {
      list: [],
      classify: 'grade',
      showAdd: false,
      titles: {
        'student': '学生管理',
        'class': '班级管理',
        'grade': '年级管理'
      }
    }
  },
  watch: {
    // '$router'() {
    //   this.list = []
    //   this.classify = this.$route.params.classify
    //   this.getData(this.classify)
    // }
  },
  components: {
    AddGrade
  },
  computed: {
  },
  activated() {
    this.list = []
    this.classify = this.$route.params.classify
    this.getData(this.classify)
  },
  methods: {
    onClickLeft() {
      this.$router.push('/my')
    },
    addCancel() {
      this.showAdd = false
    },
    addConfirm(val) {
      console.log(val)
      this.showAdd = false
      this.getData(this.classify)
    },
    getData(classify) {
      const c = classify || this.classify
      switch (c) {
        case 'student':
          httpGetStudentData().then(res => {
            this.list = res.data
          })
          break
        case 'class':
          httpGetClassData().then(res => {
            this.list = res.data
          })
          break
        default:
          httpGetGradeData().then(res => {
            this.list = res.data
          })
          break
      }
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.my-unit-m{
  height: 100%;
  background: #fff;
  padding-top: 50px;
}
.slide-enter-active, .slide-leave-active{
  transition: all 0.3s
}

.slide-enter, .slide-leave-to{
  transform: translate3d(100%, 0, 0)
}
.operation{
  padding: 2px  4px 4px;
  &> *{
    margin: 2px 4px;
  }
}
</style>
<style scoped>
</style>

