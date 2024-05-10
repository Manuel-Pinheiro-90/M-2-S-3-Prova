const generateMech = function (mecharray) {
  const row = document.getElementById("events-row");
  mecharray.forEach((mech) => {
    const newCol = document.createElement("div");
    newCol.classList.add("col", "my-3");
    newCol.innerHTML = `
        <div class="card h-100 d-flex flex-column">
          <img src="${mech.imageUrl}" class="card-img-top" alt="...">
          <div class="card-body d-flex flex-column justify-content-around">
            <h5 class="card-title">${mech.name}</h5>
            <p class="card-text flex-grow-1">${mech.description}</p>
            <p class="card-text">${mech.brand}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-primary">${mech.price}€</button>
              <a href="details.html?eventId=${mech._id}" class="btn btn-info">INFO</a>
            </div>
          </div>
        </div>
        `;
    row.appendChild(newCol);
  });
};

const getEvents = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDMzZTgxODQ0MjAwMTUzNzU4N2QiLCJpYXQiOjE3MTUzMjc4MDcsImV4cCI6MTcxNjUzNzQwN30.CNbNDIYFWDpotjkFg5Xkd9i0Od13p8XUojFBUFsDGMY",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new Error("Errore nella risposta del server");
      }
    })
    .then((array) => {
      console.log("ARRAY!", array);

      generateMech(array);
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

getEvents();
