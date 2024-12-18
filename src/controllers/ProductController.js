
 const ProductService = require('../services/ProductService')

const createProduct = async (req, res) => {
   
    try {
        const {name, image, type, price, countInStock,rating, description, discount } = req.body //Lấy các trường dữ liệu sản phẩm từ request body

        // Trường hợp nào bị thiếu sẽ trả về lỗi
        if(!name || !image || !type || !price || !countInStock || !rating || !description || !discount){
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required'

            })
            //Nếu email không hợp lệ sai định dạng trả về lỗi
        } 
        console.log('req.body', req.body);
        //Sử dụng dịch vụ ProductService.createProduct để thực hiện việc tạo sản phẩm với dữ liệu được truyền từ req.body.
        const response = await ProductService.createProduct(req.body);  
    
        return res.status(200).json(response);
    } catch (e) {
        console.log(e); // Log lỗi nếu có
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra'
        });
    }
};

 

const updateProduct = async (req, res) => {
    console.log('Request body:', req.body); // Kiểm tra body nhận được
    try {
        const productId= req.params.id  // Lấy productId từ tham số URL
        const data = req.body // Lấy dữ liệu từ body của yêu cầu
        if(!productId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The productId id required'
            })  
        }
        const response = await ProductService.updateProduct(productId, data);  
      return res.status(200).json(response);
    } catch (e) {
        console.log(e); // Log lỗi nếu có
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra'
        });
    }
};
 

const getDetailsProduct = async (req, res) => {
    //  console.log('Request body:', req.body); // Kiểm tra body nhận được
     try {
         const productId= req.params.id  // Lấy userId từ tham số URL
         if(!productId) {
             return res.status(200).json({
                 status: 'ERROR',
                 message: 'The productId id required'
             })  
         }
         const response = await ProductService.getDetailsProduct(productId);
       return res.status(200).json(response);
     } catch (e) {
         console.log(e); // Log lỗi nếu có
         return res.status(404).json({
             message: e.message || 'Có lỗi xảy ra'
         });
     }
 };

 const deleteProduct = async (req, res) => {
     try {
         const productId= req.params.id  // Lấy userId từ tham số URL

         //Kiểm tra productId có tồn tại hay không
         if(!productId) {
             return res.status(200).json({
                 status: 'ERROR',
                 message: 'The productId id required'
             })  
         }
         const response = await ProductService.deleteProduct(productId); // truyền productId đến ProductServices
       return res.status(200).json(response);
     } catch (e) {
         console.log(e); // Log lỗi nếu có
         return res.status(404).json({
             message: e.message || 'Có lỗi xảy ra'
         });
     }
 };


 const deleteMany = async (req, res) => {
    try {
        const ids= req.body  // Lấy userId từ tham số URL

        //Kiểm tra productId có tồn tại hay không
        if(!ids) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'ids id required'
            })  
        }
        const response = await ProductService.deleteMany(ids); // truyền productId đến ProductServices
      return res.status(200).json(response);
    } catch (e) {
        console.log(e); // Log lỗi nếu có
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra'
        });
    }
};


 const getAllProduct = async (req, res) => {
   // Kiểm tra body nhận được
     try {
         const {limit, page, sort, filter} = req.query 
         const response = await ProductService.getAllProduct(Number(limit) || 8, Number(page)|| 0, sort, filter) ;   
   // const response = await ProductService.getAllProduct(Number(limit) || null, Number(page)|| 0, sort, filter) ;   
    return res.status(200).json(response);
     } catch (e) {
         console.log(e); // Log lỗi nếu có
         return res.status(404).json({
             message: e.message || 'Có lỗi xảy ra'
         });
     }
 };

 const getAllType = async (req, res) => {
    try{
        const response = await ProductService.getAllType()
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json(response)
        message: e
    }
}
module.exports = {
    createProduct,updateProduct, getDetailsProduct, 
    deleteProduct, getAllProduct, deleteMany, getAllType

}

