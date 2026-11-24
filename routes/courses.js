// Маршруты /api/courses → контроллеры
const router = require('express').Router()
const c = require('../controllers/courseController')

router.route('/').get(c.getAll).post(c.create)
router.route('/:id').get(c.getOne).put(c.update).delete(c.remove)

module.exports = router
