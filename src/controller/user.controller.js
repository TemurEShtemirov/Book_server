import Book from "../model/book.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({ data: books, success: true });
  } catch (err) {
    res.status(500).json("Internal Server Error");
  }
};

export const getByIdBook = async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json("Book is not found");
    }
    res.status(200).json({ data: book, success: true });
  } catch (err) {
    res.status(500).josn("Internal Server Error");
  }
};


export const createBook = async(req,res)=>{
    try{
const book = Book.create(req.body);
res.status(201).json({data:book,success:true})
    }catch(err){
        console.log();
    }
}