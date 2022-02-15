const router = require("express").Router();
const Product = require("../models/Product");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
/*const fileFilter = (req,file,cb)=>{
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
    cb(null,true)
  } else {
    cb(null,false)
  }

}*/
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, //5 mega
  },
  //fileFilter:fileFilter
});
const CategoriesProduct = require("../models/Categories_products");

// upload.single('productImage')
router.post("/add", upload.single("productImage"), async (req, res) => {
  /* const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message)*/
  console.log(req.file);
  const productExist = await Product.findOne({ name: req.body.name });
  if (productExist) return res.status(400).send("Product already exists");

  const product = new Product({
    id_User: req.body.id_User,
    name: req.body.name,
    status: req.body.status,
    category_Product_id: req.body.category_Product_id,
    price: req.body.price,
    productImage: req.file.path,
    //  company_id : req.body.company_id
  });
  try {
    const saveProduct = await product.save();
    res.send(saveProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/:id", async (req, res) => {
  const allPoduct = await Product.find({ id_User: req.params.id }).populate({
    path: "Category_Product_id",
    select: "name",
  });

  res.send(allPoduct);
});

router.get("/", async (req, res) => {
  const allPoduct = await Product.find().populate({
    path: "Category_Product_id",
    select: "name",
  });

  res.send(allPoduct);
});

router.put("/update/:id", upload.single("productImage"), async (req, res) => {
  return Product.findById(req.params.id, function (err, product) {
    product.name = req.body.name;
    (product.id_User = req.body.id_User), (product.price = req.body.price);
    product.status = req.body.status;
    product.category_Product_id = req.body.category_Product_id;
    product.productImage = req.file.path;
    return product.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(product);
    });
  });
});

router.delete("/delete/:id", async (req, res) => {
  return Product.findById(req.params.id, function (err, product) {
    return product.remove(function (err) {
      if (!err) {
        console.log("removed");
        return res.send("");
      } else {
        console.log(err);
      }
    });
  });
});

router.get("/:id/:category", async (req, res) => {
  const io = req.app.get("socket");
  
  //socket.emit(customerId, { test: "something" });
  const categry_product = await Product.find({
    id_User: req.params.id,
    category_Product_id: req.params.category,
  })
    .populate({ path: "category_Product_id", select: "name" })
    .exec();
  // ,{path:"id_User",select:"worksAt"}
  if (!categry_product) return res.status(400).send("Category not exist");

  io.emit("categry_product", categry_product);

  res.send(categry_product);
});
module.exports = router;