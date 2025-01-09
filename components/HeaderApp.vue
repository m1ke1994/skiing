<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  isFuncBasket: Function,
});

const isMenu = ref(false);
const isMenuFunc = () => {
  isMenu.value = !isMenu.value;
};

const snowflakes = ref([]);
const backgroundIndex = ref(0);
const backgrounds = ['/img/back3.jpg', '/img/back1.jpg', '/img/back2.jpg','/img/back.jpg'];
const isMobile = ref(false);
const isBackgroundAnimationEnabled = ref(true); // Добавляем флаг для управления анимацией фона

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1030;
  isBackgroundAnimationEnabled.value = window.innerWidth >= 1000; // Отключаем анимацию при ширине < 1000px
};

onMounted(() => {
  for (let i = 0; i < 50; i++) {
    snowflakes.value.push({
      id: i,
      x: Math.random() * 100,
      y: -Math.random() * 100,
      size: Math.random() * 30,
      speed: Math.random() * 5 + 20,
    });
  }

  const backgroundInterval = setInterval(() => {
    if (isBackgroundAnimationEnabled.value) { // Меняем фон только если анимация включена
      backgroundIndex.value = (backgroundIndex.value + 1) % backgrounds.length;
    }
  }, 10000);

  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);

  onBeforeUnmount(() => {
    clearInterval(backgroundInterval); // Очищаем интервал при размонтировании
    window.removeEventListener('resize', checkScreenSize);
  });
});
</script>

<template>
    <div class="header_conteiner" v-if="!isMobile">
      <div class="header_menu">
        <ul class="header_menu_left">
          <NuxtLink to="/">
             <img src="/public/img/logo.svg" alt="">
          </NuxtLink>
          <NuxtLink to="/SportsPage">
            <li class="nav_text">Лыжи</li>
          </NuxtLink>
          <NuxtLink to="/SportsPage">
            <li class="nav_text">Сноуборд</li>
          </NuxtLink>
          <NuxtLink to="#trip">
            <li class="nav_text">Поездки</li>
          </NuxtLink>
          <NuxtLink to="#now">
            <li class="nav_text">Как это было</li>
           
          </NuxtLink>
        </ul>
        <ul class="header_menu_right">
          <NuxtLink to="/MagazinePage">
            <li class="nav_text">Магазин</li>
          </NuxtLink>
          
            <img class="basket" @click="props.isFuncBasket" src="/public/img/basket.svg" alt="">
          
        </ul>
      </div>
    </div>
  
    <!-- адаптивное меню -->
    <div class="isMobile header_conteiner" v-else>
      <div class="header_menu">
        <ul class="header_menu_left">
          <NuxtLink to="#">
            <img src="/public/img/logo.svg"  alt="logo">
          </NuxtLink>
        </ul>
        <ul class="header_menu_right">
          <NuxtLink to="#">
            <img src="/public/img/basket.svg" alt=""  @click="props.isFuncBasket">
          </NuxtLink>
          <NuxtLink >
            <img :src='isMenu ? "/img/close.svg" : "/img/menu.svg"'  @click="isMenuFunc" alt="">
          </NuxtLink>
        </ul>
      </div>
      <div class="isMenu "  v-if="isMenu" >
      <MenuAdaptive></MenuAdaptive>
    </div>
    </div>
    



    



 





  
    <section class="background" :style="{ backgroundImage: isBackgroundAnimationEnabled ? `url(${backgrounds[backgroundIndex]})` : 'url(img/back.jpg)',}">
      <!-- Динамически создаем снежинки -->
      <div
        v-for="snowflake in snowflakes"
        :key="snowflake.id"
        class="snowflake"
        :style="{
          left: `${snowflake.x}%`,
          top: `${snowflake.y}%`,
          width: `${snowflake.size}px`,
          height: `${snowflake.size}px`,
          animationDuration: `${snowflake.speed}s`,
        }"
      ></div>
      
      <div class="start_header">
        <h1>Обучаем катанию и организуем выезды в горы</h1>
        <p>Мы предлагаем обучение катанию на лыжах и сноуборде, 
            а также организуем выезды в горы для всех уровней. Опытные 
            инструкторы помогут освоить технику, улучшить мастерство и 
            получить удовольствие. Включает лучшие склоны, комфорт и 
            захватывающие виды. Присоединяйтесь к незабываемым зимним 
            приключениям!
        </p>
        <div class="button">
            <NuxtLink to="#trip"><button>Календарь поездок</button></NuxtLink>
        </div>
       
      </div>
      
      
    </section>
   
  </template>

<style scoped>


/* -------------------------------------------------------- */

