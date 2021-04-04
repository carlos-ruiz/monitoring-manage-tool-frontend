<template>
  <v-app>
    <v-app-bar app color="primary" dark clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        <h3
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          width="100"
        >
          PITA - Control interno
        </h3>
      </div>
    </v-app-bar>
    <menu-bar :drawer="drawer" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import http from '@/http-common.js'
import MenuBar from '@/components/MenuBar'

export default {
  name: 'App',

  components: {MenuBar},

  data: () => ({
    drawer: false
  }),

  created() {
    http.get('pts/').then((response) => {
      if (response.status == 200) {
        console.log(response.data)
      }
    })
  }
}
</script>
