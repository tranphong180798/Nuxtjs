<template>
  <h1>{{ post.title }}</h1>
</template>

<script>
export default {
name: "hello",
  async asyncData ({ $axios, params }) {
    const  post  = await $axios.$get(`https://api.nuxtjs.dev/posts/${params.id}`)
    return { post }
  }
}
</script>

<style scoped>

</style>
