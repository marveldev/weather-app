const form = document.querySelector('.form');
const input = document.querySelector('.input');
const errorMessage = document.querySelector('.error-message');
const weatherOutput = document.querySelector('.weather-output');

form.addEventListener('submit', () => {
  event.preventDefault();
  const apiKey = 'ddbbd54b9f4c98a6a21e81b415f73948';
  const inputValue = input.value.trim();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  
  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const output = `
      <div class="search-item">
        <button id="delete-button">X</button>
        <h2><span>${data.name}</span><sup>${data.sys.country}</sup></h2>
        <strong>Latitude:${data.coord.lat}</strong>
        <strong>Longitude:${data.coord.lon}</strong>
        <p>${data.main.temp}<sup>°C</sup></p>
        <div>
          <img class="city-icon" src=${icon} alt=${data.weather[0].main}>
          <p id="weather-description">${data.weather[0].description}</p>
        </div>
      </div>
    `
    weatherOutput.innerHTML += output;

    const deleteButtons = document.querySelectorAll('#delete-button');
    for (let index = 0; index < deleteButtons.length; index++) {
      const deleteButton = deleteButtons[index];
      deleteButton.addEventListener('click', () => {
        const deleteItem = deleteButton.parentElement;
        weatherOutput.removeChild(deleteItem);
      })
    }
  })
  .catch(() => {
    errorMessage.innerText = 'Please search for a valid city 😩';
  });

  errorMessage.innerText = '';
  input.value = '';
});

