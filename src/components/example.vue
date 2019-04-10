<template>
  <div class="people-list">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PeopleList',
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
  },
  created() {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
</style>
