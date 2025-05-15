import { Product } from "./seller.model.js";
import { validateProduct } from "./seller.validation.js";

//add product validation function
export const addProductValidation = async (req, res, next) => {
  const productData = req.body;

  productData;

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
    if (req.files) {
      productData.images = [];

      req.files.map((file) => {
        productData.images.push("public/images/".concat(file.filename));
      });
    }

    const productOwnerId = req.userId;
    productOwnerId;
    const addProduct = { ...productData, productOwnerId };

    const result = await Product.create(addProduct);
    return res
      .status(200)
      .json({ data: result, message: "product Created Successfuly!!" });
  } catch (err) {
    return res.status(400).json({ message: "Add product failed!!", err });
  }
};

export const listProduct = async (req, res, next) => {
//   try { const payload = req.userId;
//   const {limit,page,search,isArchived}=req.query;
//   const query=[];
//     const result = await Product.find({ productOwnerId: payload });

//     if(search){
//      query.push( {
//         $match:{ 
//           productName: new RegExp(search,"i")
//         }
//       })
//     }
   
//  query.push(
//     { $match: { isArchived: isArchived } },
//     { $sort: { createdAt: -1 } },
//     {
//       $facet: {
//         metaData: [{ $count: 'total' }],
//         data: [{ $skip: (page-1)*limit}, { $limit: limit }],
//         categorySummary: [
//           {
//             $group: {
//               _id: '$category',
//               count: { $sum: 1 }
//             }
//           }
//         ]
//       }
//     },
//     { $project: { data: 1, metaData: 1 } },
//     {
//       $addFields: {
//         total: {
//           $arrayElemAt: ['$metaData.total', 0]
//         }
//       }
//     },
//     {
//       $project: {
//         'data.productOwnerId': 0,
//         'data.isArchived': 0,
//         metaData: 0
//       }
//     }
//   )


//   const response= await Product.aggregate(query,
//   { maxTimeMS: 60000, allowDiskUse: true })
//   }
//   catch(err){
//     return res.status(400).json({message:"something went wrong!!"})
//   }


  try {
    const payload = req.userId;
    let { limit = 10, page = 1, search = '', isArchived } = req.query;

    limit = parseInt(limit);
    page = parseInt(page);
    const skip = (page - 1) * limit;

    const matchStage = {
      productOwnerId: payload
    };

    // Handle isArchived filter
    if (typeof isArchived !== 'undefined') {
      matchStage.isArchived = isArchived === 'true';
    }

     // Handle search
    if (search) {
      matchStage.productName = { $regex: search, $options: 'i' };
    }

    const query = [
      { $match: matchStage },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          metaData: [{ $count: 'total' }],
          data: [{ $skip: skip }, { $limit: limit }],
          categorySummary: [
            {
              $group: {
                _id: '$category',
                count: { $sum: 1 }
              }
            }
          ]
        }
      },
      { $project: { data: 1, metaData: 1 } },
      {
        $addFields: {
          total: {
            $arrayElemAt: ['$metaData.total', 0]
          }
        }
      },
      {
        $project: {
          'data.productOwnerId': 0,
          'data.isArchived': 0,
          metaData: 0
        }
      }
    ];

    const response = await Product.aggregate(query, {
      maxTimeMS: 60000,
      allowDiskUse: true
    });

    return res.status(200).json({ data: response[0] || {} });
  } catch (err) {
    return res.status(400).json({message: err.message});
  }



   //  return res.status(200).json({ data: response });

};
export const editProduct = async (req, res, next) => {
  const productId = req.params.id;
  const productData = req.body;
  if (req.files) {
    productData.images = [];

    req.files.map((file) => {
      productData.images.push("public/images/".concat(file.filename));
    });
  }

  try {
    productData;
    const productResult = await Product.findOneAndUpdate(
      { _id: productId },
      { ...productData },
      { new: true }
    );

    //  await Product.updateOne({_id:productId},{$set:{...payload}})
    if (productResult) {
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
    if (details.isArchived !== false) {
      return res.status(400).json({ message: "product not found" });
    }

    return res.status(200).json({ data: details });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const payload = req.body;
  try {
    const checkProduct = await Product.findById(productId);

    if (checkProduct.isArchived === true) {
      return res.status(400).json({ message: "product not found" });
    }

    const result = await Product.findByIdAndUpdate(
      { _id: productId },
      payload,
      { new: true }
    );
    return res.status(200).json({ data: result, message: "item deleted!!" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
