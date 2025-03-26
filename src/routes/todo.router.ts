import { getTodo, getTodoById, patchTodo, postTodo, putTodo } from "@http/controllers/todo/todo.controller";
import validatorMiddleware from "@http/middlewares/validator.middleware";
import { todoCreateSchema, todoPartialSchema, todoUpdateSchema } from "@http/request/todos/todo-modify.request";
import { Router } from "express";

const router = Router()

router.use((_req, res, next) => {
  try {
    return next()
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: 'An error has ocurrend'
    })
  }
})
router.get('/todos/:id', getTodoById)
router.get('/todos', getTodo)
router.post('/todos', validatorMiddleware(todoCreateSchema), postTodo)
router.put('/todos/:id', validatorMiddleware(todoUpdateSchema), putTodo)
router.patch('/todos/:id', validatorMiddleware(todoPartialSchema), patchTodo)

export default router