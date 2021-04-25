<template>
  <v-container>
    <Notification :message="error" v-if="error"/>

    <v-card width="800"
            class="elevation-1 paddingForm my-border mt-8 mx-auto"
    >
      <v-card-title class="pb-0 justify-center">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form method="post" @submit.prevent="login" class="px-5">

          <v-text-field
            type="email"
            class="input"
            label="emai"
            name="email"
            v-model="email"
            required
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            prepend-icon="mdi-mail"
          />
          <v-text-field
            type="password"
            class="input"
            name="password"
            label="password"
            :error-messages="passwordErrors"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            prepend-icon="mdi-lock"
            v-model="password"
          />

          <div>
            <v-btn color="primary" type="submit" class="button is-dark is-fullwidth">Log In</v-btn>
            <v-btn class="ml-5 Info" color="error">Cancel</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>


  </v-container>
</template>

<script>
import Notification from '~/components/Notification'
import {validationMixin} from "vuelidate";
import {required, minLength, email} from "vuelidate/lib/validators";


export default {
  mixins: [validationMixin],
  validations: {
    email: {required, email},
    password: {required, minLength: minLength(6)}
  },
  middleware: 'guest',
  components: {
    Notification,

  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength &&
      errors.push("Password must be at least 8 characters long");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    }
  },

  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login() {
      try {
        await this.$auth.loginWith('laravelJWT', {
          data: {
            email: this.email,
            password: this.password
          }
        });
        let loader = this.$loading.show({
          canCancel: true,
          onCancel: this.onCancel,
        });
        // simulate AJAX
        await setTimeout(() => {
          loader.hide()
        }, 2000);
        // await this.$store.dispatch('user/setLoading')
        await this.$router.push('user')
      } catch (e) {
        this.error = e.response.data.message
      }
    },

  }
}
</script>
<style scoped>
.paddingForm {
  text-align: center
}

.my-border {
  border: 1px black;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  text-align: center;
  line-height: 1;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(20px);

}
</style>

