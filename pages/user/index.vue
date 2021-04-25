<template>
  <v-app>

    <div class="wrapper"></div>
    <div class="marginCom">
      <template>
        <v-toolbar flat color="blue">
          <v-icon>mdi-account</v-icon>
          <v-toolbar-title :class="`font-weight-light ml-5 `">
            List User
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn color="orange darken-3" fab small class="mr-2">
            <nuxt-link to="/product">
              <v-icon> mdi-cart </v-icon>
            </nuxt-link>
          </v-btn>
          <v-dialog v-model="dialogCreate" width="1000">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="orange darken-3"
                fab
                small
                class="mr-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon> mdi-account-multiple-plus </v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="headline blue lighten-2">
                Create New Customer
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="createCustomer.name" label="Name">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="createCustomer.email"
                        label="E-mail"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="createCustomer.age" label="Age">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="createCustomer.street"
                        label="Street"
                      >
                      </v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="createCustomer.company"
                        label="City"
                      >
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="dialogCreate = false"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" @click="createNewCustomer"
                  >Save</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <v-autocomplete
        filled
        rounded
        dense
        :search-input.sync="key"
        background-color="blue lighten-3"
        color="success"
        item-color="red"
        hide-no-data
        hide-selected
        :placeholder="search"
      ></v-autocomplete>

      <v-data-table
        style="background-color: #b3e5fc"
        table
        table-hover
        table-striped
        table-bordered
        :headers="headers"
        :items="listCustomer"
        class="elevation-1 paddingForm my-border"
        :search="key"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            small
            class="mr-2"
            color="orange darken-2"
            @click="editCustomer(item)"
          >
            mdi-pencil
          </v-icon>

          <v-icon
            small
            class="mr-2"
            color="orange darken-2"
            @click="deleteCustomer(item)"
          >
            mdi-delete
          </v-icon>
        </template>

        <template v-slot:item.age="{ item }">
          <v-chip :color="getAge(item.age)" dark>
            {{ item.age }}
          </v-chip>
        </template>

        <template v-slot:item.name="props">
          <v-edit-dialog
            :return-value.sync="props.item.name"
            large
            persistent
            @save="save(props.item)"
            @cancel="cancel"
            @open="open"
          >
            <div>{{ props.item.name }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Update Name</div>
              <v-text-field
                v-model="props.item.name"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogEdit" width="1000">
        <v-card>
          <v-card-title class="headline blue lighten-2">
            Edit Customer
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedCustomer.name" label="Name">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedCustomer.email" label="E-mail">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedCustomer.age" label="Age">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedCustomer.street" label="Street">
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedCustomer.company" label="City">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="dialogEdit = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" @click="saveEditCustomer">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" width="1000">
        <v-card>
          <v-card-title class="headline blue lighten-2">
            Are you sure you want to delete this item?
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedCustomer.name"
                    label="Name"
                    disabled
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedCustomer.email"
                    label="E-mail"
                    disabled
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedCustomer.age"
                    label="Age"
                    disabled
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedCustomer.street"
                    label="Street"
                    disabled
                  >
                  </v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="editedCustomer.company"
                    label="City"
                    disabled
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" @click="dialogDelete = false"
              >Cancel</v-btn
            >
            <v-btn color="blue darken-1" @click="saveDeleteCustomer">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDeleteFail" width="1000">
        <v-card>
          <v-card-title class="headline red lighten-2">
            Can't delete customer older than 50 years old
          </v-card-title>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import listUser from "../../api/user.json";
import axios from "axios";
export default {


  head() {
    return {
      title: "user",
      htmlAttrs: {
        lang: "vi",
      },
    };
  },
  name: "index",

  auth: true,
  asyncData() {
    return axios.get("http://127.0.0.1:8000/api/listUser").then((res) => {
      return { listCustomer: res.data };
    });
  },
  data() {
    return {
      headers: [
        { text: "Id", value: "id", class: "blue darken-4", align: "center" },
        {
          text: "Name",
          value: "name",
          class: "blue darken-4",
          align: "center",
        },
        { text: "Age", value: "age", class: "blue darken-3", align: "center" },
        {
          text: "Email",
          value: "email",
          class: "blue darken-2",
          align: "center",
        },
        {
          text: "Street",
          value: "street",
          class: "blue darken-1",
          align: "center",
        },
        {
          text: "Company",
          value: "company",
          class: "blue lighten-1",
          align: "center",
        },
        {
          text: "Action",
          value: "actions",
          class: "blue lighten-2",
          align: "center",
        },
      ],
      key: "",
      search: "Enter key search",
      max25chars: (v) => v.length <= 25 || "Input too long!",
      snack: false,
      snackColor: "",
      snackText: "",
      checkEdit: false,
      snackColorEdit: "success",
      checkDelete: false,
      snackColorDelete: "red",
      dialogCreate: false,
      dialogEdit: false,
      dialogDelete: false,
      dialogDeleteFail: false,
      loading: false,
      createCustomer: {
        id: "",
        name: "",
        password: "",
        email: "",
        age: "",
        street: "",
        company: "",
      },
      editedIndex: -1,
      editedCustomer: {
        id: "",
        name: "",
        password: "",
        email: "",
        age: "",
        street: "",
        company: "",
      },
      // listCustomer:[]
    };
  },
  // asyncData(context, callback) {
  //   setTimeout(() => {
  //     callback(null, {
  //       listCustomer: listUser,
  //     });
  //   }, 3000);
  //   // const listCustomer= await context.$axios.$
  //   // console.log('1');
  // //  const listCustomer = context.$axios.console.log(context);
  // },

  // created: function()
  // {
  //   console.log('1');
  //     this.listCustomer=listUser;
  // },

  loading: false,
  methods: {

    async fetchItems(){

          this.listCustomer = await fetch(
            'http://localhost:8000/api/listUser'
          ).then(res => res.json())

    },

    getAge(age) {
      if (age > 800) return "red";
      else if (age > 700) return "orange";
      else if (age > 600) return "pink";
      else if (age > 300) return "blue";
      else if (age > 100) return "grey";
      else return "green";
    },
    save(value) {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    deleteItem(id) {
      this.listCustomer.splice(id, 1);
      //  this.$axios.delete(uri);
      this.checkDelete = true;
    },
    createNewCustomer() {
      this.listCustomer.push(this.createCustomer);
      this.closeDialogCreate();
      this.checkCreate = true;
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    closeDialogCreate() {
      this.dialogCreate = false;
      this.createCustomer = {
        id: "",
        name: "",
        password: "",
        email: "",
        age: "",
        street: "",
        company: "",
      };
    },
    editCustomer(customer) {
      this.editedIndex = this.listCustomer.indexOf(customer);
      this.editedCustomer = Object.assign({}, customer);

      this.dialogEdit = true;
    },

    deleteCustomer(customer) {
      this.editedIndex = this.listCustomer.indexOf(customer);
      this.editedCustomer = Object.assign({}, customer);
      this.dialogDelete = true;
    },
    saveEditCustomer() {

      this.$axios
        .post(
          "http://127.0.0.1:8000/api/updateUser/" + this.editedCustomer.id,
          this.editedCustomer
        )
        .then((response) => {
          this.dialogEdit = false;
          this.fetchItems();
          this.checkEdit = true;
        });
    },
    saveDeleteCustomer() {
      if (this.editedCustomer.age > 50) {
        this.dialogDelete = false;
        this.dialogDeleteFail = true;
      } else {
        this.$axios
          .post(
            "http://127.0.0.1:8000/api/deleteUser/" + this.editedCustomer.id
          )
          .then((response) => {
            this.fetchItems();
            this.dialogDelete = false;
            this.checkDelete = true;
          });
        //   this.listCustomer.splice(this.editedCustomer.id - 1, 1);
      }
    },
    loadingComponents() {

      let loader = this.$loading.show({
        canCancel: true,
        onCancel: this.onCancel,
      });
      // simulate AJAX
      setTimeout(() => {
        loader.hide();
      }, 2000);
    },
  },
};
</script>

<style scoped>
.wrapper {
  background-image: url("../../assets/daiphong.jpg");

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

.paddingForm {
  text-align: center;
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
.body-user  {
  font-size: 3rem;
  color: red;
}
</style>
