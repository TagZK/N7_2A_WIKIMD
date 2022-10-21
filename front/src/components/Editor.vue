<script setup>
defineProps({
    creation: Boolean,
});

const pathName = window.location.pathname;

console.log(window.location.pathname);
</script>

<template>
  <h1>Editor :)</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
