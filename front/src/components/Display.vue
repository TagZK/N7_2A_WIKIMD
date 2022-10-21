<script setup>
defineProps({
  pathName: String,
});

const pathName = window.location.pathname;

console.log(window.location.pathname);
</script>

<template>
  <h1>Display ;)</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
