const cloudinary = require('cloudinary').v2
require('dotenv').config()
let isConfigured = false

const configureCloudinary = () => {
    if (!isConfigured) {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true
        })
        isConfigured = true
    }

    return cloudinary
}

const uploadToCloudinary = async (filepath, folder) => {
    const client = configureCloudinary()
    return client.uploader.upload(filepath, { folder })
}

const uploadManyToCloudinary = async (files = [], folder) => {
    return Promise.all(files.map((file) => uploadToCloudinary(file.filepath, folder)))
}

const getCloudinaryPublicId = (url = '') => {
    if (!url) return null

    const parts = String(url).split('/')
    const uploadIndex = parts.findIndex((part) => part === 'upload')

    if (uploadIndex === -1) return null

    let publicIdParts = parts.slice(uploadIndex + 1)

    if (publicIdParts[0] && publicIdParts[0].startsWith('v')) {
        publicIdParts = publicIdParts.slice(1)
    }

    if (!publicIdParts.length) return null

    return publicIdParts.join('/').replace(/\.[^/.]+$/, '')
}

module.exports = {
    configureCloudinary,
    getCloudinaryPublicId,
    uploadToCloudinary,
    uploadManyToCloudinary
}
