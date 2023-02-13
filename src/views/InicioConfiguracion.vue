<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>Configuración</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="false">
      <ion-grid>
        <ion-row>
          <ion-col size-col="12">
            <ion-item fill="outline">
              <ion-label color="secondary" position="stacked">Modulos de información</ion-label>
              <ion-select placeholder="Seleccionar.." v-model="store.modulo_informacion">
                <template v-for="(item, index) in store.modulos" :key="index">
                  <ion-select-option :value="item.id_modulo_informacion" v-text="item.nombre"></ion-select-option>
                </template>
              </ion-select>
            </ion-item>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ItemCatalogo size-col="12" size-md="6" :items="catlocal"></ItemCatalogo>
      <ion-grid>
        <ion-row>
          <ion-col size-col="6">
            <ion-button color="primary" @click="descargarCatalogos">Actualizar catalogos</ion-button>
          </ion-col>
          <ion-col size-col="6">
            <ion-button color="primary" @click="limpiarCatalogos">Limpiar catalogos</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
    <ion-footer>
      <ion-toolbar color="success">
        <ion-title color="light">Versión {{ VERSION_APP }}</ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-page>

</template>

<script lang="ts">
// core vue
import {defineComponent} from "vue";

// ionic components
import {
  IonButton,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
// plugins
import { CapacitorHttp as Http } from '@capacitor/core';

// custom components
import ItemCatalogo from "@/components/ItemCatalogo.vue";

import { store } from "@/store";
import router from "@/router";

export default  defineComponent({
  name: 'InicioConfiguracion',
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonGrid,
    IonFooter,
    ItemCatalogo,
    IonRow,
    IonCol,
    IonButton,
    IonLabel,
    IonSelectOption,
    IonSelect,
    IonItem,
  },
  data() {
    return {
      catlocal:Array<any>(),
      loading: false,
      store,
      URL_API: process.env.VUE_APP_URL_API,
      VERSION_APP: process.env.VUE_APP_VERSION,
    }
  },
  async beforeMount() {
    for (const item of store.catalogues) {
      const name = item.name === "allmunicipios" ? 'municipios' : item.name;
      const items_catalogo = await (this as any).$ionicStorage.get(name);
      item.color = items_catalogo === null ? 'warning' : 'primary';
    }
    store.modulos = await (this as any).$ionicStorage.get('minformacion');

    this.catlocal =  store.catalogues;
    const user_logueado =  await (this as any).$ionicStorage.get('_usuario');
    store.modulo_informacion = user_logueado.id_modulo_informacion;


  },
  methods: {
    async descargarCatalogos() {
      type ObjectKey = keyof typeof store;
      for (const [key, item] of store.catalogues.entries()) {
        const name = item.name === "allmunicipios" ? 'municipios' : item.name;
        const response = await Http.get({ url:this.URL_API +'/catalogos/' + item.name });
        if (response.status === 200) {
          await (this as any).$ionicStorage.remove(name);
          const datos = response.data;
          if (datos.length > 0) {
            await (this as any).$ionicStorage.set(name, datos);

            let tmo = item;
            tmo.color = "primary";
            tmo.cargado = true;
            this.catlocal.splice(key, 1, tmo);

            const property =  name as ObjectKey;
            store[property] = datos;
          }
        }
      }
    },
    async limpiarCatalogos() {
      for (const [key, item] of store.catalogues.entries()) {
        const name = item.name === "allmunicipios" ? 'municipios' : item.name;
        await (this as any).$ionicStorage.remove(name);
        let tmo = item;
        tmo.cargado = false;
        tmo.color = "warning";
        this.catlocal.splice(key, 1, tmo);
      }
      store.modulo_informacion = 0;
      store.autenticado = 0;

      await (this as any).$ionicStorage.remove('_usuario');
      await (this as any).$ionicStorage.remove('_captura_token');
      store.inicializarCat();
      router.push('/');
    },
  },
});
</script>

<style scoped>

</style>