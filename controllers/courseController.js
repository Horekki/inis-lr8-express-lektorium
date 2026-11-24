// CRUD-контроллеры курсов: async/await + try...catch, статусы 200/201/400/404/500
const Course = require('../models/Course')

// Ошибки клиента (невалидный id или поля) — 400, остальное — 500
function sendError(res, err) {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(400).json({ message: err.message })
  }
  console.error(err)
  return res.status(500).json({ message: 'Внутренняя ошибка сервера' })
}

exports.getAll = async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: 1 })
    res.status(200).json(courses)
  } catch (err) {
    sendError(res, err)
  }
}

exports.getOne = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).json({ message: 'Курс не найден' })
    res.status(200).json(course)
  } catch (err) {
    sendError(res, err)
  }
}

exports.create = async (req, res) => {
  try {
    const course = await Course.create(req.body)
    res.status(201).json(course)
  } catch (err) {
    sendError(res, err)
  }
}

exports.update = async (req, res) => {
  try {
    // runValidators — иначе PUT пропустит, например, отрицательную цену
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: 'after', // вернуть уже обновлённый документ
      runValidators: true,
    })
    if (!course) return res.status(404).json({ message: 'Курс не найден' })
    res.status(200).json(course)
  } catch (err) {
    sendError(res, err)
  }
}

exports.remove = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id)
    if (!course) return res.status(404).json({ message: 'Курс не найден' })
    res.status(200).json({ message: 'Курс удалён', id: course._id })
  } catch (err) {
    sendError(res, err)
  }
}
