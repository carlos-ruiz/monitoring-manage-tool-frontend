<template>
  <v-navigation-drawer app clipped v-model="drawer">
    <v-list nav dense>
      <div v-for="(item, i) in menus" :key="i">
        <v-list-group
          v-if="item.submenus"
          active-class="blue--text text--accent-4"
        >
          <v-icon slot="prependIcon">{{ item.icon }}</v-icon>
          <template v-slot:activator>
            <v-list-item-title class="menu-title">
              {{ item.title }}
            </v-list-item-title>
          </template>
          <v-list-item
            :to="submenu.path"
            v-for="(submenu, i) in item.submenus"
            :key="i"
            link
          >
            <v-list-item-title class="menu-title ml-14">
              {{ submenu.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else link :to="item.path">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </div>
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
    toggleMenu: null,
    menus: [
      {
        title: 'Alta de equipos',
        icon: 'mdi-file-document-edit',
        submenus: [
          {title: 'Generar CFGs', path: '/cfgs/generate'},
          // {title: 'Subir a los nagios', path: '/cfgs/upload'},
          // {title: 'Descargar CFGs', path: '/cfgs/download'},
          {
            title: 'Descargar plantilla',
            path: '/cfgs/download_template'
          }
        ]
      },
      {
        title: 'Puntos Tácticos',
        icon: 'mdi-file-document-edit',
        path: '/pts'
      }
    ]
  }),

  watch: {
    toggleMenu() {
      this.$store.commit('toggleMenu')
    }
  }
}
</script>

<style></style>
