import { useForm } from 'react-hook-form';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { useState } from 'react';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LeadFormInputs {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  plan: string;
  message: string;
}

export function LeadForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadFormInputs>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LeadFormInputs) => {
    if (!isFirebaseConfigured || !db) {
      setError("Erro de configuração: Firebase não conectado. Verifique o console.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'leads'), {
        ...data,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      
      // Track Conversion Events
      if (typeof window !== 'undefined') {
        console.log("Attempting to track conversion events...");
        
        // Facebook Pixel
        // @ts-ignore
        if (window.fbq) {
          console.log("Tracking Facebook Lead event");
          // @ts-ignore
          window.fbq('track', 'Lead', {
            content_name: data.plan || 'Orçamento Geral'
          });
        } else {
          console.warn("Facebook Pixel (window.fbq) not found");
        }
        
        // Google Ads
        // @ts-ignore
        if (window.gtag) {
          console.log("Tracking Google Ads generate_lead event");
          // @ts-ignore
          window.gtag('event', 'generate_lead', {
            'event_category': 'engagement',
            'event_label': 'lead_form',
            'value': data.plan === 'Básico' ? 49.90 : data.plan === 'Profissional' ? 69.90 : data.plan === 'Premium' ? 89.90 : 0
          });
        }
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao enviar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 p-8 rounded-2xl border border-green-100 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Recebemos seu contato!</h3>
        <p className="text-green-700">Em breve nossa equipe entrará em contato pelo WhatsApp para agilizar seu atendimento.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="mt-6 text-green-700 font-medium hover:underline"
        >
          Enviar outro contato
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-2xl shadow-xl shadow-purple-500/5 border border-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900">Solicite seu Orçamento</h3>
        <p className="text-gray-500 mt-2">Preencha os dados abaixo para iniciarmos seu projeto.</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Nome Completo</label>
          <input 
            {...register('name', { required: 'Nome é obrigatório' })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B3FA0] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            placeholder="Seu nome"
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">WhatsApp</label>
          <input 
            {...register('phone', { required: 'WhatsApp é obrigatório' })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B3FA0] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
            placeholder="(00) 00000-0000"
          />
          {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input 
          {...register('email', { required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B3FA0] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
          placeholder="seu@email.com"
        />
        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Nome da Empresa</label>
        <input 
          {...register('businessName')}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B3FA0] focus:ring-2 focus:ring-purple-100 outline-none transition-all"
          placeholder="Agiliza Marketing"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Plano de Interesse</label>
        <select 
          {...register('plan')}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B3FA0] focus:ring-2 focus:ring-purple-100 outline-none transition-all bg-white"
        >
          <option value="">Selecione um plano (Opcional)</option>
          <option value="Básico">Básico - R$ 49,90</option>
          <option value="Profissional">Profissional - R$ 69,90</option>
          <option value="Premium">Premium - R$ 89,90</option>
        </select>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Descreva sua ideia</label>
        <textarea 
          {...register('message')}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B3FA0] focus:ring-2 focus:ring-purple-100 outline-none transition-all resize-none"
          placeholder="Conte um pouco sobre o que você precisa..."
        />
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 bg-[#7B3FA0] text-white rounded-xl font-bold text-lg hover:bg-[#5e2d7d] transition-all shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          'Enviar para Orçamento'
        )}
      </button>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        Entraremos em contato via WhatsApp o mais rápido possível.
      </p>
    </form>
  );
}
