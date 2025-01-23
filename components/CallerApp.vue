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
    <div class="caller">
        <div class="top_caller">
            <img src="/public/img/top_footer.jpg" alt="">
        </div>
        <h1>Свяжись с нами</h1>
        <div class="bottom_caller">
            <div class="bottom_caller__left">
                <p class="bottom_caller__left__telephone">+7 921 325 34 31</p>
                <div class="bottom_caller__left__icon">
                    <NuxtLink to="https://wa.me/79213253431"><img class="bottom_caller__left__icon_image" src="/public/img/whatchap.svg" alt=""></NuxtLink>
                    <NuxtLink to="https://t.me/AlexandrUltraMen"><img class="bottom_caller__left__icon_image" src="/public/img/telegram.svg" alt=""></NuxtLink>
                    <NuxtLink to="https://vk.com/id431575801"><img class="bottom_caller__left__icon_image" src="/public/img/vk.svg" alt=""></NuxtLink>
                </div>
            </div>
            <form class="bottom_caller__right" @submit="submitForm">
                <input type="tel" placeholder="Телефон" v-model="phone">
                <input type="text" placeholder="Ваше имя" v-model="name">
                
                <!-- Контейнер для радиокнопок -->
                <div class="checkbox-container">
                    <label class="checkbox-label">
                        <input type="radio" name="sport" value="горные лыжи" v-model="selectedOption"> Горные лыжи
                    </label>
                    <label class="checkbox-label">
                        <input type="radio" name="sport" value="сноуборд" v-model="selectedOption"> Сноуборд
                    </label>
                </div>
                
                <button type="submit" class="button">Записаться</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 768px) {
   .bottom_caller{
    display: flex;
    flex-direction: column;
    gap: 20px;
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
    gap: 20px;
    align-items: center;
}

.checkbox-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start; /* Выравнивание по левому краю */
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