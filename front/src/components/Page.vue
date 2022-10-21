<script setup>
import { Request } from "./../services/request.js";
import Display from "./Display.vue";
import Editor from "./Editor.vue";

const request = new Request();
const pathName = window.location.pathname;
const isNoPagesAsked = pathName == "/";
var isDisplaying = false;
var isEditing = false;
var isCreating = false;

var req;
var data;
try {
  req = await request.getPage(pathName);
  // Mode display
  data = req.data;
  isDisplaying = true;
} catch (err) {
  if (err.response && err.response.status === 500) {
    // Mode creation -> edition
    isCreating = true;
    isEditing = true;
  }
}
console.log(req);

const makeEdition = () => {
  console.log("edition");
  isDisplaying = false;
  isEditing = true;
};

const makeDisplay = () => {
  isDisplaying = true;
  isEditing = false;
};
</script>

<template>
  <div v-if="isNoPagesAsked">
    <h2>All the pages :</h2>
    <ul>
      <li v-for="item of req.data">
        <a :href="item.id">{{ item.id }}</a>
      </li>
    </ul>
  </div>
  <div v-if="!isNoPagesAsked && isDisplaying">
    <button :onclick="makeEdition">Edit</button>
    <Display :data="data" />
  </div>
  <div v-if="!isNoPagesAsked && isEditing">
    <!-- <button v-if="!isCreating" :onclick="makeDisplay">Display</button> -->
    <Editor :creation="isCreating" />
  </div>
  <div v-if="!isDisplaying && !isEditing">Server error :(</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
