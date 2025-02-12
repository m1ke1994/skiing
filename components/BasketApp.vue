<script setup>
import { ref, computed } from 'vue';
import { useBasketStore } from '~/stores/basketStore';
import { useRouter } from 'vue-router'; // Импортируем useRouter для перенаправления
const url='http://localhost:3005'
/* -----------------------------Корзина-------------------------------- */
const props = defineProps({
  isFuncBasket: Function,
});
const basketStore = useBasketStore();
const router = useRouter(); // Инициализируем useRouter

const cartItems = computed(() => basketStore.basket); // Данные о товарах из хранилища
const showForm = ref(false); // Состояние для отображения формы
const formData = ref({
  name: '',
  phone: ''
});

// Удаление товара по индексу
const removeItem = (index) => {
  cartItems.value.splice(index, 1);
};

// Асинхронная функция для отправки данных на сервер
const submitForm = async () => {
  // Собираем данные для отправки
  const requestData = {
    items: cartItems.value, // Данные о товарах
    name: formData.value.name, // Имя пользователя
    phone: formData.value.phone // Телефон пользователя
  };

  try {
    // Отправляем данные на сервер
    const response = await fetch(`${url}/api/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке данных');
    }

    const result = await response.json();
    console.log('Ответ от сервера:', result);

    // Очищаем корзину
    basketStore.clearBasket(); // Вызываем метод для очистки корзины

    // Очищаем форму и закрываем модальное окно
    showForm.value = false;
    formData.value = { name: '', phone: '' };

    // Перенаправляем на главную страницу
    router.push('/'); // Перенаправление на главную страницу

    alert('Заявка успешно отправлена!');
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
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
          <span class="cart-item__price">{{ item.price }} ₽</span>
          <button @click="removeItem(index)" class="cart-item__remove">×</button>
        </div>
      </div>
      <button @click="showForm = true" class="cart-modal__checkout">Оставить заявку</button>
    </div>

    <!-- Модальное окно для формы -->
    <div v-if="showForm" class="form-modal">
      <div class="form-modal__overlay" @click="showForm = false"></div>
      <div class="form-modal__content">
        <h2>Оставить заявку</h2>
        <!-- Отображение данных о товаре -->
        <div class="cart-items">
          <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <span class="cart-item__name">{{ item.title }} ({{ item.category }})</span>
            <span class="cart-item__price">{{ item.price }} ₽</span>
            <!-- Кнопка удаления товара -->
            <button @click="removeItem(index)" class="cart-item__remove">×</button>
          </div>
        </div>
        <!-- Форма для ввода данных -->
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Имя:</label>
            <input type="text" id="name" v-model="formData.name" required>
          </div>
          <div class="form-group">
            <label for="phone">Телефон:</label>
            <input type="tel" id="phone" v-model="formData.phone" required>
          </div>
          <button type="submit" class="form-modal__submit">Отправить заявку</button>
        </form>
      </div>
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

.form-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.form-modal__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.form-modal__content {
  position: relative;
  width: 400px; /* Увеличили ширину для удобства */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  color: #007bff; /* Синий цвет текста для заголовка и лейблов */
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #007bff; /* Синий цвет для лейблов */
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #000000; /* Черный цвет текста при вводе */
}

.form-group input::placeholder {
  color: #ccc; /* Цвет плейсхолдера */
}

.form-modal__submit {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.form-modal__submit:hover {
  background-color: #0056b3;
}
</style>