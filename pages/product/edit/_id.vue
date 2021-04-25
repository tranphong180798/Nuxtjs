<template>
<div>
  <nuxt-link :to="{ name: 'product' }">
    <v-btn
      depressed
      color="primary"
    >
      Back
    </v-btn>
  </nuxt-link>
  <h1>Edit page</h1>
</div>
</template>

<script>
export default {
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
name: "_id"
}
</script>

<style scoped>

</style>
