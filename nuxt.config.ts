export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  $development: {
    devtools: { enabled: false }
  },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["/public/assets/main.scss"],
  
  meta: {
    title: 'Горнолыжная школа и сноубордические занятия',
    meta: [
      { name: 'description', content: 'Групповые и индивидуальные занятия по горным лыжам с детьми, безопасное катание и обучение на лучших склонах Хибин и Кавказа. Профессиональные инструкторы.' },
      { name: 'keywords', content: 'горнолыжная школа, сноубордическая школа, групповые занятия, индивидуальный подход, безопасное катание, карвинг, фрирайд, обучение в Хибинах, обучение в Шерегеше' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: 'Горнолыжная и сноубордическая школа — Обучение катанию' },
      { property: 'og:description', content: 'Учитесь кататься на горных лыжах и сноуборде с профессиональными инструкторами. Занятия для детей и взрослых на лучших курортах.' },
      { property: 'og:image', content: '/img/favicon.ico' }, // Укажите путь к изображению
      { property: 'og:url', content: 'https://your-site.com' },
      
      // Добавление favicon
      { rel: 'icon', href: '/img/favicon.ico?v=1' },  // Версионированный путь
      { rel: 'apple-touch-icon', href: '/img/favicon.ico' },  // Для Apple устройств
      { rel: 'icon', type: 'image/png', href: '/img/favicon.png' },  // Можно добавить поддержку PNG
    ]
  },

  // Настройки Sitemap (если нужно)
  sitemap: {
    hostname: 'https://your-site.com',
    routes: ['/MagazinePage', '/SkiPage','/SnowboardPage'],  // Укажите пути для динамических страниц
  }
})
