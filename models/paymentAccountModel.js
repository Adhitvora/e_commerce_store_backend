const { Schema, model } = require('mongoose')

const paymentAccountSchema = new Schema({
    sellerId: {
        type: Schema.ObjectId,
        required: true
    },
    razorpayAccountId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = model('paymentAccounts', paymentAccountSchema)
