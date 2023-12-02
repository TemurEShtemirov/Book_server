import express from 'express'
import sequelize from './config/db.js';

async function bootstrap(){
    const app = express();


    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    app.listen(7378,()=>{
        console.log(`Server is running`);
    })
}

bootstrap()