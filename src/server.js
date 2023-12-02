import express from "express";
import sequelize from "./config/db.js";
import cors from "cors";
import "dotenv/config.js";
import bookRouter from "./routes/book.router.js";

async function bootstrap() {
  const app = express();

  const port = process.env.PORT || 8435;

  app.use(express.json()); // Add parentheses to call the express.json() middleware
  app.use(cors());
  app.use(bookRouter);

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}

bootstrap();
