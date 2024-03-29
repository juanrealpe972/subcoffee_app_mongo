import { Router } from "express";
import { login, register, logout, profile, userVerifyToken } from "../controllers/auth.controller.js"
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema, recuperarPassword } from "../schemas/auth.schema.js";

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/recuperar-password', validateSchema(recuperarPassword))
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/verify', userVerifyToken);
router.get('/profile', authRequired, profile);

export default router;