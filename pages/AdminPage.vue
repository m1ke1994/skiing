<script setup>
import { ref, onMounted } from 'vue';
const addEvent = ref(false);
const openAddEvent = () => {
  addEvent.value = !addEvent.value;
}
const newEvent = ref({
  place: "",
  month: "",
  date: "",
  leader_name: "",
  leader_responsibilities: "",
  requirements_equipment: "",
  requirements_skills: "",
  cost_amount: 0,
  cost_currency: "RUB",
  cost_additional_services: "",
  start_date: "",
});

const createEvent = async () => {
  try {
    // Преобразуем строки в массивы
    newEvent.value.leader_responsibilities = newEvent.value.leader_responsibilities.split(",");
    newEvent.value.requirements_equipment = newEvent.value.requirements_equipment.split(",");

    // Отправляем данные на сервер
    const response = await fetch("http://localhost:3005/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent.value),
    });

    if (!response.ok) {
      throw new Error("Ошибка при создании события");
    }

    // Очищаем форму
    newEvent.value = {
      place: "",
      month: "",
      date: "",
      leader_name: "",
      leader_responsibilities: "",
      requirements_equipment: "",
      requirements_skills: "",
      cost_amount: 0,
      cost_currency: "RUB",
      cost_additional_services: "",
      start_date: "",
    };

    // Обновляем список событий
    fetchEvents();
  } catch (error) {
    console.error("Ошибка при создании события:", error);
  }
};
const item_open = ref(false);
const events = ref([]); // Реактивное состояние для хранения событий

const openItem = () => {
  item_open.value = !item_open.value;
};

