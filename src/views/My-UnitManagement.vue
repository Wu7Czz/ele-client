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
      <div class="class-view" v-else-if="classify === 'class'">
        <van-cell-group>
          <van-cell
              v-for="(item) in list"
              :key="item._id"
              title-class="cell-title"
            >
            <template slot="title">
              <i>{{item.gradeName}}</i>
              <span></span>
              <span class="name">{{item.name}}</span>
              <span class="button-group">
                <van-button round size="small" type="primary">编辑</van-button>
                <van-button round size="small" type="danger" @click="delte(item)">删除</van-button>
              </span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="grade-view" v-else>
        <van-cell-group>
          <van-cell
              v-for="(item, index) in list"
              :key="item._id"
              title-class="cell-title"
            >
            <template slot="title">
              <i>{{index + 1 + '. '}}</i>
              <span></span>
              <span class="name">{{item.name}}</span>
              <span class="button-group">
                <van-button round size="small" type="primary">编辑</van-button>
                <van-button round size="small" type="danger" @click="delte(item)">删除</van-button>
              </span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <van-popup v-model="showAdd" position="bottom">
          <div v-if="classify === 'student'"></div>
          <AddClass
            v-else-if="classify === 'class'"
            @cancel="addCancel"
            @confirm="addConfirm"
          />
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
import { Dialog } from 'vant'
import { mapGetters } from 'vuex'
import AddGrade from '@/components/AddGrade'
// import { httpGetGradeData, httpGetClassData, httpGetStudentData } from '@/api/index'
import { httpDeleteGrade, httpDeleteClass } from '@/api/index'
import AddClass from '@/components/AddClass'
import { setTimeout } from 'timers'
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
  },
  components: {
    AddGrade,
    AddClass
  },
  computed: {
    ...mapGetters([
      'gradeData',
      'classData',
      'studentData'
    ])
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
      this.showAdd = false
      setTimeout(() => {
        this.getData()
      }, 500)
    },
    clickCell(a, b, c) {
    },
    getData(classify) {
      const c = classify || this.classify
      switch (c) {
        case 'student':
          var temp = []
          this._.forEach(this.studentData, i => {
            temp = [...temp, ...i]
          })
          this.list = temp
          break
        case 'class':
          this.list = [...this.classData]
          break
        default:
          this.list = [...this.gradeData]
          break
      }
    },
    delte(item) {
      if (!item || !item._id) return false
      var methods
      var dispatch
      switch (this.classify) {
        case 'student':
          break
        case 'class':
          dispatch = 'GetClassData'
          methods = httpDeleteClass
          break
        default:
          dispatch = 'GetGradeData'
          methods = httpDeleteGrade
          break
      }
      const beforeClose = (action, done) => {
        if (action === 'confirm') {
          methods(item._id).then(res => {
            this.$store.dispatch(dispatch)
            setTimeout(() => {
              this.getData()
            }, 500)
            done()
          }, () => {
            done()
            this.$toast('删除失败！')
          })
        } else {
          done()
        }
      }
      Dialog.confirm({
        title: '提示',
        message: `确认删除[${item.name}]`,
        beforeClose
      })
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
.van-cell:nth-child(odd){
  background: #eee;
}
.cell-title{
  display: flex;
  justify-content: space-between;
  &> span{
    display: inline-block;
    text-align: center;
    flex: 1;
    &.button-group{
      text-align: right;
      &>button{
        margin-left: 4px;
      }
    }
  }
}
</style>
<style scoped>
</style>

