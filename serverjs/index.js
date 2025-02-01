require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const TelegramBot = require('node-telegram-bot-api');
const PORT = process.env.PORT || 3005;

// Инициализация бота
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(botToken, { polling: true });

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

// Схема для счетчика
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

// Функция для получения следующего номера заявки
async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return sequenceDocument.seq;
}

// Схема для мероприятия
const eventSchema = new mongoose.Schema({
    _id: Number,
    month: String,
    place: String,
    date: String,
    isList: Boolean,
    leader_name: String,
    leader_responsibilities: Array,
    requirements_equipment: Array,
    requirements_skills: String,
    cost_amount: Number,
    cost_currency: String,
    cost_additional_services: String,
    start_date: String,//
});

const Event = mongoose.model('events', eventSchema, 'events');

// Роут для получения всех мероприятий
app.get('/api/events', async (req, res) => {
    try {
        console.log('Запрос на получение данных мероприятий получен');
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Схема для заявки
const applicationSchema = new mongoose.Schema({
    applicationId: Number,
    name: String,
    phone: String,
    course: String,
    date: { type: String, default: '' }
});

applicationSchema.pre('save', function(next) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    this.date = `${day}.${month}.${year} ${hours}:${minutes}`;
    next();
});

const Application = mongoose.model('Application', applicationSchema);

// Маршрут для обработки POST-запросов
app.post('/api/applications', async (req, res) => {
    try {
        const { name, phone, course } = req.body;

        const applicationId = await getNextSequenceValue('applicationId');

        const newApplication = new Application({
            applicationId,
            name,
            phone,
            course
        });

        await newApplication.save();

        const message = `Новая заявка на курс!\nНомер заявки: ${applicationId}\nИмя: ${name}\nТелефон: ${phone}\nКурс: ${course}`;
        bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);

        res.status(201).json({ message: 'Application saved successfully!', date: newApplication.date, applicationId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Схема и модель для MongoDB
const courseSchema = new mongoose.Schema({
    title: String,
    category: String,
    price: Number,
});

const userSchema = new mongoose.Schema({
    applicationId: Number,
    name: String,
    phone: String,
    items: Array,
});

const User = mongoose.model('User', userSchema);

// POST-запрос для обработки данных с фронтенда
app.post('/api/submit', async (req, res) => {
    try {
        const { name, phone, items } = req.body;

        const applicationId = await getNextSequenceValue('applicationId');

        const newUser = new User({
            applicationId,
            name,
            phone,
            items,
        });

        await newUser.save();

        let message = `Новая заявка от пользователя!\nНомер заявки: ${applicationId}\nИмя: ${name}\nТелефон: ${phone}\nТовары:\n`;
        items.forEach(item => {
            message += `- Название: ${item.title}, Категория: ${item.category}, Цена: от ${item.price}\n`;
        });

        bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);

        res.status(200).json({ message: 'Заявка успешно отправлена!', applicationId });
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
        res.status(500).json({ message: 'Произошла ошибка при отправке заявки.' });
    }
});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log(`Chat ID: ${chatId}`);
    bot.sendMessage(chatId, 'Привет! Я бот, который будет уведомлять вас о новых заказах.');
});

bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});

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

const Snowboard = mongoose.model('snowboard', snowboardSchema, 'snowboard');

// Роуты
app.get('/api/ski', async (req, res) => {
    try {
        console.log('Запрос на получение данных ski получен');
        const skis = await Ski.find();
        res.json(skis);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/snowboards', async (req, res) => {
    try {
        console.log('Запрос на получение данных snowboards получен');
        const snowboards = await Snowboard.find();
        res.json(snowboards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/magazine', async (req, res) => {
    try {
        console.log('Запрос на получение данных snowboards получен');
        const magazines = await Magazine.find();
        res.json(magazines);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});