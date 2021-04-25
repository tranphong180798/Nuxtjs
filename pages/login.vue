<template>
  <v-app>
    <div class="wrapper"></div>
    <v-main class="marginCom">
      <LoginComponent/>
    </v-main>

  </v-app>

</template>

<script>
export default {
  name: "login"
}
</script>

<style scoped>
.wrapper {
  background-image: url("../assets/daiphong.jpg");

  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.marginCom {
  margin-top: 2.5%;
  margin-bottom: 2.5%;
  position: absolute;
  width: 100%;
}
</style>
