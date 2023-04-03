<script setup>
import { useRoute } from 'vue-router';
import { ref, onBeforeMount, reactive } from 'vue';
import { useArtistStore } from '../store/store';

let route = useRoute();
let artist = ref();
let store = useArtistStore();

onBeforeMount(async() => {
    await store.getOneArtist(route.params.id);
    artist.value = JSON.parse(localStorage.OneArtist);
})

</script>

<template>
    <div class="backgoundArtist" :style="{'background-image': 'url(' + artist.profileImage + ')'}">
    </div>
    <div class="flex-row rowArtist">
        <span>
            {{ artist.name }}
        </span>
    </div>
</template>

<style scoped>

.backgoundArtist{
    position: absolute;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-size: contain;
}
</style>