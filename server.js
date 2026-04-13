const express = require("express");
const { criarBanco } = require("./database");

const app = express();

app.use(express.json());

//Rota principal
app.get("/", (req, res) => {
  res.send(`
    <h1> ENCHENTES </h1>
    
    `);
});

app.get("/desaparecidos", async (req, res) => {
  const db = await criarBanco();
  const listaDesaparecidos = await db.all(`SELECT * FROM desaparecidos`);
  res.json(listaDesaparecidos);
});

//Rota específica

app.get("/desaparecidos/:id", async (req, res) => {
  const { id } = req.params;
  const db = await criarBanco();
  const desaparecidoEspecifico = await db.all(
    `SELECT * FROM desaparecidos WHERE id = ?`,
    [id],
  );

  res.json(desaparecidoEspecifico);
});

//Porta

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
