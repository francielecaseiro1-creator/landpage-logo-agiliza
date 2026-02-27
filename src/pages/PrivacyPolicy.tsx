import { Header } from '@/components/Header';

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-purple max-w-none text-gray-600 space-y-6">
          <p>A sua privacidade é importante para nós. É política da Agiliza Marketing Digital respeitar a sua privacidade em relação a qualquer informação que possamos coletar no site Agiliza Marketing Digital, e outros sites que possuímos e operamos.</p>
          
          <h3 className="text-xl font-bold text-gray-900">1. Informações que coletamos</h3>
          <p>Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</p>
          
          <h3 className="text-xl font-bold text-gray-900">2. Uso de dados</h3>
          <p>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</p>
          
          <h3 className="text-xl font-bold text-gray-900">3. Compartilhamento de dados</h3>
          <p>Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</p>
          
          <h3 className="text-xl font-bold text-gray-900">4. Cookies</h3>
          <p>O nosso site usa cookies para melhorar a experiência do usuário. Ao continuar navegando, você concorda com o uso de cookies e tecnologias semelhantes para análise de tráfego e personalização de conteúdo.</p>
          
          <h3 className="text-xl font-bold text-gray-900">5. Compromisso do Usuário</h3>
          <p>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que a Agiliza Marketing Digital oferece no site e com caráter enunciativo, mas não limitativo:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</li>
            <li>Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</li>
            <li>Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) da Agiliza Marketing Digital, de seus fornecedores ou terceiros.</li>
          </ul>
          
          <h3 className="text-xl font-bold text-gray-900">6. Mais informações</h3>
          <p>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</p>
          
          <p className="mt-8 text-sm">Esta política é efetiva a partir de <strong>Fevereiro/2024</strong>.</p>
        </div>
      </div>
    </div>
  );
}
