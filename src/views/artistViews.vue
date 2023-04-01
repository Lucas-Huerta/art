<script setup>
import { useRoute } from 'vue-router';
import { ref, onBeforeMount } from 'vue';
import { useArtistStore } from '../store/store';

let route = useRoute();
let artist = ref();
let store = useArtistStore()

onBeforeMount(async() => {
    console.log("route", route.params.id);
    await store.getOneArtist(route.params.id);
    artist.value = JSON.parse(localStorage.OneArtist);
    console.log(JSON.parse(localStorage.OneArtist));
})

</script>

<template>
    <div>
        {{ artist }}
        vue artiste
    </div>
</template>