<script setup>
import { VueShowdown } from "vue-showdown";

const props = defineProps({
  data: JSON,
});
</script>

<template>
  <div v-if="props.data">
    <VueShowdown :markdown="props.data.content" :options="{ emoji: true }" />
    <p>Updated at : {{ props.data.updated_at }}</p>
    <p>Created at : {{ props.data.created_at }}</p>
  </div>
  <h2 v-if="!props.data">Loading</h2>
</template>

<style scoped>
h1 {
  color: red;
}
</style>
