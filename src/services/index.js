import express from 'express'
import createHttpError from 'http-errors'
import blogsModel from './schema.js'
import { basicAuthMiddleware } from '../auth/basic.js'

const blogpostRouter = express.Router()

blogpostRouter.post('/', async (req, res, next) => {
  try {
    const newblog = new blogsModel(req.body)
    const { _id } = await newblog.save()
    res.status(201).send({ _id })
  } catch (error) {
    next(error)
  }
})

blogpostRouter.get('/', basicAuthMiddleware, async (req, res, next) => {
  try {
    const blogs = await blogsModel.find()
    res.send(blogs)
  } catch (error) {
    next(error)
  }
})

blogpostRouter.get('/me', basicAuthMiddleware, async (req, res, next) => {
  try {
    res.send(req.author)
  } catch (error) {
    next(error)
  }
})

blogpostRouter.put('/me', basicAuthMiddleware, async (req, res, next) => {
  try {
    req.author.name
    await req.author.save()

    res.send()
  } catch (error) {
    next(error)
  }
})

blogpostRouter.delete('/me', basicAuthMiddleware, async (req, res, next) => {
  try {
    await req.author.deleteOne()

    res.send()
  } catch (error) {
    next(error)
  }
})

blogpostRouter.post('/:id/comment', async (req, res, next) => {
  try {
    const updatedBlogPost = await blogsModel.findByIdAndUpdate(
      req.params.id,
      { $push: { comment: req.body } },
      { new: true },
    )
    if (updatedBlogPost) {
      res.send(updatedBlogPost)
      next(createHttpError(404, `Blogpost with id ${req.params.id} not found!`))
    }
  } catch (error) {
    next(error)
  }
})

export default blogpostRouter
