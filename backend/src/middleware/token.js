import jsonwebtoken from 'jsonwebtoken'
import responseHandlers from '../handlers/responseHandlers.js'
import userModel from '../models/userModel.js'


const tokenDecryption = (request) => {
    try{
        const authorizationHeader = request.headers["authorization"]

        if(authorizationHeader){
            const token = authorizationHeader.split(' ')[1]

            return jsonwebtoken.verify(
                token,
                process.env.TOKEN_SECRET
            )
        }
        return false
    }catch{
        return false
    }
}


const userAuthChecks = async( request, response, next) => {
    console.log("Get user")
    const tokenDecryptioned = tokenDecryption(request)

    if(!tokenDecryptioned){
        return responseHandlers.unauthorize(response)
    }

    const user = await userModel.findById(tokenDecryptioned.data)
    // console.log(!!user)
    if(!user){
        return responseHandlers.unauthorize(response)
    }

    request.user = user

    next()
}

export default {tokenDecryption, userAuthChecks}