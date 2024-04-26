const express = require("express");
const app = express();
const path = require("path");

const {guardarPost, getPosts, like} = require("./consultas");
app.listen(3000, console.log("Servidor arriba. 👍"))

app.use(express.static(path.join(__dirname, "assets")));

//Usar Json.
app.use(express.json())
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Guardar posts.
app.post("/post", async (req, res) => {
  try {
    //Variables del script en el HTML que guardan la info del usuario. 
    const { usuario, URL, descripcion } = req.body; 
    const likes = 0; 
    const result = await guardarPost([usuario, URL, descripcion, likes]); 
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Ruta GET/posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Ruta PUT/post
app.put("/post", async (req, res) => {
  try {
    let { id } = req.query;
    const posts = await like(id);
    res.send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
});