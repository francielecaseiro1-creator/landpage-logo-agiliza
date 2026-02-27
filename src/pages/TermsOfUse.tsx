import { Header } from '@/components/Header';

export function TermsOfUse() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
        
        <div className="prose prose-purple max-w-none text-gray-600 space-y-6">
          <h3 className="text-xl font-bold text-gray-900">1. Termos</h3>
          <p>Ao acessar ao site Agiliza Marketing Digital, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</p>
          
          <h3 className="text-xl font-bold text-gray-900">2. Uso de Licença</h3>
          <p>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site Agiliza Marketing Digital , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>modificar ou copiar os materiais;</li>
            <li>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);</li>
            <li>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site Agiliza Marketing Digital;</li>
            <li>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</li>
            <li>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</li>
          </ul>
          <p>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por Agiliza Marketing Digital a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.</p>
          
          <h3 className="text-xl font-bold text-gray-900">3. Isenção de responsabilidade</h3>
          <p>Os materiais no site da Agiliza Marketing Digital são fornecidos 'como estão'. Agiliza Marketing Digital não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
          
          <h3 className="text-xl font-bold text-gray-900">4. Limitações</h3>
          <p>Em nenhum caso o Agiliza Marketing Digital ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Agiliza Marketing Digital, mesmo que Agiliza Marketing Digital ou um representante autorizado da Agiliza Marketing Digital tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.</p>
          
          <h3 className="text-xl font-bold text-gray-900">5. Precisão dos materiais</h3>
          <p>Os materiais exibidos no site da Agiliza Marketing Digital podem incluir erros técnicos, tipográficos ou fotográficos. Agiliza Marketing Digital não garante que qualquer material em seu site seja preciso, completo ou atual. Agiliza Marketing Digital pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, Agiliza Marketing Digital não se compromete a atualizar os materiais.</p>
          
          <h3 className="text-xl font-bold text-gray-900">6. Links</h3>
          <p>O Agiliza Marketing Digital não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por Agiliza Marketing Digital do site. O uso de qualquer site vinculado é por conta e risco do usuário.</p>
          
          <h3 className="text-xl font-bold text-gray-900">Modificações</h3>
          <p>O Agiliza Marketing Digital pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</p>
          
          <h3 className="text-xl font-bold text-gray-900">Lei aplicável</h3>
          <p>Estes termos e condições são regidos e interpretados de acordo com as leis do Agiliza Marketing Digital e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</p>
        </div>
      </div>
    </div>
  );
}
