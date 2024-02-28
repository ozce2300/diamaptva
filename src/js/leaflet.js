document.addEventListener("DOMContentLoaded", async function () {
    let map = L.map('map');

            map.setView([57.708870, 11.974560], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 13,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
        
    let searchForm = document.getElementById('sok-form');
    searchForm.addEventListener('submit', async function (event) {
        event.preventDefault(); 

        let searchTerm = document.getElementById('stad-input').value.trim();
        if (searchTerm !== '') {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(searchTerm)}`);
                const data = await response.json();
                if (data.length > 0) {
                    let result = data[0];
                    let latitude = parseFloat(result.lat);
                    let longitude = parseFloat(result.lon);
                    map.setView([latitude, longitude], 13);

                    map.eachLayer(function(layer) {
                        if (layer instanceof L.Marker) {
                            map.removeLayer(layer);
                        }
                    });

                    L.marker([latitude, longitude]).addTo(map);
                } else {
                    console.error('Inga resultat hittades för söktermen:', searchTerm);
                }
            } catch (error) {
                console.error('Fel vid hämtning av data från Nominatim:', error);
            }
        }
    });
});