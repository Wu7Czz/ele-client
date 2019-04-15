<template>
  <div class="add-peoploe">
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
        label="姓名"
      >
      </van-field>
      <van-field
        :value="baseInfo.gradeName"
        label="年级"
        @click="showSelect"
        readonly
      >
      </van-field>
      <van-field
        :value="baseInfo.className"
        label="班级"
        @click="showSelect"
        readonly
      />
    </van-cell-group>
    <van-popup v-model="showList" position="bottom" :close-on-click-overlay="false">
      <ClassTreeSelect
        @confirm="onSelectConfirm"
        @cancel="onSelectCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ClassTreeSelect from '@/components/ClassTreeSelect'
export default {
  name: 'AddStudent',
  props: {
  },
  data() {
    return {
      baseInfo: {},
      showList: false
    }
  },
  computed: {
    ...mapGetters([
      'colors'
    ])
  },
  watch: {
  },
  components: {
    ClassTreeSelect
  },
  methods: {
    onClickLeft() {
      this.$emit('cancel')
    },
    onClickRight() {
      // 待加入后台接口
      this.$emit('confirm')
    },
    showSelect() {
      this.showList = true
    },
    onSelectConfirm(val) {
      this.showList = false
      const name = this.baseInfo.name || ''
      this.baseInfo = {
        name,
        ...val
      }
      console.log()
    },
    onSelectCancel() {
      this.showList = false
    }

  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">

</style>
