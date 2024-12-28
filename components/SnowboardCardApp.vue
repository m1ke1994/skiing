<script setup>
import { ref } from 'vue';
import { useBasketStore } from '~/stores/basketStore';


// Данные о курсах
const courses = ref([
  {
    id: 2,
     category:`Сноуборд`,
    title: "Basic",
    image: "/img/snowboard_basic.jpg",
    price: "8,000 ₽",
    description: "Идеальный курс для начинающих. Освойте основы и начните свой путь.",
    detailed: `Этот курс подойдет тем, кто уже делает первые шаги на сноуборде, умеет 
    выполнять базовые повороты и кататься по «зеленым» трассам, но чувствует неуверенность.
     Вы научитесь безопасному катанию, освоите основную стойку, пользование подъемниками,
      а также базовые и техничные повороты на склонах разной сложности. Занятия проходят 
      на горнолыжных курортах Ленинградской области и в горах.`
  },
  {
    id: 1,
     category:`Сноуборд`,
    title: "Pro 1",
    image: "/img/snowboard_pro1.jpg",
    price: "15,000 ₽",
    description: "Продвинутый курс для тех, кто хочет достичь мастерства в спорте.",
    detailed: `Для тех, кто уже уверенно выполняет связанные повороты на сноуборде, использует все 
    виды подъемников и стремится совершенствовать свою технику катания, предлагаются 
    занятия по улучшению навыков. Вы научитесь оставлять четкий след от кантов, 
    уверенно спускаться по трассам любой крутизны, выполнять карвинговые повороты 
    большого и малого радиуса, а также техничные повороты с проскальзыванием на крутых
     склонах. Программа включает отработку переходов между поворотами разного радиуса и изменение ритма 
    катания. Занятия проводятся как на горнолыжных курортах Ленинградской области, так и в выездных школах в горах.`
  },
  {
    id: 3,
     category:`Сноуборд`,
    title: "Pro 2",
    image: "/img/snowboard_pro2.jpg",
    price: "20,000 ₽",
    description: "Экспертный уровень. Для тех, кто хочет стать профессионалом.",
    detailed: `Для тех, кто уже уверенно катает карвинг на сноуборде и справляется с крутыми склонами, 
    но хочет добавить в свое катание «огонька», предлагаются продвинутые тренировки. Вы 
    научитесь технично преодолевать любые поверхности: бугры, разбитые трассы, пухлый снег,
     а также освоите базовые элементы фристайла. Программа включает карвинговые повороты 
     среднего и малого радиуса, катание на сложных участках склона, прямые прыжки и начальный уровень катания в парке и вне трасс. 
    Занятия проходят только в выездных школах в горах, где созданы специальные условия для отработки этих навыков.`
  },
  {
    id: 4,
     category:`Сноуборд`,
    title: "Индивидуальное 2 часа",
    image: "/img/snowboard_individual2.jpg", // Замените на актуальный путь к изображению
    price: "6,000 ₽",
    description: "Индивидуальные занятия для быстрого прогресса.",
    detailed: `Индивидуальные занятия с инструктором продолжительностью 2 часа. 
    Подходит для тех, кто хочет быстро улучшить свои навыки катания на сноуборде. Занятия проводятся 
    на горнолыжных курортах Ленинградской области или в горах.`
  },
  {
    id: 5,
     category:`Сноуборд`,
    title: "Индивидуальные 10 часов",
    image: "/img/snowboard_individual10.jpg", // Замените на актуальный путь к изображению
    price: "26,000 ₽",
    description: "Интенсивные индивидуальные занятия для глубокого погружения.",
    detailed: `Индивидуальные занятия с инструктором общей продолжительностью 10 часов. 
    Программа разрабатывается с учетом ваших целей и уровня подготовки. Занятия проводятся 
    на горнолыжных курортах Ленинградской области или в горах.`
  },
  {
    id: 6,
     category:`Сноуборд`,
    title: "Групповые 15 часов",
    image: "/img/snowboard_group15.jpg", // Замените на актуальный путь к изображению
    price: "17,000 ₽",
    description: "Групповые занятия для совместного обучения и мотивации.",
    detailed: `Групповые занятия продолжительностью 15 часов. Подходит для тех, кто 
    предпочитает учиться в компании единомышленников. Занятия проводятся на горнолыжных 
    курортах Ленинградской области или в горах.`
  },
  {
    id: 7,
     category:`Сноуборд`,
    title: "Групповые 30 часов",
    image: "/img/snowboard_group30.jpg", // Замените на актуальный путь к изображению
    price: "30,000 ₽",
    description: "Продолжительные групповые занятия для полного освоения навыков.",
    detailed: `Групповые занятия общей продолжительностью 30 часов. Программа 
    рассчитана на глубокое освоение техники катания на сноуборде и отработку всех ключевых элементов. 
    Занятия проводятся на горнолыжных курортах Ленинградской области или в горах.`
  }
]);


// Получаем экземпляр хранилища
const basketStore = useBasketStore();

// Функция для добавления в корзину
const addToCart = (course) => {
  basketStore.addToBasket(course); // Используем действие из хранилища
  alert(`Курс "${course.title}" добавлен в корзину!`);
};

// Функция для переключения подробного описания
const toggleDetails = (index) => {
  courses.value[index].showDetails = !courses.value[index].showDetails;
};
</script>

<template>
  <div class="course-container">
    <h1>Наши курсы</h1>
    <div class="course-cards">
      <div
        class="course-card"
        v-for="(course, index) in courses"
        :key="course.id"
        :class="{ 'show-details': course.showDetails }"
      >
        <div class="course-card__inner">
          <div class="course-card__front">
            <div class="course-card__image">
              <img :src="course.image" :alt="course.title" />
            </div>
            <div class="course-card__content">
              <h2 class="course-card__title">{{ course.title }} ({{ course.category }})</h2>
              <p class="course-card__price"> от {{ course.price }}</p>
              <p class="course-card__description">{{ course.description }}</p>
              <div class="course-card__buttons">
                <button class="button" @click="addToCart(course)">В корзину</button>
                <button class="button button--outline" @click="toggleDetails(index)">
                  Подробнее
                </button>
              </div>
            </div>
          </div>
          <div class="course-card__back">
            <p class="course-card__detailed">{{ course.detailed }}</p>
            <button class="button button--outline" @click="toggleDetails(index)">
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.course-container {
  padding: 40px 20px;
  background-color: #f9f9f9;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #034184;
  margin-bottom: 40px;
  text-align: center;
}

.course-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.course-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  perspective: 1000px;
  height: 450px;
}

.course-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.course-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.course-card.show-details .course-card__inner {
  transform: rotateY(180deg);
}

.course-card__front,
.course-card__back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-card__front {
  background: white;
}

.course-card__back {
  background: white;
  transform: rotateY(180deg);
  padding: 20px;
  overflow-y: auto;
}

.course-card__image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.course-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.course-card__title {
  font-size: 1.5rem;
  color: #034184;
  margin: 15px 0;
}

.course-card__price {
  font-size: 1.25rem;
  color: #0675ec;
  font-weight: bold;
  margin: 10px 0;
}

.course-card__description {
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
}

.course-card__buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.button {
  background: #034184;
  color: white;
  width: 150px;
}

.button:hover {
  background: #0675ec;
  transform: scale(1.05);
}

.button--outline {
  background: transparent;
  border: 2px solid #034184;
  color: #034184;
}

.button--outline:hover {
  background: #034184;
  color: white;
}

.course-card__detailed {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .course-cards {
    grid-template-columns: 1fr;
  }
}
</style>