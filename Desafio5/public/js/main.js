const socket = io();
const addForm = document.getElementById("addForm");
const title = document.getElementById("title");
const description = document.getElementById("description");
const code = document.getElementById("code");
const price = document.getElementById("price");
const status = document.getElementById("status");
const stock = document.getElementById("stock");
const category = document.getElementById("category");
const urlImg = document.getElementById("urlImg");

function render(data) {
  const html = data
    .map((elem, index) => {
      return ` <div class="d-flex justify-content-center">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="..." alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">${elem.title}</h5>
          <p class="card-text">${elem.description}</p>
          <p class="card-text">$${elem.price}</p>
          <a href="#" class="btn btn-primary">Buy</a>
        </div>
      </div> 
      </div>`;
    })
    .join(" ");
  document.getElementById("products").innerHTML = html;
}

socket.on("productos", (data) => {
  render(data);
});

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const product = [
    title.value,
    description.value,
    code.value,
    price.value,
    status.value,
    stock.value,
    category.value,
    urlImg.value,
  ];
  console.log("Titulo", product);
  socket.emit("products", product);
});
