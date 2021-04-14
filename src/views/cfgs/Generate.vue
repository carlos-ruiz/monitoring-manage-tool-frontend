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
      <v-container>
        <v-card>
          <v-card-title>
            Tipos (Equipo - Tipo a escribir en el archivo)
          </v-card-title>
          <v-card-text>
            <v-row no-gutters v-for="t in typesMapping" :key="t.type">
              <v-col>
                <v-card outlined tile class="pa-2">
                  {{ t.type }}
                </v-card>
              </v-col>
              <v-col>
                <v-card outlined tile class="pa-2">
                  {{ t.description }}
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-container fill-height>
        <v-row>
          <v-col>
            <v-file-input
              v-model="file"
              show-size
              accept=".csv"
              label="Subir archivo"
            />
          </v-col>
          <v-col>
            <v-btn color="primary" @click="onPickupFile()">Generar CFGs</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
    <v-spacer />
    <v-card v-if="cfgsGenerated">
      <v-card-title>CFGs generados</v-card-title>
      <v-card-text>
        <v-card v-if="cfgsGenerated">
          <v-card-title>Correctos</v-card-title>
          <v-card-text class="green--text text--lighten-1">
            <v-row>
              <v-col
                class="col-md-2 col-2 col-sm-2"
                v-for="i in filesOK"
                :key="i"
              >
                {{ i }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card v-if="cfgsWarning">
          <v-card-title>Con errores</v-card-title>
          <v-card-text class="red--text text--lighten-1">
            <v-row>
              <v-col
                class="col-md-2 col-2 col-sm-2"
                v-for="i in filesFailed"
                :key="i"
              >
                {{ i }}
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-container fill-height>
              <v-row>
                <v-col>
                  <v-btn color="primary" @click="downloadCfgs()"
                    >Descargar CFGs</v-btn
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
import http from '@/http-common.js'
export default {
  name: 'Generar_CFGS',
  metaInfo: {
    title: 'Generate'
  },
  data: () => ({
    file: null,
    uploaded: false,
    cfgsGenerated: false,
    cfgsWarning: false,
    filesPath: '',
    filesOK: [],
    filesFailed: [],
    typesMapping: [
      {type: 'Firewall(ip de cluster)', description: 'fwcluster'},
      {type: 'Firewall(ips físicos)', description: 'fwmember'},
      {type: 'Switches', description: 'switches'},
      {type: 'Servidores de VV (GE y RC)', description: 'vv'},
      {type: 'Servidores DDI', description: 'ddi'},
      {type: 'Servidores Linux', description: 'linux'},
      {type: 'Servidores Windows', description: 'windows'},
      {type: 'IPs de TSM', description: 'servers'}
    ]
  }),
  methods: {
    onPickupFile() {
      var formData = new FormData()
      formData.append('file', this.file)
      http
        .post('cfgs/upload_file/', formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        })
        .then(
          (response) => {
            if (response.status == 201) {
              console.log(response)
              this.uploaded = true
              this.generateCFGs(response.data.file)
            }
          },
          (error) => {
            this.$toast.error(
              'Se produjo un error al cargar el archivo. Error: ' + error
            )
          }
        )
    },
    generateCFGs(filename) {
      console.log('Filename: ' + filename)
      http
        .post('cfgs/generate/', {
          filename
        })
        .then((response) => {
          console.log(response)
          if (response.status == 201) {
            this.cfgsGenerated = true
            this.$toast.success('Archivos creados correctamente')
            this.filesOK = response.data.ok
          } else if (response.status == 202) {
            this.cfgsGenerated = true
            this.cfgsWarning = true
            this.filesOK = response.data.ok
            this.filesFailed = response.data.errors
            this.$toast.warning(
              'Algunos CFGs no se generaron de manera correcta'
            )
          }
          this.filesPath = response.data.path
        })
        .catch((e) => {
          console.log(e)
          this.$toast.error('Se produjo un error al generar los cfgs')
        })
    },
    downloadCfgs() {
      http
        .post('cfgs/download_cfgs/', {
          responseType: 'blob',
          path: this.filesPath
        })
        .then((response) => {
          if (response.status == 200) {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]))
            var fileLink = document.createElement('a')
            fileLink.href = fileURL
            fileLink.setAttribute('download', 'cfgs.zip')
            document.body.appendChild(fileLink)
            fileLink.click()
          }
        })
    }
  }
}
</script>

<style></style>
