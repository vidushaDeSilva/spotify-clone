import { v2 as cloudinary } from 'cloudinary';
import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
    try {
        const name = req.body.name;
        const desc = req.body.desc;  // Corrected from req.body.name to req.body.desc
        const bgColor = req.body.bgColor;
        const imageFile = req.file;
        
        // Upload the image file to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        // Create the album data object
        const albumData = {
            name,
            desc,
            bgColor,
            image: imageUpload.secure_url
        };

        // Create a new album instance and save it to the database
        const album = new albumModel(albumData);
        await album.save();

        // Respond with a success message
        res.json({ success: true, message: "album added" });

    } catch (error) {
        // Log the error and respond with a failure message
        console.error(error);
        res.json({ success: false, message: "album is not added" });
    }
};

const listAlbum = async (req, res) => {
        try {
            const allAlbums = await albumModel.find({}) 
            res.json({success:true, songs: allAlbums})
        } catch (error) {
            res.json({success:false});
        }
    }


const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"album removed"})
    } catch (error) {
        res.json({success:false})
    }
}

export {addAlbum, listAlbum, removeAlbum}