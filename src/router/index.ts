import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import { store } from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name:"home",
    redirect: '/captura',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/UserLogin.vue'),
  },
  {
    path: '/captura',
    name: "mainCaptura",
    redirect: '/menu/captura'
  },
  {
    path: '/menu/',
    component: MainPage,
    children: [
      {
        path: '',
        redirect: 'captura'
      },
      {
        path: 'configuracion',
        name: "configuracion",
        beforeEnter: (to, from, next) => {
          if(store.autenticado !== 1)
            next({ name: "login" });
          else next()
        },
        component: () => import('@/views/InicioConfiguracion.vue')
      },
      {
        path: 'captura/:idx?',
        name: 'captura',
        props:true,
        beforeEnter: (to, from, next) => {
          if(store.autenticado !== 1)
            next({ name: "login" });
          else next()
        },
        component: () => import('@/views/NavegacionCaptura.vue'),
        
      },
      {
        path: 'listado',
        beforeEnter: (to, from, next) => {
          if(store.autenticado !== 1)
            next({ name: "login" });
          else next()
        },
        component: () => import('@/views/ListaCaptura.vue'),
      },
      {
        path: 'listado/editar/:idx?',
        name: 'editar-captura',
        props:true,
        beforeEnter: (to, from, next) => {
          if(to.name !== 'login' && store.autenticado !== 1)
            next({ name: "login" });
          else next()
        },
        component: () => import('@/views/EditarCaptura.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});


export default router
