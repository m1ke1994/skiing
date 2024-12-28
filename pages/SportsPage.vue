
<script setup>
import { ref } from 'vue';
/* ------------------------------Корзина------------------------------- */
const isBasket = ref(false);
const isFuncBasket = () => {
  isBasket.value = !isBasket.value;
};

/* -----------------------------Кнопка заказа---------------------------- */
const isButtonOrder = ref(false);
const isFuncButtonOrder = () => {
  isButtonOrder.value = !isButtonOrder.value;
};
</script>

<template>
  <div class="conteiner">
    <header>
      <HeaderApp :isFuncBasket="isFuncBasket" :isBasket="isBasket"></HeaderApp>
    </header>
    <main>
      <ul>
        <li v-if="isBasket"><BasketApp :isFuncBasket="isFuncBasket"></BasketApp></li>
        <li v-if="isButtonOrder" class="overlay"></li>
        <li v-if="isButtonOrder" class="order__modal">
          <OrderApp :isFuncButtonOrder="isFuncButtonOrder"></OrderApp>
        </li>
        <li v-if="!isButtonOrder">
          <button @click="isFuncButtonOrder" class="button_order">Записаться</button>
        </li>
      </ul>
      
      <AppChangeSport></AppChangeSport>
      <How></How>
      <Schedule></Schedule>
      <RewiewApp></RewiewApp>
      <SliderPhotoPreSesons></SliderPhotoPreSesons>
      <CallerApp></CallerApp>
    </main>
    <footer>
      <FooterApp></FooterApp>
    </footer>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
}

.order__modal {
  position: fixed;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 600px;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.button_order:hover {
  background: linear-gradient(180deg, #034184, #0675ec);
  color: white;
  transition: all ease 0.5s;
}

.button_order {
  font-weight: bold;
  top: 90vh;
  right: 5%;
  z-index: 999;
  position: fixed;
  color: #0a0a0a;
  background: rgb(236, 147, 3);
  border: none;
  text-align: center;
  padding: 10px 30px;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 20px 0;
}
</style>