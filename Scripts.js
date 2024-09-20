var map = L.map("map").setView([51.505, -0.09], 13);
var marker;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

document.addEventListener("DOMContentLoaded", function () {
  var ipAddress = document.getElementById("ipAddress");
  var location = document.getElementById("location");
  var timezone = document.getElementById("timezone");
  var isp = document.getElementById("isp");

  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      const api_key = "at_2ZHYPnQlCG1egzpG6N12lqWrRtSga";

      $.ajax({
        url: `https://geo.ipify.org/api/v2/country,city`,
        data: { apiKey: api_key, ipAddress: data.ip },
        success: function (data) {
          ipAddress.textContent = data.ip;
          location.textContent =
            data.location.city + ", " + data.location.country;
          timezone.textContent = data.location.timezone;
          isp.textContent = data.isp;

          map.setView([data.location.lat, data.location.lng], 13);

          if (marker) {
            map.removeLayer(marker);
          }

          marker = L.marker([data.location.lat, data.location.lng])
            .addTo(map)
            .bindPopup(
              `Localisation : ${data.location.city}, ${data.location.country}`
            )
            .openPopup();
        },
      });
    })
    .catch((error) =>
      alert("Erreur lors de la récupération de l'adresse IP:", error)
    );
});

function onSubmit() {
  const val = document.getElementById("searchBar").value;

  const api_key = "at_2ZHYPnQlCG1egzpG6N12lqWrRtSga";

  $.ajax({
    url: `https://geo.ipify.org/api/v2/country,city`,
    data: { apiKey: api_key, ipAddress: val },
    success: function (data) {
      ipAddress.textContent = data.ip;
      location.textContent = data.location.city + ", " + data.location.country;
      timezone.textContent = data.location.timezone;
      isp.textContent = data.isp;

      map.setView([data.location.lat, data.location.lng], 13);

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([data.location.lat, data.location.lng])
        .addTo(map)
        .bindPopup(
          `Localisation : ${data.location.city}, ${data.location.country}`
        )
        .openPopup();
    },
  });
}
