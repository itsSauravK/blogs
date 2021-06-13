const mongoose = require('mongoose');
 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://blog:MNNfPG3n2oKpTt1Z@cluster0-shard-00-00.06vc6.mongodb.net:27017,cluster0-shard-00-01.06vc6.mongodb.net:27017,cluster0-shard-00-02.06vc6.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-t3vou6-shard-0&authSource=admin&retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
