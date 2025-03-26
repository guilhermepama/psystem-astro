import { createClient } from '@supabase/supabase-js';

export async function get({ request }) {
  try {
    // Obter cabeçalhos da requisição
    const clienteId = request.headers.get('x-cliente-id');
    const clienteEmail = request.headers.get('x-client-email');
    
    // Validar cabeçalhos
    if (!clienteId || !clienteEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'ID do cliente e email são obrigatórios'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Criar cliente Supabase com os cabeçalhos necessários
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            'x-cliente-id': clienteId,
            'x-client-email': clienteEmail
          }
        }
      }
    );
    
    // Buscar dados do cliente
    const { data, error } = await supabase
      .from('cliente')
      .select('*')
      .eq('id', clienteId)
      .single();
    
    if (error) {
      console.error('Erro ao buscar cliente:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Erro ao buscar dados do cliente'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Retornar dados do cliente
    return new Response(
      JSON.stringify({
        success: true,
        data
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (err) {
    console.error('Erro na API de cliente:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Erro interno do servidor'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
