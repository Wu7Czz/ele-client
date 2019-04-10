<template>
  <div class="add-peoploe">
    <van-nav-bar
      title="人员列表"
      left-text="返回"
      right-text="添加"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AddPeople',
  props: {
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'colors'
    ])
  },
  watch: {
  },
  methods: {
    onClickLeft() {
      this.$emit('close')
    },
    onClickRight() {
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
