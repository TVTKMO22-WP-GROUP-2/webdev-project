import { Router } from "express";
import usersRouter from "./users.mjs";
import reviewsRouter from "./reviews.mjs";
import groupsRouter from "./groups.mjs";
const router = Router();

router.use(reviewsRouter);

router.use(usersRouter);

router.use(groupsRouter);

export default router;
