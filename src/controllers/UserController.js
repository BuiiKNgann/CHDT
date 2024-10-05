
const UserService = require('../services/UserService');

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
module.exports = {
    createUser
};

