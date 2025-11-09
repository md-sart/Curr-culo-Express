import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { sequelize } from './models/index.js';
import routes from './routes/index.js';

const app = express();

// Configuração básica do Express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para injetar models e usuário padrão no contexto
app.use(async (req, res, next) => {
  req.context = { models };
  try {
    req.context.me = await models.User.findByPk(1); // opcional — exemplo
  } catch (error) {
    console.error('Erro ao carregar usuário padrão:', error);
  }
  next();
});

// Rotas principais
app.use('/api', routes);

// Porta
const PORT = process.env.PORT || 3000;

// Sincroniza banco e inicia servidor
const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';

sequelize
  .sync({ force: eraseDatabaseOnSync })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      await seedDatabase();
    }

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao iniciar o servidor:', error);
  });

// Função para popular o banco com dados de exemplo
const seedDatabase = async () => {
  try {
    const user = await models.User.create(
      {
        nome: 'Maria Eduarda',
        email: 'maria@email.com',
        resumo: 'Desenvolvedora em formação apaixonada por tecnologia!',
        Experiences: [
          {
            cargo: 'Estagiária Salesforce',
            empresa: 'Empresa X',
            descrição: 'Desenvolvimento e automação de processos.',
            data_início: '2024-01-01',
            data_fim: '2024-12-31',
          },
        ],
        Educations: [
          {
            instituição: 'Faculdade Y',
            curso: 'Sistemas para Internet',
            data_início: '2023-01-01',
            data_fim: '2026-12-31',
          },
        ],
        Skills: [
          { nome: 'JavaScript', nível: 'Intermediário' },
          { nome: 'Salesforce', nível: 'Intermediário' },
        ],
      },
      {
        include: [models.Experience, models.Education, models.Skill],
      }
    );

    console.log(`✅ Banco populado com usuário: ${user.nome}`);
  } catch (error) {
    console.error('Erro ao popular banco:', error);
  }
};
