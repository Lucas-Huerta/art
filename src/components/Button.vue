<script setup>

defineProps({
  content: String,
})

</script>

<template>
    <div class="button">
        {{ content }}
    </div>
</template>

<style scoped>

.button{
    font-family: "Dahlia";
    font-size: 28px;
    color: black;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease-in-out;
    border: 1px var(--secondary-color) solid;
    border-radius: 13px;
    width: 10vw;
}

.button:hover{
    color: white;
    border: 1px var(--primary-color) solid;
    border-radius: 13px;
    transition: 0.2s ease-in-out;
}
</style>
