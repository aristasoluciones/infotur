<template>
  <ion-grid>
    <ion-row v-if="items.length > 0">
      <template v-for="(item, index) in items" :key="index">
        <ion-col :size="sizeCol" :size-md="sizeMd">
          <ion-button :color="item.color" expand="block" @click="presentActionSheet(item)" >
            {{ item.title }}</ion-button>
        </ion-col>
      </template>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import {IonCol, IonGrid, IonRow, IonButton, actionSheetController} from '@ionic/vue';
import { defineComponent, PropType } from 'vue';
import {close, download, trash} from "ionicons/icons";

export default defineComponent({
  name: 'ItemCatalogo',
  data: function() {
    return {
      items_validado: Array as PropType<Array<any>>
    }
  },
  props: {
    items: {
      type: Array as PropType<Array<any>>,
      required: true,
    },
    sizeCol: {
      type:[String, Number],
      value: 12,
      required:true
    },
    sizeMd:{
      type:[String, Number],
      value: 6,
      required:true
    }
  },
  /*async beforeMount() {
    for (const item of this.items) {
      const items_catalogo = await (this as any).$ionicStorage.get(item.name);
      item.color = items_catalogo === null ? 'warning' : 'primary';
    }
  },*/
  components: { IonGrid, IonCol, IonRow, IonButton },
  methods: {
    async presentActionSheet(item : any) {
      const actionSheet = await actionSheetController
          .create({
            header: item.title,
            cssClass: 'ion-color-primary',
            buttons: [
              {
                text: 'Eliminar',
                role: 'destructive',
                icon: trash,
                data: {
                  action: 'delete',
                },
              },
              {
                text: 'Descargar',
                role: 'selected',
                icon: download,
                id: 'descargar-button',
                data: {
                  action: 'selected'
                },
                handler: async () => {
                  // await (this as any).$ionicStorage.set('paises', items);
                },
              },
              {
                text: 'Cancelar',
                role: 'cancel',
                icon: close,
                data: {
                  action: 'cancel',
                },
              },
            ],
          });
      await actionSheet.present();
    },
  }
});
</script>
<style scoped>
</style>