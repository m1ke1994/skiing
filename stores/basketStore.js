import { defineStore } from 'pinia';

export const useBasketStore = defineStore('basket', {
  state: () => ({
    basket: [] // Начальное состояние корзины
  }),
  actions: {
    // Добавление курса в корзину
    addToBasket(course) {
      this.basket.push(course);
    },
    // Очистка корзины (опционально)
    clearBasket() {
      this.basket = [];
    }
  },
  getters: {
    // Получение количества курсов в корзине (опционально)
    basketCount: (state) => state.basket.length,
    // Получение общей стоимости курсов в корзине (опционально)
    totalPrice: (state) => state.basket.reduce((total, course) => total + parseFloat(course.price.replace(/[^0-9.-]+/g, '')), 0)
  }
});