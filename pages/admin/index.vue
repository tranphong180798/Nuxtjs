<template>
  <div>
  <h1>Admin Page</h1>
  <p>Visits:<v-chip color="primary">{{ this.$store.state.analytics.pageVisits }}</v-chip> </p>
  </div>
</template>

<script>
export default {
  middleware({ store }) {
    store.commit('analytics/increment')
  },
  name: "index",
  auth: 'admin',
  head() {
    return {

      title: 'admin-page',
      htmlAttrs: {
        lang: 'vi'
      },
    }
  },
}
</script>

<style scoped>

</style>
