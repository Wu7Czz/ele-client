<template>
  <div class="my-unit-m">
    {{classify}}
  </div>
</template>

<script>
export default {
  name: 'MyUnitM',
  data() {
    return {
      classify: 'fafd'
    }
  },
  watch: {
    '$route'() {
      this.classify = this.$route.params.classify
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

</style>
<style scoped>

</style>

