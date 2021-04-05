<template>
  <v-card>
    <v-card-title>Descargar plantilla</v-card-title>
    <v-card-text>
      <p>
        Usar este formato para llenar el archivo con los datos de los equipos de
        los cuales se necesita generar los archivos .cfg
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="download_template()"
        >Descargar plantilla</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import http from '@/http-common.js'

export default {
  name: 'DownloadTemplate',
  methods: {
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
  }
}
</script>

<style></style>
