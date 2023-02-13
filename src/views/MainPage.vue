<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/menu/configuracion">
          <ion-icon :icon="cloudOfflineOutline" />
          <ion-label>Catalogos</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/menu/captura">
          <ion-icon :icon="ellipse" />
          <ion-label>Captura</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/menu/listado">
          <ion-icon :icon="square" />
          <ion-label>Capturados</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, cloudOfflineOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'MainPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      cloudOfflineOutline,
    }
  },
});
</script>
