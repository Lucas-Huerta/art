<script setup>
import Button from '../components/Button.vue';
import index from '../components/StarryNight/index.vue';
import MenuArtist from '../components/MenuArtist.vue';
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import MenuMuseum from '../components/MenuMuseum.vue';
import Footer from '../components/Footer.vue';

let dataArtist = ref(); 

onBeforeMount(async() =>{
  await callData();
})

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
  <section id="wrapper" class="flex-col">
    <div class="rowArtists flex-col">
      <!-- Faire un v-for avec un tab sans backend pour l'instant  -->
      <MenuArtist v-for="artist in dataArtist.artists" :key="artist" :artist="artist"/>
    </div>
  </section>
  <section id="wrapperMuseum" class="flex-col">
    <div class="MuseumSection">
      <h2>
        Discover fabulous museum
      </h2>
      <div class="rowMuseum">
        <MenuMuseum />
      </div>
    </div>
  </section>

  <section id="wrapperFooter">
    <Footer />
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
  border-bottom: 1px solid black;
}

.rowArtists{
  height: 100%;
  width: 100%;
  position: relative;
}

#wrapperMuseum {
  width: 100vw;
  height: fit-content;
}
#wrapperMuseum .MuseumSection{
  width: 100%;
  height: 100%;
  background-color: var(--primary-color);
  color: var(--secondary-color);
}

.MuseumSection h2{
  margin-right: 2vw;
  font-family: "Dahlia";
  font-size: 40px;
  text-align: right;
}

#wrapperFooter{
  background-color: var(--primary-color);
  width: 100vw;
  height: fit-content;
  color: var(--secondary-color);
}
</style>
