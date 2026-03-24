# 🌦️ Aula Prática: Consumindo API de Clima com JavaScript

## 📘 Documentação de versões

O histórico de mudanças do projeto está em [CHANGELOG.md](CHANGELOG.md).

## 🎯 Objetivo da Aula

Nesta aula, vamos aprender de forma prática como funciona a comunicação entre uma aplicação web e uma API externa.

Ao final, o aluno será capaz de:

- Entender o que é uma API
- Fazer requisições HTTP
- Trabalhar com dados em JSON
- Utilizar a localização do usuário (geolocalização)
- Exibir dados dinâmicos na tela

---

## 🌐 O que é uma API?

API (Application Programming Interface) é um serviço que permite que sistemas se comuniquem.

Na prática:

👉 Sua aplicação faz uma requisição  
👉 A API responde com dados  

No nosso caso:

👉 Enviamos latitude e longitude  
👉 Recebemos previsão do tempo  

---

## 🌦️ Sobre a API 7Timer

A API 7Timer é uma API gratuita de previsão do tempo.

Principais características:

- Não precisa de autenticação
- Funciona via HTTP
- Retorna dados em JSON
- Utiliza coordenadas geográficas (latitude e longitude)

---

## 🔁 Fluxo da aplicação

É muito importante que o aluno entenda o fluxo completo:

1. O usuário clica no botão
2. O navegador solicita a localização
3. O usuário autoriza o acesso
4. O navegador obtém latitude e longitude
5. A aplicação envia esses dados para a API
6. A API retorna um JSON com a previsão
7. A aplicação processa os dados
8. Os dados são exibidos na tela

---

## 📍 Geolocalização no navegador

Os navegadores modernos possuem uma API nativa chamada Geolocation.

Ela permite obter:

- Latitude
- Longitude

⚠️ Importante:

- O usuário precisa autorizar
- Pode não funcionar se a permissão for negada

---

## 🌐 Requisição HTTP

A comunicação com a API é feita usando HTTP (método GET).

O que acontece:

- A aplicação envia uma URL com parâmetros
- A API interpreta esses parâmetros
- Retorna os dados correspondentes

---

## 📦 Estrutura dos dados (JSON)

A resposta da API vem no formato JSON.

O principal campo é:

👉 dataseries

Ele contém uma lista de previsões.

Cada item possui:

- Data
- Clima (weather)
- Temperatura mínima
- Temperatura máxima

---

## 🔍 Interpretação dos dados

Cada objeto da lista representa um dia.

Exemplo do que significa cada campo:

- date → data da previsão
- weather → condição do clima (clear, rain, cloudy)
- temp2m → temperatura

---

## 🔁 Manipulação de dados

A aplicação seleciona apenas os 3 primeiros dias da previsão.

Isso ensina:

- Trabalhar com listas
- Filtrar dados
- Manipular informações antes de exibir

---

## 🖥️ Exibição na tela

Após receber os dados:

- A aplicação cria elementos HTML dinamicamente
- Insere os dados dentro desses elementos
- Mostra na tela para o usuário

---

## ⚠️ Observações importantes

- A API utiliza HTTP (não HTTPS)
- Alguns navegadores podem bloquear a requisição
- Recomenda-se usar um servidor local (ex: Live Server)

---

## 🚀 Possíveis melhorias (exercícios)

Para evoluir o projeto, os alunos podem:

1. Traduzir o clima para português
2. Melhorar o layout
3. Adicionar ícones de clima
4. Permitir busca manual por cidade
5. Formatar a data corretamente

---

## 🎓 Resumo

Nesta aula aprendemos como:

- Obter localização do usuário
- Consumir uma API real
- Trabalhar com JSON
- Exibir dados dinamicamente

---

## 👨‍🏫 Frase-chave da aula

“O navegador pega sua localização, envia para uma API e exibe os dados retornados na tela.”
