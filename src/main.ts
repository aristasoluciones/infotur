import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

import storage from './storage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import {Drivers} from "@ionic/storage";
import { SplashScreen } from "@capacitor/splash-screen";
SplashScreen.show({
  showDuration: 7000,
  autoHide: false
});
const app = createApp(App)
  .use(IonicVue)
  .use(storage, { name:'__data_turismo', driverOrder:[ Drivers.LocalStorage, Drivers.IndexedDB]})
  .use(router)

router.isReady().then(() => {
  SplashScreen.hide();
  app.mount('#app');
});