<script setup lang="ts">
const items = [
  '/img/100.jpg',
  '/img/101.jpg',
  '/img/102.jpg',
  '/img/103.jpg',
  '/img/104.jpg',
  '/img/105.jpg',
  '/img/106.jpg',
  '/img/107.jpg',

]
</script>

<template>
  <div class="slederPrePhoto">
    <h1>Фотографии с прошлых сезонов</h1>
  
  <div class="sliders">
    <UCarousel
    v-slot="{ item }"
    :items="items"
    :ui="{
      item: 'basis-full',
      container: 'rounded-lg'
    }"
    :prev-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-left-20-solid',
      class: '-start-12'
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-right-20-solid',
      class: '-end-12'
    }"
    arrows
    class="w-4/6 mx-auto"
  >
    <img :src="item" class="w-full" draggable="false">
  </UCarousel>
  </div>
</div>
  
</template>
<style scoped>
.slederPrePhoto{
  width: 100%;
  background-color: white;
  padding: 50px 0;
}
h1{
  text-align: center;
  padding: 40px 0;
  color: #034184;
}
.sliders{
  width: 70%;
  margin:  0 auto;
 
}
</style>