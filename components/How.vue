<script setup>
import { ref, onMounted } from 'vue'

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

// Функция для автовоспроизведения видео
function playVideo(videoElement) {
  if (videoElement) {
    videoElement.play().catch(error => {
      console.error('Автовоспроизведение не удалось:', error)
    })
  }
}

// Обработчик для воспроизведения видео после загрузки
onMounted(() => {
  const videoElement = document.querySelector('video')
  if (videoElement) {
    videoElement.addEventListener('loadeddata', () => playVideo(videoElement))
  }
})
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
          playsinline
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
h1 {
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