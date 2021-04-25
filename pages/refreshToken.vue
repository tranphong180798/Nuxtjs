<template>
  <section class="section">
    <div class="container">
      <h2 class="title">My Profile</h2>
      <div class="content">
        <p>

          <strong>Name:</strong>
          {{ loggedInUser.name }}
        </p>
        <p>
          <strong>Email:</strong>
          {{ loggedInUser.email }}
        </p>

        <v-btn @click="tokenRefresh" color="primary">Click me</v-btn>

      </div>
      <div>
        {{ token }}
      </div>

    </div>
  </section>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  middleware: 'auth',
  data() {
    return {
      token: this.$auth.strategy.token.get()
    }
  },
  computed: {
    ...mapGetters(['loggedInUser', 'isAuthenticated']),


  },

  methods: {

    tokenRefresh() {

      this.$auth.refreshTokens();
      this.token = this.$auth.strategy.token.get();
    }
  },


}
</script>
