<script setup>
import { Request } from "./../services/request.js";
import Display from "./Display.vue";
import Editor from "./Editor.vue";

const request = new Request();
const pathName = window.location.pathname;
var isDisplaying = false;
var isEditing = false;
var isCreating = false;

console.log(window.location.pathname);
var req;
try {
  req = await request.getPage(pathName);
  // Mode display
  isDisplaying = true;
} catch (err) {
  if (err.response && err.response.status === 500) {
    // Mode creation -> edition
    isCreating = true;
    isEditing = true;
  }
}
console.log(req);
</script>

<template>
  <Display v-if="isDisplaying" />
  <Editor v-if="isEditing" :creation="isCreating" />
  <div v-if="!isDisplaying && !isEditing">Server error :(</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
