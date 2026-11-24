// Mongoose-схема курса «Лекториум» — та же сущность, что в каталоге ЛР2–ЛР7
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Название курса обязательно'],
      trim: true,
      maxlength: [120, 'Название не длиннее 120 символов'],
    },
    price: {
      type: Number,
      required: [true, 'Цена обязательна'],
      min: [0, 'Цена не может быть отрицательной'],
    },
    description: { type: String, trim: true, default: '' },
    image: { type: String, default: '/assets/course.svg' },
  },
  // createdAt/updatedAt — чтобы было видно, что PUT реально меняет документ
  { timestamps: true, versionKey: false }
)

module.exports = mongoose.model('Course', courseSchema)
