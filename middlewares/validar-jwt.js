const jwt = require('jsonwebtoken');


const valiarJWT = ( req, res, next )=>{
    
    const token = req.header('x-token');
    if( !token ){
        return  res.status(401).json({
            ok:false,
            msg:'No hay token'
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET )
        req.uid = uid;
        
    } catch (error) {
        return res.json({
            ok:false,
            msg:'Token no valido'
        })
    }

    next();
}

module.exports = {
    valiarJWT
}