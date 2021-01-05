import { Router } from 'express';
const router = Router();

import { createImage, getImages, getImage, deleteImage, updateImage } from '../controllers/image.controller';
import multer from '../libs/multer';

router.route('/images')
    .post(multer.single('image'), createImage)
    .get(getImages);

router.route('/images/:id')
    .get(getImage)
    .delete(deleteImage)
    .put(updateImage)

export default router;