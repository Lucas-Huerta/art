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
    background-color: var(--primary-color);
    border: 1px var(--secondary-color) solid;
    border-radius: 13px;
    width: 10vw;
}

.button:hover{
    color: white;
    background-color: var(--secondary-color);
    border: 1px var(--primary-color) solid;
    border-radius: 13px;
    transition: 0.2s ease-in-out;
}
</style>
