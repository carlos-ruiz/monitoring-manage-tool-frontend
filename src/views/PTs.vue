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
    ></v-data-table>
  </v-card>
</template>

<script>
import http from '@/http-common.js'
export default {
  name: 'PTsList',
  data: () => ({
    headers: [
      {text: 'VPN', value: 'vpn'},
      {text: 'Nombre', value: 'name'},
      {text: 'Hostgroup', value: 'hostgroup'},
      {text: 'Nagios IP', value: 'nagios_ip'}
    ],
    search: '',
    pts: []
  }),

  methods: {
    loadPTs() {
      http.get('pts/').then((response) => {
        if (response.status == 200) {
          this.pts = response.data
        }
      })
    }
  },

  created() {
    this.loadPTs()
  }
}
</script>

<style></style>
