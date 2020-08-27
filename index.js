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
    console.log(data);
    // const { main, name, sys, weather } = data;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    console.log(data.coord.lat);
    console.log(data.coord.lon);
    console.log(data.weather[0].icon);

    const output = `
      <div class="search-item">
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

    weatherOutput.innerHTML = output;
  })
  .catch(() => {
    errorMessage.innerText = "Please search for a valid city 😩";
  });

  errorMessage.innerText = '';
  input.value = '';
});
