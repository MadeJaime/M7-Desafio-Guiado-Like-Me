
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "110580",
  database: "likeme",
  port: 5432,
});

//Guardar posts.
const guardarPost = async (titulo, img, descripcion, likes) => {
  try {
    //Consulta.
    const consulta = {
      text: "INSERT INTO posts (titulo, img, descripcion, likes) values ($1, $2, $3, $4)",
      values: titulo, img, descripcion, likes,
    };
    const result = await pool.query(consulta);
    return result;
  } catch (error) {
    console.error("Error al guardar posts", error)
  }
};
// Obtener y mostrar usuarios
const getPosts = async () => {
  const result = await pool.query(
    `SELECT * FROM posts`
  );
  return result.rows;
};
// Likes
const like = async (id) => {
  const result = await pool.query(
    `UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *`,
    [id]
  );
  return result.rows;
};

//Modulos exportados
module.exports = { guardarPost, getPosts, like };
