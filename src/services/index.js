import express from "express";
import createHttpError from "http-errors";
import blogsModel from "./schema.js";

const blogpostRouter = express.Router()

blogpostRouter.post("/", async(req, res, next) => {
    try {
        const newblog = new blogsModel(req.body)
        const {_id} = await newblog.save()
        res.status(201).send({ _id })
    } catch (error) {
        next(error)
    }
})

blogpostRouter.get("/", async(req, res, next) => {
    try {
        const blogs = await blogsModel.find()
        res.send(blogs)
    } catch (error) {
        next(error)
    }
})

blogpostRouter.get("/:id", async(req, res, next) => {
    try {
        const eachblog = await blogsModel.findById(req.params.id)
        if(eachblog) res.send(eachblog)
        else next(createHttpError(404, `blog with id ${req.params.id} is not found`))
    } catch (error) {
        next(error)
    }
})

blogpostRouter.put("/:id", async(req, res, next) => {
    try {
        const updateblog = await blogsModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(updateblog) res.send(updateblog)
        else next(createHttpError(404, `blog with id ${req.params.id} is not found`))
    } catch (error) {
        next(error)
    }
})

blogpostRouter.delete("/:id", async(req, res, next) => {
    try {
        const todeleteblog = await blogsModel.findByIdAndDelete(req.params.id)
        if(todeleteblog) res.status(204).send({message: "Deleted Successfully"})
        else next(createHttpError(404, `blog with id ${req.params.id} is not found`))
    } catch (error) {
        next(error)
    }
})


blogpostRouter.post("/:id/comment", async (req,res,next) => {
    try {
        const updatedBlogPost = await blogsModel.findByIdAndUpdate(
          req.params.id,
          { $push: { comment: req.body } },
          { new: true }
        );
        if (updatedBlogPost) {
          res.send(updatedBlogPost);
          next(
            createHttpError(404,`Blogpost with id ${req.params.id} not found!`)
          );
        }
      } catch (error) {
        next(error);
      }
})

export default blogpostRouter;