<template>
  <v-card>
    <v-card-title>Generar archivos .cfg</v-card-title>
    <v-card-text>
      <p>
        Subir archivo .csv con los datos correspondientes a los equipos de los
        cuales se quiere generar el .cfg.
      </p>
      <p>
        Usando el formato de la
        <router-link to="/cfgs/download_template">plantilla</router-link>
      </p>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-file-input
          v-model="file"
          show-size
          accept=".csv"
          label="Subir archivo"
          class="col-8 col-sm-8 col-md-8"
        />
        <v-btn color="primary" @click="onPickupFile()">Generar CFGs</v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import http from '@/http-common.js'
export default {
  name: 'Generar_CFGS',
  data: () => ({
    file: null,
    uploaded: false
  }),
  methods: {
    onPickupFile() {
      var formData = new FormData()
      formData.append('file', this.file)
      http
        .post('cfgs/upload_file/', formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        })
        .then((response) => {
          if (response.status == 201) {
            this.$toast.success('Archivo subido correctamente')
            console.log(response)
            this.uploaded = true
            this.generateCFGs(response.data.file)
          }
        })
    },
    generateCFGs(filename) {
      console.log('Filename: ' + filename)
      this.$toast.info('Generando CFGs, espere un momento')
      http
        .post('cfgs/generate/', {
          filename
        })
        .then((response) => {
          if (response.status == 201) {
            this.$toast.success('Archivos creados correctamente')
          }
        })
    }
  }
}
</script>

<style></style>
