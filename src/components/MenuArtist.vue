<script setup>

defineProps({
  artist: String,
})

</script>

<template>
    <div class="oneArtist">
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

</style>