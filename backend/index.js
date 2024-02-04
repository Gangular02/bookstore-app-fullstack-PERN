import express from 'express';
import pg from 'pg';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';


const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"my-bookstore",
    password:"Gang@12",
    port:5432,
});
db.connect();


const app = express();
app.use(cors());
app.use(express.json());
app.use('/',bookRoutes);








app.listen(5555, ()=>{
    console.log('App is listening to port 5555');
});