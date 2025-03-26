import { buscarDadosCliente, atualizarDadosCliente } from './clienteApi.js';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Função para executar os testes
async function executarTestes() {
  console.log('Iniciando testes de clienteApi.js...');
  
  // Teste 1: Buscar dados do cliente
  const clienteId = 'id-do-cliente-aqui';
  const clienteEmail = 'email-do-cliente@exemplo.com';
  
  console.log(`\nTestando buscarDadosCliente com ID: ${clienteId} e Email: ${clienteEmail}`);
  const resultado = await buscarDadosCliente(clienteId, clienteEmail);
  console.log('Resultado:', resultado);
  
  // Teste 2: Atualizar dados do cliente
  if (resultado.data) {
    console.log('\nTestando atualizarDadosCliente');
    const dadosAtualizados = {
      telefone: '(11) 98765-4321',
      observacao: 'Atualizado via teste'
    };
    
    const resultadoAtualizacao = await atualizarDadosCliente(
      clienteId, 
      clienteEmail, 
      dadosAtualizados
    );
    console.log('Resultado da atualização:', resultadoAtualizacao);
  }
  
  console.log('\nTestes concluídos!');
}

// Executar os testes
executarTestes().catch(err => {
  console.error('Erro durante os testes:', err);
});
