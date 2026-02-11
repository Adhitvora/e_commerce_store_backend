const router = require('express').Router()
const { authMiddleware } = require('../../middlewares/authMiddleware')
const productController = require('../../controllers/dashboard/productController')
router.post('/product-add', authMiddleware, productController.add_product)
router.get('/products-get', authMiddleware, productController.products_get)
router.get('/product-get/:productId', authMiddleware, productController.product_get)
router.post('/product-update', authMiddleware, productController.product_update)
router.post('/product-image-update', authMiddleware, productController.product_image_update)
router.delete(
    '/product/delete/:productId',
    authMiddleware,
    productController.delete_product
);
router.get('/test-delete', (req, res) => {
    res.send('route working');
});
router.put(
    '/product/approve/:productId',
    authMiddleware,
    productController.approve_product
)

router.put(
    '/product/reject/:productId',
    authMiddleware,
    productController.reject_product
)

router.get(
    '/admin/products-get',
    authMiddleware,
    productController.admin_products_get
);
router.get(
    '/admin/product-details/:productId',
    authMiddleware,
    productController.product_full_details
);



module.exports = router