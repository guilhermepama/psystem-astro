"use client";

import { Button } from "@/components/ui/button"; // ajuste o caminho conforme sua estrutura
import { Plus, Users, Calendar, CreditCard } from "lucide-react";

export interface VisaoGeralProps {
  totalClientes: number;
}

const VisaoGeral = ({ totalClientes }: VisaoGeralProps) => {
  return (
    <div className="min-h-screen p-8 dark:bg-gray-900 dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Visão Geral</h1>
          {/* Utilizando o Button do shadcn UI com o atributo asChild para encapsular um link */}
          <Button
            asChild
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            <a href="/patient-form">
              <Plus className="w-5 h-5" />
              Novo Paciente
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <a href="/dashboard/clientes">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <div >
                  <h2 className="text-xl font-semibold">Pacientes</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Total: {totalClientes}
                  </p>
                </div>
              </div>
            </div>
          </a>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <div>
                <h2 className="text-xl font-semibold">Consultas</h2>
                <p className="text-gray-500 dark:text-gray-400">Hoje: 0</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-4">
              <CreditCard className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <div>
                <h2 className="text-xl font-semibold">Pagamentos</h2>
                <p className="text-gray-500 dark:text-gray-400">Pendentes: 0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Próximas Consultas</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-8">
              Nenhuma consulta agendada
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Pagamentos Recentes</h2>
            <div className="text-gray-500 dark:text-gray-400 text-center py-8">
              Nenhum pagamento registrado
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaoGeral;