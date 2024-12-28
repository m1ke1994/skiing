
<script setup>
import { ref } from 'vue';

const sports = ref([
  {
    moreDetaled: false,
    title: "Горные лыжи",
    image: "/img/sportskii.jpg",
    description: "Почувствуйте скорость и гармонию на заснеженных склонах. Идеально для тех, кто ищет классику и мастерство.",
    detailed: `Привет! Сначала мы занимались только обучением сноуборду и, судя по отзывам учеников, делали это хорошо. Но с каждым годом увеличивалось количество запросов на обучение горным лыжам, и мы приняли решение найти крутого тренера в школу, который будет развивать новое направление. За два сезона команда провела несколько горнолыжных выездов в Норвежском Трюсиле, Итальянских Альпах, Хибинах, также инструкторы школы проводили индивидуальное и групповое обучение на курортах Ленинградской области. Как следствие, более 100 учеников улучшили свою технику катания и продолжают заниматься и путешествовать с нами.`,
    link:`SkiPage`
  },
  {
    moreDetaled: false,
    title: "Сноуборд",
    image: "/img/snowboard.jpg", // Добавьте свои изображения
    description: "Свобода и адреналин на снежных склонах. Подходит для любителей экстрима и новых ощущений.",
    detailed: `Привет! Мы занимаемся обучением сноуборду с 2012 года. Сначала вели только индивидуальные и групповые тренировки на горнолыжных курортах Ленинградской области, но с 2013 года школа стала проводить также выездные курсы в различных горах.За 12 лет ученики вместе с нами побывали на Кавказе, в Хибинах, в Шерегеше, на курортах Финляндии и Скандинавии, в Альпах, а также в Болгарии и Грузии. Стараемся не только улучшить технику катания учеников, но и открыть для них новый мир сноубординга через выездные школы на различные горнолыжные курорты`,
    link:`SnowboardPage`
  },
]);

const toggleDetails = (index) => {
  sports.value[index].moreDetaled = !sports.value[index].moreDetaled;
};
</script>
<template>
  <div class="sports-container" id="sports">
    <h1>Наши спортивные программы</h1>
    <div class="sports-cards">
      <div
        class="sports-card"
        v-for="(sport, index) in sports"
        :key="sport.title"
        :class="{ 'show-details': sport.moreDetaled }"
      >
        <div class="sports-card__inner">
          <div class="sports-card__front">
            <div class="sports-card__image">
              <img :src="sport.image" :alt="sport.title" />
            </div>
            <div class="sports-card__content">
              <h2 class="sports-card__title">{{ sport.title }}</h2>
              <p class="sports-card__description">{{ sport.description }}</p>
              <div class="sports-card__buttons">
                <button class="button button--outline" @click="toggleDetails(index)">
                  Подробнее
                </button>
                <NuxtLink :to="sport.link" class="button button--outline" >
                  Перейти
                </NuxtLink>
              </div>
            </div>
          </div>
          <div class="sports-card__back">
            <p class="sports-card__detailed">{{ sport.detailed }}</p>
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
.sports-container {
  padding: 40px 20px;
  background-color: #ffffff;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: #034184;
  margin-bottom: 40px;
  text-align: center;
}

.sports-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.sports-card {
  background: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  perspective: 1000px;
  height: 450px;
}

.sports-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.sports-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.sports-card.show-details .sports-card__inner {
  transform: rotateY(180deg);
}

.sports-card__front,
.sports-card__back {
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

.sports-card__front {
  background: white;
}

.sports-card__back {
  background: white;
  transform: rotateY(180deg);
  padding: 20px;
  overflow-y: auto;
}

.sports-card__image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
}

.sports-card__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.sports-card__title {
  font-size: 1.5rem;
  color: #034184;
  margin: 15px 0;
}

.sports-card__description {
  font-size: 1rem;
  color: #555;
  margin: 10px 0;
}

.sports-card__buttons {
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
  width: 150px;
}

.button {
  background: #034184;
  color: white;
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

.sports-card__detailed {
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .sports-cards {
    grid-template-columns: 1fr;
  }
}
</style>