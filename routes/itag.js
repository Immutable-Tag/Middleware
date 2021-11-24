import express from "express";
import { createTag, getTag } from "../controllers/itag.js";

const router = express.Router();
router.post('/tags', createTag);
router.post('/tags/:tagId', getTag);


export default router;