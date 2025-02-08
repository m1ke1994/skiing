const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
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

// Роут для добавления нового мероприятия
app.post('/api/events', async (req, res) => {
    const event = new Event(req.body);
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Роут для обновления мероприятия по ID
app.put('/api/events/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!event) {
            return res.status(404).json({ message: 'Мероприятие не найдено' });
        }
        res.json(event);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Роут для удаления мероприятия по ID
app.delete('/api/events/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Мероприятие не найдено' });
        }
        res.json({ message: 'Мероприятие удалено' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Экспорт приложения
module.exports = app;