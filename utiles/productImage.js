const fs = require('fs/promises')
const os = require('os')
const path = require('path')
const { randomUUID } = require('crypto')
const sharp = require('sharp')
const { uploadToCloudinary } = require('./cloudinary')

const PRODUCT_IMAGE_SIZE = 800
const PRODUCT_IMAGE_ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const DEFAULT_PRODUCT_IMAGE_BACKGROUND = '#efe9e2'

const normalizeProductImageBackground = (backgroundColor = '') => {
    const value = String(backgroundColor).trim()

    if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)) {
        return value
    }

    if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i.test(value)) {
        return value
    }

    return DEFAULT_PRODUCT_IMAGE_BACKGROUND
}

const normalizeProductImageFile = async (file, backgroundColor) => {
    if (!file?.filepath) {
        const error = new Error('Please upload at least one product image.')
        error.statusCode = 400
        throw error
    }

    if (file.mimetype && !PRODUCT_IMAGE_ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        const error = new Error('Only JPG, PNG, and WEBP product images are allowed.')
        error.statusCode = 400
        throw error
    }

    const outputPath = path.join(os.tmpdir(), `${randomUUID()}-product.jpg`)
    const normalizedBackground = normalizeProductImageBackground(backgroundColor)

    try {
        await sharp(file.filepath)
            .rotate()
            .flatten({ background: normalizedBackground })
            .resize(PRODUCT_IMAGE_SIZE, PRODUCT_IMAGE_SIZE, {
                fit: 'contain',
                background: normalizedBackground,
                withoutEnlargement: true
            })
            .jpeg({
                quality: 92,
                mozjpeg: true
            })
            .toFile(outputPath)

        return outputPath
    } catch (error) {
        const processingError = new Error('We could not process the uploaded image. Please try another file.')
        processingError.statusCode = 400
        throw processingError
    }
}

const uploadNormalizedProductImage = async (file, backgroundColor) => {
    const normalizedFilepath = await normalizeProductImageFile(file, backgroundColor)

    try {
        return await uploadToCloudinary(normalizedFilepath, 'products')
    } finally {
        await fs.unlink(normalizedFilepath).catch(() => {})
    }
}

const uploadNormalizedProductImages = async (files = [], backgroundColor) => {
    const uploadedImages = []

    for (const file of files) {
        const uploadedImage = await uploadNormalizedProductImage(file, backgroundColor)
        uploadedImages.push(uploadedImage)
    }

    return uploadedImages
}

module.exports = {
    PRODUCT_IMAGE_ALLOWED_MIME_TYPES,
    DEFAULT_PRODUCT_IMAGE_BACKGROUND,
    PRODUCT_IMAGE_SIZE,
    normalizeProductImageBackground,
    uploadNormalizedProductImage,
    uploadNormalizedProductImages
}
