const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const Category = require('../models/Category');

const addCategory = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        throw new BadRequestError("Category name is required");
    }
    const category = await Category.create({ name });

    res.status(StatusCodes.CREATED).json(category);
};

const getAllCategories  = async (req, res) => {
    const categories = await Category.find();
    res.status(StatusCodes.OK).json(categories);
};


const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        { name },
        { new: true, runValidators: true }
    );

    if (!updatedCategory) {
        throw new BadRequestError("Category not found");
    }

    res.status(StatusCodes.OK).json(updatedCategory);
};

const removeEmptyCategory = async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId).populate('services');

    if (!category) {
        throw new BadRequestError("Category not found");
    }

    if (category.services.length === 0) {
        await Category.findByIdAndDelete(categoryId);
        res.status(StatusCodes.NO_CONTENT).send();
    } else {
        throw new BadRequestError("Category is not empty")
    }
};


module.exports = { addCategory, getAllCategories , updateCategory, removeEmptyCategory };
