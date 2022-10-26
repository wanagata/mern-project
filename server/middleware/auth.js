import jwt from 'jsonwebtoken'
import axios from 'axios';

// wants to like a post 
// click the like button => auth middleware (next) -> like controller 
const auth = async (req, res, next) => {
    try {
       
        //console.log((req.headers.authorization.split(" ")[1]).length);
        const token = req.headers.authorization.split(" ")[1];
        //const isCustomAuth = token.length >500; // true is our web token
        
        req.userId = jwt.decode(token, 'test')?.id;

        if (req.userId == undefined) {
            //console.log('in user undefined')
            const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: req.headers.authorization } },
            );
            //console.log(userInfo?.data?.sub);
            req.userId = userInfo?.data?.sub;
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;