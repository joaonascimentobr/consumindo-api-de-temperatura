function mostrarMensagem(texto) {
  document.getElementById("mensagem").innerText = texto;
}

function montarNomeCidade(item) {
  let endereco = item.address || {};

  if (endereco.city) {
    return endereco.city;
  }

  if (endereco.town) {
    return endereco.town;
  }

  if (endereco.village) {
    return endereco.village;
  }

  if (endereco.municipality) {
    return endereco.municipality;
  }

  return item.display_name.split(",")[0];
}

function montarLocalizacao(item) {
  let endereco = item.address || {};
  let estado = endereco.state || endereco.region || "";
  let pais = endereco.country || "";

  if (estado && pais) {
    return `${estado} - ${pais}`;
  }

  return estado || pais || "Informação não disponível";
}

function selecionarCidade(nomeCidade, latitude, longitude) {
  let url = `../index.html?lat=${latitude}&lon=${longitude}&cidade=${encodeURIComponent(nomeCidade)}`;
  window.location.href = url;
}

function criarCardResultado(item) {
  let nomeCidade = montarNomeCidade(item);
  let localizacao = montarLocalizacao(item);
  let nomeCidadeCodificado = encodeURIComponent(nomeCidade);

  return `
    <div class="resultado">
      <h2>${nomeCidade}</h2>
      <p>Estado / País: ${localizacao}</p>
      <p>Latitude: ${item.lat}</p>
      <p>Longitude: ${item.lon}</p>
      <button
        type="button"
        data-cidade="${nomeCidadeCodificado}"
        data-lat="${item.lat}"
        data-lon="${item.lon}"
      >
        Selecionar esta cidade
      </button>
    </div>
  `;
}

function pesquisarCidade(event) {
  event.preventDefault();

  let campoCidade = document.getElementById("campoCidade");
  let listaResultados = document.getElementById("listaResultados");
  let nomeCidade = campoCidade.value.trim();

  if (!nomeCidade) {
    mostrarMensagem("Digite o nome de uma cidade para pesquisar.");
    listaResultados.innerHTML = "";
    return;
  }

  mostrarMensagem("Pesquisando cidades...");
  listaResultados.innerHTML = "";

  let url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=5&accept-language=pt-BR&q=${encodeURIComponent(nomeCidade)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro na busca da cidade.");
      }

      return response.json();
    })
    .then(data => {
      if (data.length === 0) {
        mostrarMensagem("Nenhuma cidade foi encontrada.");
        return;
      }

      mostrarMensagem("Escolha uma das cidades encontradas.");
      listaResultados.innerHTML = data.map(criarCardResultado).join("");
    })
    .catch(() => {
      mostrarMensagem("Não foi possível pesquisar as cidades agora.");
      listaResultados.innerHTML = "";
    });
}

document.addEventListener("DOMContentLoaded", () => {
  let formBusca = document.getElementById("formBusca");
  let listaResultados = document.getElementById("listaResultados");

  formBusca.addEventListener("submit", pesquisarCidade);

  // O clique no botão é tratado por delegação porque os resultados são dinâmicos.
  listaResultados.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") {
      return;
    }

    selecionarCidade(
      decodeURIComponent(event.target.dataset.cidade),
      event.target.dataset.lat,
      event.target.dataset.lon
    );
  });
});
