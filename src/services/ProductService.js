const Product = require('../models/ProductModel')
 

const createProduct  = (newProduct) => {
    return new Promise(async(resolve, reject) => {
        const {name, image, type, price, countInStock,rating, description } = newProduct
        try {
             //nếu tồn tại email hoặc user in ra lỗi
             const checkProduct = await Product.findOne({
                name: name
             })
           if(checkProduct !== null) {
            resolve({
                status: 'OK',
                message: 'The name of product is already'
            })
           }
            const newProduct = await Product.create({
                name, image, type, price, countInStock,rating, description 
            })
            if(newProduct){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })    }
            resolve({ message: 'User created successfully!' }); // Trả về thông điệp thành công
        } catch (e) {
            reject(e);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try {    
            //Tìm id 
             const checkProduct = await Product.findOne({
                _id: id
             })  
             //check xem user có trong data không
           if(checkProduct === null) {
            resolve({
                status: 'OK',
                message: 'The product is not defined'
            })
           }
           const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
          
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updatedProduct       
                })    
        } catch (e) {
            reject(e);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async(resolve, reject) => {
        try {    
            //Tìm id
             const checkProduct = await Product.findOne({
                _id: id
             })  
             //check xem product có trong data không
           if(checkProduct === null) {
            resolve({
                status: 'OK',
                message: 'The product is not defined'
            })
           }
           //hàm tìm và xoá
 await Product.findByIdAndDelete(id)
                resolve({
                    status: 'OK',
                    message: 'Delete product success',            
                })    
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsProduct = (id) => {
    return new Promise(async(resolve, reject) => {
        try {    
             const product = await Product.findOne({
                _id: id
             })  
             //check xem user có trong data không
           if( product === null) {
            resolve({
                status: 'OK',
                message: 'The product is not defined'
            })
           }      
                resolve({
                    status: 'OK',
                    message: 'Success',
                        data: product
                })    
        } catch (e) {
            reject(e);
        }
    });
};

 
const getAllProduct = (limit = 8, page = 0) => {
    return new Promise(async(resolve, reject) => {
        try {  
            const totalProduct = await Product.countDocuments()     
  const allProduct =  await Product.find().limit(limit).skip(page*limit)
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProduct,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct/limit)
                        
                })    
        } catch (e) {
            reject(e);
        }
    });
};

 
module.exports = { createProduct, updateProduct,
     getDetailsProduct, deleteProduct, getAllProduct
      };
