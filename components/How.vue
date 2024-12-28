<!-- <script setup>
</script>

<template>
  <section id="now">
    <h1>Как это будет</h1>
    <div class="galary">
     
      <div class="galary__left">
        <img src="/public/img/back.jpg" alt="Background Image">
      </div>

     
      <div class="galary__right">
        <div class="galary__right__item">
          <img src="/public/img/galary1.jpg" alt="Image 1">
          <img src="/public/img/galary2.jpg" alt="Image 2">
        </div>
        <div class="galary__right__item">
          <img src="/public/img/galary3.jpg" alt="Image 3">
          <img src="/public/img/galary4.jpg" alt="Image 4">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
h1 {
  padding: 20px 10px;
  color: white;
  text-align: center;
  font-size: clamp(20px, 3rem, 40px);
  font-weight: bold;
}

#now {
  padding: 50px 0;
  width: 90%;
  margin: 0 auto;
  background-color: #034184;
}

.galary {
  display: flex;
  align-items: stretch; /* Растягиваем блоки по высоте */
  gap: 20px;
  width: 90%;
  margin: 0 auto;
}

.galary__left,
.galary__right {
  width: 50%; /* Делаем блоки равными по ширине */
}

.galary__left {
  display: flex;
  align-items: stretch;
}

.galary__left img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Масштабируем изображение, чтобы оно заполнило блок */
  border-radius: 8px;
}

.galary__right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.galary__right__item {
  display: flex;
  gap: 20px;
}

.galary__right__item img {
  width: 50%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}


@media (max-width: 768px) {
  .galary {
    flex-direction: column; 
    align-items: center; 
    gap: 40px; 
  }

  .galary__left,
  .galary__right {
    width: 100%; 
  }

  .galary__left img {
    width: 100%; 
    height: auto;
    border-radius: 8px;
  }

  .galary__right {
    align-items: center; 
  }

  .galary__right__item {
    flex-direction: column;
    width: 100%; 
  }

  .galary__right__item img {
    width: 100%; 
    height: auto;
    border-radius: 8px;
  }
}
</style> -->
<!-- <script setup>
import { ref } from 'vue'
const videos=[
  {
    id: 1,
    src: '/img/video1.mp4',
  },
  
  {
    id: 3,
    src: '/img/video3.mp4',
  },
  {
    id: 4,
    src: '/img/video4.mp4',
  },
  {
    id: 5,
    src: '/img/video5.mp4',
  }
]
</script>
<template>
  <div class="videos__content">
    <div v-for="video in videos" :key="video.id" class="video">
<video :src="video.src" type="video/mp4" width="320" height="240" controls loop  muted></video>
</div>
  </div>

</template>
<style scoped>
.videos__content{
  display: flex;
  justify-content: space-around;
  padding: 20px;
}
</style> -->
<script setup>
import { ref } from 'vue'

// Массив видео
const videos = [
  {
    id: 1,
    src: '/img/video1.mp4',
  },
  {
    id: 3,
    src: '/img/video3.mp4',
  },
  {
    id: 4,
    src: '/img/video4.mp4',
  },
  {
    id: 5,
    src: '/img/video5.mp4',
  }
]

// Индекс текущего видео
const currentVideoIndex = ref(0)

// Функция для переключения на следующее видео
function nextVideo() {
  if (currentVideoIndex.value < videos.length - 1) {
    currentVideoIndex.value++
  }
}

// Функция для переключения на предыдущее видео
function prevVideo() {
  if (currentVideoIndex.value > 0) {
    currentVideoIndex.value--
  }
}
</script>

<template>
  <section id="now">
    <h1>Как это будет</h1>
    <div class="videos__content">
    <!-- Кнопка "Предыдущее" -->
    <button @click="prevVideo" :disabled="currentVideoIndex === 0">
      &lt;
    </button>

    <!-- Видеоплеер -->
    <div class="video">
      <video
        :src="videos[currentVideoIndex].src"
        type="video/mp4"
        width="640"
        height="480"
        controls
        loop
        autoplay
        muted
      ></video>
    </div>

    <!-- Кнопка "Следующее" -->
    <button @click="nextVideo" :disabled="currentVideoIndex === videos.length - 1">
      &gt;
    </button>
  </div>

  </section>
  
</template>

<style scoped>
h1{
  text-align: center;
  padding: 30px 0;
  font-size: 2rem;
}
.videos__content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 30px;
}

.video {
  max-width: 320px;
  
}

button {
  font-size: 24px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>