import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.routes.js';
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const port=process.env.PORT||3000;
const __dirname = path.resolve();

app.use("/products",productRoutes);
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*',(req,res)=>res.sendFile (path.resolve(__dirname,'frontend','dist','index.html')));
}
app.use(express.json());
app.use(cors());

app.use("/products",productRoutes);
app.listen(port, () => {
    connectDB();
  console.log('Server is running on http://localhost:'+port);
});
