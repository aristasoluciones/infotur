import { inject } from 'vue';
import { Storage } from '@ionic/storage'
/*export default {
    install: async (app: any, options:any) => {
        const storage = new Storage(options);
        const storageInstance = await storage.create();
        app.config.globalProperties.$ionicStorage = storageInstance;
        //app.config.globalProperties.$store.$ionicStorage = storageInstance; // This one is only needed if you want to access the ionic storage instance in your VUEX store actions
        app.provide("storageInstace", {storageInstance});
    }
}*/
export default  {
    async install(app:any, options:any) {
        const storage = new Storage(options);
        const storageInstance = await storage.create();
        app.config.globalProperties.$ionicStorage = storageInstance;
        app.provide("storageInstance", storageInstance);
    }
}

export function useCustomStorage() {
    const current_storage = inject('storageInstance');
    if (!current_storage) throw new Error('No storage provided!');

    return current_storage;
}