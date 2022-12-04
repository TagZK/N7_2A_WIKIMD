<script setup>
import { Request } from "./../services/request.js";
import Display from "./Display.vue";
import Editor from "./Editor.vue";
</script>

<script>
//Socket
import { onBeforeUnmount, onMounted } from "vue";

const request = new Request();
const pathName = window.location.pathname;

let isDisplayingTmp = false;
let isCreatingTmp = false;
let isEditingTmp = false;;

var req = await request.getPage(pathName);
var dataFromRequest = req.data[0];
if(req.data.length == 0){
  // Mode creation -> edition
  isCreatingTmp = true;
  isEditingTmp = true;
} else {
  // Mode display
  isDisplayingTmp = true;
}

import io from 'socket.io-client';
let socket = io("http://localhost:3030")

export default{
  setup(){
    onMounted(() => {
      console.log(test)
    }),
    onBeforeUnmount(() => {
      socket.disconnect();
    })
  },
  data(){
    return{
      isDisplaying: isDisplayingTmp,
      isCreating: isCreatingTmp,
      isEditing: isEditingTmp,
      isNoPagesAsked: pathName == "/",
      dataFromRequest,
      reqState : req,
      socket : socket.on("patched", (item) =>{
        if(this.dataFromRequest.id == item.id){
          this.dataFromRequest = item;
        }
      }).on("posted", (item) => {
        if(pathName == "/"){
          console.log('add')
          console.log(item)
          this.reqState.data.push(item);
        } else{
          this.dataFromRequest = item;
        }
      }).on("posted", (item) => {
        
      })
    }
  },
  methods:{
    //data = data d'une requête
    makeDisplay(data){
      if(data) this.dataFromRequest = data;
      this.isDisplaying = true;
      this.isEditing = false;
      this.isCreating = false;
    },
    //data = data d'une requête
    makeEdition(data) {
      if(data) this.dataFromRequest = data;
      this.isDisplaying = false;
      this.isEditing = true;
    }
  }
}


</script>

<template>
  <div v-if="isNoPagesAsked" style="text-align:center">
    <h1>Welcome to our Wiki !</h1>
    <h2>All the pages created :</h2>
      <p v-if="(this.reqState.data.length === 0)" >No pages created. Make the first one by adding a path to the url !</p>
      <div v-for="item of this.reqState.data">
        <a :href="item.pathName" style="color:#C850C0; font-weight: 600;">{{ item.pathName }}</a>
      </div>
  </div>
  <div v-if="!isNoPagesAsked && isDisplaying">
    <button @click="makeEdition()" style="background-color:#4158D0; font-weight:600;">
      <font-awesome-icon icon="fa-solid fa-pen" style="margin-right: 5px;"></font-awesome-icon>
      Edit
    </button>
    <Display :data="dataFromRequest" :socket="socket"/>
  </div>
  <div v-if="!isNoPagesAsked && isEditing">
    <Editor :creation="isCreating" :display="makeDisplay" :dataIn="dataFromRequest" :socket="socket"/>
  </div>
  <div v-if="!isDisplaying && !isEditing">Server error :(</div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
