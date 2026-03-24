function formatarData(data) {
  let texto = String(data);
  return `${texto.slice(6, 8)}/${texto.slice(4, 6)}/${texto.slice(0, 4)}`;
}

function obterClima(weather) {
  const clima = {
    clear: { icone: "☀️", texto: "Céu limpo" },
    pcloudy: { icone: "⛅", texto: "Parcialmente nublado" },
    mcloudy: { icone: "☁️", texto: "Muito nublado" },
    cloudy: { icone: "☁️", texto: "Nublado" },
    humid: { icone: "🌫️", texto: "Úmido / neblina" },
    lightrain: { icone: "🌦️", texto: "Chuva fraca" },
    oshower: { icone: "🌦️", texto: "Pancadas ocasionais" },
    ishower: { icone: "🌦️", texto: "Pancadas isoladas" },
    rain: { icone: "🌧️", texto: "Chuva" },
    lightsnow: { icone: "🌨️", texto: "Neve fraca" },
    snow: { icone: "❄️", texto: "Neve" },
    rainsnow: { icone: "🌨️", texto: "Chuva e neve" },
    ts: { icone: "⛈️", texto: "Trovoadas" },
    tsrain: { icone: "⛈️", texto: "Tempestade com chuva" }
  };

  return clima[weather] || {
    icone: "🌤️",
    texto: weather
  };
}

function mostrarStatus(texto) {
  document.getElementById("status").innerText = texto;
}

function mostrarCidadeAtual(cidade) {
  document.getElementById("cidadeAtual").innerText = cidade ? `Cidade: ${cidade}` : "";
}

function criarCard(dia) {
  let clima = obterClima(dia.weather);

  return `
    <div class="card">
      <h2>${formatarData(dia.date)}</h2>
      <p class="clima">
        <span class="clima-icone">${clima.icone}</span>
        <span>${clima.texto}</span>
      </p>
      <p>Temperatura mínima: ${dia.temp2m.min}°C</p>
      <p>Temperatura máxima: ${dia.temp2m.max}°C</p>
    </div>
  `;
}

function buscarLocalizacao() {
  mostrarCidadeAtual("");
  mostrarStatus("Obtendo localização...");

  navigator.geolocation.getCurrentPosition(
    (posicao) => {
      let lat = posicao.coords.latitude;
      let lon = posicao.coords.longitude;
      buscarClima(lat, lon);
    },
    () => {
      mostrarStatus("Não foi possível obter a localização do usuário.");
    }
  );
}

function buscarClima(lat, lon, cidade) {
  let url = `https://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=civillight&output=json`;
  let resultado = document.getElementById("resultado");

  mostrarStatus("Buscando previsão do tempo...");
  resultado.innerHTML = "";

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.dataseries || data.dataseries.length === 0) {
        throw new Error("Nenhuma previsão foi encontrada.");
      }

      let dias = data.dataseries.slice(0, 3);

      if (cidade) {
        mostrarCidadeAtual(cidade);
      }

      mostrarStatus(`Latitude: ${lat} | Longitude: ${lon}`);
      resultado.innerHTML = dias.map(criarCard).join("");
    })
    .catch(() => {
      mostrarStatus("Erro ao buscar a previsão do tempo.");
      resultado.innerHTML = "";
    });
}

function lerParametrosDaUrl() {
  let params = new URLSearchParams(window.location.search);
  let lat = params.get("lat");
  let lon = params.get("lon");
  let cidade = params.get("cidade");

  if (!lat || !lon) {
    return null;
  }

  return {
    lat: Number(lat),
    lon: Number(lon),
    cidade: cidade || ""
  };
}

document.addEventListener("DOMContentLoaded", () => {
  let botaoLocalizacao = document.getElementById("botaoLocalizacao");
  let botaoCidade = document.getElementById("botaoCidade");
  let parametros = lerParametrosDaUrl();

  botaoLocalizacao.addEventListener("click", buscarLocalizacao);
  botaoCidade.addEventListener("click", () => {
    window.location.href = "cidades/index.html";
  });

  // Se a tela recebeu coordenadas pela URL, usa esses dados diretamente.
  if (parametros && !Number.isNaN(parametros.lat) && !Number.isNaN(parametros.lon)) {
    buscarClima(parametros.lat, parametros.lon, parametros.cidade);
    return;
  }

  mostrarStatus("Use sua localização ou escolha uma cidade.");
});
