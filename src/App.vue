<script setup>
import Button from './components/Button.vue';
import index from './components/StarryNight/index.vue';
import MenuArtist from './components/MenuArtist.vue';

// Début, implémenter back ensuite
let tabArtists = ["oui", "deux", "trois", "adbehdj", "oui", "hihihihihihihihih"]

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
      <MenuArtist v-for="index in tabArtists" :key="index" :artist="index"/>
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

#wrapper{
  background-color: var(--primary-color);
  min-height: 80vh;
  width: 100vw;
  align-items: end;
}

.rowArtists{
  justify-content: space-evenly;
  align-items: center;
  height: fit-content;
  width: 100%;
}
</style>
