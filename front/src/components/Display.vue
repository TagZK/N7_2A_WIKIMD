<script setup>
const props = defineProps({
  data: JSON,
});
</script>

<template>
  <div v-if="props.data">
    <div>{{ props.data.content }}</div>
    <p>Updated at : {{ props.data.updated_at }}</p>
    <p>Created at : {{ props.data.created_at }}</p>
  </div>
  <h2 v-if="!props.data">Loading</h2>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
