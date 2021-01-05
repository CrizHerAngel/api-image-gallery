import { Request, Response } from 'express';
import path from 'path';
import  fs  from 'fs-extra';
import Image from '../models/Image';

export async function getImages(req: Request, res:Response): Promise<Response> {
    const images = await Image.find();
    return res.json(images);
}

export async function getImage(req: Request, res: Response): Promise<Response> {
    const image = await Image.findById(req.params.id);
    return res.json(image);   
}

export async function createImage(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;
    console.log(req.file.path)
    const newImage = {
        title: title,
        description: description,
        imagePath: req.file.path
    };
    const image = new Image(newImage);
    await image.save();

    return res.json({
        message: 'Image successfully saved',
        image
    })
}

export async function deleteImage(req: Request, res: Response): Promise<Response> {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (image) {
       await fs.unlink(path.resolve(image.imagePath))
    }
    return res.json({
        message: 'Image deleted...',
        image
    })
}

export async function updateImage(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;
    console.log(req.body);
    const updateImage = await Image.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });
    return res.json({
        message: 'Successfully updated',
        updateImage
    })
}