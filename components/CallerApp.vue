<script setup>
import { ref } from 'vue';

const props = defineProps({
  isFuncButtonOrder: {
    type: Function,
    required: true,
  },
});

const selectedOption = ref('');
const name = ref('');
const phone = ref('');
const validateSend = ref('');
const validateForm = ref(false);
const successValidate = ref(false);
const showModal = ref(false); // Управление видимостью модального окна

// Валидация формы
const validateFormModal = () => {
  let isValid = true;

  // Валидация телефона
  if (phone.value.length !== 11 || !/^\d+$/.test(phone.value)) {
    validateSend.value = "Проверьте введенные данные. Попробуйте еще раз.";
    isValid = false;
  } else {
    validateSend.value = "";
  }

  // Валидация имени
  if (name.value.length < 2 || !/^[а-яА-ЯёЁa-zA-Z\s]+$/.test(name.value)) {
    validateSend.value = "Проверьте введенные данные. Попробуйте еще раз.";
    isValid = false;
  }

  validateForm.value = !isValid; // Обновляем состояние валидности формы
  return isValid;
};

// Отправка формы
const submitForm = async (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  // Проверяем валидность формы
  if (!validateFormModal()) {
    return; // Если форма невалидна, прерываем отправку
  }

  const formData = {
    name: name.value,
    phone: phone.value,
    course: selectedOption.value,
  };

  try {
    const response = await fetch('http://localhost:3005/api/applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке данных');
    }

    const result = await response.json();
    console.log('Данные успешно отправлены:', result);

    // Показываем модальное окно
    showModal.value = true;
    successValidate.value = true;

    // Очищаем поля формы
    name.value = '';
    phone.value = '';
    selectedOption.value = '';

    // Скрываем модальное окно через 3 секунды
    setTimeout(() => {
      showModal.value = false;
      successValidate.value = false;
    }, 3000);
  } catch (error) {
    console.error('Ошибка:', error);
    validateSend.value = "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.";
  }
};
</script>
<template>
    <div class="caller">
      <div class="top_caller">
        <img src="/public/img/top_footer.jpg" alt="">
      </div>
      <h1>Свяжись с нами</h1>
      <div class="bottom_caller">
        <div class="bottom_caller__left">
          <p class="bottom_caller__left__telephone">+7 921 325 34 31</p>
          <div class="bottom_caller__left__icon">
            <NuxtLink to="https://wa.me/79213253431">
              <img class="bottom_caller__left__icon_image" src="/public/img/whatchap.svg" alt="">
            </NuxtLink>
            <NuxtLink to="https://t.me/AlexandrUltraMen">
              <img class="bottom_caller__left__icon_image" src="/public/img/telegram.svg" alt="">
            </NuxtLink>
            <NuxtLink to="https://vk.com/id431575801">
              <img class="bottom_caller__left__icon_image" src="/public/img/vk.svg" alt="">
            </NuxtLink>
          </div>
        </div>
        <form class="bottom_caller__right" @submit="submitForm">
          <p v-if="validateForm" class="error">{{ validateSend }}</p>
          <div>
            <p class="label">Телефон:</p>
            <input id="phone" type="tel" placeholder="Пример, 89996640447" v-model="phone" maxlength="11" pattern="\d{11}" required>
          </div>
          <div>
            <p class="label">Ваше имя:</p>
            <input type="text" placeholder="Пример, Александр" v-model="name" maxlength="15" minlength="2" required>
          </div>
          <!-- Контейнер для радиокнопок -->
          <div class="checkbox-container">
            <label class="checkbox-label">
              <input type="radio" name="sport" value="горные лыжи" v-model="selectedOption" required> Горные лыжи
            </label>
            <label class="checkbox-label">
              <input type="radio" name="sport" value="сноуборд" v-model="selectedOption" required> Сноуборд
            </label>
          </div>
          <button type="submit" class="button">Записаться</button>
        </form>
      </div>
  
      <!-- Модальное окно -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <p class="success">Ваша заявка успешно отправлена!</p>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
  .success {
    color: rgb(8, 119, 8);
  }
  
  .error {
    color: rgb(171, 51, 51);
  }
  
  .label {
    color: rgb(246, 241, 241);
    font-weight: bold;
    font-style: italic;
    font-size: 20px;
  }
  
  /* Стили для модального окна */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    text-align: center;
  }
  
  .modal-content .success {
    color: rgb(8, 119, 8);
    font-size: 20px;
  }
  
  @media (max-width: 768px) {
    .bottom_caller {
      display: flex;
      flex-direction: column;
      gap: 50px;
    }
  }
  
  input {
    border-bottom: 2px solid white;
    padding: 15px;
  }
  
  .bottom_caller {
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-around;
  }
  
  .bottom_caller__right {
    display: flex;
    flex-direction: column;
    gap: 30px;
    align-items: center;
  }
  
  .checkbox-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: white;
  }
  
  .bottom_caller__left__icon {
    display: flex;
    gap: 20px;
  }
  
  .bottom_caller__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .bottom_caller__left__telephone {
    font-size: clamp(20px, 2vw, 3rem);
    font-weight: bold;
  }
  
  .bottom_caller__left__icon_image {
    width: 30px;
    cursor: pointer;
  }
  
  h1 {
    color: white;
    text-align: center;
    padding: 40px 0px;
  }
  
  img {
    width: 100%;
  }
  
  .footer, .top_footer, .bottom_footer {
    width: 100%;
    height: auto;
    margin: 0 auto;
    background-color: #034184;
    background-color: white;
  }
  
  .caller {
    padding-bottom: 20px;
  }
  </style>