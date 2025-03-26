import { createClient } from '@supabase/supabase-js';

export async function post({ request }) {
  try {
    // Obter cabeçalhos e corpo da requisição
    const clienteId = request.headers.get('x-cliente-id');
    const clienteEmail = request.headers.get('x-client-email');
    const clienteData = await request.json();
    
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
    
    // Remover campos que não devem ser atualizados
    const dadosPermitidos = { ...clienteData };
    const camposProtegidos = ['id', 'clinica_id', 'is_public', 'created_at', 'email'];
    
    camposProtegidos.forEach(campo => {
      if (dadosPermitidos[campo] !== undefined) {
        delete dadosPermitidos[campo];
      }
    });
    
    // Atualizar dados do cliente
    const { data, error } = await supabase
      .from('cliente')
      .update(dadosPermitidos)
      .eq('id', clienteId)
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao atualizar cliente:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Erro ao atualizar dados do cliente'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Retornar dados atualizados
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
    console.error('Erro na API de atualização de cliente:', err);
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
