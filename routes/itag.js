import express from "express";
import { v4 as uuidv4 } from 'uuid';
import { createTag, getTags, getTag, deleteTag, updateTag } from "../controllers/itag.js";

uuidv4(); // => sdfsdf324-sdfsfd324-wd23sfd

const router = express.Router();

router.get('/', getTags);

router.post('/', createTag);

router.get('/:id', getTag);

router.delete('/:id', deleteTag);

router.patch('/:id', updateTag);


export default router;