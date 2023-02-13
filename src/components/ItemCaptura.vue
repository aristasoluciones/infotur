<template>
  <ion-item-sliding v-for="item in items" :key="item.fecha_registro">
    <ion-item>
      <ion-label>
        <h3 class="ion-color">
         <ion-grid class="ion-no-padding">
           <ion-row>
             <ion-col><strong>Modulo de información     :</strong> {{ item.modulo }}</ion-col>
           </ion-row>
         </ion-grid>
        </h3>
        <p><strong>Núm. de turistas viajando :</strong> {{ item.numero_turista_viajando === null ? 0 : item.numero_turista_viajando}}</p>
        <p><strong>Nacionalidad:</strong> {{ item.nacionalidad }}</p>
      </ion-label>
    </ion-item>
    <ion-item-options>
      <ion-item-option color="warning" class="ion-option-text-bold"
                       @click="editarRegistro(item.index_array)">
        <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
      </ion-item-option>
      <ion-item-option color="danger" @click="deleteRegistro(item.index_array)">
        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script lang="ts">
// core component
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue';

import {defineComponent, reactive, ref} from 'vue';

//plugins
import { trash, cloudCircle, cloudUpload, createOutline } from "ionicons/icons";
import { useCustomStorage } from "@/storage";
import { store as customStore } from "@/store";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'ItemCaptura',
  emits:['closeItem', 'enviarReg'],
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  components: {
    IonItem,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
  },
  setup(props, { emit }) {
    const  store = reactive(customStore);
    const router = useRouter();
    let _storage:any  =  useCustomStorage();

    const deleteRegistro = async (index:number) => {
      let get_items = await _storage.get('capturas');
      let  current_items = get_items === null ? [] : get_items;
      let filtrado = current_items.filter( (item:any, ind: number) => ind !== index);
      await _storage.set('capturas', filtrado);
      store.capturas = filtrado;
      router.push({ name:"listado" });
    };

    const editarRegistro = (id:number) => {
      emit('closeItem');
      return router.push({ path:'/menu/listado/editar/'+ id });
    }

    return {
      // methods
      deleteRegistro,
      editarRegistro,

      //icons
      trash,
      cloudCircle,
      cloudUpload,
      createOutline,

    }
  }
});
</script>
<style scoped>
.ion-item-border {
  border-radius: 20px !important;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  padding-top: 5px;
}
.ion-option-text-bold {
  font-weight: bold;
}
</style>