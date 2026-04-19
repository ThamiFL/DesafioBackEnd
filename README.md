# 🌊 Projeto Registo de Desaparecido em Enchetes

## 📌 Sobre o projeto

Este projeto foi desenvolvido para auxiliar o registro e acompanhamento de pessoas desaparecidas durante enchentes. Esse sistema permite cadastrar indivíduos desaparecidos, armazenar suas informações e atualizar seu status conforme novas informações, facilitando a organização.

---

## 🛠️ Tecnologias utilizadas

Backend

- Node.js
- Express
- SQLite

---

Frontend

- React
- Axios

Link para o front

---

## 📊 Estrutura do banco de dados

Tabela: desaparecidos

| Lista            | Descrição                            |
| ---------------- | ------------------------------------ |
| id               | Identificador único                  |
| nome             | Nome da pessoa                       |
| idade            | Idade                                |
| foto             | Url da imagem                        |
| caracteristicas  | Características físicas              |
| roupa            | Roupas no momento do desaparecimento |
| ultimo_local     | Último local visto                   |
| condicoes_saude  | Condições de saúde                   |
| nome_responsavel | Nome do responsável                  |
| contato          | Contato do responsavel               |
| endereco         | Onde mora                            |
| status           | Situação atual                       |

---

## 📡 Endpoints

### 🟢 Listar desaparecidos

```
GET /desaparecidos
```

### 🟡 Cadastrar Desaparecido

```
POST /desaparecidos
```

### 🟠 Atualizar Desaparecido

```
PUT /desaparecidos/:id
```

### 🔴 Deletar Desaparecido

```
DELETE /desaparecidos/:id
```

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias neste projeto. 🧡
