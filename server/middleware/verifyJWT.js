const jwt = require("jsonwebtoken")

const verifyJWT = (req, res, next) => {

    const authorHeader = req.headers.authorization || req.headers.Authorization
    if(!authorHeader.startsWith('Bearer')){
        return res.status(401).send("Unauthorized")
    }
    const token = authorHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCSES_TOKEN_PASSWORD,
        (err, decoded)=>{
            if(err) 
                return res.status(403).json({message: "forbbiden"})
            req.user = decoded
            next()
        }
    )
}

module.exports = verifyJWT