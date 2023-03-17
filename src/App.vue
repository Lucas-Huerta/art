<script setup>
import Button from './components/Button.vue';
import index from './components/StarryNight/index.vue';
import MenuArtist from './components/MenuArtist.vue';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

let dataArtist = ref(); 

onBeforeMount(async() =>{
  await callData();
})

// onUpdated(async() =>{
//   await callData();
//   console.log("oui oui ");
// })

const callData = async() =>{
  let response = await axios.get('/data.json');
  dataArtist.value = await response.data;
}
</script>

<template>
  <index />
  <section class="heroWrapper flex-col">
    <div class="heroTitle">
      <h1>
        Discover art of the world
      </h1>
    </div>
    <div class="heroButton">
      <Button content="Art" />
    </div>
  </section>
  <section id="wrapper" class="flex-row">
    <div class="rowArtists flex-col">
      <!-- Faire un v-for avec un tab sans backend pour l'instant  -->
      <MenuArtist v-for="artist in dataArtist.artists" :key="artist" :artist="artist"/>
    </div>
  </section>
</template>

<style scoped>

.heroWrapper{
  height: 100vh;
  width: 100%;
  justify-content: space-between;
}

.heroWrapper h1{
  margin: 2vh 0 0 2vw;
}

.heroWrapper .heroButton{
  align-self: flex-end;
  margin: 0 2vw 2vh 0;
}

/* Utiliser calc en fonction de heigth et width, voir même variable en script */
#wrapper{
  background-color: var(--primary-color);
  transform: rotate(270deg);
  /* min-height: 80vh; */
  width: 100vw;
  height: 100vw;
  justify-content: center;
  align-items: center;
}

.rowArtists{
  /* justify-content: space-evenly; */
  /* align-items: center; */
  /* height: fit-content; */
  height: 100%;
  width: 100%;
}
</style>
