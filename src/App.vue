<script setup>
import Button from './components/Button.vue';
import index from './components/StarryNight/index.vue';
</script>

<template>
  <index class="test"/>
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
</template>

<style scoped>

.heroWrapper{
  height: 100%;
  width: 100%;
  justify-content: space-between;
}

.heroWrapper .heroButton{
  align-self: flex-end;
}
</style>
