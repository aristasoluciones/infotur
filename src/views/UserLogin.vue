<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>Inicio de sesión</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-vertical-center-align-content">
      <ion-grid class="ion-full-height">
        <ion-loading :is-open="loading"
                     @didDismiss="loading = false"
                     message="Iniciando session"></ion-loading>
        <ion-row class="ion-align-items-center">
          <ion-col size="12" class="ion-align-items-center">
            <ion-item>
              <ion-label position="floating">Usuario</ion-label>
              <ion-input required v-model="user" type="text" placeholder="Usuario"></ion-input>
            </ion-item>
          </ion-col>
          <ion-col size="12" class="ion-align-items-center">
            <ion-button @click="login" expand="block">Iniciar sesión</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLoading,
  alertController
} from '@ionic/vue';
import {onBeforeMount, reactive, ref} from 'vue';

import {CapacitorHttp, HttpResponse} from "@capacitor/core";

import {useRouter} from "vue-router";

import {useCustomStorage} from '@/storage';
import { store as customStore} from "@/store";
import {CapacitorHttp as Http} from "@capacitor/core";


export default {
  name: "UserLogin",
  components: {
    IonPage,
    IonContent,
    IonItem,
    IonInput,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLoading
  },
  setup() {
    let loading = ref(false);
    let store = reactive(customStore);
    let user = ref(null);
    let _storage: any = useCustomStorage();
    const router = useRouter();

    const presentAlert = async () => {
      const alert = await alertController.create({
        header: 'Aviso',
        subHeader: '',
        cssClass: 'custom-alert',
        message: 'Usuario no  encontrado, intente nuevamente!',
        buttons: ['OK'],
      });
      await alert.present();
    }

    const descargarCatalogos = async () => {
      type ObjectKey = keyof typeof store;
      for (const item of store.catalogues) {
        const name = item.name === "allmunicipios" ? 'municipios' : item.name;
        const response = await Http.get({url: process.env.VUE_APP_URL_API + '/catalogos/' + item.name});
        await _storage.remove(name);
        if (response.status === 200) {
          const datos = response.data;
          if (datos.length > 0) {
            await _storage.set(name, datos);
            let tmo = item;
            tmo.color = "primary";
            tmo.cargado = true;
            const property = name as ObjectKey;
            store[property] = datos;
          }
        }
      }
    };

    const login = async () => {
      loading.value = true;
      try {
        let options = { usuario: user.value }
        const response: HttpResponse = await CapacitorHttp.request({
          url: process.env.VUE_APP_URL_API + '/autenticacion/loginPersonal',
          method: "POST",
          data: JSON.stringify(options),
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (response.status === 200) {
          await _storage.remove('_captura_token');
          await _storage.remove('_usuario');

          await _storage.set('_captura_token', response.data.token);
          await _storage.set('_usuario', response.data.user);
          await descargarCatalogos();
          loading.value = false;
          store.modulo_informacion = response.data.user.id_modulo_informacion;
          store.autenticado = 1;
          router.replace('/');

        } else {
          loading.value = false;
          presentAlert();
        }
      } catch(e) {
        loading.value = false;
        presentAlert();
      }
    }

    onBeforeMount(async () => {
      const token = await _storage.get('_captura_token');
      store.autenticado = token ? 1 : 0;
      if (store.autenticado)
        router.push('/');
    })

    return {
      loading,
      user,
      login,
    }
  }
}
</script>

<style scoped>
.ion-full-height {
  height: 100%;
}

.ion-full-width {
  width: 100%;
}

.ion-vertical-center-align-content > * {
  display: flex !important;
  align-content: center !important;
  align-items: center !important;
}

ion-alert.custom-alert {
  --backdrop-opacity: 0.7;
}
</style>