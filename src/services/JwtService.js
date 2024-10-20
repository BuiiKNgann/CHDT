const jwt =require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()
const generalAccessToken = async(payload) => {
    console.log('payload', payload);
    
const access_Token = jwt.sign({
    ...payload
}, process.env.ACCESS_TOKEN, {expiresIn: '30s'})
return access_Token
}

//refresh token
const generalRefreshToken = async(payload) => {
const refresh_token = jwt.sign({
    ...payload
},  process.env.REFRESH_TOKEN, {expiresIn: '365d'})
return refresh_token
}

const refreshTokenJWTService = async(token) => {
    return new Promise(async(resolve, reject) => {
        try {    
          console.log('token', token);
          jwt.verify(token,process.env.REFRESH_TOKEN, async(err, user) => {
            if(err){
                resolve({
                    status: 'ERR',
                    message: 'The authentication'
                })
            }
           
          const access_token= await generalRefreshToken({
            id: user?.id,
            isAdmin:  user?.isAdmin
          })
          console.log('access_token', access_token);  
          resolve({
            status: 'OK',
            message: 'Success',
            access_token   
        })   
          })       
        } catch (e) {
            reject(e);
        }
    });
    }

module.exports = {
    generalAccessToken, generalRefreshToken, refreshTokenJWTService
}