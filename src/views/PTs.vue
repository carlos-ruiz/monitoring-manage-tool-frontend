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
      <v-tooltip>
        <template v-slot:activator="{on, attrs}">
          <v-btn
            v-bind="attrs"
            v-on="on"
            depressed
            color="primary"
            @click.native="download_template()"
          >
            <v-icon style="color:white;">mdi-magnify</v-icon>
          </v-btn>
        </template>
        <span>Buscar</span>
      </v-tooltip>
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
    },
    download_template() {
      http
        .post('cfgs/download_template/', {responseType: 'blob'})
        .then((response) => {
          if (response.status == 200) {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]))
            var fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', 'template.csv')
            document.body.appendChild(fileLink)
            fileLink.click()
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
