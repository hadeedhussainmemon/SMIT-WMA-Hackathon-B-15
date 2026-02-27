import Item from '../models/Item.js';

// @desc    Get all items
// @route   GET /api/items
// @access  Public
export const getItems = async (req, res) => {
    const items = await Item.find({});
    res.json(items);
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
export const getItemById = async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (item) {
        res.json(item);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
};

// @desc    Create an item
// @route   POST /api/items
// @access  Private / User
export const createItem = async (req, res) => {
    const { name, description } = req.body;
    let imageUrl = '';

    // Cloudinary upload logic would go here using req.file

    const item = new Item({
        name,
        description,
        image: imageUrl,
        user: req.user._id,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private
export const updateItem = async (req, res) => {
    const { name, description } = req.body;

    const item = await Item.findById(req.params.id);

    if (item) {
        // RBAC check (done via middleware or manually here)
        if (item.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to update this item');
        }

        item.name = name || item.name;
        item.description = description || item.description;

        const updatedItem = await item.save();
        res.json(updatedItem);
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private
export const deleteItem = async (req, res) => {
    const item = await Item.findById(req.params.id);

    if (item) {
        if (item.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401);
            throw new Error('Not authorized to delete this item');
        }
        await Item.deleteOne({ _id: item._id });
        res.json({ message: 'Item removed' });
    } else {
        res.status(404);
        throw new Error('Item not found');
    }
};
