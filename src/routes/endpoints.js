const path = require("path"); // Está importando o módulo path do node.js, que é responsável por lidar com caminhos de arquivos e diretórios.
const express = require("express"); // Está importando o módulo express pelo Node.js para a variável express.

module.exports = (app) => {
  /* 
    - GET: Buscar/obter uma ou mais informações do back-end.
    - POST: Criar uma nova informação no back-end.
    - PUT: Atualizar uma informação existente no back-end.
    - DELETE: Remover uma informação do back-end.
  */

  // Criado um array inicial de produtos.
  let products = [
    {
      id: 1,
      name: "Console de Videogame",
      price: 3500,
    },
    {
      id: 2,
      name: "Notebook Intel Core i5",
      price: 2500,
    },
    {
      id: 3,
      name: "Smartphone Android",
      price: 800,
    },
    {
      id: 4,
      name: "Fone de Ouvido Bluetooth",
      price: 150,
    },
    {
      id: 5,
      name: "Câmera Digital 20MP",
      price: 700,
    },
  ];

  // O use é responsável por adicionar um plugin no express, ele recebe um parâmetro que é o plugin.
  app.use(express.json()); // Está adicionando o plugin json no express, ele é responsável por converter o corpo da requisição para json.

  app.use(express.static(path.join(__dirname, "../../public"))); // Está falando para o express que a pasta public é a pasta de arquivos estáticos.

  // Irá obter a rota e retornar o arquivo index.html.
  app.get("/", (req, res) => {
    const index = path.join(__dirname, "../../public/index.html"); // Está criando uma variável com o caminho do arquivo index.html.
    const css = path.join(__dirname, "../../public/css/style.css"); // Está criando uma variável com o caminho do arquivo style.css.

    return res.sendFile(index, css); // Está retornando o arquivo index.html.
  });

  // Irá obter os produtos e retornar os produtos.
  app.get("/products", (req, res) => {
    // Se o tamanho do array de produtos for igual a 0, retorna uma mensagem de erro, caso contrário ele continua o código abaixo do if.
    if (!products.length) {
      return res.status(400).json({ error: "Nenhum produto encontrado." }); // Está retornando um status de erro 400 e uma mensagem de erro.
    }

    return res.json(products); // Está retornando como resposta um json com os produtos.
  });

  // Irá obter o id do produto pela url e retornar o produto.
  app.get("/products/:id", (req, res) => {
    const { id } = req.params; // Está pegando o id da requisição.

    const product = products.find((product) => product.id == id); // Está procurando o produto pelo id, quando encontrado ele retorna para a variável product.

    // Se product for false, retorna uma mensagem de erro.
    if (!product) {
      return res.status(400).json({ error: "Produto não encontrado." }); // Está retornando um status de erro 400 e uma mensagem de erro.
    }

    return res.json(product); // Se encontrar o produto, retorna o produto.
  });

  // Irá criar um novo produto, colocar no final do array de produtos e retornar o produto criado.
  app.post("/products", (req, res) => {
    const { name, price } = req.body; // Está desestrutura do corpo da requisição os dados do produto, que são name e price.

    // Se o tamanho do array de produtos for maior que 0, ele pega o último produto e retorna o id dele, caso contrário ele retorna 0 e armazena na variável lastProductId.
    const lastProductId =
      products.length > 0 ? products[products.length - 1].id : 0;

    // Está criando um novo produto com o id do último produto + 1, o name e o price.
    const newProduct = {
      id: lastProductId + 1,
      name,
      price,
    };

    // Se não existir id, name ou price, retorna uma mensagem de erro, caso exista ele continua o código abaixo do if.
    if (!name || !price) {
      return res.status(400).json({ error: "Produto não encontrado." }); // Está retornando um status de erro 400 e uma mensagem de erro.
    }

    products.push(newProduct); // Está adicionando o novo produto no final do array de produtos.

    return res.json(newProduct); // Está retornando o produto criado.
  });

  // Irá atualizar um produto existente e retornar o produto atualizado.
  app.put("/products/:id", (req, res) => {
    const { id } = req.params; // Está pegando o id da requisição.

    const product = products.find((product) => product.id == id); // Está procurando o produto pelo id, quando encontrado ele retorna para a variável product.

    const { name, price } = req.body; // Está desestrutura do corpo da requisição os dados do produto, que são name e price.

    // Se não existir o produto, id, name ou price, retorna uma mensagem de erro, caso exista ele continua o código abaixo do if.
    if (!product || !name || !price) {
      return res.status(400).json({ error: "Produto não encontrado." }); // Está retornando um status de erro 400 e uma mensagem de erro.
    }

    product.name = name; // Está atualizando o name do produto.
    product.price = price; // Está atualizando o price do produto.

    return res.json(product); // Está retornando o produto atualizado.
  });

  // Irá remover um produto existente e retornar uma mensagem de sucesso.
  app.delete("/products/:id", (req, res) => {
    const { id } = req.params; // Está pegando o id da requisição.

    const productIndex = products.findIndex((product) => product.id == id); // Está procurando o produto pelo id, quando encontrado ele retorna para a variável productIndex.

    // Se productIndex for false, ou seja, se não encontrar o produto, executa o if.
    if (productIndex < 0) {
      return res.status(400).json({ error: "Produto não encontrado." }); // Está retornando um status de erro 400 e uma mensagem de erro.
    }

    products.splice(productIndex, 1); // Está removendo o produto do array de produtos, o primeiro parâmetro é o índice do produto e o segundo é a quantidade de produtos que serão removidos.

    return res.json({ message: "Produto removido com sucesso." }); // Está retornando uma mensagem de sucesso.
  });
};
