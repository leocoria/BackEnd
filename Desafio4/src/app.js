import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { productsRouter } from "./routers/products.router.js";
import { cartsRouter } from "./routers/carts.router.js";
import { viewsRouter } from "./routers/views.router.js";
import productManager from "./models/productManager.js";

const app = express();

app.use(express.json());

const prodManager = new productManager("./products.json");

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", engine());
app.set("views", "views/");
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use("/", viewsRouter);

app.use("/api/products", productsRouter);

app.use("/api/carts", cartsRouter);

const webserver = app.listen(8080, () => {
  console.log("Estoy escuchando el puerto 8080");
});

const io = new Server(webserver);

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  //Envio los productos al cliente que se conectó
  const actualProducts = await prodManager.getProducts();
  socket.emit("productos", actualProducts);

  //escucho lo que mandan los clientes
  socket.on("products", (data) => {
    console.log(data);
  });
});
