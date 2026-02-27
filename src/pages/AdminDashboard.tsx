import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import { useNavigate } from 'react-router-dom';
import { LogOut, MessageCircle, Settings, Users, Save, Loader2, CheckCircle, XCircle, Clock, AlertCircle, Download, Filter, Send, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  plan?: string;
  message: string;
  createdAt: any;
  status: string;
}

interface SettingsForm {
  facebookPixelId: string;
  googleAdsId: string;
}

export function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'settings'>('leads');
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showBlastModal, setShowBlastModal] = useState(false);
  const navigate = useNavigate();
  
  // Settings Form
  const { register, handleSubmit, setValue, formState: { isSubmitting: isSaving } } = useForm<SettingsForm>();

  useEffect(() => {
    if (!db) return;

    // Fetch Leads
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Lead[];
      setLeads(leadsData);
      setLoading(false);
    });

    // Fetch Settings
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'global');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as SettingsForm;
        setValue('facebookPixelId', data.facebookPixelId);
        setValue('googleAdsId', data.googleAdsId);
      }
    };
    fetchSettings();

    return () => unsubscribe();
  }, [setValue]);

  const handleLogout = async () => {
    await signOut(auth!);
    navigate('/');
  };

  const onSaveSettings = async (data: SettingsForm) => {
    if (!db) return;
    try {
      await setDoc(doc(db, 'settings', 'global'), data, { merge: true });
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar configurações.');
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'leads', leadId), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Erro ao atualizar status.");
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!db) return;
    if (window.confirm('Tem certeza que deseja excluir este lead? Esta ação não pode ser desfeita.')) {
      try {
        await deleteDoc(doc(db, 'leads', leadId));
      } catch (error) {
        console.error("Error deleting lead:", error);
        alert("Erro ao excluir lead.");
      }
    }
  };

  const getWhatsAppLink = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return `https://wa.me/55${cleanPhone}?text=Olá, vi seu interesse na criação de logo pela Agiliza Marketing. Podemos conversar?`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'closed': return 'bg-green-100 text-green-800 border-green-200';
      case 'lost': return 'bg-red-100 text-red-800 border-red-200';
      case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const filteredLeads = leads.filter(lead => statusFilter === 'all' || (lead.status || 'new') === statusFilter);

  const exportToCSV = () => {
    const headers = ['Data', 'Nome', 'Email', 'Telefone', 'Empresa', 'Plano', 'Status', 'Mensagem'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        lead.createdAt?.toDate().toLocaleDateString('pt-BR'),
        `"${lead.name}"`,
        lead.email,
        lead.phone,
        `"${lead.businessName || ''}"`,
        lead.plan || '',
        lead.status || 'new',
        `"${(lead.message || '').replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `leads_agiliza_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://i.imgur.com/yxjbTha.png" alt="Logo" className="h-8 rounded-full" />
          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded text-gray-500">ADMIN</span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm font-medium"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'leads' 
                ? 'bg-[#7B3FA0] text-white shadow-lg shadow-purple-500/20' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-5 h-5" />
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'settings' 
                ? 'bg-[#7B3FA0] text-white shadow-lg shadow-purple-500/20' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Settings className="w-5 h-5" />
            Configurações
          </button>
        </div>

        {/* Content */}
        {activeTab === 'leads' ? (
          <div className="space-y-6">
            {/* Filters and Actions */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <Filter className="w-4 h-4 text-gray-400" />
                {['all', 'new', 'contacted', 'closed', 'lost'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
                      statusFilter === status 
                        ? 'bg-purple-100 text-purple-800 border border-purple-200' 
                        : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {status === 'all' ? 'Todos' : 
                     status === 'new' ? 'Novos' :
                     status === 'contacted' ? 'Em Contato' :
                     status === 'closed' ? 'Fechados' : 'Perdidos'}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowBlastModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Lista de Disparo
                </button>
                <button
                  onClick={exportToCSV}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Exportar CSV
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-gray-500">Carregando leads...</div>
              ) : filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-gray-500">Nenhum lead encontrado com este filtro.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Plano</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">Ideia</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contato</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                            {lead.createdAt?.toDate().toLocaleDateString('pt-BR')}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{lead.name}</div>
                            <div className="text-sm text-gray-500">{lead.email}</div>
                            {lead.businessName && (
                              <div className="text-xs text-purple-600 mt-1 font-medium">{lead.businessName}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {lead.plan ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {lead.plan}
                              </span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <div className="line-clamp-2 max-w-xs" title={lead.message}>
                              {lead.message || '-'}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={lead.status || 'new'}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                              className={`text-xs font-semibold px-3 py-1 rounded-full border cursor-pointer outline-none appearance-none ${getStatusColor(lead.status || 'new')}`}
                            >
                              <option value="new">Novo</option>
                              <option value="contacted">Em Contato</option>
                              <option value="closed">Venda Fechada</option>
                              <option value="lost">Não Fechou</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <a 
                                href={getWhatsAppLink(lead.phone)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors"
                                title="Enviar WhatsApp"
                              >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp
                              </a>
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Excluir Lead"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Rastreamento e Integrações</h3>
              <form onSubmit={handleSubmit(onSaveSettings)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Pixel ID</label>
                  <input 
                    {...register('facebookPixelId')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B3FA0] focus:ring-2 focus:ring-purple-100 outline-none font-mono text-sm"
                    placeholder="Ex: 1234567890"
                  />
                  <p className="mt-1 text-xs text-gray-500">O pixel será injetado automaticamente em todas as páginas.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Google Ads / Analytics ID</label>
                  <input 
                    {...register('googleAdsId')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#7B3FA0] focus:ring-2 focus:ring-purple-100 outline-none font-mono text-sm"
                    placeholder="Ex: G-XXXXXXXXXX ou AW-XXXXXXXXXX"
                  />
                  <p className="mt-1 text-xs text-gray-500">Tag global do Google (gtag.js).</p>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="px-6 py-3 bg-[#7B3FA0] text-white rounded-lg font-bold hover:bg-[#5e2d7d] transition-colors flex items-center gap-2"
                  >
                    {isSaving ? <Loader2 className="animate-spin w-5 h-5" /> : <Save className="w-5 h-5" />}
                    Salvar Configurações
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Blast Modal */}
        {showBlastModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Lista de Disparo Rápido</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Mostrando {filteredLeads.length} leads do filtro "{statusFilter === 'all' ? 'Todos' : statusFilter}"
                  </p>
                </div>
                <button onClick={() => setShowBlastModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
              
              <div className="overflow-y-auto p-6 space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-sm text-yellow-800 flex gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>Dica: Clique em "Enviar" para abrir o WhatsApp Web. Não envie muitas mensagens idênticas em pouco tempo para evitar bloqueios.</p>
                </div>

                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div>
                      <div className="font-bold text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-500">{lead.phone} • {lead.plan || 'Sem plano'}</div>
                    </div>
                    <a 
                      href={getWhatsAppLink(lead.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors shadow-sm"
                    >
                      <Send className="w-4 h-4" />
                      Enviar
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
