<script setup>
import { Request } from "./../services/request.js";
import Display from "./Display.vue";
import Editor from "./Editor.vue";
</script>

<script>
const request = new Request();
const pathName = window.location.pathname;

let isDisplayingTmp = false;
let isCreatingTmp = false;
let isEditingTmp = false;;

var req;
var dataFromRequest;
try {
  req = await request.getPage(pathName);
  // Mode display
  dataFromRequest = req.data;
  isDisplayingTmp = true;
} catch (err) {
  if (err.response && err.response.status === 500) {
    // Mode creation -> edition
    isCreatingTmp = true;
    isEditingTmp = true;
  }
}

console.log(req);

export default{
  data(){
    return{
      isDisplaying: isDisplayingTmp,
      isCreating: isCreatingTmp,
      isEditing: isEditingTmp,
      isNoPagesAsked: pathName == "/",
      dataFromRequest
    }
  },
  methods:{
    //data = data d'une requête
    makeDisplay(data){
      console.log("display");
      if(data) this.dataFromRequest = data;
      this.isDisplaying = true;
      this.isEditing = false;
      this.isCreating = false;
      console.log(data)
    },
    //data = data d'une requête
    makeEdition(data) {
      console.log("edition");
      if(data) {
        this.dataFromRequest = data;
        console.log("data passée ?")
      }
      this.isDisplaying = false;
      this.isEditing = true;
      console.log(data)
    }
  }
}


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
    <button @click="makeEdition()">Edit</button>
    <Display :data="dataFromRequest" />
  </div>
  <div v-if="!isNoPagesAsked && isEditing">
    <!-- <button v-if="!isCreating" :onclick="makeDisplay">Display</button> -->
    <Editor :creation="isCreating" :display="makeDisplay" :dataIn="dataFromRequest" />
  </div>
  <div v-if="!isDisplaying && !isEditing">Server error :(</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
