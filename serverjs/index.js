require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Ошибка подключения к MongoDB:', err.message);
});
// Схема для мероприятия
const eventSchema = new mongoose.Schema({
    _id: Number, // Уникальный идентификатор
    month: String, // Месяц проведения
    place: String, // Место проведения
    date: String, // Даты проведения
    isList: Boolean, // Флаг, является ли мероприятие списком
    leader_name: String, // Имя руководителя
    leader_responsibilities: Array, // Обязанности руководителя
    requirements_equipment: Array, // Необходимое снаряжение
    requirements_skills: String, // Требуемые навыки
    cost_amount: Number, // Стоимость
    cost_currency: String, // Валюта стоимости
    cost_additional_services: String // Дополнительные услуги
  });
  
  // Модель для коллекции "events"
  const Event = mongoose.model('events', eventSchema, 'events');
  // Роут для получения всех мероприятий
app.get('/api/events', async (req, res) => {
    try {
      console.log('Запрос на получение данных мероприятий получен'); // Логирование
      const events = await Event.find(); // Получаем все документы из коллекции
      res.json(events); // Отправляем данные в формате JSON
    } catch (err) {
      res.status(500).json({ message: err.message }); // Обработка ошибок
    }
  });

  
/* ----------------------------------------------------------------------------------------------------------- */
const applicationSchema = new mongoose.Schema({
    name: String,
    phone: String,
    course: String,
    date: { type: String, default: '' } // Теперь date будет строкой
});

// Pre-save hook для форматирования даты
applicationSchema.pre('save', function(next) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    // Форматируем дату
    this.date = `${day}.${month}.${year} ${hours}:${minutes}`;
    next();
});

const Application = mongoose.model('Application', applicationSchema);

// Маршрут для обработки POST-запросов
app.post('/api/applications', async (req, res) => {
    try {
        const { name, phone, course } = req.body;

        const newApplication = new Application({
            name,
            phone,
            course
        });

        await newApplication.save();

        res.status(201).json({ message: 'Application saved successfully!', date: newApplication.date });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
/* ----------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------- */
// Схема и модель для MongoDB
const courseSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
  });
  
  const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    items: Array,
  });
  
  const User = mongoose.model('User', userSchema);
  
  // POST-запрос для обработки данных с фронтенда
  app.post('/api/submit', async (req, res) => {
    try {
      const { name, phone, items } = req.body;
  
      // Создаем новый документ в базе данных
      const newUser = new User({
        name,
        phone,
        items,
      });
  
      // Сохраняем документ в базу данных
      await newUser.save();
  
      // Отправляем ответ об успешном сохранении
      res.status(200).json({ message: 'Заявка успешно отправлена!' });
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
      res.status(500).json({ message: 'Произошла ошибка при отправке заявки.' });
    }
  });






/* ----------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------------------------- */



  










































// Схема и модель для коллекции magazine
const magazineSchema = new mongoose.Schema({
    _id: Number,
    category: String,
    title: String,
    image: String,
    price: String,
    description: String,
    detailed: String,
});

// Указываем имя коллекции явно
const Magazine = mongoose.model('magazine', magazineSchema, 'magazine');

// Схема и модель для коллекции ski
const skiSchema = new mongoose.Schema({
    _id: Number,
    category: String,
    title: String,
    image: String,
    price: String,
    description: String,
    detailed: String,
});

// Указываем имя коллекции явно
const Ski = mongoose.model('ski', skiSchema, 'ski');

// Схема и модель для коллекции snowboard
const snowboardSchema = new mongoose.Schema({
    _id: Number,
    category: String,
    title: String,
    image: String,
    price: String,
    description: String,
    detailed: String,
});

// Указываем имя коллекции явно
const Snowboard = mongoose.model('snowboard', snowboardSchema, 'snowboard');

// Роуты
// 1. Получить все записи из коллекции ski
app.get('/api/ski', async (req, res) => {
    try {
        console.log('Запрос на получение данных ski получен'); // Логирование
        const skis = await Ski.find();
        res.json(skis);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Получить все записи из коллекции snowboards
app.get('/api/snowboards', async (req, res) => {
    try {
        console.log('Запрос на получение данных snowboards получен'); // Логирование
        const snowboards = await Snowboard.find();
        res.json(snowboards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// 2. Получить все записи из коллекции magazine
app.get('/api/magazine', async (req, res) => {
    try {
        console.log('Запрос на получение данных snowboards получен'); // Логирование
        const magazines = await Magazine.find();
        res.json(magazines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});