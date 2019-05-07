<template>
  <div class="my">
    <van-cell-group>
      <van-cell title="学生管理" is-link to="/my/unitm/student" />
      <van-cell title="班级管理" is-link to="/my/unitm/class" />
      <van-cell title="年级管理" is-link to="/my/unitm/grade" />
    </van-cell-group>
    <keep-alive>
      <router-view class="router-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'My',
  data() {
    return {
    }
  },
  components: {
  },
  computed: {
  },
  methods: {

  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
.my{
  height: 100%;
  position: relative;
}
.router-view{
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
<style scoped>

</style>

