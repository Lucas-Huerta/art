<script setup>
import { ref } from 'vue';
import router from '../router';

const props = defineProps({
  artist: null,
})

const imageHover = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)

let card = ref();
let cursorImage = ref();

let cardRect = ref();
let cursorImageRect = ref();

const moveImage = async(event) =>{
  imageHover.value = true
  mouseX.value = event.pageX
  mouseY.value = event.pageY;
  await haveValues();
}

const unMove = async(event) =>{
  imageHover.value = false
}

const assignStyle = async() => {
  let top = mouseY.value - cursorImageRect.value.height / 2
    let left = mouseX.value - cursorImageRect.value.width / 2
  imageStyle.value = {
    top: `${Math.max(0, Math.min(top, window.innerHeight - cursorImageRect.value.height))}px`,
    left: `${Math.max(0, Math.min(left, window.innerWidth - cursorImageRect.value.width))}px`
  }
}

/**
 * Méthode servant à assigner le style selon l'artiste qui est survolé
 */
const haveValues = async() => {
  cardRect.value = await card.value.getBoundingClientRect()
  cursorImageRect.value = await cursorImage.value.getBoundingClientRect();
  await assignStyle();
}

/**
 * Méthode servant à push sur la route de l'artiste en question lorsque qu'on click dessus 
 * @param {*} artist datas de l'artiste passées en props
 */
const goOneArtist = async(artist) => {
    await router.push({
        name: "Artist", 
        params: {
          id: artist.id
        }
    })
}

let imageStyle = ref({});
</script>

<template>
  <div class="oneArtist to-top bloc-couleur couleur-remplissage"
    v-on:mouseenter="moveImage"
    v-on:mouseleave="unMove"
    ref="card"
    @click="goOneArtist(props.artist)"
  >
    <span>
      {{ artist.name }}
    </span>
  </div>
  <div v-if="imageHover" class="cursor-image" :style="imageStyle" ref="cursorImage">
    <img :src="artist.imageHover" alt="img">
  </div>
</template>

<style scoped>

.cursor-image {
  position: fixed;
  pointer-events: none;
  max-width: 100%;
  max-height: 100%;
  z-index: 100;
}

.cursor-image img {
  /* display: block;
  margin: auto; */
  rotate: 90deg;
  width: 50%;
  height: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.oneArtist{
  position: relative;
  height: 100%;
  width: 100%;
  border-bottom: 1px solid black;
}
.oneArtist span{
  color: var(--secondary-color);
  font-size: 90px;
  display: inline-flex;
  width: 100%;
  height: 100%;
  padding-left: 5vh;
}

.oneArtist:hover span{
  color: white;
  z-index: 10;
}

.bloc-couleur {
  position:relative;
  display:inline-block;
  overflow:hidden;
  /* text-align:center; */
  vertical-align:middle;
}

.couleur-remplissage:after{
  content:'';
  display:block;
  position:absolute;
  bottom:0;
  top:0;
  left:0;
  right:0;
  z-index:1;
  background-color: var(--secondary-color);
  transition :  0.35s ease-in-out;
  transition-property : top, bottom, left,right, border-width;
}

.bloc-couleur span{
  position:relative;
  z-index:3;
}
.to-top:after{
  top:100%;
}
.to-top:hover:after{
  top:0%;
}
.to-top:hover span{
  color: white;
  display: block;
  z-index: 10;
}

</style>