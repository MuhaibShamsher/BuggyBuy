import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto',
            folder: 'Vulnerable Web App'
        }
        )

        fs.unlinkSync(localFilePath);
        return uploadResult;

    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteOnCloudinary = async (imgaeURL) => {
    try {
        if (!imgaeURL) return null;

        const publicID = imgaeURL.split('/').pop().split('.')[0]
        const res = await cloudinary.uploader.destroy(publicID);

        if (res.result !== "ok") {
            return res.status(500).json({
                success: false,
                message: "Failed to delete image from Cloudinary"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "An unexpected error occurred while deleting image"
        });
    }
}

export {
    uploadOnCloudinary,
    deleteOnCloudinary
}