const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const adminModel = require("../models/adminModel")

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")

const createAdmin = async () => {
    const hash = await bcrypt.hash("123456", 10)

    await adminModel.create({
        name: "Super Admin",
        email: "admin@gmail.com",
        password: hash,
        image: "admin.png",
        role: "admin"
    })

    console.log("Admin created successfully")
    process.exit()
}

createAdmin()
