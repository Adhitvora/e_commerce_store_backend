const router = require('express').Router()
const paymentController = require('../controllers/payment/paymentController')
const { authMiddleware } = require('../middlewares/authMiddleware')

/* ------------------------------------------------ */
/* SELLER RAZORPAY ACCOUNT */
/* ------------------------------------------------ */

router.post(
    '/payment/create-razorpay-account',
    authMiddleware,
    paymentController.create_razorpay_account
)

router.put(
    '/payment/activate-payment-account',
    authMiddleware,
    paymentController.activate_payment_account
)

/* ------------------------------------------------ */
/* SELLER WALLET DETAILS */
/* ------------------------------------------------ */

router.get(
    '/payment/seller-payment-details/:sellerId',
    authMiddleware,
    paymentController.get_seller_payment_details
)

/* ------------------------------------------------ */
/* SELLER WITHDRAW */
/* ------------------------------------------------ */

router.post(
    '/payment/withdraw-request',
    authMiddleware,
    paymentController.withdraw_request
)

/* ------------------------------------------------ */
/* ADMIN SIDE */
/* ------------------------------------------------ */

router.get(
    '/payment/requests',
    authMiddleware,
    paymentController.get_payment_requests
)

router.post(
    '/payment/request-confirm',
    authMiddleware,
    paymentController.payment_request_confirm
)

module.exports = router
