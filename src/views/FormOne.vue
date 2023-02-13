<template>
        <ion-grid>
          <ion-row>
            <ion-col size="12" size-md="6">
              <ion-item fill="outline">
                <ion-label color="secondary" position="stacked">Nacionalidad</ion-label>
                <v-field v-model="store.current_captura.select_nacionalidad"
                         label="Nacionalidad"
                         name="nacionalidad" v-slot="{ field }">
                  <ion-select placeholder="Seleccionar.." v-bind="field">
                    <template v-for="(item, index) in store.nacionalidades" :key="index">
                      <ion-select-option :value="item.id" v-text="item.nombre"></ion-select-option>
                    </template>
                  </ion-select>
                </v-field>
              </ion-item>
              <error-message  name="nacionalidad" />
            </ion-col>
            <ion-col size="12" size-md="6">
              <ion-item fill="outline">
                <ion-label color="secondary" position="stacked">País de origen</ion-label>
                <v-field v-model="store.current_captura.select_pais_origen"
                         label="País de origen"
                         name="select_pais_origen" v-slot="{ field }">
                  <ion-select v-bind="field" placeholder="Seleccionar..">
                    <template v-for="(item, index) in paisesFtr" :key="index">
                      <ion-select-option :value="item.id_pais" v-text="item.nombre"></ion-select-option>
                    </template>
                  </ion-select>
                </v-field>
              </ion-item>
              <error-message name="select_pais_origen" />
            </ion-col>
            <ion-col size="12" size-md="6">
              <ion-item fill="outline">
                <ion-label color="secondary" position="stacked">Estado</ion-label>
                <v-field v-model="store.current_captura.select_estado" label="Estado" name="select_estado" v-slot="{ field }">
                  <ion-select v-bind="field" placeholder="Seleccionar..">
                    <template v-for="(item, index) in estadosFtr" :key="index">
                      <ion-select-option :value="item.id_estado" v-text="item.nombre"></ion-select-option>
                    </template>
                  </ion-select>
                </v-field>
              </ion-item>
              <error-message class="ion-color-danger" name="select_estado" />
            </ion-col>
            <ion-col size="12" size-md="6">
              <ion-item fill="outline">
                <ion-label color="secondary" position="stacked">Municipio</ion-label>
                <v-field v-model="store.current_captura.select_municipio"
                         label="Municipio"
                         name="municipio" v-slot="{ field }" >
                  <ion-select v-bind="field"
                              placeholder="Seleccionar..">
                    <template v-for="(item, index) in municipiosFtr" :key="index">
                      <ion-select-option :value="item.id_municipio" v-text="item.nombre"></ion-select-option>
                    </template>
                  </ion-select>
                </v-field>
              </ion-item>
              <error-message name="municipio" class="ion-color-danger" />
            </ion-col>
            <ion-col size="12" size-md="6">
              <ion-item fill="outline">
                <ion-label color="secondary" position="stacked">Género</ion-label>
                <v-field v-model="store.current_captura.select_genero" label="Género" name="genero" v-slot="{ field }">
                  <ion-select v-bind="field" placeholder="Seleccionar..">
                    <template v-for="(item, index) in store.generos" :key="index">
                      <ion-select-option :value="item.id" v-text="item.nombre"></ion-select-option>
                    </template>
                  </ion-select>
                </v-field>
              </ion-item>
              <error-message name="genero" />
            </ion-col>
            <ion-col size="12" size-md="6">
              <ion-item fill="outline">
                <ion-label class="ion-text-wrap" color="secondary">Se identifica con un grupo de diversidad sexual?</ion-label>
                <ion-toggle slot="end" color="secondary" v-model="store.current_captura.diversidad_sexual"></ion-toggle>
              </ion-item>
            </ion-col>
            <ion-col size="12" size-md="6">
              <ion-item fill="outline">
                <ion-label color="secondary" position="stacked">Edad</ion-label>
                <v-field v-model="store.current_captura.edad"
                         label="Edad"
                         name="edad" v-slot="{ field }">
                  <ion-select v-bind="field" placeholder="Seleccionar..">
                    <template v-for="(item, index) in store.edades" :key="index">
                      <ion-select-option :value="item.id_edad" v-text="item.nombre"></ion-select-option>
                    </template>
                  </ion-select>
                </v-field>
              </ion-item>
              <error-message name="edad" />
            </ion-col>
            <ion-col size="12" size-md="6">
              <ion-item fill="outline">
                <ion-label color="secondary" position="stacked">Escolaridad</ion-label>
                <v-field v-model="store.current_captura.select_escolaridad"
                         label="Escolaridad"
                         name="escolaridad" v-slot="{ field }">
                  <ion-select v-bind="field" placeholder="Seleccionar..">
                    <template v-for="(item, index) in store.escolaridades" :key="index">
                      <ion-select-option :value="item.id_profesion" v-text="item.nombre"></ion-select-option>
                    </template>
                  </ion-select>
                </v-field>
              </ion-item>
              <error-message name="escolaridad" />
            </ion-col>
            <ion-col size="12" size-md="6">
              <ion-item fill="outline">
                <ion-label class="ion-text-wrap" color="secondary">Persona con discapacidad</ion-label>
                <ion-toggle slot="end" color="success" v-model="store.current_captura.discapacidad"></ion-toggle>
              </ion-item>
            </ion-col>
            <ion-col size="12" size-md="6" >
              <ion-item fill="outline">
                <ion-label color="secondary" position="stacked">Correo electrónico</ion-label>
                <v-field  v-model="store.current_captura.correo"
                          name="correo"
                          label="Correo electrónico"
                          v-slot ="{ field }">
                  <ion-input v-bind="field"></ion-input>
                </v-field>
              </ion-item>
              <error-message  name="correo" />
            </ion-col>
          </ion-row>
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
// core components
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
import { defineComponent, reactive, computed, watch, ref } from 'vue';