// Функция для загрузки данных
const fetchEvents = async () => {
  try {
    // Выполняем запрос к API
    const response = await fetch('http://localhost:3005/api/events');
    if (!response.ok) {
      throw new Error('Ошибка при загрузке данных');
    }
    const data = await response.json(); // Парсим JSON
    events.value = data; // Заполняем данные
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
};

// Выполняем запрос при монтировании компонента
onMounted(fetchEvents);
</script>

<template>
  <div class="general-container w-full flex">
    <header class="bg-gray-200 p-4">
      <h1 class="text-3xl">Добро пожаловать Александр!</h1>
    </header>
    <main>
      <h1 class="p-4 text-2xl">Задачи</h1>
      <div class="items">
        <div class="item">
          <h2 class="text-3xl font-bold">Расписание выездов на сезон 24/25</h2>
          <div class="flex justify-center items-center gap-4">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg" @click="openItem">
              {{ item_open ? 'Скрыть' : 'Показать рассписание' }}
          </button>
          <button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg"
  @click="openAddEvent"
>
  {{ addEvent ? 'Скрыть' : 'Добавить новое расписание' }}
</button>
          </div>
          <div v-if="item_open" class="item_open">
            <div v-for="event in events" :key="event._id" class="event-item">
              <h3 class="text-lg">{{ event.place }} - {{ event.month }}</h3>
              <p><span class="font-bold">Дата:</span> {{ event.date }}</p>
              <p><span class="font-bold">Руководитель:</span> {{ event.leader_name }}</p>
              <p><span class="font-bold">Обязанности руководителя:</span></p>
              <ul>
                <li v-for="(responsibility, index) in event.leader_responsibilities" :key="index">{{ responsibility }}</li>
              </ul>
              <p><span class="font-bold">Требуемое снаряжение:</span></p>
              <ul>
                <li v-for="(equipment, index) in event.requirements_equipment" :key="index">{{ equipment }}</li>
              </ul>
              <p><span class="font-bold">Требуемые навыки:</span> {{ event.requirements_skills }}</p>
              <p><span class="font-bold">Стоимость:</span> {{ event.cost_amount }} {{ event.cost_currency }}</p>
              <p><span class="font-bold">Дополнительные услуги:</span> {{ event.cost_additional_services }}</p>
              <div class="flex justify-between items-center">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-lg">Удалить</button>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-lg">Изменить</button>
              </div>
            </div>
          </div>
        </div>
        <!-- _______________________________________________________________________ -->
        <div v-if="addEvent" class="create_item">
  <h2 class="text-3xl font-bold mb-4">Добавить новое событие</h2>
  <form @submit.prevent="createEvent" class="space-y-4">
    <!-- Место проведения -->
    <div>
      <label for="place" class="block text-lg font-medium">Место проведения:</label>
      <input
        type="text"
        id="place"
        v-model="newEvent.place"
        required
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Например, Кавказ"
      />
    </div>

    <!-- Месяц -->
    <div>
      <label for="month" class="block text-lg font-medium">Месяц:</label>
      <input
        type="text"
        id="month"
        v-model="newEvent.month"
        required
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Например, Февраль"
      />
    </div>

    <!-- Дата -->
    <div>
      <label for="date" class="block text-lg font-medium">Дата:</label>
      <input
        type="text"
        id="date"
        v-model="newEvent.date"
        required
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Например, 14 февраля – 23 февраля 2025"
      />
    </div>

    <!-- Руководитель -->
    <div>
      <label for="leader_name" class="block text-lg font-medium">Руководитель:</label>
      <input
        type="text"
        id="leader_name"
        v-model="newEvent.leader_name"
        required
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Например, Саша Пыжов"
      />
    </div>

    <!-- Обязанности руководителя -->
    <div>
      <label for="leader_responsibilities" class="block text-lg font-medium">Обязанности руководителя:</label>
      <textarea
        id="leader_responsibilities"
        v-model="newEvent.leader_responsibilities"
        required
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Введите обязанности через запятую"
      ></textarea>
    </div>

    <!-- Требуемое снаряжение -->
    <div>
      <label for="requirements_equipment" class="block text-lg font-medium">Требуемое снаряжение:</label>
      <textarea
        id="requirements_equipment"
        v-model="newEvent.requirements_equipment"
        required
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Введите снаряжение через запятую"
      ></textarea>
    </div>

    <!-- Требуемые навыки -->
    <div>
      <label for="requirements_skills" class="block text-lg font-medium">Требуемые навыки:</label>
      <input
        type="text"
        id="requirements_skills"
        v-model="newEvent.requirements_skills"
        required
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Например, умение делать связанные повороты"
      />
    </div>

    <!-- Стоимость -->
    <div>
      <label for="cost_amount" class="block text-lg font-medium">Стоимость:</label>
      <input
        type="number"
        id="cost_amount"
        v-model="newEvent.cost_amount"
        required
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Например, 15000"
      />
    </div>

    <!-- Валюта -->
    <div>
      <label for="cost_currency" class="block text-lg font-medium">Валюта:</label>
      <input
        type="text"
        id="cost_currency"
        v-model="newEvent.cost_currency"
        required
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Например, RUB"
      />
    </div>

    <!-- Дополнительные услуги -->
    <div>
      <label for="cost_additional_services" class="block text-lg font-medium">Дополнительные услуги:</label>
      <input
        type="text"
        id="cost_additional_services"
        v-model="newEvent.cost_additional_services"
        class="w-full p-2 border border-gray-300 rounded"
        placeholder="Например, помощь с размещением"
      />
    </div>

    <!-- Дата начала -->
    <div>
      <label for="start_date" class="block text-lg font-medium">Дата начала:</label>
      <input
        type="date"
        id="start_date"
        v-model="newEvent.start_date"
        required
        class="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <!-- Кнопка отправки -->
    <div>
      <button
        type="submit"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-lg"
      >
        Создать событие
      </button>
    </div>
  </form>
</div>
        <!-- _______________________________________________________________________ -->
      </div>
    </main>
  </div>
</template>

<style scoped>
/* ______________________________________________________________________ */
.create_item {
  background-color: #f2f1f5;
  padding: 20px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.create_item h2 {
  color: #333;
  margin-bottom: 20px;
}

.create_item label {
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.create_item input,
.create_item textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 12px;
}

.create_item button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

.create_item button:hover {
  background-color: #218838;
}
/* ______________________________________________________________________ */
.general-container {
  color: black;
}

main {
  height: 100vh;
}

header {
  height: 50vh;
}

h1 {
  color: black;
}

.item {
  background-color: #b33411;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.event-item {
  margin-top: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-size: 1.125rem; /* Увеличенный размер шрифта */
}

.event-item p {
  margin: 8px 0; /* Отступы для абзацев */
}

.event-item h3 {
  font-size: 1.25rem; /* Увеличенный размер шрифта для заголовков */
}

.event-item ul {
  margin: 8px 0;
  padding-left: 20px;
}

.event-item ul li {
  list-style-type: disc;
}
</style>