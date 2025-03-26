import { jest } from '@jest/globals';
import { 
  createSupabaseClient, 
  getClientIdFromHistorico, 
  validateFormAccess,
  validateClientClinica,
  validateFormRequest 
} from '../formValidation';

// Mock do Supabase
const mockSupabaseSelect = jest.fn();
const mockSupabaseFrom = jest.fn(() => ({
  select: mockSupabaseSelect,
  eq: jest.fn().mockReturnThis(),
  single: jest.fn().mockReturnThis()
}));

const mockSupabaseClient = {
  from: mockSupabaseFrom
};

jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => mockSupabaseClient)
}));

describe('Form Validation Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  describe('createSupabaseClient', () => {
    test('deve criar cliente com cabeçalhos corretos', () => {
      const { createClient } = require('@supabase/supabase-js');
      
      createSupabaseClient(
        'https://example.com',
        'test-key',
        'form-123',
        'token-abc'
      );
      
      expect(createClient).toHaveBeenCalledWith(
        'https://example.com',
        'test-key',
        {
          global: {
            headers: {
              'x-formid': 'form-123',
              'x-public-token': 'token-abc'
            }
          }
        }
      );
    });
  });

  describe('getClientIdFromHistorico', () => {
    test('deve retornar clientId quando a consulta for bem-sucedida', async () => {
      mockSupabaseSelect.mockImplementation(() => ({
        single: () => ({
          data: { cliente_id: 'client-123' },
          error: null
        })
      }));
      
      const result = await getClientIdFromHistorico(mockSupabaseClient);
      
      expect(mockSupabaseFrom).toHaveBeenCalledWith('historico_clinico');
      expect(mockSupabaseSelect).toHaveBeenCalledWith('cliente_id');
      expect(result).toEqual({
        clientId: 'client-123',
        error: null
      });
    });
    
    test('deve retornar erro quando a consulta falhar', async () => {
      mockSupabaseSelect.mockImplementation(() => ({
        single: () => ({
          data: null,
          error: { message: 'Not found' }
        })
      }));
      
      const result = await getClientIdFromHistorico(mockSupabaseClient);
      
      expect(result).toEqual({
        clientId: null,
        error: 'Clínica não encontrada.'
      });
    });
  });

  // Testes adicionais para as outras funções...
  
  describe('validateFormRequest', () => {
    test('deve retornar erro quando parâmetros estiverem ausentes', async () => {
      const result = await validateFormRequest(null, null, null, 'url', 'key');
      
      expect(result).toEqual({
        isValid: false,
        clientId: null,
        error: 'Parâmetros incompletos.'
      });
    });
    
    // Mais testes para outros cenários...
  });
});
