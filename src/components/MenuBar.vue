<template>
  <v-navigation-drawer app clipped v-model="drawer">
    <v-list nav dense>
      <v-list-item-group
        v-model="group"
        active-class="deep-purple--text text--accent-4"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Alta de nuevos equipos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Alta de nuevos equipos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Alta de nuevos equipos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MenuBar',
  props: {
    drawer: Boolean
  },
  data: () => ({
    group: null,
    menus: [
      {
        title: 'Alta de equipos',
        icon: 'mdi-file-document-edit',
        submenus: [
          {title: 'Generar CFGs', path: 'cfgs/generar'},
          {title: 'Subir a los nagios', path: 'cfgs/subir'},
          {title: 'Descargar CFGs', path: 'cfgs/download'}
        ]
      }
    ]
  }),

  watch: {
    group() {
      this.drawer = false
    }
  }
}
</script>

<style></style>
