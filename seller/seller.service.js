import { Product } from "./seller.model.js";
import { validateProduct } from "./seller.validation.js";
//add product validation function
export const addProductValidation = async (req, res, next) => {
  const productData = req.body;

  try {
    await validateProduct.validate(productData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

//add production function
export const addProduct = async (req, res, next) => {
  const productData = req.body;
  try {
    const productOwnerId = req.userId;

    const addProduct = { ...productData, productOwnerId };

    const result = await Product.create(addProduct);
    return res
      .status(200)
      .json({ data: result, message: "product Created Successfuly!!" });
  } catch (err) {
    return res.status(400).json({ message: "Add product failed!!", err });
  }
};

export const editProduct = async (req, res, next) => {
  const productId = req.params.id;
  const payload = req.body;

  try {
    const productData = await Product.findOneAndUpdate(
      { _id: productId },
      payload,
      { new: true }
    );
    //  await Product.updateOne({_id:productId},{$set:{...payload}})
    if (productData) {
      return res.status(200).json({ message: "Product update successfully!!" });
    }
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const productDetail = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const details = await Product.findOne({ _id: productId });
        if(details.isArchived !==false){
            return res.status(400).json({message: "product not found"})
        }


    return res.status(200).json({ data: details });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const payload= req.body;
  try {
  const checkProduct = await Product.findById(productId)

  if(checkProduct.isArchived===true){
    return res.status(400).json({message:"product not found"})
  }

    const result = await Product.findByIdAndUpdate(
      { _id:productId },
      payload,
      { new: true }
    );
    return res.status(200).json({message: "item deleted!!"})
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
