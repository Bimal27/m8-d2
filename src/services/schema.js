import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

const blogpostSchema = new Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    cover: { type: String, required: true },
    readTime: {
      value: { type: Number, required: true },
      unit: { type: String, required: true },
    },
    author: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    content: { type: String, required: true },

    comment: [
      {
        text: String,
        username: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

// blogpostSchema.pre('save', async function (next) {
//   const newAuthor = this
//   const plainPW = newAuthor.password

//   if (newAuthor.isModified('password')) {
//     newAuthor.password = await bcrypt.hash(plainPW, 10)
//   }
//   next()
// })

// blogpostSchema.methods.toJSON = function () {
//   const authorDocument = this
//   const authorObject = authorDocument.toObject()
//   delete authorObject.password
//   delete authorObject.__v

//   return authorObject
// }

// blogpostSchema.statics.checkCredentials = async function (email, plainPW) {
//   const authors = await this.findOne({ email })

//   if (authors) {
//     const isMatch = await bcrypt.compare(plainPW, authors.password)

//     if (isMatch) return authors
//     else return null
//   } else return null
// }
export default model('strive-blog-posts', blogpostSchema)
