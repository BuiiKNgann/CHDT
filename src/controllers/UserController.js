
const UserService = require('../services/UserService');
const JwtService = require('../services/JwtService');

const createUser = async (req, res) => {
      // Kiểm tra body nhận được
    try {
         // Kiểm tra body nhận được
    
        const { email, password, confirmPassword} = req.body
        
        const reg= /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      const isCheckEmail = reg.test(email)

      // Trường hợp nào bị thiếu sẽ trả về lỗi
        if(!email || !password || !confirmPassword  ){
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
   // console.log('Request body:', req.body); // Kiểm tra body nhận được
    try {
        const {email, password} = req.body
        console.log( req.body); 
        const reg= /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
      const isCheckEmail = reg.test(email)
 console.log(email, password);
      // Trường hợp nào bị thiếu sẽ trả về lỗi
        if(!email || !password){
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
        }  
       
        const response = await UserService.loginUser(req.body); // Giả định rằng createUser trả về thông tin người dùng
        const {refresh_token, ...newResponse} =response
       // console.log('response', response);
       res.cookie('refresh_token', refresh_token,{
        httpOnly: true,
        secure: false,
        samesite: 'strict'
       })
        return res.status(200).json(newResponse);
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
    console.log('req.cookies.refresh_token', req.cookies.refresh_token)
     try {
        const token= req.cookies.refresh_token 
     
         if(!token) {
             return res.status(200).json({
                 status: 'ERROR',
                 message: 'The token id required'
             })  
         }
         const response = await JwtService.refreshTokenJWTService(token); // Giả định rằng createUser trả về thông tin người dùng
      
         return res.status(200).json(response);
        return 
     } catch (e) {
         console.log(e); // Log lỗi nếu có
         return res.status(404).json({
             message: e.message || 'Có lỗi xảy ra'
         });
     }
 };

 const logoutUser = async (req, res) => {
    
     try {
        res.clearCookie('refresh_token')
         return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully'
         });
        return 
     } catch (e) {
         console.log(e); // Log lỗi nếu có
         return res.status(404).json({
             message: e.message || 'Có lỗi xảy ra'
         });
     }
 };
module.exports = {
    createUser, loginUser, updateUser, deleteUser,
     getAllUser, getDetailsUser, refreshToken, logoutUser
};

