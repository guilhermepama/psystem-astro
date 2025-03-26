import { createClient } from '@supabase/supabase-js';

export async function post({ request }) {
  try {
    // Obter cabeçalhos e corpo da requisição
    const formId = request.headers.get('x-formid');
    const token = request.headers.get('x-public-token');
    const body = await request.json();
    const { clienteId, email } = body;
    
    // Validar parâmetros
    if (!formId || !token || !clienteId || !email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Parâmetros incompletos'
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
            'x-formid': formId,
            'x-public-token': token
          }
        }
      }
    );
    
    // Verificar se o email corresponde ao cliente
    const { data, error } = await supabase
      .from('cliente')
      .select('email')
      .eq('id', clienteId)
      .single();
    
    if (error) {
      console.error('Erro ao buscar cliente:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Erro ao verificar email'
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Verificar se o email corresponde
    if (data.email.toLowerCase() !== email.toLowerCase()) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email não corresponde ao cadastrado'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Email verificado com sucesso
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email verificado com sucesso'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (err) {
    console.error('Erro na API de verificação de cliente:', err);
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
