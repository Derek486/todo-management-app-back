import { postLogin, postRegister } from "@http/controllers/auth/auth.controller";
import validatorMiddleware from "@http/middlewares/validator.middleware";
import { loginSchema, registerSchema } from "@http/request/auth/auth.request";
import { Router } from "express";

const router = Router()

router.post('/login', validatorMiddleware(loginSchema), postLogin)
router.post('/register', validatorMiddleware(registerSchema), postRegister)

export default router;