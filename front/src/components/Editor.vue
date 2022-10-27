<script setup>
const props = defineProps({
  creation: Boolean,
  display: Function,
  dataIn: JSON
});
</script>

<script>
const pathName = window.location.pathname;
import {Request} from '../services/request.js';
var textEditor = "# Nouveau document\n ----";

var request = new Request();
export default {
  data() {
    return {
      text: this.creation ? textEditor : this.dataIn.content,
      change: (text) => {this.textEditor = text; console.log(this.textEditor);},
      save: async () => {
        try{
          const req = this.creation ? 
            await request.createPage(pathName, this.textEditor)
            : await request.editPage(pathName, this.textEditor);
          this.display(req.data);
        } catch(e){
          console.error(e);
        }
      }
    };
  },
};
</script>

<template>
  <div style="display : flex; justify-content: right;">
    <button style="background-color: green; font-weight: 600; margin: 5px;" @click="save()">
      <font-awesome-icon icon="fa-solid fa-floppy-disk" style="margin-right: 5px;"></font-awesome-icon>
      Sauvegarder
    </button>
  </div>
  <v-md-editor v-model="text" height="60vh" @change="change(text)"></v-md-editor>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
