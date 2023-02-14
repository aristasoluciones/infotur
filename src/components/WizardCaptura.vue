<template>
  <form @submit="onSubmit">
    <ion-loading :is-open="load_ref"
                 @didDismiss="load_ref = false"
                 message="Guardando"></ion-loading>
    <slot />
    <ion-grid>
      <ion-row>
        <ion-col size="12" class="ion-text-center">
          <ion-button v-show="hasPrevious"
                      @click="goToPrev"
                      fill="outline"
                      shape="round"
                      color="warning"
                      type="button"
          ><ion-icon slot="start"  :icon="arrowBackOutline"></ion-icon> Regresar</ion-button>
        </ion-col>
        <ion-col class="ion-text-center">
          <ion-button type="submit"
                      fill="outline"
                      shape="round"
                      color="secondary"
          >{{ isLastStep ? 'Guardar' : 'Continuar' }}<ion-icon slot="end"  :icon="arrowForwardOutline"></ion-icon></ion-button>
        </ion-col>
      </ion-row>
    </ion-grid>
  </form>
</template>

<script setup lang="ts">
// core component
import { IonGrid, IonRow, IonCol, IonIcon, IonButton, IonLoading} from "@ionic/vue";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import { ref, computed, provide, inject, defineEmits } from 'vue';

// plugins
import { useForm } from 'vee-validate';

// custom plugins
import {stepCounter as symbolStepCounter, currentStepIndex as symbolCurrentStepIndex, loading, schemaFormValidation as schemaForm } from "@/symbols/counterStep";

/*const props = defineProps({
  validationSchema: {
    type: Array,
    required: true,
  },
});*/

const emit = defineEmits(['sendForm']);

const stepCounter:any = ref(0);
provide(symbolStepCounter, stepCounter);

const load_ref = ref(false);
provide(loading, load_ref);

const currentStepIdx:any = ref(0);
provide(symbolCurrentStepIndex, currentStepIdx);


const schema_form = inject(schemaForm);


const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1;
});

const hasPrevious = computed(() => {
  return currentStepIdx.value > 0;
});

const currentSchema = computed(() => {
  return schema_form.value[currentStepIdx.value];
});

const { handleSubmit } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit( () => {
  load_ref.value = true;
  setTimeout(() => {
    load_ref.value = false;
  }, 300);

  if (!isLastStep.value) {
    currentStepIdx.value++;

    return;
  }
  emit('sendForm');
});

function goToPrev() {
  if (currentStepIdx.value === 0) {
    return;
  }
  currentStepIdx.value--;
}
</script>
