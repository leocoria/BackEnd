const socket = io();

function render(data) {
  const html = data
    .map((elem, index) => {
      return `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="..." alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">${elem.title}</h5>
          <p class="card-text">${elem.description}</p>
          <p class="card-text">$${elem.price}</p>
          <a href="#" class="btn btn-primary">Buy</a>
        </div>
      </div> `;
    })
    .join(" ");
  document.getElementById("products").innerHTML = html;
}

socket.on("productos", (data) => {
  render(data);
});

// {
//   /* <div class="d-flex justify-content-center">
//   {{#each products}}
//     <div class="card" style="width: 18rem;">
//       <img class="card-img-top" src="..." alt="Card image cap" />
//       <div class="card-body">
//         <h5 class="card-title">{{this.title}}</h5>
//         <p class="card-text">{{this.description}}</p>
//         <p class="card-text">${{this.price}}</p>
//         <a href="#" class="btn btn-primary">Buy</a>
//       </div>
//     </div>
//   {{/each}}
// </div> */
// }
