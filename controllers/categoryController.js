const userproduct = require("../models/productModel");
const user = require("../models/categoryModel");
const path = require("path");
const fs = require("fs");
const bcryptjs = require('bcryptjs');

/*
const create_token = async (id) => {

    try {

        const token = await jwt.sign({ _id: id }, config.secret_jwt);
        return token;

    }
    catch (error) {
        res.status(400).send(error.message);
    }
}

const securePassword = async (password) => {
    try {
        const passwordHash = await bcryptjs.hash(password, 10);
        return passwordHash;
    }
    catch (error) {

        res.status(400).send(error.message);

    }
}
*/


/** Cricket code */

const category_user = async (req, res) => {


    try {

        const users = new user({
            category: req.body.category,

        });



        const userData = await user.findOne({ category: req.body.category });
        if (userData) {
            res.status(200).send({ success: false, msg: "This name is already exist" });

        }
        else {
            const user_data = await users.save();
            res.status(200).send({ success: true, data: user_data });
        }

    }

    catch (error) {


        res.status(400).send(error.message);
    }
}



/** End cricket code */


module.exports = {

    category_user

}