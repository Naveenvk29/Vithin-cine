import dotenv from "dotenv";

dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Upload an image to Cloudinary
const uploadImage = async (file) => {
  try {
    const responce = await cloudinary.uploader.upload(file.path, {
      folder: "movies_posters",
      public_id: `movies/${file.filename}`,
      resource_type: "auto",
    });
    fs.unlinkSync(file.path);
    // console.log(responce.secure_url, responce.public_id);

    return responce;
  } catch (error) {
    console.error("Error uploading image to Cloudinary", error);
    fs.unlinkSync(file.path);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

// Delete an image from Cloudinary
const deleteImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    // console.log(`Image with public_id ${public_id} deleted successfully`);
    return true;
  } catch (error) {
    console.error("Error deleting image from Cloudinary", error);
    throw new Error("Failed to delete image from Cloudinary");
  }
};

export { uploadImage, deleteImage };
