const User = require('../models/UserModel')
const createUser = (newUser) => {
    return new Promise(async(resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = newUser
        try {
             //nếu tồn tại email hoặc user in ra lỗi
             const checkUser = await User.findOne({
                email: email
             })
           if(checkUser !== null) {
            resolve({
                status: 'OK',
                message: 'The email is already'
            })
           }
// Tạo user
            const createdUser = await User.create({
                name, email, password, confirmPassword, phone 
            })
            if(createdUser){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: createdUser
                })    }
            resolve({ message: 'User created successfully!' }); // Trả về thông điệp thành công
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = { createUser };
