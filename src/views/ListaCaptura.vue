<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="success">
        <ion-title>Capturas realizadas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-refresher slot="fixed" @ionRefresh="handleRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>
      <ion-loading :is-open="loading"
                   @didDismiss="loading = false"
                   message="Enviando"></ion-loading>
      <ion-list class="ion-no-padding" ref="ionListCaptura" >
         <template v-for="(item, index) in capturas_detalle" :key="index">
             <ion-item-group>
               <ion-item-divider color="light">
                 <ion-label class="ion-text-uppercase ion-item-group-label" color="dark">
                   {{ moment(index).format('dddd DD MMMM YYYY') }}
                 </ion-label></ion-item-divider>
               <item-captura :items="item" @closeItem="closeChild" @enviarReg="enviarRegistro" ></item-captura>
             </ion-item-group>
         </template>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar color="success" class="ion-align-items-end">
          <ion-button
              v-show="!loading"
              fill="outline"
              shape="round"
              color="light"
              @click="enviarRegistros"
          >Enviar registros <ion-icon slot="end"  :icon="cloudUpload"></ion-icon></ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
// ionic components
// plugins
import {cloudUpload} from 'ionicons/icons';
import ICapturaDetalle from '@/types/ICapturaDetalle';
import ItemCaptura from "@/components/ItemCaptura.vue";
import {
  alertController,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue';
import {defineComponent, ref} from 'vue';

import moment from 'moment';
import 'moment/locale/es-mx';

import {store} from "@/store";
import { useCustomStorage } from '@/storage';

export default defineComponent({
  name: 'ListadoCaptura',
  data() {
    return {
      store
    }
  },
  components: {
    IonPage,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonFooter,
    IonButton,
    IonIcon,
    IonList,
    ItemCaptura,
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonLoading,
    IonRefresher,
    IonRefresherContent,
  },
  computed: {
      capturas_detalle() {
        let capturas_detalle   = Array<ICapturaDetalle>();
        let capturas_agrupados = Array<any>();
        for(const[key, item] of store.capturas.entries()) {
          let rnacionalidad = store.nacionalidades.find(item2 => item2.id == item.select_nacionalidad)
          let rpais = store.paises.find(item3 => item3.id_pais == item.select_pais_origen)
          let rsexo = store.generos.find(item3 => item3.id == item.select_genero)
          let rmodulo = store.modulos?.find(item4 => item4.id_modulo_informacion == item.id_modulo_informacion)
          let n_nacionalidad = rnacionalidad ? rnacionalidad.nombre : 'Sin nacionalidad';
          let n_pais = rpais ? rpais?.nombre : 'No se encontro pais';
          let sexo = rsexo ? rsexo?.nombre : 'Indefinido';
          let fecha_registro = moment(item.fecha_registro).format('Y-MM-DD');
          let itm:any = {
            ...item,
            index_array: key,
            nacionalidad: n_nacionalidad,
            pais: n_pais,
            sexo,
            email: item.correo,
            modulo: rmodulo?.nombre,
            fecha_registro,
          }
          capturas_detalle.push(itm);
        }
        capturas_agrupados = this.groupBy(capturas_detalle, (c:any) => c.fecha_registro);
        return capturas_agrupados;
      }
  },
  beforeMount() {
    this.loadCatalogos();
    this.loadCapturas();
  },
  methods: {
    async loadCatalogos() {
      let catalogos = store.catalogues;
      for (const catalogo of catalogos) {
        type ObjectKey = keyof typeof store
        const name = catalogo.name === "allmunicipios" ? 'municipios' : catalogo.name;
        const property = name as ObjectKey;
        let current_catalogo = await (this as any).$ionicStorage.get(catalogo.name);
        store[property] = current_catalogo === null ? [] : current_catalogo;
      }
      store.modulos = await (this as any).$ionicStorage.get('minformacion');
    },

    async loadCapturas() {
      store.capturas =  await (this as any).$ionicStorage.get('capturas');
    },

    async handleRefresh(event: any) {
      await this.loadCapturas();
      event.target.complete();
    },
  },

  setup() {
    const _storage:any  =  useCustomStorage();

    const ionListCaptura = ref<any>(null);

    let loading = ref(false);

    const groupBy = (xs:any, f:any) => {
      return xs.reduce((r:any, v:any, i:any, a:any, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
    }

    const presentAlert = async (msg:string) => {
      const alert = await alertController.create({
        header: 'Aviso',
        subHeader: '',
        cssClass: 'ion-alert-danger',
        message: msg,
        buttons: [
          {
            text: 'OK',
            role: 'confirm'
          },
        ],
      });
      await alert.present();
    }

    const enviarRegistros = async () => {
      loading.value = true;
      try {
        const pendientes = store.capturas;
        let tmpPendientes = pendientes;
        for (const cap of pendientes) {
          const realizado = await enviarRegistro(cap);
          if (realizado) {
            tmpPendientes = tmpPendientes.filter((item2: any) => {
              return JSON.stringify(item2) !== JSON.stringify(cap);
            });
            await _storage.set('capturas', tmpPendientes);
          } else {
            loading.value = false;
            presentAlert('Algunos registros no fueron enviados, intente nuevamente!!');
            break;
          }
        }
        loading.value = false;
        store.capturas = await _storage.get('capturas')
        if(store.capturas.length <= 0)
          presentAlert('Información enviada!!');
      } catch(e) {
        loading.value = false;
        presentAlert('Ocurrio un error al intentar enviar información!!');
      }
    }

    const closeChild = () => {
      ionListCaptura.value.$el.closeSlidingItems();
    }

    const enviarRegistro = async (item: any) => {
      // fomatear envio
       let item_sanatize = {
       id_modulo_informacion: item.id_modulo_informacion,
       id_usuario_captura: item.id_usuario_captura,
       id_edad: item.edad,
       id_profesion: item.select_escolaridad,
       id_medio_informacion: item.select_medio,
       id_organiza_viaje: item.select_organizador,
       id_tipo_transporte: item.select_transporte,
       id_tipo_transporte_arribo: item.select_transporte,
       id_pais: item.select_pais_origen,
       tipo_turista: item.select_nacionalidad,
       id_estado: item.select_estado,
       id_municipio: item.select_municipio,
       sexo: item.select_genero,
       mascota: item.viaja_con_mascota,
       num_personas: parseInt(item.numero_turista_viajando),
       diversidad_sexual: item.diversidad_sexual,
       discapacidad: item.discapacidad,
       correo: item.correo,
       fecha_registro: item.fecha_registro,
       propositos: item.select_proposito,
       congresos: item.select_congreso,
       alojamientos: item.select_alojamiento,
     }

     const response = await fetch(process.env.VUE_APP_URL_API + '/captura', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item_sanatize),
      });

      return response.status === 200;
    }

    return {
      cloudUpload,
      groupBy,
      enviarRegistros,
      closeChild,
      ionListCaptura,
      enviarRegistro,
      moment,
      loading,
    }
  }
});
</script>

<style>
.ion-item-group-label {
  font-weight: bold;
}
.ion-alert-danger .alert-head{
  --ion-color-danger-tint: #ed576b;
}
</style>