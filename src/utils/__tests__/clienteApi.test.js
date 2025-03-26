import { 
    buscarDadosCliente, 
    atualizarDadosCliente, 
    verificarCliente 
  } from '../clienteApi';
  
  // Mock do Supabase
  jest.mock('@supabase/supabase-js', () => {
    const mockSelect = jest.fn();
    const mockEq = jest.fn();
    const mockSingle = jest.fn();
    const mockUpdate = jest.fn();
    const mockFrom = jest.fn();
    
    // Configurar comportamento padrão dos mocks
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ single: mockSingle });
    mockSingle.mockResolvedValue({ data: null, error: null });
    mockUpdate.mockReturnValue({ eq: mockEq });
    mockFrom.mockImplementation(() => ({
      select: mockSelect,
      update: mockUpdate
    }));
    
    return {
      createClient: jest.fn(() => ({
        from: mockFrom
      }))
    };
  });
  
  // Mock das variáveis de ambiente
  import.meta = {
    env: {
      PUBLIC_SUPABASE_URL: 'https://exemplo.supabase.co',
      PUBLIC_SUPABASE_ANON_KEY: 'chave-anonima-de-teste'
    }
  };
  
  describe('clienteApi', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    describe('buscarDadosCliente', () => {
      test('deve retornar erro quando clienteId não for fornecido', async () => {
        const resultado = await buscarDadosCliente(null, 'email@teste.com');
        expect(resultado.error).toBeTruthy();
        expect(resultado.data).toBeNull();
      });
      
      test('deve retornar erro quando clienteEmail não for fornecido', async () => {
        const resultado = await buscarDadosCliente('123', null);
        expect(resultado.error).toBeTruthy();
        expect(resultado.data).toBeNull();
      });
      
      // Adicione mais testes aqui
    });
    
    describe('atualizarDadosCliente', () => {
      test('deve remover campos protegidos dos dados de atualização', async () => {
        const { createClient } = require('@supabase/supabase-js');
        const mockFrom = createClient().from;
        
        mockFrom().update.mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: { id: '123', nome: 'Teste', telefone: '123456789' },
                error: null
              })
            })
          })
        });
        
        const dadosAtualizados = {
          nome: 'Novo Nome',
          email: 'nao-deve-atualizar@teste.com',
          id: 'nao-deve-atualizar',
          is_public: false
        };
        
        await atualizarDadosCliente('123', 'email@teste.com', dadosAtualizados);
        
        // Verificar se os campos protegidos foram removidos
        expect(mockFrom().update).toHaveBeenCalledWith(
          expect.not.objectContaining({
            id: expect.any(String),
            email: expect.any(String),
            is_public: expect.any(Boolean)
          })
        );
      });
      
      // Adicione mais testes aqui
    });
  });
  