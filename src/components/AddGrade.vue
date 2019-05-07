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
        label="年级"
      >
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { httpSaveGrade } from '@/api/index'
export default {
  name: 'AddStudent',
  props: {
  },
  data() {
    return {
      baseInfo: {}
    }
  },
  computed: {
  },
  watch: {
  },
  components: {
  },
  methods: {
    onClickLeft() {
      this.$emit('cancel')
    },
    onClickRight() {
      httpSaveGrade(this.baseInfo).then(res => {
        this.$emit('confirm', res.data)
      }, err => {
        this.$emit('cancel', err)
      })
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
