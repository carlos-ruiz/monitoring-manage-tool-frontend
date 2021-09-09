<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar..."
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="pts"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>PTs</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo PT
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-form v-model="formValid">
                    <v-row>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field
                          v-model="editedItem.vpn"
                          label="VPN"
                          :rules="[...rules.required, ...rules.numeric]"
                          required
                          :disabled="editedIndex>=0"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nombre"
                          :rules="rules.required"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field
                          v-model="editedItem.hostgroup"
                          label="Hostgroup"
                          :rules="[...rules.required, ...rules.hostgroup]"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="6">
                        <v-text-field
                          v-model="editedItem.nagios_ip"
                          label="Nagios IP"
                          :rules="[...rules.required, ...rules.ip]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                  :disabled="!formValid"
                  >Guardar</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >¿Estás seguro que quieres eliminar el PT {{ editedItem.vpn }} -
                {{ editedItem.name }}?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="loadPTs"> Incializar </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import http from "@/http-common.js";
export default {
  name: "PTsList",
  data: () => ({
    headers: [
      { text: "VPN", value: "vpn" },
      { text: "Nombre", value: "name" },
      { text: "Hostgroup", value: "hostgroup" },
      { text: "Nagios IP", value: "nagios_ip" },
      { text: "Acciones", value: "actions" },
    ],
    search: "",
    pts: [],

    dialog: false,
    dialogDelete: false,
    editedIndex: -1,
    editedItem: {
      vpn: "",
      name: "",
      hostgroup: "",
      nagios_ip: "",
    },
    defaultItem: {
      vpn: "",
      name: "",
      hostgroup: "",
      nagios_ip: "",
    },
    rules: {
      required: [(value) => !!value || "El campo es obligatorio"],
      numeric: [
        (value) => /^[0-9]+$/.test(value) || "Debe ser un campo numérico",
      ],
      ip: [
        (value) =>
          /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/.test(
            value
          ) || "Escribe una IP válida",
      ],
      hostgroup: [value => /^[0-9]+(_)+[a-zA-Z0-9]+([_a-zA-Z0-9]*[a-zA-Z0-9]+)*$/.test(value) || "Escribe un hostgroup válido"]
    },
    formValid: false,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo PT" : "Editar PT";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.loadPTs();
  },

  methods: {
    loadPTs() {
      http.get("pts/").then((response) => {
        if (response.status == 200) {
          this.pts = response.data;
        }
      });
    },

    editItem(item) {
      this.editedIndex = this.pts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.pts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteItemAPI();
    },

    deleteItemAPI() {
      http
        .delete("pts/remove", { data: { vpn: this.editedItem.vpn } })
        .then((response) => {
          if (response.status == 200) {
            console.log("PT borrado");
            this.pts.splice(this.editedIndex, 1);
          } else {
            console.error("Ocurrio un error al eliminar el PT");
          }
        })
        .catch((error) => {
          alert("No se pudo borrar el PT ");
          console.error(error);
        })
        .finally(() => {
          this.closeDelete();
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.editItemAPI();
      } else {
        this.addItemAPI();
      }
    },

    editItemAPI() {
      http
        .put("pts/edit/", {
          vpn: this.editedItem.vpn,
          new: this.editedItem,
        })
        .then((response) => {
          if (response.status == 200) {
            console.log("PT Actualizado");
            Object.assign(this.pts[this.editedIndex], response.data);
          }
        })
        .catch((error) => {
          console.error("Error al actualizar el PT", error);
        })
        .finally(() => {
          this.close();
        });
    },

    addItemAPI() {
      http
        .post("pts/add/", this.editedItem)
        .then((response) => {
          if (response.status == 200) {
            console.log("PT agregado");
            this.pts.push(response.data);
          }
        })
        .catch((error) => {
          alert("Ocurrio un error al agregar el PT");
          console.error("Fallo al crear el PT", error);
        })
        .finally(() => {
          this.close();
        });
    },
  },
};
</script>

<style></style>