.basket{
  cursor: pointer;
}
.isMenu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
 
  
  
}

.start_header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

/* -----------------------------------------------WayToMountains--------------------------------------------------------- */
.background {
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding-bottom: 180px;
  transition: background-image 2s ease-in-out;
}

.snowflake {
  position: absolute;
}
.header_conteiner {
 
  width: 90%;
  margin: 0 auto;
  position: fixed;
  top: 5%;
  transform: translateX(50%);
  right: 50%;
  z-index: 10; /* Убедимся, что навигация находится поверх снежинок */
}

.header_menu {
  border: 5px solid; 
    border-image: linear-gradient(to right, #eceeef, #034184) 1;
 /*  border-radius: 50px; */
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding:  10px 30px;
  overflow: hidden; /* Чтобы размытый фон не выходил за пределы блока */
}

.header_menu::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #034184;
  /* Применяем размытие к псевдоэлементу */
  z-index: 1; /* Размытый фон находится под текстом */
}

.header_menu_left, .header_menu_right, .header_menu {
  display: flex;
  gap: 30px;
  align-items: center;
  font-size: 1.2rem; /* Базовый размер шрифта */
  font-weight: bold;
  z-index: 2; /* Убедимся, что текст находится поверх размытого фона */
  position: relative;
}

.nav_text {
  color: white; /* Убедимся, что текст виден на фоне */
  font-size: 1.2rem; /* Базовый размер шрифта */
}

.nav_text:hover {
  opacity: 100%;
  transition: all ease 0.5s;
  scale: 1.1;
}

.nav_text {
  opacity: 80%;
}

 

.start_header p {
  font-size: 1.8rem; /* Базовый размер шрифта */
  font-weight: bold;
  text-align: left;
}

.start_header {
  width: 80%;
  margin: 0 auto;
  margin-top: 15%;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px 0;
}

.background {
  width: 100%;
  height: 100vh;
  background-size: cover;
  position: relative;
  overflow: hidden;
  transition: background-image 2s ease-in-out; /* Плавное изменение фона */
}

.snowflake {
  position: absolute;
  background: url('/public/img/snow.svg') no-repeat center / contain;
  animation: snowfall linear infinite;
}

@keyframes snowfall {
  0% {
    transform: translateY(0); /* Начальная позиция */
    opacity: 1; /* Видимость снежинки */
  }
  100% {
    transform: translateY(120vh); /* Падает вниз за пределы экрана */
    opacity: 0.5; /* Исчезает в конце анимации */
  }
}

@media (max-width: 1000px) {
  .background {
    transition: none; /* Отключаем плавное изменение фона */
    background-image: url('/img/back.jpg') !important; /* Фиксируем один фон */
  }
}
/* Медиа-запрос для мобильного меню */
@media (max-width: 1029px) {
  .header_conteiner:not(.isMobile) {
    display: none; /* Скрываем основное меню на мобильных устройствах */
  }

  .isMobile {
    display: block; /* Показываем мобильное меню */
  }

  /* Уменьшаем размер шрифта для мобильных устройств */
  .header_menu_left, .header_menu_right, .nav_text {
    font-size: 1rem; /* Уменьшаем шрифт */
  }

  .start_header p {
    font-size: 1.4rem; /* Уменьшаем шрифт */
  }

  .start_header {
    width: 80%; /* Увеличиваем ширину блока для лучшего отображения на мобильных */
    margin-top: 20%; /* Смещаем блок вниз */
  }
}

@media (min-width: 1030px) {
  .isMobile {
    display: none; /* Скрываем мобильное меню на больших экранах */
    font-size: 2.5rem;
  }
  
}

/* Дополнительные медиа-запросы для еще меньших экранов */
@media (max-width: 768px) {
  .header_menu_left, .header_menu_right, .nav_text {
    font-size: 0.9rem; /* Еще меньше шрифт */
  }

  .start_header p {
    font-size: 1.2rem; /* Еще меньше шрифт */
  }
h1{
    font-size: 1.8rem;
}
  .start_header {
    width: 90%; /* Увеличиваем ширину блока */
    margin-top: 25%; /* Смещаем блок вниз */
  }
}

@media (max-width: 480px) {
  .header_menu_left, .header_menu_right, .nav_text {
    font-size: 0.8rem; /* Еще меньше шрифт */
  }

  .start_header p {
    font-size: 1rem; /* Еще меньше шрифт */
  }

  .start_header {
    width: 90%; /* Увеличиваем ширину блока */
    margin-top: 30%; /* Смещаем блок вниз */
  }
  h1{
    font-size: 1.5rem;
  }
  .header_menu{
    padding: 0px 10px;
  }
}
</style>