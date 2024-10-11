
const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req, res) => {
    console.log('Request body:', req.body); // Kiểm tra body nhận được
    try {
        console.log('Request body:', req.body); // Kiểm tra body nhận được
    
        const {name, email, password, confirmPassword, phone} = req.body
        const reg= /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      const isCheckEmail = reg.test(email)

      // Trường hợp nào bị thiếu sẽ trả về lỗi
        if(!name || !email || !password || !confirmPassword || !phone){
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required'

            })
            //Nếu email không hợp lệ sai định dạng trả về lỗi
        } else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is email'

            })  
            //Nếu password không bằng confirmPassword trả về lỗi
        } else if(password != confirmPassword){
            return res.status(200).json({
                status: 'ERROR',
                message: 'The password is equal confirmPassword'

            })  
        }
        const response = await UserService.createUser(req.body); // Giả định rằng createUser trả về thông tin người dùng
      return res.status(200).json(response);
    } catch (e) {
        console.log(e); // Log lỗi nếu có
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra'
        });
    }
};

const loginUser = async (req, res) => {
    console.log('Request body:', req.body); // Kiểm tra body nhận được
    try {
        console.log('Request body:', req.body); // Kiểm tra body nhận được
    
        const {name, email, password, confirmPassword, phone} = req.body
        const reg= /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      const isCheckEmail = reg.test(email)

      // Trường hợp nào bị thiếu sẽ trả về lỗi
        if(!name || !email || !password || !confirmPassword || !phone){
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required'

            })
            //Nếu email không hợp lệ sai định dạng trả về lỗi
        } else if(!isCheckEmail) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is email'

            })  
            //Nếu password không bằng confirmPassword trả về lỗi
        } else if(password != confirmPassword){
            return res.status(200).json({
                status: 'ERROR',
                message: 'The password is equal confirmPassword'

            })  
        }
        const response = await UserService.loginUser(req.body); // Giả định rằng createUser trả về thông tin người dùng
      return res.status(200).json(response);
    } catch (e) {
        console.log(e); // Log lỗi nếu có
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra'
        });
    }
};

const updateUser = async (req, res) => {
    console.log('Request body:', req.body); // Kiểm tra body nhận được
    try {
        const userId= req.params.id  // Lấy userId từ tham số URL
        const data = req.body // Lấy dữ liệu từ body của yêu cầu
        if(!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The userId id required'
            })  
        }
        const response = await UserService.updateUser(userId, data); // Giả định rằng createUser trả về thông tin người dùng
      return res.status(200).json(response);
    } catch (e) {
        console.log(e); // Log lỗi nếu có
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra'
        });
    }
};

const deleteUser = async (req, res) => {
   //  console.log('Request body:', req.body); // Kiểm tra body nhận được
    try {
        const userId= req.params.id  // Lấy userId từ tham số URL
        if(!userId) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The userId id required'
            })  
        }
        const response = await UserService.deleteUser(userId); // Giả định rằng createUser trả về thông tin người dùng
      return res.status(200).json(response);
    } catch (e) {
        console.log(e); // Log lỗi nếu có
        return res.status(404).json({
            message: e.message || 'Có lỗi xảy ra'
        });
    }
};

const getAllUser = async (req, res) => {
    //  console.log('Request body:', req.body); // Kiểm tra body nhận được
     try {
         
         const response = await UserService.getAllUser(); // Giả định rằng createUser trả về thông tin người dùng
       return res.status(200).json(response);
     } catch (e) {
         console.log(e); // Log lỗi nếu có
         return res.status(404).json({
             message: e.message || 'Có lỗi xảy ra'
         });
     }
 };
 
 const getDetailsUser = async (req, res) => {
    //  console.log('Request body:', req.body); // Kiểm tra body nhận được
     try {
         const userId= req.params.id  // Lấy userId từ tham số URL
      
      
          
         if(!userId) {
             return res.status(200).json({
                 status: 'ERROR',
                 message: 'The userId id required'
             })  
         }
         const response = await UserService.getDetailsUser(userId); // Giả định rằng createUser trả về thông tin người dùng
       return res.status(200).json(response);
     } catch (e) {
         console.log(e); // Log lỗi nếu có
         return res.status(404).json({
             message: e.message || 'Có lỗi xảy ra'
         });
     }
 };

 const refreshToken = async (req, res) => {
    //  console.log('Request body:', req.body); // Kiểm tra body nhận được
     try {
         const token= req.headers.token.split(' ')[1]
     
         if(!token) {
             return res.status(200).json({
                 status: 'ERROR',
                 message: 'The token id required'
             })  
         }
         const response = await JwtService.refreshTokenJWTService(token); // Giả định rằng createUser trả về thông tin người dùng
       return res.status(200).json(response);
     } catch (e) {
         console.log(e); // Log lỗi nếu có
         return res.status(404).json({
             message: e.message || 'Có lỗi xảy ra'
         });
     }
 };

module.exports = {
    createUser, loginUser, updateUser, deleteUser,
     getAllUser, getDetailsUser, refreshToken
};