//plugins
import { Field, ErrorMessage } from 'vee-validate';

// custom code
import { store as customStore } from "@/store";

export default defineComponent({
  name: 'FormOne',
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

  setup() {
    let store = reactive(customStore);
    let paisesFtr = ref<any>([]);
    let municipiosFtr = ref<any>([]);
    let estadosFtr = ref<any>([]);



    const isCongreso =  computed( () => {
      return store.current_captura.select_proposito?.includes(2);
    })

    const transportesFiltrado =  computed( () => {
      return store.transportes.filter((item:any) => item.tipo === 1)
    })

    watch(() => store.current_captura.select_nacionalidad, (vNew, vOld) => {
      paisesFtr.value = store.paises.filter(function (item:any) {
        if(vNew == 1)
          return item.nombre.toLowerCase() == 'méxico';
        else
          return store.current_captura.select_nacionalidad != null && item.nombre.toLowerCase() != 'méxico'
      })
      store.current_captura.select_pais_origen = vNew === 1 ? paisesFtr.value[0].id_pais : null;
      store.current_captura.select_estado     =  store.current_captura.select_estado && !vOld ? store.current_captura.select_estado :  null;
      store.current_captura.select_municipio  =   store.current_captura.select_municipio && !vOld ? store.current_captura.select_municipio :  null;
    });

    watch(() => store.current_captura.select_pais_origen, (vNew) => {
      let estados = store.estados.filter((item:any) => item.id_pais == vNew);
      estadosFtr.value =  estados.sort();
      store.current_captura.select_estado = store.current_captura.select_estado ? store.current_captura.select_estado :  null;
    });

    watch(() => store.current_captura.select_estado, (vNew, vOld) => {
      let municipios =   store.municipios.filter((item:any) => item.id_estado == vNew);
      municipiosFtr.value = municipios.sort();
      store.current_captura.select_municipio =   store.current_captura.select_municipio && !vOld ? store.current_captura.select_municipio :  null;
    });

    watch(() => store.current_captura.select_proposito, () => {
      store.current_captura.select_congreso =  null;
    });

    return {
      //methods
      estadosFtr,
      municipiosFtr,
      isCongreso,
      transportesFiltrado,
      store,
      paisesFtr
    }
  }
});
</script>

<style scoped>

</style>