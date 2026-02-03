const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const adminModel = require("../models/adminModel")

mongoose.connect("mongodb+srv://adhitvora96_db_user:uq1EVkcDeaCjFwYS@cluster0.upfc5hf.mongodb.net/ecommerce")

const createAdmin = async () => {
    const hash = await bcrypt.hash("123456", 10)

    await adminModel.create({
        name: "Super Admin",
        email: "superadmin@gmail.com",
        password: hash,
        image: "admin.png",
        role: "admin"
    })

    console.log("Admin created successfully")
    process.exit()
}

createAdmin()
