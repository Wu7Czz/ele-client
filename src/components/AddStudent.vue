<template>
  <div class="add-peoploe">
    <van-nav-bar
      title="添加"
      left-text="返回"
      right-text="完成"
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
        readonly
      >
      <van-button slot="button" size="small" type="info" round @click="showSelect">选择</van-button>
      </van-field>
      <van-field
        :value="baseInfo.className"
        label="班级"
        readonly
      />
    </van-cell-group>
    <van-popup v-model="showList" position="bottom" :overlay="false">
      <ClassTreeSelect
        @select="onSelectConfirm"
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
