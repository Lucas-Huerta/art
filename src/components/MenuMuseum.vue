<script setup>
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
      // core version + navigation, pagination modules:
    import {Swiper, SwiperSlide} from 'swiper/vue';
    import { Pagination, Navigation } from 'swiper';
    // import Swiper and modules styles
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    let items = ref();
    let modules = [Navigation, Pagination]

    // const swiper = new Swiper('.swiper', {
    //     modules: [Navigation],
    //     // Optional parameters
    //     direction: 'vertical',
    //     loop: true,

    //     // If we need pagination
    //     pagination: {
    //         el: '.swiper-pagination',
    //     },

    //     // Navigation arrows
    //     navigation: {
    //         nextEl: '.swiper-button-next',
    //         prevEl: '.swiper-button-prev',
    //     },
    // });

    onMounted(async() => {
        items.value = await axios.get('/data.json');
        items.value = await items.value.data.museum
    })
</script>

<template>
    <swiper 
    :slidesPerView="1"
    :spaceBetween="30"
    :loop="true"
    :pagination="{
      clickable: true,
    }"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
  >
    <swiper-slide v-for="(item, index) in items" :key="index">
        <img :src="item.image" :alt="item.name">
        <div class="carousel-caption">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
        </div>
    </swiper-slide>
  </swiper>
</template>

<style scoped>

.swiper {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.swiper img {
  width: 100%;
  height: 100%;
}
.carousel-caption {
  width: 100%;
  height: 20vh;
  padding: 15px;
  position: absolute;
  bottom: 0;
  /* color: #fff; */
  /* background: rgba(0, 0, 0, 0.5); */
  /* color: white; */
  /* display: flex; */
  /* justify-content: center;
  align-items: center; */
  /* height: 100%;
  padding: 0 20px; */
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease-in-out;
}

.carousel-caption h3 {
    font-weight: bold;
    font-family: "Dahlia";
    margin: 0 2vw;
    font-size: 36px;
}

.carousel-caption p {
    margin: 0 2vw;
    font-size: 18px;
}
</style>