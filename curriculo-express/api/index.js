import "dotenv/config";
import cors from "cors";
import express from "express";
import models, { sequelize } from "./models/index.js";
import routes from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();
app.set("trust proxy", true);

// --- Configuração de CORS ---
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));

// --- Log simples ---
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// --- Body parser ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Injeta models e usuário padrão ---
app.use(async (req, res, next) => {
  req.context = { models };
  try {
    req.context.me = await models.User.findByPk(1);
  } catch (error) {
    console.error("Erro ao carregar usuário padrão:", error);
  }
  next();
});

// --- Rotas principais ---
app.use("/", routes.root);
app.use("/users", routes.user);
app.use("/experiences", routes.experience);
app.use("/educations", routes.education);
app.use("/skills", routes.skill);

// --- Rota default (para evitar 404 no '/') ---
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🚀 API do currículo está rodando com sucesso!",
    endpoints: ["/users", "/experiences", "/educations", "/skills"],
  });
});

// --- Middleware global de erro ---
app.use(errorMiddleware);

// --- Porta ---
const port = process.env.PORT || 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE === "true";

// --- Função para popular o banco ---
const createUserWithRelations = async () => {
  try {
    await models.User.create(
      {
        nome: "Maria Eduarda",
        email: "maria@email.com",
        resumo: "Desenvolvedora em formação apaixonada por tecnologia!",
        Experiences: [
          {
            cargo: "Estagiária Salesforce",
            empresa: "Empresa X",
            descricao: "Desenvolvimento e automação de processos.",
            data_inicio: "2024-01-01",
            data_fim: "2024-12-31",
          },
        ],
        Educations: [
          {
            instituicao: "Faculdade Y",
            curso: "Sistemas para Internet",
            data_inicio: "2023-01-01",
            data_fim: "2026-12-31",
          },
        ],
        Skills: [
          { nome: "JavaScript", nivel: "Intermediário" },
          { nome: "Salesforce", nivel: "Intermediário" },
        ],
      },
      {
        include: [models.Experience, models.Education, models.Skill],
      }
    );
    console.log("✅ Banco populado com usuário de exemplo!");
  } catch (error) {
    console.error("Erro ao popular banco:", error);
  }
};

// --- Inicialização ---
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco estabelecida com sucesso!");

    await sequelize.sync({ force: eraseDatabaseOnSync });

    if (eraseDatabaseOnSync) {
      await createUserWithRelations();
    }

    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
  }
};

// --- Executa apenas se não estiver em ambiente serverless ---
if (process.env.NODE_ENV !== "production") {
  startServer();
}

// --- Exporta para Vercel ---
export default app;
