import { motion, AnimatePresence } from 'motion/react';
import { Check, Star, Zap, Layout, Smartphone, Clock, X } from 'lucide-react';
import { LeadForm } from '@/components/LeadForm';
import { useState } from 'react';

function LegalModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden shadow-2xl"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)] prose prose-purple max-w-none">
            {children}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function LandingPage() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Modals */}
      <LegalModal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="Política de Privacidade"
      >
        <div className="space-y-6 text-gray-600">
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
        </div>
      </LegalModal>

      <LegalModal 
        isOpen={activeModal === 'terms'} 
        onClose={() => setActiveModal(null)} 
        title="Termos de Uso"
      >
        <div className="space-y-6 text-gray-600">
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
          
          <h3 className="text-xl font-bold text-gray-900">3. Isenção de responsabilidade</h3>
          <p>Os materiais no site da Agiliza Marketing Digital são fornecidos 'como estão'. Agiliza Marketing Digital não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</p>
          
          <h3 className="text-xl font-bold text-gray-900">4. Limitações</h3>
          <p>Em nenhum caso o Agiliza Marketing Digital ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em Agiliza Marketing Digital, mesmo que Agiliza Marketing Digital ou um representante autorizado da Agiliza Marketing Digital tenha sido notificado oralmente ou por escrito da possibilidade de tais danos.</p>
        </div>
      </LegalModal>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover opacity-5 -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-[#7B3FA0] font-semibold text-sm mb-6">
                <Star className="w-4 h-4 fill-current" />
                Agência Especializada em Logos
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Destaque sua marca com um <span className="text-[#7B3FA0]">Logo Profissional</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A Agiliza Marketing Digital cria identidades visuais memoráveis que convertem visitantes em clientes. Design moderno, estratégico e pensado para o seu sucesso.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#contact" className="px-8 py-4 bg-[#7B3FA0] text-white rounded-xl font-bold text-lg hover:bg-[#5e2d7d] transition-all shadow-lg shadow-purple-500/30 text-center">
                  Quero meu Logo
                </a>
              </div>

              <div className="mt-12 flex items-center gap-8 text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Entrega Rápida</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Alta Resolução</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl opacity-20 blur-2xl" />
              <img 
                src="https://i.imgur.com/aWyLzO0.png" 
                alt="Design Process" 
                className="relative rounded-2xl shadow-2xl border-4 border-white"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Satisfação Garantida</p>
                    <p className="text-xl font-bold text-gray-900">4.9/5.0</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <motion.section 
        id="benefits" 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que escolher a Agiliza?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Não entregamos apenas um desenho. Entregamos uma estratégia visual completa para sua empresa crescer.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Layout className="w-8 h-8 text-[#7B3FA0]" />,
                title: "Design Exclusivo",
                desc: "Nada de templates prontos. Criamos algo 100% original e pensado para o seu nicho de mercado."
              },
              {
                icon: <Smartphone className="w-8 h-8 text-[#7B3FA0]" />,
                title: "Versatilidade",
                desc: "Seu logo perfeito em qualquer lugar: cartões, redes sociais, fachadas e uniformes."
              },
              {
                icon: <Clock className="w-8 h-8 text-[#7B3FA0]" />,
                title: "Entrega em 24 Horas",
                desc: "Entregamos sua logo profissional pronta para uso em tempo recorde, sem perder a qualidade."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="w-16 h-16 bg-purple-50 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section 
        id="pricing" 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Planos e Preços</h2>
            <p className="text-gray-600">Escolha o pacote ideal para o seu negócio.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Plan 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Básico</h3>
              <div className="text-4xl font-bold text-[#7B3FA0] mb-6">R$ 49,90</div>
              <p className="text-sm text-gray-500 mb-6">Arquivos em alta qualidade:</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "PNG (fundo transparente)",
                  "PDF (alta resolução)",
                  "Pattern",
                  "Marca d' Agua",
                  "Logo 2D"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="w-full py-3 border-2 border-[#7B3FA0] text-[#7B3FA0] rounded-xl font-bold hover:bg-[#7B3FA0] hover:text-white transition-colors text-center active:scale-95 transform duration-200">
                Escolher Básico
              </a>
            </div>

            {/* Plan 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-[#7B3FA0] relative transform md:-translate-y-4 flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#7B3FA0] text-white px-4 py-1 rounded-full text-sm font-bold">
                Mais Popular
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Profissional</h3>
              <div className="text-4xl font-bold text-[#7B3FA0] mb-6">R$ 69,90</div>
              <p className="text-sm text-gray-500 mb-6">Arquivos em alta qualidade:</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "PNG (fundo transparente)",
                  "PDF (alta resolução)",
                  "MOCKUP",
                  "Pattern",
                  "Marca d' Agua",
                  "Logo 2D e 3D"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="w-full py-3 bg-[#7B3FA0] text-white rounded-xl font-bold hover:bg-[#5e2d7d] transition-colors text-center shadow-lg shadow-purple-500/30 active:scale-95 transform duration-200">
                Escolher Profissional
              </a>
            </div>

            {/* Plan 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Premium</h3>
              <div className="text-4xl font-bold text-[#7B3FA0] mb-6">R$ 89,90</div>
              <p className="text-sm text-gray-500 mb-6">Arquivos em alta qualidade:</p>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "PNG (fundo transparente)",
                  "PDF (alta resolução)",
                  "JPG",
                  "MOCKUP",
                  "Pattern",
                  "Marca d' Agua",
                  "Logo 2D e 3D"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="w-full py-3 border-2 border-[#7B3FA0] text-[#7B3FA0] rounded-xl font-bold hover:bg-[#7B3FA0] hover:text-white transition-colors text-center active:scale-95 transform duration-200">
                Escolher Premium
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Instagram Section */}
      <motion.section 
        id="instagram" 
        className="py-20 bg-gradient-to-br from-purple-50 to-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Confira nossos trabalhos no Instagram</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Siga <span className="font-bold text-[#7B3FA0]">@agilizamarketingdigital</span> e veja centenas de logos criados para empresas de todo o Brasil. Atualizações diárias e bastidores.
          </p>

          <a 
            href="https://www.instagram.com/agilizamarketingdigital?utm_source=qr&igsh=cXBjZnFzcmIzbzV3" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-full font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            Ver Instagram
          </a>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-20 bg-purple-50 text-gray-900 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[#7B3FA0]">Pronto para elevar o nível da sua marca?</h2>
              <p className="text-gray-600 text-lg mb-8">
                Preencha o formulário e receba uma proposta personalizada em menos de 24 horas. Nossa equipe está pronta para te atender.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Zap className="w-6 h-6 text-[#7B3FA0]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Atendimento Ágil</h4>
                    <p className="text-sm text-gray-600">Respondemos rápido no WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Star className="w-6 h-6 text-[#7B3FA0]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Qualidade Premium</h4>
                    <p className="text-sm text-gray-600">Designers sêniores no seu projeto</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-1 shadow-xl shadow-purple-200">
              <LeadForm />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
            <p className="text-gray-600">Histórias reais de quem transformou sua marca com a Agiliza.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ricardo Silva",
                role: "CEO, TechSolutions",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                text: "A Agiliza superou todas as minhas expectativas. O logo ficou incrível e a entrega foi realmente em 24 horas. Recomendo demais!"
              },
              {
                name: "Fernanda Oliveira",
                role: "Fundadora, Bella Moda",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                text: "Eu não tinha ideia do que queria, mas a equipe captou a essência da minha loja perfeitamente. O atendimento no WhatsApp foi super atencioso."
              },
              {
                name: "Marcos Santos",
                role: "Diretor, Santos Engenharia",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                text: "Profissionalismo nota 10. O pacote profissional vale muito a pena, os arquivos vêm super organizados e prontos para usar."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="shrink-0">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#7B3FA0]"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h2>
            <p className="text-gray-600">Tire suas dúvidas antes de fechar o negócio.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Como recebo os arquivos do meu logo?",
                a: "Após a aprovação, enviamos um link seguro para você baixar todos os arquivos organizados por pastas (PNG, PDF, etc) diretamente no seu e-mail e WhatsApp."
              },
              {
                q: "E se eu não gostar da primeira opção?",
                a: "Não se preocupe! Nossa taxa de aprovação é de 98%, mas se você não amar de primeira, faremos os ajustes necessários até você ficar 100% satisfeito."
              },
              {
                q: "Qual a forma de pagamento?",
                a: "Aceitamos PIX e Cartão de Crédito. O pagamento é seguro e processado por plataformas certificadas."
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                  {faq.q}
                  <span className="text-[#7B3FA0] group-open:rotate-180 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img 
            src="https://i.imgur.com/yxjbTha.png" 
            alt="Agiliza Marketing" 
            className="h-12 mx-auto mb-6 rounded-full"
          />
          <p className="mb-6 text-gray-500">© 2024 Agiliza Marketing Digital. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-8 text-sm font-medium">
            <button onClick={() => setActiveModal('terms')} className="hover:text-[#7B3FA0] transition-colors">Termos de Uso</button>
            <button onClick={() => setActiveModal('privacy')} className="hover:text-[#7B3FA0] transition-colors">Política de Privacidade</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
