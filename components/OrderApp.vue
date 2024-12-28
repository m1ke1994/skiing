
<script setup>
const props = defineProps({
  isFuncButtonOrder: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="order">
    <div class="order__top">
      <img class="order__top__logo" src="/public/img/logo.svg" alt="">
      <img @click="props.isFuncButtonOrder" class="order__top__close" src="/public/img/close.svg" alt="">
    </div>
    <div class="order__bottom">
      <h2>Запись на курс по горным лыжам</h2>
      <p class="order__bottom__text">Оставьте заявку, мы вам позвоним и подберём курс для вас.</p>
      <form action="#">
        <input type="text" placeholder="Имя">
        <input type="text" placeholder="Телефон">
        <button class="button">Записаться</button>
      </form>
      <p>Нажимая на кнопку «Записаться», вы даёте согласие на хранение и обработку ваших персональных данных.</p>
    </div>
  </div>
</template>

<style scoped>
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

input {
  border: 1px solid #034184;
  width: 100%;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

input::placeholder {
  color: #034184;
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

  input {
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

  input {
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

  input {
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

  input {
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

  input {
    font-size: 0.7rem;
  }

  .button {
    font-size: 0.7rem;
  }
}
</style>