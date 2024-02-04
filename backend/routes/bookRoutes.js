import express from 'express';
import pg from 'pg';

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"my-bookstore",
    password:"Gang@12",
    port:5432,
});
db.connect();


const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        const books = await db.query("SELECT * FROM books ORDER BY id ASC");

        return res.status(200).json({
            count: books.rows.length,
            data: books.rows
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
});

router.get('/book', async(req, res)=>{
    try{
        const bookId = req.body.Id;
        const book = await db.query('SELECT * FROM books WHERE id = $1', [bookId]);

        
        return res.status(200).json(book.rows);
        
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

router.put("/edit", async (req, res) => {
  
    try {
        if(!req.body.title || !req.body.author || !req.body.publishYear|| !req.body.id){
            return res.status(400).send({
                message:'enter all required fields'
            });
        }
        const title = req.body.title;
        const id = req.body.id;
        const author =req.body.author;
        const publishYear = req.body.publishYear;
        const result=await db.query("UPDATE books SET title = $1, author = $2, publishYear = $3 WHERE id = $4", [title, author, publishYear, id]);

        if(!result){
            return res.status(404).send({message:'book not found'});
        }
        return res.status(200).send({message:" book updated successfully"});
        

    } catch (err) {
      console.log(err.message);
      res.status(500).send({message:err.message});
    }
});

router.post('/add', async(req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({message:'all required fields not entered'});
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book=await db.query("INSERT INTO books (title, author, publishYear) VALUES ($1, $2, $3)", [newBook.title, newBook.author, newBook.publishYear]);
        return res.status(201).json(book);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message:err.message});
    }
})

router.delete("/delete", async (req, res) => {
    const id = req.body.id;
    try {
        const result= await db.query("DELETE FROM books WHERE id = $1", [id]);
        if(!result){
            return res.status(404).send("book not found");
        }
        
        else 
        {
            res.status(200).send("book deleted");
        }
    } catch (err) {
      console.log(err.message);
    }
  });

export default router;