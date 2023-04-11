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
}
.carousel {
  position: relative;
  /* margin: 50px auto; */
  width: 100vw;
  height: 100vh;
  /* height: 400px; */
}

.carousel-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.carousel-item {
  position: absolute;
  display: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-item img{
    width: 100%;
    height: 100%;
}

.carousel-item.active {
  display: block;
}

.carousel-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px;
  /* color: #fff; */
  /* background: rgba(0, 0, 0, 0.5); */
}

.carousel-caption h3 {
  margin: 0;
  font-size: 36px;
}

.carousel-caption p {
  margin: 0;
  font-size: 18px;
}
</style>