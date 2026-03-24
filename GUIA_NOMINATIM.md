# Guia da API de Cidades com Nominatim

## Objetivo deste guia

Este material explica, de forma simples, como a API **Nominatim**, baseada em dados do **OpenStreetMap**, foi usada no projeto para permitir que o aluno pesquise uma cidade e obtenha suas coordenadas geográficas.

Na prática, ela foi usada para transformar um nome de cidade em:

- latitude
- longitude

Esses dados depois são enviados para a tela principal, que usa as coordenadas para consultar a previsão do tempo.

---

## O que é o Nominatim?

O Nominatim é um serviço de busca geográfica.

Ele permite procurar lugares por texto, como por exemplo:

- `Rio de Janeiro`
- `São Paulo`
- `Salvador`

Quando a busca encontra resultados, a API devolve informações como:

- nome do local
- latitude
- longitude
- detalhes do endereço

Esse processo é chamado de **geocodificação**.

---

## Endpoint usado na aula

Na aula, usamos o endpoint de busca:

```txt
https://nominatim.openstreetmap.org/search
```

No projeto, a chamada foi montada assim:

```js
let url = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=5&accept-language=pt-BR&q=${encodeURIComponent(nomeCidade)}`;
```

Esse código está em [cidades/script.js](c:\Users\joaoc\OneDrive\Desktop\teste3\cidades\script.js).

---

## Parâmetros usados

Os principais parâmetros usados foram:

- `q`
  Texto digitado pelo usuário na busca.
- `format=jsonv2`
  Pede que a resposta venha em JSON.
- `addressdetails=1`
  Inclui os detalhes do endereço dentro do campo `address`.
- `limit=5`
  Limita a resposta para até 5 resultados.
- `accept-language=pt-BR`
  Tenta retornar os nomes com preferência para português do Brasil.

Exemplo de busca:

```txt
https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=5&accept-language=pt-BR&q=Rio%20de%20Janeiro
```

---

## O que a resposta da API traz

A resposta vem como uma lista de objetos JSON.

Alguns campos importantes para a aula são:

- `display_name`
  Texto completo do resultado encontrado.
- `lat`
  Latitude do local.
- `lon`
  Longitude do local.
- `address`
  Objeto com detalhes como cidade, estado, região e país.

Exemplo simplificado:

```json
[
  {
    "display_name": "Rio de Janeiro, Região Geográfica Imediata do Rio de Janeiro, Região Metropolitana do Rio de Janeiro, Rio de Janeiro, Região Sudeste, Brasil",
    "lat": "-22.9110137",
    "lon": "-43.2093727",
    "address": {
      "city": "Rio de Janeiro",
      "state": "Rio de Janeiro",
      "country": "Brasil"
    }
  }
]
```

---

## Como usamos a resposta no projeto

Depois que a API retorna os resultados:

1. O JavaScript percorre a lista recebida.
2. Para cada resultado, a página mostra:
   - nome da cidade
   - estado e país, quando existirem
   - latitude
   - longitude
3. Cada item recebe um botão:
   - `Selecionar esta cidade`
4. Quando o usuário escolhe uma cidade, a aplicação monta uma URL de volta para a página principal.

Exemplo:

```txt
../index.html?lat=-22.9110137&lon=-43.2093727&cidade=Rio%20de%20Janeiro
```

---

## Por que usamos `encodeURIComponent`

Nomes de cidades podem ter:

- espaço
- acento
- caracteres especiais

Por isso, antes de enviar o nome na URL, usamos:

```js
encodeURIComponent(nomeCidade)
```

Exemplo:

- `Rio de Janeiro` vira `Rio%20de%20Janeiro`
- `São Paulo` vira `S%C3%A3o%20Paulo`

Isso evita erros ao montar a query string.

---

## Como a tela principal usa esses dados

Depois do redirecionamento, a página principal lê os parâmetros da URL com:

```js
let params = new URLSearchParams(window.location.search);
```

Em seguida, ela recupera:

- `lat`
- `lon`
- `cidade`

Se esses parâmetros existirem, a aplicação:

- usa essas coordenadas
- não depende da geolocalização do navegador
- faz a busca da previsão do tempo com base na cidade escolhida

---

## Fluxo completo da aula

O fluxo fica assim:

1. O aluno abre a página principal.
2. Clica em `Escolher cidade`.
3. A aplicação abre `/cidades/index.html`.
4. O aluno digita o nome da cidade e clica em `Pesquisar`.
5. O JavaScript envia uma requisição para o Nominatim.
6. A API devolve os resultados com latitude e longitude.
7. O aluno escolhe um dos resultados.
8. A aplicação volta para `index.html` com query string.
9. A tela principal lê os parâmetros da URL.
10. A aplicação usa essas coordenadas para consultar a API do clima.

---

## Decisões didáticas do projeto

Algumas escolhas foram feitas para manter o exemplo simples para iniciantes:

- usar `fetch` com JavaScript puro
- usar apenas `GET`
- manter a lógica de busca de cidades isolada na pasta `cidades`
- usar `URLSearchParams` para ler a query string
- usar `encodeURIComponent` para enviar o nome da cidade com segurança
- exibir poucos resultados para não poluir a interface

---

## Cuidados importantes segundo a documentação oficial

A documentação oficial e a política de uso do Nominatim deixam alguns cuidados importantes:

- a busca deve ser acionada por ação do usuário
- o serviço não deve ser usado como autocomplete a cada tecla digitada
- o uso público deve ser moderado
- o serviço oficial tem limite de uso e política própria

Por isso, neste projeto, a busca acontece **somente quando o aluno clica no botão `Pesquisar`**. Isso é mais simples para a aula e está mais alinhado com a política de uso do serviço.

---

## Resumo

Com a API Nominatim, os alunos conseguem entender na prática como:

- pesquisar dados externos por texto
- consumir uma API REST com `fetch`
- trabalhar com JSON
- montar URLs com parâmetros
- integrar duas APIs diferentes no mesmo projeto

Neste projeto:

- o **Nominatim** encontra a cidade
- o **7Timer** consulta a previsão do tempo

---

## Referências oficiais

- Documentação oficial da busca: https://nominatim.org/release-docs/4.2/api/Search/
- Visão geral da API: https://nominatim.org/release-docs/4.2/api/Overview/
- Política de uso do serviço oficial: https://operations.osmfoundation.org/policies/nominatim/
