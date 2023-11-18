const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const Category = require('../models/Category');
const Service = require('../models/Service');
const ServicePriceOption = require('../models/ServicePriceOption');

const addService = async (req, res) => {
    const { categoryId } = req.params;
    const { name, type, priceOptions } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new BadRequestError('Category not found');
    }

    const newService = await Service.create({
        category: category._id,
        name,
        type,
        priceOptions,
    });

    const serviceObjectId = newService._id;

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { $push: { services: serviceObjectId } },
        { new: true, runValidators: true }
    ).populate('services');

    if (!updatedCategory) {
        throw new BadRequestError('Category not found');
    }

    res.status(StatusCodes.CREATED).json(updatedCategory.services);
};

const getAllServices = async (req, res) => {
    const { categoryId } = req.params;
    const category = await Category.findById(categoryId).populate('services');

    if (!category) {
        throw new BadRequestError('Category not found');
    }

    res.status(StatusCodes.OK).json(category.services);
};

const updateService = async (req, res) => {
    const { categoryId, serviceId } = req.params;
    const { name, type, priceOptions } = req.body;

    const category = await Category.findById(categoryId).populate('services');

    if (!category) {
        throw new BadRequestError('Category not found');
    }

    const serviceIndex = category.services.findIndex(
        (service) => service._id.toString() === serviceId
    );

    if (serviceIndex === -1) {
        throw new BadRequestError('Service not found');
    }

    category.services[serviceIndex].name = name || category.services[serviceIndex].name;
    category.services[serviceIndex].type = type || category.services[serviceIndex].type;
    category.services[serviceIndex].priceOptions =
        priceOptions || category.services[serviceIndex].priceOptions;

    await category.save();

    res.status(StatusCodes.OK).json(category.services[serviceIndex]);
};

const removeService = async (req, res) => {
    const { categoryId, serviceId } = req.params;
    const category = await Category.findById(categoryId);

    if (!category) {
        throw new BadRequestError('Category not found');
    }

    const serviceIndex = category.services.findIndex(
        (service) => service._id.toString() === serviceId
    );

    if (serviceIndex === -1) {
        throw new BadRequestError('Service not found');
    }

    category.services.splice(serviceIndex, 1);

    await category.save();

    res.status(StatusCodes.NO_CONTENT).send();
};

const getAllServicePriceOptions = async (req, res) => {
    const { serviceId } = req.params;
    const servicePriceOptions = await ServicePriceOption.find({ service: serviceId });

    res.status(StatusCodes.OK).json(servicePriceOptions);
};

const addServicePriceOption = async (req, res) => {
    const { categoryId, serviceId } = req.params;
    const { duration, price, type } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
        throw new BadRequestError('Category not found');
    }

    const service = await Service.findById(serviceId);

    if (!service) {
        throw new BadRequestError('Service not found');
    }

    const priceOption = await ServicePriceOption.create({ service: service._id, duration, price, type });

    service.priceOptions.push(priceOption._id);
    await service.save();

    res.status(StatusCodes.CREATED).json(priceOption);
};

const updateServicePriceOption = async (req, res) => {
    const { categoryId, serviceId, priceOptionId } = req.params;
    const { duration, price, type } = req.body;

    const category = await Category.findById(categoryId);

    if (!category) {
        throw new BadRequestError('Category not found');
    }

    const service = await Service.findById(serviceId);

    if (!service) {
        throw new BadRequestError('Service not found');
    }

    const priceOption = await ServicePriceOption.findByIdAndUpdate(
        priceOptionId,
        { duration, price, type },
        { new: true, runValidators: true }
    );

    if (!priceOption) {
        throw new BadRequestError('Service Price Option not found');
    }

    res.status(StatusCodes.OK).json(priceOption);
};

const removeServicePriceOption = async (req, res) => {
    const { categoryId, serviceId, priceOptionId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
        return res.status(StatusCodes.NOT_FOUND).send('Category not found');
    }

    const service = await Service.findById(serviceId);
    if (!service) {
        return res.status(StatusCodes.NOT_FOUND).send('Service not found');
    }

    service.priceOptions.pull(priceOptionId);
    await service.save();

    const deletedPriceOption = await ServicePriceOption.findByIdAndDelete(priceOptionId);

    if (!deletedPriceOption) {
        return res.status(StatusCodes.NOT_FOUND).send('Service Price Option not found');
    }

    res.status(StatusCodes.OK).send('Service Price Option deleted successfully');
};


module.exports = { addService, getAllServices, updateService, removeService, getAllServicePriceOptions, addServicePriceOption, updateServicePriceOption, removeServicePriceOption };
