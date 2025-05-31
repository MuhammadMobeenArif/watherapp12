
async function getWeather() {
  const input = document.getElementById("countryInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (!input) {
    resultBox.innerHTML = "❗ Please enter a city or country name.";
    return;
  }

  const apiKey = "fa9e49e6b92d92697cc4bbe3b82ab782"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const weatherDesc = data.weather[0].description;
    const temp = data.main.temp;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    resultBox.innerHTML = `
      <h3>🌍 Weather in ${data.name}, ${data.sys.country}</h3>
      <img src="${iconUrl}" alt="${weatherDesc}" />
      <p><strong>${weatherDesc}</strong></p>
      <p>🌡️ Temperature: ${temp} °C</p>
    `;
  } catch (error) {
    resultBox.innerHTML = "❌ Could not fetch weather. Please check the name and try again.";
  }
}
