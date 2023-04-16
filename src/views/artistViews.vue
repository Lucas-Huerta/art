<script setup>
import { useRoute } from 'vue-router';
import { ref, onBeforeMount, reactive } from 'vue';
import { useArtistStore } from '../store/store';
import Footer from '../components/Footer.vue';

let route = useRoute();
let artist = ref();
let store = useArtistStore();

onBeforeMount(async() => {
    await store.getOneArtist(route.params.id);
    artist.value = JSON.parse(localStorage.OneArtist);
})

</script>

<template>
    <div class="wrapperArtist">
        <div class="backgoundArtist flex-col" :style="{'background-image': 'url(' + artist.profileImage + ')'}">
            <div class="flex-row rowArtist">
                <h2>
                    {{ artist.name }}
                </h2>
            </div>
        </div>
        <section class="sectionInfos flex-col">
            <div class="flex-row nameArtist">
                <span>
                    {{ artist.name }}
                </span>
            </div>
            <div class="flex-row rowInfos">
                <div class="textInfos">
                    <p>
                        {{ artist.description }}
                    </p>
                </div>
                <div class="flex-col colOeuvre">
                    <div class="flex-row rowOeuvre" v-for="oeuvre in artist.paints" :key="oeuvre">
                        <span>
                            {{ oeuvre.title }}
                        </span>
                        <img class="imageSun" src="/sun.png" alt="sunImg"/>
                    </div>
                </div>
            </div>
        </section>
        <section class="sectionAddInfos flex-row">
            <div class="rotateName flex-row">             
                <span>{{ artist.name }}</span>
            </div>
            <div class="textAdd">
                Greatful artist born in {{ artist.born }} and die in {{ artist.death }} 
                <br>
                who is from {{ artist.Origines }}
            </div>
        </section>
        <Footer />
    </div>
</template>

<style scoped>

.wrapperArtist{
    position: relative;
    background-color: var(--primary-color);
    color: black;
}
.backgoundArtist{
    align-items: start;
    justify-content: end;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    background-position: center;
    background-size: contain;
}
.rowArtist h2{
    font-family: "Dahlia";
    font-weight: bold;
    font-size: 60px;
    margin: 0 0 2vh 2vw;
    color: white;
}

.sectionInfos{
    margin: 5vh 2vw 0 2vw;
}

.sectionInfos .nameArtist span{
    font-family: "Dahlia";
    font-size: 40px;
    font-weight: bold;
}

.sectionInfos .rowInfos{
    width: 100%;
    justify-content: space-between;
}

.textInfos{
    width: 55%;
}

.colOeuvre{
    width: 35%;
    justify-content: space-evenly;
}

.rowOeuvre{
    width: 100%;
    border-bottom: 1px solid black;
    align-items: flex-end;
    justify-content: space-between;
}

.imageSun{
    width: 2vw;
    height: auto;
}

.sectionAddInfos{
    margin: 5vh 0;
    width: 100%;
    height: fit-content;
    justify-content: flex-start;
    align-items: center;
}
.sectionAddInfos .rotateName{
    align-items: center;
    justify-content: flex-start;
    transform: rotate(270deg) ;
    height: 100%;
}

.sectionAddInfos .rotateName hr{
    border: solid 1px black;
}

.sectionAddInfos .rotateName span{
    width: 100%;
}

.sectionAddInfos .textAdd{
    font-family: "Dahlia";
    font-size: 60px;
    font-weight: bold;
}

</style>