// Точка входа: читаем .env, подключаемся к MongoDB, поднимаем Express
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

app.use('/api/courses', require('./routes/courses'))

// Неизвестный маршрут — 404 в JSON, а не HTML-страница Express
app.use((req, res) => res.status(404).json({ message: 'Маршрут не найден' }))

// Битый JSON в теле запроса — это ошибка клиента (400)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Некорректный JSON' })
  }
  console.error(err)
  res.status(500).json({ message: 'Внутренняя ошибка сервера' })
})

const PORT = process.env.PORT || 5208

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB подключена')
    app.listen(PORT, () => console.log(`API: http://localhost:${PORT}/api/courses`))
  } catch (err) {
    console.error('Не удалось подключиться к MongoDB:', err.message)
    process.exit(1)
  }
}

start()
