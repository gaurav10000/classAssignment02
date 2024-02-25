import { Item } from '../models/item.model.js'


const createItem = async (req, res) => {
    const { name, price, color } = req.body
    if (
        !name ||
        !price ||
        !color
    ) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all required fields!'
        })
    }

    const itemAlreadyExists = await Item.findOne({
        name
    })

    if (itemAlreadyExists) {
        return res.status(400).json({
            success: false,
            message: 'Item with same name already exists!'
        })
    }

    const newItem = await Item.create({
        name,
        price,
        color
    })

    if(!newItem) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'New Item Created!',
        data: newItem
    })
}

const getItemsByName = async (req, res) => {
    const { name } = req.params

    if (name == "allItems") {
        const data = await Item.find({})
        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        })
    }

    if (!name) {
        const data = await Item.find({})
        return res.status(400).json({
            success: false,
            message: 'Please fill name!'
        })
    }

    const item = await Item.find({name})

    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Item not found!'
        })
    }

    return res.status(200).json({
        success: true,
        data: item
    })
}

const deleteItem = async (req, res) => {
    const { name } = req.body

    if (
        !name 
    ) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the required fields!'
        })
    }

    const result = await Item.findOneAndDelete({
        name
    })

    if (!result) {
        return res.status(404).json({
            success: false,
            message: 'Item not found!'
        })
    }

    return res.status(200).json({
        success: true,
        message: 'Item deleted Successfully!',
        data: result
    })
}

const updateItem = async (req, res) => {
    const {name, price, color} = req.body
    
    if (
        !name || !(price || color)
    ) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the required fields!'
        })
    }

    const item = await Item.findOne({name})

    if (!item) {
        return res.status(404).json({
            success: false,
            message: 'Item not found!'
        })
    }

    let updatedItem

    if (color && price) {
        updatedItem = await Item.findOneAndUpdate({name}, {price, color})
    } else if (color) {
        updatedItem = await Item.findOneAndUpdate({name}, {color})
    }else {
        updatedItem = await Item.findOneAndUpdate({name}, {price})
    }


    if (!updateItem) {
        return res.status(500).json({
            success: false,
            messgae: 'Internal Server Error!'
        })
    }

    return res.status(200).json({
        success: true,
        messgae: 'Item updated Successfully!',
        data: updateItem
    })
}

export {
    createItem,
    getItemsByName,
    deleteItem,
    updateItem
}