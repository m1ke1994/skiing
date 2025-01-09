
<script setup>
import { ref, computed } from 'vue';
import { useBasketStore } from '~/stores/basketStore';

/* -----------------------------Корзина-------------------------------- */
const props = defineProps({
  isFuncBasket: Function,
});
const basketStore = useBasketStore();

const cartItems = computed(() => basketStore.basket);


const removeItem = (index) => {
  cartItems.value.splice(index, 1);
};

const increaseQuantity = (index) => {
  cartItems.value[index].quantity += 1;
};

const decreaseQuantity = (index) => {
  if (cartItems.value[index].quantity > 1) {
    cartItems.value[index].quantity -= 1;
  } else {
    removeItem(index);
  }
};


</script>

<template>
  <div class="cart-modal">
    <div class="cart-modal__overlay" @click="props.isFuncBasket"></div>
    <div class="cart-modal__content">
      <button @click="props.isFuncBasket" class="cart-modal__close">×</button>
      <h2>Записаться на курсы</h2>
      <div class="cart-items">
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <span class="cart-item__name">{{ item.title }} ({{ item.category }})</span>
         
          <span class="cart-item__price">{{ item.price  }} ₽</span>
          <button @click="removeItem(index)" class="cart-item__remove">×</button>
        </div>
      </div>
      <div class="cart-total">
        
       
      </div>
      <button class="cart-modal__checkout">Оставить заявку</button>
    </div>
  </div>
</template>

<style scoped>
.cart-modal {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.cart-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.cart-modal__content {
  position: relative;
  width: 300px;
  height: 100%;
  background-color: #ffffff;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  color: #000000;
}

.cart-modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #000000;
}

.cart-modal__close:hover {
  color: #ff0000;
}

.cart-items {
  margin-top: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.cart-item__name {
  flex: 1;
  margin-right: 10px;
}

.cart-item__quantity {
  display: flex;
  align-items: center;
  gap: 5px;
}

.cart-item__quantity button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.cart-item__quantity button:hover {
  background-color: #0056b3;
}

.cart-item__price {
  margin: 0 10px;
  min-width: 60px;
  text-align: right;
}

.cart-item__remove {
  background: none;
  border: none;
  color: #ff0000;
  font-size: 16px;
  cursor: pointer;
}

.cart-item__remove:hover {
  color: #cc0000;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-weight: bold;
  padding-top: 10px;
  border-top: 1px solid #ddd;
}

.cart-modal__checkout {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;
}

.cart-modal__checkout:hover {
  background-color: #0056b3;
}
</style>