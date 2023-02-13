<template>
    <ion-grid>
      <ion-row>
        <ion-col size="12" size-md="6">
          <ion-item fill="outline">
            <ion-label color="secondary" position="floating">Núm. de turistas viajando</ion-label>
            <v-field v-model="store.current_captura.numero_turista_viajando"
                     label="Turistas viajando"
                     name="turista_viajando" v-slot="{ field }" >
              <ion-input v-bind="field" ></ion-input>
            </v-field>
          </ion-item>
          <error-message name="turista_viajando" />
        </ion-col>
        <ion-col size="12" size-md="6">
          <ion-item fill="outline">
            <ion-label class="ion-text-wrap" color="secondary">Viaja con mascota</ion-label>
            <ion-toggle slot="end" color="secondary" v-model="store.current_captura.viaja_con_mascota"></ion-toggle>
          </ion-item>
        </ion-col>
        <ion-col size="12" size-md="6">
          <ion-item fill="outline">
            <ion-label color="secondary" position="floating">Propósitos del viaje</ion-label>
            <v-field  v-model="store.current_captura.select_proposito"
                      label="Propósito del viaje"
                      name="proposito"
                      v-slot="{ field }">
              <ion-select v-bind="field" placeholder="Seleccionar.." :multiple="true">
                <template v-for="(item, index) in store.propositos" :key="index">
                  <ion-select-option :value="item.id_motivo_estancia" v-text="item.nombre"></ion-select-option>
                </template>
              </ion-select>
            </v-field>
          </ion-item>
          <error-message name="proposito" />
        </ion-col>
        <ion-col size="12" size-md="6" v-show="isCongreso">
          <ion-item fill="outline">
            <ion-label color="secondary" position="floating">Tipo de congreso</ion-label>
            <v-field v-model="store.current_captura.select_congreso"
                     name="congreso"
                     label="Tipo de congreso"
                     v-slot="{ field }">
              <ion-select v-bind="field" placeholder="Seleccionar.." :multiple="true">
                <template v-for="(item, index) in store.congresos" :key="index">
                  <ion-select-option :value="item.id_tipo_congreso" v-text="item.nombre"></ion-select-option>
                </template>
              </ion-select>
            </v-field>
          </ion-item>
          <error-message name="congreso" />
        </ion-col>
        <ion-col size="12" size-md="6">
          <ion-item fill="outline">
            <ion-label color="secondary" position="floating">Tipo de alojamiento</ion-label>
            <v-field v-model="store.current_captura.select_alojamiento"
                     label="Tipo de alojamiento"
                     name="alojamiento"
                     v-slot="{ field }">
              <ion-select v-bind="field" placeholder="Seleccionar.." :multiple="true">
                <template v-for="(item, index) in store.alojamientos" :key="index">
                  <ion-select-option :value="item.id_alojamiento_estancia" v-text="item.nombre"></ion-select-option>
                </template>
              </ion-select>
            </v-field>
          </ion-item>
          <error-message name="alojamiento" />
        </ion-col>
        <ion-col size="12" size-md="6">
          <ion-item fill="outline">
            <ion-label color="secondary" position="floating">Arribó a entidad</ion-label>
            <v-field v-model="store.current_captura.select_transporte"
                     name="transporte"
                     label="Arribó a entidad"
                     v-slot="{ field }">
              <ion-select v-bind="field" placeholder="Seleccionar..">
                <template v-for="(item, index) in transportesFiltrado" :key="index">
                  <ion-select-option :value="item.id_tipo_transporte" v-text="item.nombre"></ion-select-option>
                </template>
              </ion-select>
            </v-field>
          </ion-item>
          <error-message name="transporte" />
        </ion-col>
        <ion-col size="12" size-md="6">
          <ion-item fill="outline">
            <ion-label color="secondary" position="floating">Se enteró de chiapas</ion-label>
            <v-field v-model="store.current_captura.select_medio"
                     name="medio"
                     label="Se enteró de chiapas"
                     v-slot="{ field }">
              <ion-select v-bind="field" placeholder="Seleccionar..">
                <template v-for="(item, index) in store.medios" :key="index">
                  <ion-select-option :value="item.id_medio_informacion" v-text="item.nombre"></ion-select-option>
                </template>
              </ion-select>
            </v-field>
          </ion-item>
          <error-message name="medio" />
        </ion-col>
        <ion-col size="12" size-md="6">
          <ion-item fill="outline">
            <ion-label color="secondary" position="floating">Organizó su viaje</ion-label>
            <v-field v-model="store.current_captura.select_organizador"
                     name="organizador"
                     label="Organizó su viaje"
                     v-slot="{ field }">
              <ion-select v-bind="field" placeholder="Seleccionar..">
                <template v-for="(item, index) in store.organizadores" :key="index">
                  <ion-select-option :value="item.id_organiza_viaje" v-text="item.nombre"></ion-select-option>
                </template>
              </ion-select>
            </v-field>
          </ion-item>
          <error-message name="organizador" />
        </ion-col>
      </ion-row>
    </ion-grid>
</template>

<script lang="ts">
import {
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from '@ionic/vue';
// plugins
import { Field, ErrorMessage } from 'vee-validate';
import {computed, defineComponent, reactive, watch} from 'vue';

import { store as customStore } from "@/store";

export default defineComponent({
  name: 'FormTwo',
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonLabel,
    IonInput,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonToggle,
    VField: Field,
    ErrorMessage,
  },

  setup(props, { emit }) {
    const store = reactive(customStore);
    const isCongreso =  computed( () => {
      return store.current_captura.select_proposito?.includes(2);
    })

    const transportesFiltrado =  computed( () => {
      return store.transportes.filter((item:any) => item.tipo === 1)
    })
    watch(() => store.current_captura.select_proposito, () => {
      store.current_captura.select_congreso =  null;
    });
    return {
      store,
      emit,
      isCongreso,
      transportesFiltrado,
    }
  }
});
</script>

<style scoped>

</style>