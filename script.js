const API_KEY = "d8e7b0492c044564b1d35352251308";
const API_URL = "https://api.weatherapi.com/v1/current.json";

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
}
themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme === "light" ? "dark" : "light");
});
setTheme(localStorage.getItem("theme") || "light");

// Weather fetch
document.getElementById("weather-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const location = document.getElementById("location-input").value.trim();
    if (!location) return;

    const resultDiv = document.getElementById("weather-result");
    resultDiv.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(`${API_URL}?key=${API_KEY}&q=${encodeURIComponent(location)}&aqi=yes`);
        if (!res.ok) throw new Error("Failed to fetch weather");
        const data = await res.json();

        resultDiv.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p><strong>${data.current.temp_c}°C</strong> - ${data.current.condition.text}</p>
            <img src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
            <p>Humidity: ${data.current.humidity}% | Wind: ${data.current.wind_kph} kph</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
});
    