import { createClient } from '@supabase/supabase-js';

/**
 * Verifica se o email corresponde ao cliente
 * @param {string} clienteId - ID do cliente
 * @param {string} email - Email do cliente
 * @param {string} formId - ID do formulário
 * @param {string} token - Token público
 * @returns {Promise<boolean>} - Verdadeiro se o email for válido
 */
export async function verificarEmailCliente(clienteId, email, formId, token) {
  if (!clienteId || !email) {
    throw new Error('ID do cliente e email são obrigatórios');
  }
  
  try {
    // Criar cliente Supabase com os cabeçalhos necessários
    const supabase = createClient(
      window.env.PUBLIC_SUPABASE_URL || import.meta.env.PUBLIC_SUPABASE_URL,
      window.env.PUBLIC_SUPABASE_ANON_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            'x-formid': formId,
            'x-public-token': token,
            'x-cliente-id': clienteId,
            'x-cliente-email': email
          }
        }
      }
    );
    
    // Buscar email do cliente
    const { data, error } = await supabase
      .from('cliente')
      .select('email')
      .eq('id', clienteId)
      .single();
    
    if (error) {
      console.error('Erro ao buscar email do cliente:', error);
      throw error;
    }
    
    // Verificar se o email corresponde
    return data.email.toLowerCase() === email.toLowerCase();
  } catch (err) {
    console.error('Erro ao verificar email do cliente:', err);
    throw err;
  }
}

/**
 * Busca dados do cliente usando o ID e email
 * @param {string} clienteId - ID do cliente
 * @param {string} email - Email do cliente
 * @param {string} formId - ID do formulário
 * @param {string} token - Token público
 * @returns {Promise<Object>} - Dados do cliente
 */
export async function buscarDadosCliente(clienteId, email, formId, token) {
  if (!clienteId || !email) {
    throw new Error('ID do cliente e email são obrigatórios');
  }
  
  try {
    console.log('Buscando dados para cliente:', clienteId, 'com email:', email);
    
    // Criar cliente Supabase com os cabeçalhos necessários, incluindo cliente_id e email
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            'x-formid': formId,
            'x-public-token': token,
            'x-cliente-id': clienteId,
            'x-cliente-email': email
          }
        }
      }
    );
    
    // Buscar dados do cliente
    const { data, error } = await supabase
      .from('cliente')
      .select('*')
      .single();
    
    if (error) {
      console.error('Erro ao buscar dados do cliente:', error);
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error('Erro ao buscar dados do cliente:', err);
    throw err;
  }
}

/**
 * Atualiza dados do cliente
 * @param {string} clienteId - ID do cliente
 * @param {string} email - Email do cliente
 * @param {Object} dadosAtualizados - Dados a serem atualizados
 * @param {string} formId - ID do formulário
 * @param {string} token - Token público
 * @returns {Promise<Object>} - Dados atualizados
 */
export async function atualizarDadosCliente(clienteId, email, dadosAtualizados, formId, token) {
  if (!clienteId || !email) {
    throw new Error('ID do cliente e email são obrigatórios');
  }
  
  try {
    console.log('Atualizando dados para cliente:', clienteId, 'com email:', email);
    
    // Criar cliente Supabase com os cabeçalhos necessários, incluindo cliente_id e email
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            'x-formid': formId,
            'x-public-token': token,
            'x-cliente-id': clienteId,
            'x-cliente-email': email
          }
        }
      }
    );
    
    // Atualizar dados do cliente
    const { data, error } = await supabase
      .from('cliente')
      .update(dadosAtualizados)
      .eq('id', clienteId)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao atualizar dados do cliente:', error);
      throw error;
    }
    
    return data;
  } catch (err) {
    console.error('Erro ao atualizar dados do cliente:', err);
    throw err;
  }
}
