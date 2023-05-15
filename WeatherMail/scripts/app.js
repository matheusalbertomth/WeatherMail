const cityForm = document.querySelector("form");


const sendEmail = (data) => {
  const cityDets = data.cityDetails;
  const weather = data.cityWeather;
  var fullWeather = cityDets.EnglishName + ", "
                    + weather.WeatherText + ", "
                    + weather.Temperature.Metric.Value + "ºC";
  //alert(document.getElementById('InputEmail1').value);
  //alert(fullWeather);
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "your e-mail",
    Password : "F6D339D6EB119830FD8F1AEE5AAAB430CF10",
    To : document.getElementById('InputEmail1').value,
    From : 'your e-mail',
    Subject : "Previsão do Tempo",
    Body : fullWeather
  }).then(
    message => alert(message)
  );
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const cityWeather = await getWeather(cityDetails.Key);

  return {
    cityDetails: cityDetails,
    cityWeather: cityWeather,
  };
};

cityForm.addEventListener("submit", (e) => {
  //preventing default
  e.preventDefault();

  //getting city value
  const city = cityForm.city.value.trim();

  //updating UI
  updateCity(city)
    .then((data) => {
      sendEmail(data);
      cityForm.reset();
    })
    .catch((err) => console.log(err));

});
