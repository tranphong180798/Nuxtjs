<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">Register</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
             <v-col cols="12">
              <v-text-field
                 v-model="name"
                label="Name"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                :rules="emailRules"
                 v-model="email"
                label="Email*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password*"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-col>
             <v-col cols="12">
              <v-text-field
                label="Age"
                v-model="age"
                required
              ></v-text-field>
            </v-col>
             <v-col cols="12">
              <v-text-field
                label="Street"
                v-model="street"
                required
              ></v-text-field>
            </v-col>
             <v-col cols="12">
              <v-text-field
                label="Company"
                v-model="company"
                required
              ></v-text-field>
            </v-col>
            <!-- <v-col cols="12">
              <v-text-field
                label="Confirm Password*"
                type="password"
                required
              ></v-text-field>
            </v-col> -->
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>

        <v-spacer></v-spacer>

        <v-btn
          color="blue darken-1"
          text
          @click="show = false"
        >
          Close
        </v-btn>
        <v-btn
          color="red lighten-1"
          text
          @click="registerUser"
        >
          Register
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RegisterComponent",
  auth: false,
  props: {
    value: Boolean,
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
  },
  data() {
    return {
      name:'',
      email: '',
      password: '',
      age:'',
      street:'',
      company:''
     
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    async registerUser(){
      // let user = await this.$store.dispatch('registerUser', registrationInfo);
      console.log( {
          email: this.email,
          password: this.password,
          age: this.age,
          street: this.street,
          company: this.company,
          name: this.name
        })
      await this.$axios.post('register', {
          email: this.email,
          password: this.password,
          age: this.age,
          street: this.street,
          company: this.company,
          name: this.name
        })
      await this.$auth.loginWith('laravelJWT',  {
          data: {
          email: this.email,
          password: this.password,
          age: this.age,
          street: this.street,
          company: this.company
          },
        })
      await this.$router.push('/refreshToken')
     
    }
  }
}
</script>

<style scoped>

</style>
