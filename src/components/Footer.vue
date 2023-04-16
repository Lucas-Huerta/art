<script setup>
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

let dataArtist = ref(); 
onBeforeMount(async() =>{
  await callData();
})

const callData = async() =>{
  let response = await axios.get('/data.json');
  dataArtist.value = await response.data.artists;
}

</script>

<template>
  <footer>
    <div class="flex-row">
        <h2>
          Hope you like ! 
        </h2>
    </div>
    <div class="mainFooter flex-row">
      <div class="flex-col">
        <div class="rsFooter flex-row">
          <a href="https://github.com/Lucas-Huerta" alt="lien Github" class="RSLink" target="_blank">
            Git
          </a>
          <a href="https://www.linkedin.com/in/lucas-huerta13/" altt="lien linkedin" class="RSLink" target="_blank">
            Linkedin
          </a>
        </div>
      </div>
      <div class="flex-col">
        <div class="flex-row">
          Some of my favorite painters
        </div>
        <div class="flex-col">
          <div class="flex-row" v-for="(art, index) in dataArtist" :key="index"> 
            <span class="favArtist">{{art.favoris == "true" ? art.name : ''}}</span>
          </div>
        </div>
      </div>
    </div>
      <div class="legalFooter flex-row">
        <span>Just a personnal project</span>
        <span>2023</span>
        <span>Lucas Huerta</span>
      </div>
  </footer>
</template>

<style>

footer{
  background-color: var(--primary-color);
  height: 100%;
  margin: 0 2vw 0 2vw ;
}

footer h2{
  font-family: "Dahlia";
  font-size: 40px;
}

.mainFooter{
  justify-content: space-between;
}

.rsFooter{
  gap: 5vw;
}

.RSLink{
  box-shadow: inset 0 0 0 0 var(--secondary-color);
  color: var(--secondary-color);
  margin: 0 -.25rem;
  padding: 0 .25rem;
  transition: color .3s ease-in-out, box-shadow .3s ease-in-out;
}

.RSLink:hover{
  box-shadow: inset 100px 0 0 0 var(--secondary-color);
  color: white;
}

.favArtist{
  font-family: "Dahlia";
  font-size: 20px;
}

.rsFooter a{
  color: black;
}

.legalFooter{
  padding: 1vh 0;
  justify-content: space-between;
  font-family: "Dahlia";
}
</style>