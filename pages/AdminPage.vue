<script setup>
import { ref, onMounted } from 'vue';
/* ------------------расписание начало----------------------------------------------------------- */
const events = ref([]);
const defaultEvent = {
  month: '',
  place: '',
  date: '22 марта – 29 марта 2025',
  isList: false,
  leader_name: 'Саша Пыжов',
  leader_responsibilities: '',
  requirements_equipment: '',
  requirements_skills: '',
  cost_amount: '18000',
  cost_currency: 'RUB',
  cost_additional_services: '',
  start_date: ''
};
const newEvent = ref({ ...defaultEvent });

const fetchEvents = async () => {
  try {
    const response = await fetch('http://localhost:3005/api/events');
    events.value = await response.json();
  } catch (error) {
    console.error('Ошибка загрузки мероприятий:', error);
  }
};

const createEvent = async () => {
  try {
    const response = await fetch('http://localhost:3005/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent.value)
    });

    if (!response.ok) {
      throw new Error('Ошибка при создании мероприятия');
    }

    fetchEvents();
    newEvent.value = { ...defaultEvent }; // Очищаем форму
  } catch (error) {
    console.error('Ошибка создания мероприятия:', error);
  }
};

const deleteEvent = async (id) => {
  try {
    const response = await fetch(`http://localhost:3005/api/events/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Ошибка при удалении');
    }

    fetchEvents();
  } catch (error) {
    console.error('Ошибка удаления мероприятия:', error);
  }
};

onMounted(fetchEvents);
/* ------------------расписание конец----------------------------------------------------------- */
const orders=ref([]);
const allOrders=async()=>{
  try {
    const response = await fetch('http://localhost:3005/api/applications');
    orders.value = await response.json();
  } catch (error) {
    console.error('Ошибка загрузки заказов:', error);
  }
}
allOrders();
const isOrders=ref(false);
const FuncIsOrders=()=>{
  isOrders.value=!isOrders.value;
}
</script>
<template>
  <div class="main_admin">
    <div class="header_admin">
      <h1 class="p-4 text-white font-bold">Добро пожаловать, Александр</h1>
     
    </div>
    <div class="content_admin">
      <div class="p-6">
        <h1 class="text-3xl font-extrabold text-white mb-6">Управление мероприятиями</h1>
        <form @submit.prevent="createEvent" class="grid grid-cols-2 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <input v-model="newEvent._id" placeholder="ID" class="input-field" type="number" required />
          <input v-model="newEvent.month" placeholder="Март" class="input-field" required />
          <input v-model="newEvent.place" placeholder="Хибины" class="input-field" required />
          <input v-model="newEvent.date" placeholder="22 марта – 29 марта 2025" class="input-field" required />
          <div class="flex items-center space-x-2 hidden">
            <input v-model="newEvent.isList" type="checkbox" class="w-5 h-5" />
            <label class="text-white">isList (false по умолчанию)</label>
          </div>
          <input v-model="newEvent.leader_name" placeholder="Саша Пыжов" class="input-field" />
          <input v-model="newEvent.leader_responsibilities" placeholder="Обязанности лидера" class="input-field" />
          <input v-model="newEvent.requirements_equipment" placeholder="Инвентарь, шлем" class="input-field" />
          <input v-model="newEvent.requirements_skills" placeholder="Навыки" class="input-field" />
          <input v-model="newEvent.cost_amount" placeholder="18000" class="input-field" type="number" required />
          <input v-model="newEvent.cost_currency" placeholder="RUB" class="input-field" required />
          <input v-model="newEvent.cost_additional_services" placeholder="Доп. услуги" class="input-field" />
          <input v-model="newEvent.start_date" placeholder="2025-03-22" class="input-field" required />
          <button type="submit" class="submit-btn col-span-2 w-1/4">Добавить</button>
        </form>
        <ul class="mt-6 space-y-2">
          <li v-for="event in events" :key="event._id" class="event-item">
            <span>{{ event.month }} - {{ event.place }} - {{ event.date }} - {{ event.cost_amount }} {{ event.cost_currency }}</span>
            <button @click="deleteEvent(event._id)" class="delete-btn">Удалить</button>
          </li>
        </ul>
      </div>
      <div class="orders p-4">
  <div class="flex flex-col sm:flex-row justify-between items-center mb-6">
    <h1 class="text-2xl sm:text-3xl font-extrabold text-white">Заявки пользователей с тела сайта</h1>
    <p class="text-xl sm:text-2xl font-extrabold text-white mt-2 sm:mt-0">Общее количество заявок: {{ orders.length }}</p>
    <button @click="FuncIsOrders" 
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all">
      Показать/Скрыть
    </button>
  </div>

  <ul v-if="isOrders" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-800 p-6 rounded-lg shadow-lg">
    <li v-for="order in orders" :key="order._id" 
      class="bg-gray-700 p-4 rounded-lg shadow-md text-white flex flex-col space-y-2">
      <span>📅 {{ order.date }}</span>
      <span>👤 {{ order.name }}</span>
      <span>📞 {{ order.phone }}</span>
      <span>🎿 {{ order.course }}</span>
    </li>
  </ul>
</div>
    </div>
  </div>
</template>





 <style scoped>
 .main_admin {
   background-color: #1a1a1d;
   width: 100%;
   min-height: 100vh;
   display: flex;
   flex-direction: column;
   color: white;
 }
 
 .header_admin {
   background-color: #6a994e;
   width: 100%;
   padding: 20px;
   text-align: center;
 }
 
 .content_admin {
   flex: 1;
   padding: 20px;
   width: 100%;
 }
 
 /* Грид форма: 2 колонки на больших экранах, 1 колонка на мобильных */
 form {
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   gap: 10px;
 }
 
 @media (max-width: 768px) {
   form {
     grid-template-columns: 1fr;
   }
 }
 
 .input-field {
   background: #2d2d30;
   color: white;
   border: 1px solid #555;
   padding: 10px;
   border-radius: 5px;
   outline: none;
   width: 100%;
 }
 
 .input-field:focus {
   border-color: #6a994e;
 }
 
 .submit-btn {
   background-color: #6a994e;
   color: white;
   padding: 12px;
   border-radius: 5px;
   font-weight: bold;
   transition: 0.3s;
   width: 20%;
 }
 
 .submit-btn:hover {
   background-color: #4e7d3e;
 }
 
 /* Список мероприятий */
 .event-item {
   display: flex;
   justify-content: space-between;
   background: #2d2d30;
   padding: 12px;
   border-radius: 5px;
   transition: 0.3s;
   flex-wrap: wrap;
 }
 
 .event-item span {
   flex: 1;
 }
 
 .delete-btn {
   background-color: #d32f2f;
   color: white;
   padding: 8px 12px;
   border-radius: 5px;
   transition: 0.3s;
 }
 
 .delete-btn:hover {
   background-color: #b71c1c;
 }
 
 /* Медиазапросы для мобильных */
 @media (max-width: 768px) {
  .submit-btn {
   background-color: #6a994e;
   color: white;
   padding: 12px;
   border-radius: 5px;
   font-weight: bold;
   transition: 0.3s;
   width: 100%;
 }
   .main_admin {
     flex-direction: column;
   }
 
   .header_admin {
     width: 100%;
     height: auto;
   }
 
   .event-item {
     flex-direction: column;
     align-items: flex-start;
   }
 
   .delete-btn {
     margin-top: 10px;
     width: 100%;
   }
 }
 </style>
 