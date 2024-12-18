const Product = require('../models/ProductModel')
 

const createProduct  = (newProduct) => {
    return new Promise(async(resolve, reject) => {
        const {name, image, type, price, countInStock,rating, description, discount} = newProduct
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
                name, image, type, price, countInStock,rating, description, discount
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


const deleteMany = (ids) => {
    return new Promise(async(resolve, reject) => {
        try {    
           
           //hàm tìm và xoá
 await Product.deleteMany({_id: ids })
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

 
const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments();
// mới
 
            // Kiểm tra nếu có filter
            if (filter) {
                const label = filter[0]; // Thuộc tính cần lọc
                const regexFilter = new RegExp(filter[1], 'i'); // 'i' để không phân biệt hoa thường
                console.log('label', label);
                
                const allObjectFilter = await Product.find({
                    [label]: regexFilter // Sử dụng đối tượng RegExp
                }).limit(limit).skip(page * limit); // Thêm phân trang

                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page) + 1,
                    totalPage: Math.ceil(totalProduct / limit)
                });
                return;
            }

            // Kiểm tra nếu có sort
            let objectSort = {};
            if (sort) {
          
              //  objectSort[sort[1]] = sort[0] === 'desc' ? -1 : 1; // 'desc' = -1, 'asc' = 1
              objectSort[sort[1]] = sort[0] === 'desc' ? -1 : 1; 
              
            } 
            
            const allProductSort = await Product.find()
                .limit(limit)
                .skip(page * limit)
                .sort(objectSort); // Sử dụng objectSort tại đây

            resolve({
                status: 'OK',
                message: 'Success',
                data: allProductSort,
                total: totalProduct,
                pageCurrent: Number(page) + 1,
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {        
            const allType = await Product.distinct('type')
            resolve({
                status: 'OK',
                message: 'Success',
                data: allType,
            });
        } catch (e) {
            reject(e);
        }
    });
};
 
module.exports = { createProduct, updateProduct,
     getDetailsProduct, deleteProduct, getAllProduct, deleteMany,getAllType

      };
