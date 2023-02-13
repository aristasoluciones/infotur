<template>
 <form-captura />
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import FormCaptura from "@/components/Captura.vue";
export default defineComponent({
  name: 'NavegacionCaptura',
  components: {
    FormCaptura
  }
});
</script>