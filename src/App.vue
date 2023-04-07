<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

let showNav = ref(true);
let prevScrollPos = window.pageYOffset;

const handleScroll = () => {
  const currentScrollPos = window.pageYOffset;
  showNav.value = prevScrollPos > currentScrollPos || currentScrollPos < 50;
  prevScrollPos = currentScrollPos;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav :class="{ 'hidden-nav': !showNav, 'visible-nav': showNav }" class="navbar">
    <div class="navbar-inner">
      <RouterLink to="/"> Home </RouterLink>
    </div>
  </nav>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 100;
  /* background-color: rgba(255, 255, 255, 0.9); */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.navbar-inner {
  font-family: "Dahlia";
  font-size: 24px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease-in-out;
}

.navbar-inner a{
  color: white;

}

/* .navbar-inner:hover {
  background-color: rgba(255, 255, 255, 0.6);
} */

.hidden-nav {
  transform: translateY(-100%);
  transition-duration: 0.3s;
}

.visible-nav {
  transform: translateY(0%);
  transition-duration: 0.3s;
}

</style>