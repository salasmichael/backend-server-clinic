const mongoose = require('mongoose');


const dbConection = async() => {

    try {

        await mongoose.connect(process.env.CNN);

        console.log('DB online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la DB, ver logs')
    }

}

module.exports = {
    dbConection
};