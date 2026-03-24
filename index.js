function formatarData(data) {
  let texto = String(data);
  return `${texto.slice(6, 8)}/${texto.slice(4, 6)}/${texto.slice(0, 4)}`;
}

function obterClima(weather) {
  const clima = {
    clear: { icon: "fa-sun", texto: "Céu limpo", cor: "#f59e0b" },
    clearday: { icon: "fa-sun", texto: "Céu limpo", cor: "#f59e0b" },
    clearnight: { icon: "fa-moon", texto: "Céu limpo", cor: "#334155" },
    pcloudy: { icon: "fa-cloud-sun", texto: "Parcialmente nublado", cor: "#f59e0b" },
    pcloudyday: { icon: "fa-cloud-sun", texto: "Parcialmente nublado", cor: "#f59e0b" },
    pcloudynight: { icon: "fa-cloud-moon", texto: "Parcialmente nublado", cor: "#334155" },
    mcloudy: { icon: "fa-cloud-sun", texto: "Nuvens dispersas", cor: "#64748b" },
    mcloudyday: { icon: "fa-cloud-sun", texto: "Nuvens dispersas", cor: "#64748b" },
    mcloudynight: { icon: "fa-cloud-moon", texto: "Nuvens dispersas", cor: "#334155" },
    cloudy: { icon: "fa-cloud", texto: "Nublado", cor: "#64748b" },
    cloudyday: { icon: "fa-cloud", texto: "Nublado", cor: "#64748b" },
    cloudynight: { icon: "fa-cloud", texto: "Nublado", cor: "#64748b" },
    humid: { icon: "fa-smog", texto: "Úmido / neblina", cor: "#94a3b8" },
    humidday: { icon: "fa-smog", texto: "Úmido / neblina", cor: "#94a3b8" },
    humidnight: { icon: "fa-smog", texto: "Úmido / neblina", cor: "#94a3b8" },
    lightrain: { icon: "fa-cloud-rain", texto: "Chuva fraca", cor: "#0ea5e9" },
    lightrainday: { icon: "fa-cloud-rain", texto: "Chuva fraca", cor: "#0ea5e9" },
    lightrainnight: { icon: "fa-cloud-rain", texto: "Chuva fraca", cor: "#0ea5e9" },
    oshower: { icon: "fa-cloud-rain", texto: "Pancadas ocasionais", cor: "#0ea5e9" },
    oshowerday: { icon: "fa-cloud-rain", texto: "Pancadas ocasionais", cor: "#0ea5e9" },
    oshowernight: { icon: "fa-cloud-rain", texto: "Pancadas ocasionais", cor: "#0ea5e9" },
    ishower: { icon: "fa-cloud-rain", texto: "Pancadas isoladas", cor: "#0ea5e9" },
    ishowerday: { icon: "fa-cloud-rain", texto: "Pancadas isoladas", cor: "#0ea5e9" },
    ishowernight: { icon: "fa-cloud-rain", texto: "Pancadas isoladas", cor: "#0ea5e9" },
    rain: { icon: "fa-cloud-showers-heavy", texto: "Chuva", cor: "#0284c7" },
    rainday: { icon: "fa-cloud-showers-heavy", texto: "Chuva", cor: "#0284c7" },
    rainnight: { icon: "fa-cloud-showers-heavy", texto: "Chuva", cor: "#0284c7" },
    lightsnow: { icon: "fa-snowflake", texto: "Neve fraca", cor: "#60a5fa" },
    lightsnowday: { icon: "fa-snowflake", texto: "Neve fraca", cor: "#60a5fa" },
    lightsnownight: { icon: "fa-snowflake", texto: "Neve fraca", cor: "#60a5fa" },
    snow: { icon: "fa-snowflake", texto: "Neve", cor: "#60a5fa" },
    snowday: { icon: "fa-snowflake", texto: "Neve", cor: "#60a5fa" },
    snownight: { icon: "fa-snowflake", texto: "Neve", cor: "#60a5fa" },
    rainsnow: { icon: "fa-cloud-rain", texto: "Chuva e neve", cor: "#38bdf8" },
    rainsnowday: { icon: "fa-cloud-rain", texto: "Chuva e neve", cor: "#38bdf8" },
    rainsnownight: { icon: "fa-cloud-rain", texto: "Chuva e neve", cor: "#38bdf8" },
    ts: { icon: "fa-bolt", texto: "Trovoadas", cor: "#f97316" },
    tsday: { icon: "fa-bolt", texto: "Trovoadas", cor: "#f97316" },
    tsnight: { icon: "fa-bolt", texto: "Trovoadas", cor: "#f97316" },
    tsrain: { icon: "fa-cloud-bolt", texto: "Tempestade com chuva", cor: "#f97316" },
    tsrainday: { icon: "fa-cloud-bolt", texto: "Tempestade com chuva", cor: "#f97316" },
    tsrainnight: { icon: "fa-cloud-bolt", texto: "Tempestade com chuva", cor: "#f97316" },
    windy: { icon: "fa-wind", texto: "Ventando", cor: "#64748b" }
  };

  return clima[weather] || {
    icon: "fa-cloud",
    texto: weather,
    cor: "#64748b"
  };
}

function buscarLocalizacao() {
  document.getElementById("status").innerText = "Obtendo localização...";

  navigator.geolocation.getCurrentPosition(
    (posicao) => {
      let lat = posicao.coords.latitude;
      let lon = posicao.coords.longitude;

      document.getElementById("status").innerText =
        "Lat: " + lat + " | Lon: " + lon;

      buscarClima(lat, lon);
    },
    () => {
      alert("Não foi possível obter localização");
    }
  );
}

function buscarClima(lat, lon) {
  let url = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      let resultado = document.getElementById("resultado");
      resultado.innerHTML = "";

      let dias = data.dataseries.slice(0, 3);

      dias.forEach(dia => {
        let clima = obterClima(dia.weather);

        let card = `
          <div class="card">
            <h3>${formatarData(dia.date)}</h3>
            <p class="weather">
              <i class="fa-solid ${clima.icon}" style="color: ${clima.cor};" aria-hidden="true"></i>
              <span>${clima.texto}</span>
            </p>
            <p>Temp: min ${dia.temp2m.min}°C / max ${dia.temp2m.max}°C</p>
          </div>
        `;

        resultado.innerHTML += card;
      });
    })
    .catch(err => {
      console.log(err);
      alert("Erro ao buscar clima");
    });
}
