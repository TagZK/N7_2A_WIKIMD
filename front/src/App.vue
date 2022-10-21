<script setup>
import Page from "./components/Page.vue";
</script>

<template>
  <header>
    <h1>Welcome to our <a href="/" >Wiki</a> !</h1>
  </header>
  <Suspense>
    <Page />
  </Suspense>
  <footer>A project made by Julien DAVIDOU and Emrick PESCE. :)</footer>
</template>

<style scoped></style>
