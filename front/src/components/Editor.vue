<script setup>
const props = defineProps({
  creation: Boolean,
  display: Function,
  displayHome : Function,
  dataIn: JSON,
  socket : Object
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
      change: (text) => {this.textEditor = text;},
      save: async () => {
        try{
          const req = this.creation ? 
            await request.createPage(pathName, this.textEditor)
            : await request.editPage(this.dataIn.id, pathName, this.textEditor);
          if (!this.creation){
            this.socket.emit('patch',req.data);
          } else {
            this.socket.emit('post', req.data);
          }
          this.display();
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
    <button style="background-color: #FFCC70; font-weight: 600; margin: 5px;" @click="save()">
      <font-awesome-icon icon="fa-solid fa-floppy-disk" style="margin-right: 5px;"></font-awesome-icon>
      Sauvegarder
    </button>
  </div>
  <v-md-editor 
    v-model="text" 
    mode="edit" 
    left-toolbar="h bold italic quote | ul ol table hr | link image code"
    right-toolbar="preview"
    height="60vh"
    @change="change(text)"
  >
  </v-md-editor>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
