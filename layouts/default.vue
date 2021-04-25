<template>
  <v-app>

    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click="loading()"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-spacer/>

      <div v-if="$auth.loggedIn">
        <v-btn color="primary">
          chào {{ $auth.user.name }}
        </v-btn>
        <v-btn
          color="red "
          @click.stop="$auth.logout()">
          <v-icon>
            mdi-login-variant
          </v-icon>
          Logout
        </v-btn>
      </div>
      <div v-else>
        <v-btn
          color="primary"
          to="/login">
          <v-icon>
            mdi-login-variant
          </v-icon>
          Login
        </v-btn>

        <v-btn
          color="orange"
          @click.stop="openRegisterForm=true">
          <v-icon>
            mdi-account-plus
          </v-icon>
          Register
        </v-btn>
        <RegisterComponent v-model="openRegisterForm"/>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';

export default {

  data() {
    return {
      clipped: false,
      fixed: false,
      openLoginForm: false,
      openRegisterForm: false,

      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        },
        {
          icon: 'mdi-account',
          title: 'User',
          to: '/user'
        },
        {
          icon: 'mdi-account-tie',
          title: 'Admin',
          to: '/admin'
        },
        {
          icon: 'mdi-cart',
          title: 'Product',
          to: '/product'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'Vuetify.js'
    }
  },
  computed: {
    ...mapGetters(['authenticate/isAuthenticated', 'authenticate/loggedInUser'])
  },
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
    },
    async loading() {
      let loader = this.$loading.show({
        canCancel: true,
        onCancel: this.onCancel,
      });
      // simulate AJAX
      await setTimeout(() => {
        loader.hide()
      }, 2000);
    }
  },
}
</script>

<style>
.body-user  {
  font-size: 3rem;
  color: red;
}
</style>
