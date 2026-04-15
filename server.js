const express = require("express");
const { criarBanco } = require("./database");

const cors = require("cors");
const app = express();
app.use(cors());
app.use("/assets", express.static("assets"));
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

//Postando

app.post("/desaparecidos", async (req, res) => {
  const {
    nome,
    idade,
    foto,
    caracteristicas,
    roupa,
    ultimo_local,
    condicoes_saude,
    nome_responsavel,
    contato_responsavel,
    endereco,
  } = req.body;
  const db = await criarBanco();
  await db.run(
    `INSERT INTO desaparecidos(nome, idade, foto, caracteristicas, roupa, ultimo_local, condicoes_saude, nome_responsavel, contato_responsavel, endereco) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      nome,
      idade,
      foto,
      caracteristicas,
      roupa,
      ultimo_local,
      condicoes_saude,
      nome_responsavel,
      contato_responsavel,
      endereco,
    ],
  );

  res.send(`Cadastro feito com sucesso!`);
});

//Atualizando

app.put("/desaparecidos", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const db = await criarBanco();
  await db.run(
    `
  UPDATE desaparecidos
  SET status = ?
  WHERE id = ?`,
    [status, id],
  );
  res.send(`Registro atualizado`);
});

//Removendo
app.delete("/desaparecidos/:id", async (req, res) => {
  const { id } = req.params;
  const db = await criarBanco();
  await db.run(
    `
  DELETE FROM desaparecidos WHERE id = ?
  `,
    [id],
  );

  res.send(`Registro removido com sucesso`);
});

//Porta

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
