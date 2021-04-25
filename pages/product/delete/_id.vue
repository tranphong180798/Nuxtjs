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
    <h1>Delete Page</h1>
  </div>
</template>

<script>
export default {
  name: "_id"
}
</script>

<style scoped>

</style>
