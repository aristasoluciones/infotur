import { store } from "@/store";
export default {
    install: async (app:any) => {
        store.paises =   await (this as any).$ionicStorage.get({ key:'paises'});
    }
}