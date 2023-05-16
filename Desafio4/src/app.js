import express from "express";
import handlerbars from "express-handlebars";
import { Server } from "socket.io";
import { productsRouter } from "./routers/products.router.js";
import { cartsRouter } from "./routers/carts.router.js";
import { viewsRouter } from "./routers/views.router.js";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlerbars.engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use("/", viewsRouter);

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

const webserver = app.listen(8080, () => {
  console.log("Estoy escuchando el puerto 8080");
});
