<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>Captura</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="store.autenticado > 0 && store.modulo_informacion > 0">
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <v-wizard-captura :validation-schema="validationSchema" @sendForm="guardarRegistro">
        <v-form-step>
          <form-one></form-one>
        </v-form-step>
      </v-wizard-captura>
    </ion-content>
    <ion-content class="ion-vertical-center-align-content" v-else>
      <ion-grid class="ion-full-height">
        <ion-row class="ion-full-width">
          <ion-col>
            <ion-button expand="block" @click="$router.push('/menu/configuracion')">Configurar</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
// core components
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  alertController,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue';
import { defineComponent, reactive, onBeforeMount } from 'vue';


// plugins
import {arrowBackOutline, arrowForwardOutline, save, chevronDownCircleOutline} from 'ionicons/icons';
import { configure, defineRule } from "vee-validate";
import { setLocale, localize } from '@vee-validate/i18n';
import { required, email, numeric } from "@vee-validate/rules";
import { useRoute,onBeforeRouteUpdate, onBeforeRouteLeave, useRouter } from 'vue-router'


// custom components
import FormOne from "@/views/FormOne.vue";
import VWizardCaptura from "@/components/WizardCaptura.vue";
import VFormStep from "@/components/FormStep.vue";

// custom code
import { store as customStore } from "@/store";
import { useCustomStorage } from '@/storage';

import moment from "moment";

defineRule('required', required);
defineRule('email', email);
defineRule('numeric', numeric);

configure({
  generateMessage: localize('es', {
    messages: {
      required: '{field} es requerido',
      email: '{field} no es valido',
    },
  }),
})

const validationSchema = [
  {
    nacionalidad: 'required',
    select_pais_origen: 'required',
    genero: 'required',
    edad: 'required',
    escolaridad: 'required',
    turista_viajando: 'required|numeric',
    proposito: 'required',
    alojamiento: 'required',
    transporte: 'required',
    medio: 'required',
    organizador:'required'
  }
];
setLocale('es');

export default defineComponent({
  name: 'FormCaptura',
  props: { idx : null },
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    FormOne,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    VWizardCaptura,
    VFormStep,
    IonRefresher,
    IonRefresherContent,
  },
  setup() {
    const store       = reactive(customStore);
    let _storage:any  = useCustomStorage();
    const route       = useRoute();
    const router       = useRouter();
    let cuc:any     = route.params.idx;


    const presentAlert = async () => {
      const alert = await alertController.create({
        header: 'Aviso',
        subHeader: '',
        message: 'Información registrada correctamente!',
        buttons: [
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              router.go(0);
              store.inicializarCaptura();
            },
          },
        ],
      });
      await alert.present();
    }

    const loadCatalogos = async ()=> {
      for (const catalogo of store.catalogues) {
        type ObjectKey = keyof typeof store
        const name = catalogo.name === "allmunicipios" ? 'municipios' : catalogo.name;
        const property = name as ObjectKey;
        let current_catalogo = await _storage.get(name);
        store[property] = current_catalogo === null ? [] : current_catalogo;
      }
    }

    const guardarRegistro =  async () => {
      let get_items = await _storage.get('capturas');
      let current_usuario = await _storage.get('_usuario');

      let  current_items = get_items === null ? [] : get_items;
      const timenow = moment().format('Y-MM-DD HH:mm:ss');

      cuc =  parseInt(cuc);

      store.current_captura.fecha_registro =  !isNaN(cuc)
          ? store.current_captura.fecha_registro : timenow;

      store.current_captura.fecha_modificacion =  timenow;
      store.current_captura.id_modulo_informacion =  store.modulo_informacion;
      store.current_captura.id_usuario_captura =  current_usuario.id_usuario;

      !isNaN(cuc)
          ? current_items[cuc] = store.current_captura
          : current_items.push(store.current_captura);

      await _storage.set('capturas', current_items);
      store.capturas = current_items;
      presentAlert();
    }

    const getCaptura = async (idx:any) => {
      let capturas = await _storage.get('capturas');
      let idxInt =  parseInt(idx);
      return !isNaN(idxInt) ? capturas[idx] : null;
    }

    const cargarDef = async () => {
      await loadCatalogos();
      let capturasr =  await getCaptura(route.params.idx);
      store.inicializarCaptura(capturasr)
      store.loading = 0;
    }

    const handleRefresh = async (event: any) => {
      await cargarDef();
      event.target.complete();
    };

    onBeforeMount( async () => {
      const user_logueado =  await _storage.get('_usuario');
      store.modulo_informacion = user_logueado.id_modulo_informacion;
    });

    // cargar inicial
    cargarDef();


    onBeforeRouteLeave(() => {
      store.inicializarCaptura();
    })

    return {
      //icons,
      chevronDownCircleOutline,
      arrowForwardOutline,
      arrowBackOutline,
      save,
      //metodos
      loadCatalogos,
      guardarRegistro,
      store,
      cargarDef,
      handleRefresh,
      validationSchema,
    }
  }
});
</script>

<style scoped>
.ion-full-height {
  height: 100%;
}
.ion-full-width{
  width: 100%;
}
.ion-vertical-center-align-content > *
{
  display: flex!important;
  align-content: center!important;
  align-items: center!important;
}
</style>