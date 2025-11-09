import { Router } from "express";
import user from "./user.js";
import education from "./education.js";
import experience from "./experience.js";
import skill from "./skill.js";

const router = Router();

router.use("/users", user);
router.use("/education", education);
router.use("/experience", experience);
router.use("/skills", skill);

export default router;
