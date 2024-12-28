
<script setup>
</script>

<template>
  <section class="team-app">
    <section class="team-app__date">
      <WayToMountains></WayToMountains>
    </section>

    <h1 class="team-app__title">Мы — команда инструкторов из Санкт-Петербурга</h1>

    <div class="team-app__items">
      <div class="team-app__item">
        <img class="team-app__item-image" src="/public/img/team.jpg" alt="Инструктор">
        <p class="team-app__item-title">Инструктор по горным лыжам</p>
      </div>
      <div class="team-app__item">
        <img class="team-app__item-image" src="/public/img/team.jpg" alt="Инструктор">
        <p class="team-app__item-title">Инструктор по горным лыжам</p>
      </div>
      <div class="team-app__item">
        <img class="team-app__item-image" src="/public/img/team.jpg" alt="Инструктор">
        <p class="team-app__item-title">Инструктор по горным лыжам</p>
      </div>
    </div>

    <ul class="team-app__list">
      <li class="team-app__list-item">
        <strong class="team-app__list-item-highlight">Инструктор по горным лыжам</strong> — опытный тренер с многолетним стажем, который поможет вам освоить правильную технику катания по склонам. Его профессионализм и индивидуальный подход гарантируют быстрый прогресс и уверенность на лыжах.
      </li>
      <li class="team-app__list-item">
        <strong class="team-app__list-item-highlight">Инструктор по сноуборду</strong> — мастер сноубординга, который научит вас балансировать, выполнять трюки и получать максимум удовольствия от каждого спуска. Его энергия и знания помогут вам почувствовать себя настоящим сноубордистом.
      </li>
     
    </ul>
  </section>
</template>

<style scoped>
@media (max-width: 768px) {
.team-app__title{
    font-size: 2rem;
  }
}
@media (max-width: 990px) {
  h1{
    margin-top: 50px;
  }
}
h1 {
  padding: 30px 10px;
  color: #034184;
  text-align: center;
  font-size: clamp(20px, 3rem, 40px);
  font-weight: bold;
}
.team-app {
  display: flex;
  flex-direction: column;
  gap: 50px;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
  width: 100%;
  height: auto;
}

.team-app__date {
  margin: 70px auto;
}


.team-app__items {
  margin: 0 auto;
  display: flex;
  gap: 50px;
}

.team-app__item {
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.team-app__item-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 34px -14px 31px -12px rgba(34, 60, 80, 0.61);
}

.team-app__item-title {
  font-size: clamp(20px, 1.5vw, 2rem);
  color: #034184;
  font-weight: bold;
}

.team-app__list {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
  width: 80%;
  align-items: center;
  margin-bottom: 50px;
}

.team-app__list-item {
  font-size: clamp(20px, 1.5vw, 2rem);
  color: black;
  padding: 20px;
}

.team-app__list-item-highlight {
  color: #034184;
  font-weight: bold;
}

@media (max-width: 768px) {
  .team-app__items {
    flex-direction: column;
    align-items: center;
  }

  .team-app__date {
    margin-top: 320px;
  }


}
</style>