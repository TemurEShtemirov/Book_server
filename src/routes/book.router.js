import { Router } from "express";
import {
  getAllBooks,
  getByIdBook,
  createBook,
  updateBook,
  deleteAllBooks,
  deleteByIdBook,
} from "../controller/book.controller.js";
import upload from "../helper/multer.helper.js";

const bookRouter = Router();

bookRouter.get("/", getAllBooks);
bookRouter.get("/:id", getByIdBook);
bookRouter.post("/", upload.single("image"), createBook);
bookRouter.put("/:id", upload.single("image"), updateBook);
bookRouter.delete("/", deleteAllBooks);
bookRouter.delete("/:id", deleteByIdBook);

export default bookRouter;
