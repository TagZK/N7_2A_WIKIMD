<script setup>
import Page from "./components/Page.vue";
</script>

<template>
  <nav class="hide-print"><a class="logo-ref" href="/">WIKI.MD</a></nav>

  <div class="content">
    <Suspense>
      <Page />
    </Suspense>
  </div>

  <footer>A project made by Julien DAVIDOU and Emrick PESCE. :)</footer>
</template>

<style scoped></style>
