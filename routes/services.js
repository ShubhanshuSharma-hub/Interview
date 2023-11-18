const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service');

router.post('/:categoryId/service', serviceController.addService);
router.get('/:categoryId/services', serviceController.getAllServices);
router.put('/:categoryId/service/:serviceId', serviceController.updateService);
router.delete('/:categoryId/service/:serviceId', serviceController.removeService);
router.get('/:categoryId/service/:serviceId/priceOptions', serviceController.getAllServicePriceOptions);
router.post('/:categoryId/service/:serviceId', serviceController.addServicePriceOption);
router.put('/:categoryId/service/:serviceId/priceOptions/:priceOptionId', serviceController.updateServicePriceOption);
router.delete('/:categoryId/service/:serviceId/priceOptions/:priceOptionId', serviceController.removeServicePriceOption);

module.exports = router;
