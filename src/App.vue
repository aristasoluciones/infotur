<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {defineComponent, onBeforeMount, reactive} from 'vue';

import {useCustomStorage} from '@/storage';
import { store as customStore} from "@/store";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    let store = reactive(customStore);
    let _storage: any = useCustomStorage();
    onBeforeMount(async () => {
      const token = await _storage.get('_captura_token');
      store.autenticado = token ? 1 : 0;
    })
  }
});
</script>