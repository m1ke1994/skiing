<template>
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4">Управление мероприятиями</h1>
      <form @submit.prevent="createEvent" class="mb-4 grid grid-cols-2 gap-2">
        <input v-model="newEvent.month" placeholder="Месяц" class="border p-2" required />
        <input v-model="newEvent.place" placeholder="Место" class="border p-2" required />
        <input v-model="newEvent.date" placeholder="Дата" class="border p-2" required />
        <input v-model="newEvent.leader_name" placeholder="Имя лидера" class="border p-2" />
        <input v-model="newEvent.leader_responsibilities" placeholder="Обязанности лидера" class="border p-2" />
        <input v-model="newEvent.requirements_equipment" placeholder="Оборудование" class="border p-2" />
        <input v-model="newEvent.requirements_skills" placeholder="Требуемые навыки" class="border p-2" />
        <input v-model="newEvent.cost_amount" placeholder="Стоимость" class="border p-2" type="number" required />
        <input v-model="newEvent.cost_currency" placeholder="Валюта" class="border p-2" required />
        <input v-model="newEvent.cost_additional_services" placeholder="Доп. услуги" class="border p-2" />
        <input v-model="newEvent.start_date" placeholder="Дата начала" class="border p-2" required />
        <button type="submit" class="bg-blue-500 text-white px-3 py-2 col-span-2 w-1/4">Добавить</button>
      </form>
      <ul>
        <li v-for="event in events" :key="event._id" class="border-b p-2 flex justify-between">
          {{ event.month }} - {{ event.place }} - {{ event.date }} - {{ event.cost_amount }} {{ event.cost_currency }}
          <button @click="deleteEvent(event._id)" class="bg-red-500 text-white px-2 py-1">Удалить</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const events = ref([]);
  const newEvent = ref({
    month: '',
    place: '',
    date: '',
    leader_name: '',
    leader_responsibilities: '',
    requirements_equipment: '',
    requirements_skills: '',
    cost_amount: '',
    cost_currency: '',
    cost_additional_services: '',
    start_date: '',
    isList: false, // всегда false, не заполняется вручную
  });
  
  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      events.value = await response.json();
    } catch (error) {
      console.error('Ошибка загрузки мероприятий:', error);
    }
  };
  
  const createEvent = async () => {
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent.value),
      });
      newEvent.value = {
        month: '',
        place: '',
        date: '',
        leader_name: '',
        leader_responsibilities: '',
        requirements_equipment: '',
        requirements_skills: '',
        cost_amount: '',
        cost_currency: '',
        cost_additional_services: '',
        start_date: '',
        isList: false,
      };
      fetchEvents();
    } catch (error) {
      console.error('Ошибка создания мероприятия:', error);
    }
  };
  
  const deleteEvent = async (id) => {
    try {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
      fetchEvents();
    } catch (error) {
      console.error('Ошибка удаления мероприятия:', error);
    }
  };
  
  onMounted(fetchEvents);
  </script>
  
  <style scoped>
  button {
    transition: all 0.3s ease;
  }
  button:hover {
    opacity: 0.8;
  }
  </style>
  