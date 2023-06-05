import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import viewsRouter from "./routers/views.router.js";
import productsRouter from "./routers/products.router.js";
import cartsRouter from "./routers/carts.router.js";

const app = express();

app.use(express.json());
//Utilizo el middleware para parsear los datos de la petición
app.use(express.urlencoded({ extended: true }));

//Set handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

//Seteo directorio de archivos estáticos
app.use(express.static("public"));

app.use("/", viewsRouter);

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

mongoose.connect(
  "mongodb+srv://leocoria:sKwrRuZp5CODkElY@codercluster.ij0wa2p.mongodb.net/?retryWrites=true&w=majority"
);

app.listen(8080, () => {
  console.log("Escucho el puerto 8080");
});
