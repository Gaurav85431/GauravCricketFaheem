const express = require("express");
const get_route = express();

const category_controller = require("../controllers/categoryController");
const product_controller = require("../controllers/productController");


get_route.set('view engine', 'ejs');
get_route.set('views', "./views/users");
//get_route.set('views', __dirname + '/views/users');

const bodyParser = require("body-parser");
get_route.use(bodyParser.json());
get_route.use(bodyParser.urlencoded({ extended: true }));
const auth = require("../middleware/auth");

const multer = require("multer");
const path = require("path");


get_route.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/productImages'), function (err, success) {

            if (err) {
                throw err
            }

        });
    },

    filename: function (req, file, cb) {

        const name = Date.now() + '-' + file.originalname;
        cb(null, name, function (error, success) {

            if (error) {
                throw error
            }

        });

    }
});

const upload = multer({ storage: storage });

get_route.get('/getAllData', product_controller.getdetail);
get_route.get('/getData/:id', product_controller.getdetailbyid);


get_route.post('/insertData', upload.array('images'), product_controller.insertproduct);
get_route.put('/updateData', upload.array('images'), product_controller.updateproduct);
get_route.delete('/deleteData/:id', product_controller.deleteproduct);
get_route.get('/getImages/:image', product_controller.getimage);




get_route.post('/category', category_controller.category_user);


module.exports = get_route;

// const auth= require("../middleware/auth");
// product_route.post('/add-product', upload.array('images', 8), auth, product_controller.addproduct);
//get_route.get('/get-data', user_controller.product);