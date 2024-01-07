const path = require("path");
const express = require("express");

module.exports = (app) => {
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

  app.use(express.json());

  app.use(express.static(path.join(__dirname, "../../public")));

  app.get("/", (req, res) => {
    const index = path.join(__dirname, "../../public/index.html");
    const css = path.join(__dirname, "../../public/css/style.css");

    return res.sendFile(index, css);
  });

  app.get("/products", (req, res) => {
    if (!products.length) {
      return res.status(400).json({ error: "Nenhum produto encontrado." });
    }

    return res.json(products);
  });

  app.get("/products/:id", (req, res) => {
    const { id } = req.params;

    const product = products.find((product) => product.id == id);

    if (!product) {
      return res.status(400).json({ error: "Produto não encontrado." });
    }

    return res.json(product);
  });

  app.post("/products", (req, res) => {
    const { name, price } = req.body;

    const lastProductId =
      products.length > 0 ? products[products.length - 1].id : 0;

    const newProduct = {
      id: lastProductId + 1,
      name,
      price,
    };

    if (!name || !price) {
      return res.status(400).json({ error: "Produto não encontrado." });
    }

    products.push(newProduct);

    return res.json(newProduct);
  });

  app.put("/products/:id", (req, res) => {
    const { id } = req.params;

    const product = products.find((product) => product.id == id);

    const { name, price } = req.body;

    if (!product || !name || !price) {
      return res.status(400).json({ error: "Produto não encontrado." });
    }

    product.name = name;
    product.price = price;

    return res.json(product);
  });

  app.delete("/products/:id", (req, res) => {
    const { id } = req.params;

    const productIndex = products.findIndex((product) => product.id == id);

    if (productIndex < 0) {
      return res.status(400).json({ error: "Produto não encontrado." });
    }

    products.splice(productIndex, 1);

    return res.json({ message: "Produto removido com sucesso." });
  });
};
