import { getTodos, getTodoById, patchTodo, postTodo, putTodo, deleteTodo } from "@http/controllers/todo/todo.controller";
import authMiddleware from "@http/middlewares/auth.middleware";
import validatorMiddleware from "@http/middlewares/validator.middleware";
import { todoCreateSchema, todoPartialSchema, todoUpdateSchema } from "@http/request/todos/todo-modify.request";
import { Router } from "express";

const router = Router()

router.use(authMiddleware)
router.get(':id', getTodoById)
router.get('', getTodos)
router.post('', validatorMiddleware(todoCreateSchema), postTodo)
router.put(':id', validatorMiddleware(todoUpdateSchema), putTodo)
router.patch(':id', validatorMiddleware(todoPartialSchema), patchTodo)
router.delete(':id', deleteTodo)

export default router