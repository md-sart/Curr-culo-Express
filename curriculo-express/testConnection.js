import 'dotenv/config';
import { sequelize } from './api/models/index.js'; // <-- Importação corrigida

console.log('--- Teste de Variável de Ambiente ---');
console.log('POSTGRES_URL:', process.env.POSTGRES_URL ? 'Encontrada ✅' : 'Não encontrada ❌');
console.log('------------------------------------');

(async () => {
  try {
    console.log('Tentando conectar ao banco de dados...');
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco de dados:', error.message);
  } finally {
    await sequelize.close();
  }
})();