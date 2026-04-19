const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const criarBanco = async () => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  //Lista

  await db.exec(`
    CREATE TABLE IF NOT EXISTS desaparecidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      idade TEXT,
      foto TEXT,
      caracteristicas TEXT,
      roupa TEXT,
      ultimo_local TEXT,
      condicoes_saude TEXT,
      nome_responsavel TEXT,
      contato_responsavel TEXT,
      endereco TEXT,
      status TEXT DEFAULT 'DESAPARECIDO')
`);

  console.log("Lista configurada");

  //------- CRUD - C - CREATE -------//
  const checagem = await db.get(`SELECT COUNT (*) AS total FROM desaparecidos`);

  if (checagem.total === 0) {
    await db.exec(
      `INSERT INTO desaparecidos(nome, idade, foto, caracteristicas, roupa, ultimo_local, 
    condicoes_saude, nome_responsavel, contato_responsavel, endereco) VALUES

("Carlos Pereira Costa", "45", "https://pasteimg.com/images/2026/04/19/Carlos.png", "Homem alto, olhos castanhos, pele clara, tem o nariz grande e tem uma pinta embaixo do olho", "Usava uma jaqueta amarela", "Foi visto perto da paradiria do seu Zé", "N/A", "Vivian Soares Costa", "(21)11111-1111 ou (21)22222-2222", "Rua das Flores, 123"),
("Margarete Antunes", "38", "https://pasteimg.com/images/2026/04/19/Margarete.png", "Mulher de pele escura, cabelos castanhos e com pintas nas bochecas", "Usava uma roupa social cinza com a gola marrom e brincos verdes", "Foi vista perto do trabalho no seu horário de almoço", "Tem pressão alta", "Nicolau Antunes", "(21)33333-3333", "Centro da cidade, Apt 35 Bloco 2"),
("Enzo Matias Rodrigues", "12", "https://pasteimg.com/images/2026/04/19/Enzo.png", "Um menino loiro com a pele queimada do sol, com uma cicatriz no rosto", "Estava usando uma camisa verde e boné vermelho", "Estava voltando da escola, estava com os amigos Gabriel e Lorenzo", "Tem alergia a dipirona", "Fátima Matias Rodrigues", "(21)44444-4444", "Condomínio das Araras, 702 casa verde"),
("Lúcia Anita Flores", "71", "https://pasteimg.com/images/2026/04/19/Lucia.png", "Uma senhora com cabelos grisalho, pele bem clara e olhos claros", "Usa óculos e chapéu e uma roupa rosa e azul", "Estava na varanda de sua casa", "Tem problemas na pele e tem dificuldade de locomoção por conta do joelho", "Leandra Flores", "(21)55555-5555", "Rua das Flores, 321 em frente a uma mangueira"),
("Victor Moreira de Souza", "22", "https://pasteimg.com/images/2026/04/19/Victor.png", "Um homem um pouco acima do peso, cabelos longos e barba grande", "Estava com roupa de academia", "Estava indo para a academia", "Tem um pouco de dificuldade para respirar", "Fábio Moreira de Souza", "(21)66666-6666", "Centro da cidade, Apt 88 Bloco 1"),
("Susana Benicio Gomes", "30", "https://pasteimg.com/images/2026/04/19/Susana.png", "Um mulher ruiva com olhos cor oliva", "Geralmente usa roupas e acessórios pretos", "Estava na casa de uma amiga perto do centro", "N/A", "Jorge Hugo Gomes", "(21)77777-7777 ou (21)88888-8888", "Condomínio das Araras, 206" )
`,
    );
  } else {
    console.log(`Lista pronta com ${checagem.total}`);
  }

  //------ CRUD - R - READ -----//
  const todosOsDesaparecidos = await db.all(`SELECT * FROM desaparecidos`);
  console.table(todosOsDesaparecidos);

  //----- CRUD - U - UPDATE -----//

  await db.run(`
    UPDATE desaparecidos
    SET status = "ENCONTRADO"
    WHERE nome = "Enzo Matias Rodrigues"          
    `);

  //Final
  const resultadoFinal = await db.all(`SELECT * FROM desaparecidos`);
  console.table(resultadoFinal);

  return db;
};

module.exports = { criarBanco };
