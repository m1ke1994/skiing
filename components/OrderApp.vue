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

const submitForm = async (event) => {
  /* event.preventDefault(); // Предотвращаем стандартное поведение формы */

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
    alert('Ваша заявка успешно отправлена!');
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.');
  }
};
</script>

<template>
  <div class="order">
    <div class="order__top">
      <img class="order__top__logo" src="/public/img/logo.svg" alt="">
      <img @click="props.isFuncButtonOrder" class="order__top__close" src="/public/img/close.svg" alt="">
    </div>
    <div class="order__bottom">
      <h2>Запись на курс</h2>
      <p class="order__bottom__text">Оставьте заявку, мы вам позвоним и подберём курс для вас.</p>
      <form @submit="submitForm">
        <input type="text" placeholder="Имя" v-model="name" required>
        <input type="text" placeholder="Телефон" v-model="phone" required>
        
        <div class="checkbox-group">
          <label>
            <input type="radio" v-model="selectedOption" value="Горные лыжи" required>
            Горные лыжи
          </label>
          <label>
            <input type="radio" v-model="selectedOption" value="Сноуборд" required>
            Сноуборд
          </label>
        </div>

        <button type="submit" class="button">Записаться</button>
      </form>
      <p>Нажимая на кнопку «Записаться», вы даёте согласие на хранение и обработку ваших персональных данных.</p>
    </div>
  </div>
</template>

<style scoped>
input[type="text"] {
  border: 1px solid #034184;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: black; /* Добавьте это свойство */
}
.order {
  position: relative;
  width: 100%;
  height: auto;
  background-color: white;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
}

.order__top {
  background: linear-gradient(180deg, #b2b9c1, #034184);
  width: 100%;
  height: auto;
  padding: 20px;
  background-size: cover;
  text-align: center;
}

.order__top__logo {
  margin: 0 auto;
}

.order__top__close {
  position: absolute;
  top: 0;
  right: 0;
  margin: 20px;
  cursor: pointer;
  transition: all ease 0.5s;
}

.order__top__close:hover {
  transform: scale(1.1);
}

.order__bottom {
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}

h2 {
  color: #034184;
  font-weight: bold;
  font-size: 1.8rem;
  text-align: center;
}

.order__bottom__text {
  font-size: 1.2rem;
  color: #034184;
  margin-bottom: 20px;
  text-align: center;
}

form {
  width: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

input[type="text"] {
  border: 1px solid #034184;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

input[type="text"]::placeholder {
  color: #034184;
}

.checkbox-group {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  
}

.checkbox-group label {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #034184;
}

.checkbox-group input[type="radio"] {
  margin-right: 10px;
}

.button {
  background-color: #034184;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color ease 0.3s;
}

.button:hover {
  background-color: #0675ec;
}

p {
  font-size: 0.9rem;
  color: #034184;
  margin-top: 20px;
  text-align: center;
}

/* Адаптивность для экранов меньше 1200px */
@media (max-width: 1200px) {
  .order {
    width: 100%;
  }

  h2 {
    font-size: 1.6rem;
  }

  .order__bottom__text {
    font-size: 1.1rem;
  }

  input[type="text"] {
    font-size: 1.1rem;
  }

  .checkbox-group label {
    font-size: 1.1rem;
  }

  .button {
    font-size: 1.1rem;
  }
}

/* Адаптивность для экранов меньше 992px */
@media (max-width: 992px) {
  .order {
    width: 100%;
  }

  h2 {
    font-size: 1.5rem;
  }

  .order__bottom__text {
    font-size: 1rem;
  }

  input[type="text"] {
    font-size: 1rem;
  }

  .checkbox-group label {
    font-size: 1rem;
  }

  .button {
    font-size: 1rem;
  }
}

/* Адаптивность для экранов меньше 768px */
@media (max-width: 768px) {
  .order {
    width: 100%;
  }

  h2 {
    font-size: 1.4rem;
  }

  .order__bottom__text {
    font-size: 0.9rem;
  }

  input[type="text"] {
    font-size: 0.9rem;
  }

  .checkbox-group label {
    font-size: 0.9rem;
  }

  .button {
    font-size: 0.9rem;
  }
}

/* Адаптивность для экранов меньше 576px */
@media (max-width: 576px) {
  .order {
    width: 100%;
  }

  h2 {
    font-size: 1.3rem;
  }

  .order__bottom__text {
    font-size: 0.8rem;
  }

  input[type="text"] {
    font-size: 0.8rem;
  }

  .checkbox-group label {
    font-size: 0.8rem;
  }

  .button {
    font-size: 0.8rem;
  }
}

/* Адаптивность для экранов меньше 400px */
@media (max-width: 400px) {
  .order {
    width: 100%;
  }

  h2 {
    font-size: 1.2rem;
  }

  .order__bottom__text {
    font-size: 0.7rem;
  }

  input[type="text"] {
    font-size: 0.7rem;
  }

  .checkbox-group label {
    font-size: 0.7rem;
  }

  .button {
    font-size: 0.7rem;
  }
}
</style>