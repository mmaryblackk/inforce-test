import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
app.use(express.json());

const PORT = 3001;
const PRODUCTS_PATH = "./server/data/products.json";
const COMMENTS_PATH = "./server/data/comments.json";

app.use(cors());

app.get("/api/products", async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_PATH, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to load products" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_PATH, "utf-8");
    const products = JSON.parse(data);

    const product = products.find((p) => p.id === +req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to load product" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_PATH, "utf-8");
    const products = JSON.parse(data);

    const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    const newProduct = { id: maxId + 1, ...req.body };

    products.push(newProduct);
    await fs.writeFile(PRODUCTS_PATH, JSON.stringify(products));

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

app.patch("/api/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_PATH, "utf-8");
    const products = JSON.parse(data);

    const index = products.findIndex((p) => p.id === +req.params.id);
    if (index === -1)
      return res.status(404).json({ error: "Product not found" });

    products[index] = { ...products[index], ...req.body };

    await fs.writeFile(PRODUCTS_PATH, JSON.stringify(products));
    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_PATH, "utf-8");
    let products = JSON.parse(data);

    const index = products.findIndex((p) => p.id === +req.params.id);
    if (index === -1)
      return res.status(404).json({ error: "Product not found" });

    const deleted = products.splice(index, 1)[0];
    await fs.writeFile(PRODUCTS_PATH, JSON.stringify(products));

    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// COMMENTS SECTION

app.get("/api/comments", async (req, res) => {
  try {
    const data = await fs.readFile(COMMENTS_PATH, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to load comments" });
  }
});

app.get("/api/comments/:productId", async (req, res) => {
  try {
    const data = await fs.readFile(COMMENTS_PATH, "utf-8");
    const comments = JSON.parse(data);

    const productComments = comments.filter(
      (c) => c.productId === +req.params.productId
    );

    if (!productComments) {
      return res.status(404).json({ error: "Comments not found" });
    }

    res.json(productComments);
  } catch (error) {
    res.status(500).json({ error: "Failed to load comments" });
  }
});

app.post("/api/comments", async (req, res) => {
  try {
    const data = await fs.readFile(COMMENTS_PATH, "utf-8");
    const comments = JSON.parse(data);

    const maxId = comments.reduce((max, c) => Math.max(max, c.id), 0);
    const newComment = {
      id: maxId + 1,
      productId: req.body.productId,
      description: req.body.description,
      date: new Date().toLocaleString("uk-UA", {
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };

    comments.push(newComment);
    await fs.writeFile(COMMENTS_PATH, JSON.stringify(comments));

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

app.delete("/api/comments/:id", async (req, res) => {
  try {
    const data = await fs.readFile(COMMENTS_PATH, "utf-8");
    let comments = JSON.parse(data);

    const index = comments.findIndex((p) => p.id === +req.params.id);
    if (index === -1)
      return res.status(404).json({ error: "Comment not found" });

    const deleted = comments.splice(index, 1)[0];
    await fs.writeFile(COMMENTS_PATH, JSON.stringify(comments));

    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
