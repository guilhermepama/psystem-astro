"use client";

// Tipagem das interfaces
export interface RelacaoCliente {
  id?: string;
  cliente: {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string | null;
  };
  clinica: {
    id: string;
    nome: string;
    slug: string;
  };
}

export interface ClientListProps {
  clientes: RelacaoCliente[];
}

// Componente tipado
const ClientList = ({ clientes }: ClientListProps) => {
  if (!clientes || clientes.length === 0) {
    return (
      <p className="text-center text-lg text-gray-50">
        Nenhum cliente encontrado.
      </p>
    );
  }

  console.log("clientes", clientes);

  return (
    <div className="mx-auto min-h-screen p-8 dark:bg-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Lista de Pacientes</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientes.map((relacao) => {
            const client = relacao.cliente;
            return (
              <li
                key={client.id}
                className="p-6 bg-white dark:bg-gray-800 rounded-md shadow hover:shadow-lg transition-all hover:scale-105"
              >
                <a href={`cliente/${client.id}`} className="block">
                  <div className="mb-0">
                    <p className="text-lg font-semibold">
                      {client.nome} {client.sobrenome}
                    </p>
                  </div>
                  <div>{relacao.clinica?.nome}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <p>
                      <strong>E-mail:</strong> {client.email}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {client.telefone}
                    </p>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ClientList;
