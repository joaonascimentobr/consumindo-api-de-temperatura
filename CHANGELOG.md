# Changelog

Todas as mudanças relevantes deste projeto serão documentadas neste arquivo.

## [0.3] - 2026-03-23

- Adição da pasta `cidades` com tela própria para pesquisa e seleção de cidades
- Integração com a API Nominatim para converter nome de cidade em latitude e longitude
- Atualização da tela principal para ler `lat`, `lon` e `cidade` com `URLSearchParams`
- Redirecionamento da escolha da cidade para a página principal via query string
- Criação do guia [GUIA_NOMINATIM.md](GUIA_NOMINATIM.md) para explicar o uso da API em sala de aula
- Atualização do `README.md` com referência ao guia complementar e às novidades da versão

## [0.2] - 2026-03-23

- Separação da interface em arquivos dedicados: `index.html`, `home.css` e `index.js`
- Inclusão de ícones do Font Awesome para representar as condições climáticas
- Tradução das condições do tempo para textos mais amigáveis na interface

## [0.1] - 2026-03-23

- Formatação da data da API para o padrão `DD/MM/AAAA`
- Ajuste da exibição da temperatura mínima e máxima retornadas em `temp2m`
- Melhoria simples de responsividade para telas menores
- Troca da chamada da API para `https`
