const addressBar = new URLSearchParams(location.search);
console.log(addressBar);
const eventId = addressBar.get("eventId");

const getEventData = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${eventId}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDMzZTgxODQ0MjAwMTUzNzU4N2QiLCJpYXQiOjE3MTUzMjc4MDcsImV4cCI6MTcxNjUzNzQwN30.CNbNDIYFWDpotjkFg5Xkd9i0Od13p8XUojFBUFsDGMY",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore  recupero dei dettagli dell'evento");
      }
    })
    .then((event) => {
      console.log("DETTAGLI RECUPERATI", event);

      document.getElementById("name").innerText = event.name;
      document.getElementById("description").innerText = event.description;
      document.getElementById("brand").innerText = event.brand;
      document.getElementById("price").innerText = event.price + "-$-";
      document.getElementById("photo").setAttribute('src',event.imageUrl)=event.imageUrl;
      
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getEventData();

const deleteEvent = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${eventId}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDMzZTgxODQ0MjAwMTUzNzU4N2QiLCJpYXQiOjE3MTUzMjc4MDcsImV4cCI6MTcxNjUzNzQwN30.CNbNDIYFWDpotjkFg5Xkd9i0Od13p8XUojFBUFsDGMY",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Prodotto eliminato");
        location.assign("index.html");
      } else {
        alert("ERRORE ");
      }
    })
    .catch((err) => {
      console.log("ERR", err);
    });
};

const editButton = document.getElementById("edit-button");
editButton.addEventListener("click", function () {
  location.assign(`backoffice.html?eventId=${eventId}`);
});
