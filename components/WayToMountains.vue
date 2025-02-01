<script setup>
import { ref, onMounted } from 'vue';

const event = ref([]);
const formattedDates = ref([]); // Массив для хранения отформатированных дат
const today = ref(new Date()); // Сегодняшняя дата
const nearestDate = ref(''); // Ближайшая дата

const fetchData = async () => {
  try {
    const response = await fetch('http://localhost:3005/api/events');
    const data = await response.json();
    event.value = data;

    // Извлекаем start_date и date из данных, преобразуем start_date в Date
    formattedDates.value = data.map(item => ({
      start_date: new Date(item.start_date), // Преобразуем start_date в объект Date
      date: item.date
    }));

    // Находим ближайшую дату
    findNearestDate();

    // Выводим данные в консоль для проверки
    
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};

const findNearestDate = () => {
  // Отфильтруем даты, которые больше или равны текущей дате
  const futureDates = formattedDates.value.filter(item => item.start_date >= today.value);

  if (futureDates.length > 0) {
    // Найдем минимальную дату из оставшихся
    nearestDate.value = futureDates.reduce((nearest, current) => {
      return current.start_date < nearest.start_date ? current : nearest;
    });

    console.log('Ближайшая дата найдена:', nearestDate.value);
  } else {
    console.log('Нет будущих дат.');
  }
};

fetchData();
</script>

<template>
   <section id="date_way">
   
  
    <div class="date_way_left">
        <h2>Ближайший выезд в горы: {{ nearestDate.date }}</h2>
        <p class="date_way_left__text">Погрузитесь в атмосферу зимних приключений с нашей командой! 
            Программа включает обучение катанию, проживание в уютных отелях и незабываемые
            виды заснеженных вершин. Не упустите шанс 
            насладиться зимним воздухом и новыми впечатлениями!
        </p>
    </div>
    <div class="date_way_right">
        <img src="/public/img/MountainsCard2.jpg" alt="">
    </div>

   </section>
   
</template>
<style scoped>
@media (max-width: 768px) {
    #date_way {
    display: flex;
    flex-direction: column;
    
   
}
}

#date_way {
    border: 5px solid; /* Толщина границы */
    border-image: linear-gradient(to right, #00A9FE, #034184) 1; /* Градиентный бордер */
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    display: flex;
    background: linear-gradient(90deg, #034184, #00aaff); /* Градиент от синего к голубому */
    width: 80%;
    margin: 0 auto;
    padding: 20px;
    align-items: center;
}
.date_way_left__text{
    font-size: clamp(20px, 1.5vw, 2.5rem);
    color: white;
    padding: 20px;
}
h2{
    font-size: clamp(20px, 3vw, 2.5rem);
    color: white;
}

</style>