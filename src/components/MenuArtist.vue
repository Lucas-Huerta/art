<script setup>

defineProps({
  artist: String,
})

</script>

<template>
    <div class="oneArtist to-top bloc-couleur couleur-remplissage">
        <span>
            {{artist}}
        </span>
    </div>
</template>

<style scoped>

.oneArtist{
    /* rotate: 270deg; */
    border-bottom: 1px solid black;
    height: 100%;
    width: 100%;
}
.oneArtist span{
    color: var(--secondary-color);
    font-family: "Inter";
    font-size: 90px;
    width: 100%;
}

.oneArtist:hover span{
    color: white;
    z-index: 10;
}

.bloc-couleur {
  position:relative;
  display:inline-block;
  overflow:hidden;
  text-align:center;
  vertical-align:middle;
  line-height:150px; 
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