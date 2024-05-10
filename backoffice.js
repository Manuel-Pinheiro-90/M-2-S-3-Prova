class Mech {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const addressBarContent = new URLSearchParams(location.search);
const eventId = addressBarContent.get("eventId");
console.log("EVENTID?", eventId);

let eventToModify;

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
        throw new Error("Errore  recupero dei dettagli");
      }
    })
    .then((event) => {
      console.log("DETTAGLI RECUPERATI", event);

      document.getElementById("name").value = event.name;
      document.getElementById("description").value = event.description;
      document.getElementById("brand").value = event.brand;
      document.getElementById("photo").value = event.photo;
      document.getElementById("price").value = event.price;

      eventToModify = event;
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

if (eventId) {
  getEventData();

  document.getElementsByClassName("btn-primary")[0].innerText = "MODIFICA!";
}

const submitEvent = function (e) {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const descriptionInput = document.getElementById("description");
  const brandInput = document.getElementById("brand");
  const imageUrlInput = document.getElementById("photo");
  const priceInput = document.getElementById("price");

  const mechFrom = new Mech(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageUrlInput.value,
    priceInput.value
  );

  console.log("mech da inviare", mechFrom);

  let URL = "https://striveschool-api.herokuapp.com/api/product/";
  let methodToUse = "POST";

  if (eventId) {
    URL = `https://striveschool-api.herokuapp.com/api/product/${eventToModify._id}`;
    methodToUse = "PUT";
  }

  fetch(URL, {
    method: methodToUse,
    body: JSON.stringify(mechFrom),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkZDMzZTgxODQ0MjAwMTUzNzU4N2QiLCJpYXQiOjE3MTUzMjc4MDcsImV4cCI6MTcxNjUzNzQwN30.CNbNDIYFWDpotjkFg5Xkd9i0Od13p8XUojFBUFsDGMY",
      "Content-type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(`Mech ${eventId ? "modificato" : "creato"}!`);
      } else {
        throw new Error("Errore  salvataggio ");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
      alert(err);
    });
};

document.getElementById("event-form").addEventListener("submit", submitEvent);
