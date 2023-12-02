import { DataTypes } from "sequelize";
import 


// Define the Book model
const Book = sequelize.define("Book", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  page: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Create the table if it doesn't exist
Book.sync()
  .then(() => {
    console.log("Book table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating Book table:", err);
  });

export default Book