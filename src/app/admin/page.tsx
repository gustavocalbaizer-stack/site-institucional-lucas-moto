"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, MessageCircle, Eye, EyeOff } from "lucide-react";

interface Motorcycle {
  id: number;
  brand: string;
  model: string;
  year: string;
  km: string;
  image: string;
  featured: boolean;
  status: "available" | "sold";
  price?: string;
}

export default function AdminCMS() {
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<Motorcycle>({
    id: 0,
    brand: "",
    model: "",
    year: "",
    km: "",
    image: "",
    featured: false,
    status: "available",
    price: ""
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("lucasmoto_motorcycles");
    if (savedData) {
      setMotorcycles(JSON.parse(savedData));
    } else {
      // Dados iniciais
      const initialData: Motorcycle[] = [
        {
          id: 1,
          brand: "Honda",
          model: "CB 500F",
          year: "2022",
          km: "12.000 km",
          image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop",
          featured: true,
          status: "available",
          price: "R$ 32.000"
        },
        {
          id: 2,
          brand: "Yamaha",
          model: "MT-03",
          year: "2023",
          km: "5.000 km",
          image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
          featured: true,
          status: "available",
          price: "R$ 28.000"
        },
        {
          id: 3,
          brand: "Kawasaki",
          model: "Ninja 400",
          year: "2021",
          km: "18.000 km",
          image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop",
          featured: false,
          status: "available",
          price: "R$ 30.000"
        },
        {
          id: 4,
          brand: "BMW",
          model: "G 310 R",
          year: "2023",
          km: "8.000 km",
          image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop",
          featured: false,
          status: "available",
          price: "R$ 25.000"
        },
        {
          id: 5,
          brand: "Honda",
          model: "CG 160",
          year: "2022",
          km: "15.000 km",
          image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop",
          featured: false,
          status: "available",
          price: "R$ 12.000"
        },
        {
          id: 6,
          brand: "Yamaha",
          model: "Factor 150",
          year: "2023",
          km: "3.000 km",
          image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop",
          featured: false,
          status: "available",
          price: "R$ 11.500"
        }
      ];
      setMotorcycles(initialData);
      localStorage.setItem("lucasmoto_motorcycles", JSON.stringify(initialData));
    }
  }, []);

  // Salvar no localStorage sempre que houver mudanças
  const saveToLocalStorage = (data: Motorcycle[]) => {
    localStorage.setItem("lucasmoto_motorcycles", JSON.stringify(data));
    setMotorcycles(data);
  };

  const handleAdd = () => {
    setIsAdding(true);
    setEditForm({
      id: Date.now(),
      brand: "",
      model: "",
      year: "",
      km: "",
      image: "",
      featured: false,
      status: "available",
      price: ""
    });
  };

  const handleEdit = (moto: Motorcycle) => {
    setIsEditing(moto.id);
    setEditForm(moto);
  };

  const handleSave = () => {
    if (isAdding) {
      const newData = [...motorcycles, editForm];
      saveToLocalStorage(newData);
      setIsAdding(false);
    } else if (isEditing) {
      const newData = motorcycles.map(m => m.id === isEditing ? editForm : m);
      saveToLocalStorage(newData);
      setIsEditing(null);
    }
    setEditForm({
      id: 0,
      brand: "",
      model: "",
      year: "",
      km: "",
      image: "",
      featured: false,
      status: "available",
      price: ""
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja remover esta moto?")) {
      const newData = motorcycles.filter(m => m.id !== id);
      saveToLocalStorage(newData);
    }
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsAdding(false);
    setEditForm({
      id: 0,
      brand: "",
      model: "",
      year: "",
      km: "",
      image: "",
      featured: false,
      status: "available",
      price: ""
    });
  };

  const toggleStatus = (id: number) => {
    const newData = motorcycles.map(m => 
      m.id === id ? { ...m, status: m.status === "available" ? "sold" as const : "available" as const } : m
    );
    saveToLocalStorage(newData);
  };

  const toggleFeatured = (id: number) => {
    const newData = motorcycles.map(m => 
      m.id === id ? { ...m, featured: !m.featured } : m
    );
    saveToLocalStorage(newData);
  };

  const handleWhatsApp = (moto: Motorcycle) => {
    const whatsappNumber = "5543999999999";
    const message = encodeURIComponent(`Olá! Tenho interesse na ${moto.brand} ${moto.model} ${moto.year}. Pode me passar mais informações?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const exportData = () => {
    const dataStr = JSON.stringify(motorcycles, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lucasmoto_catalog.json';
    link.click();
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          saveToLocalStorage(data);
          alert("Dados importados com sucesso!");
        } catch (error) {
          alert("Erro ao importar dados. Verifique o arquivo.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-zinc-900 border-b border-zinc-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f0b23d51-7c14-4cff-bc35-9e48b5884c8f.png" 
                alt="Lucas Moto" 
                className="h-20 w-auto sm:h-24"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-black">
                  <span className="text-red-600">CMS</span>
                </h1>
                <p className="text-xs text-zinc-400 mt-1">Gerenciamento de Catálogo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={exportData}
                className="hidden sm:block bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-semibold transition-all text-sm"
              >
                Exportar
              </button>
              <label className="hidden sm:block bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer text-sm">
                Importar
                <input type="file" accept=".json" onChange={importData} className="hidden" />
              </label>
              <a
                href="/"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 text-sm"
              >
                <Eye className="w-4 h-4" />
                Ver Site
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="text-3xl font-black text-red-600">{motorcycles.length}</div>
            <div className="text-sm text-zinc-400 mt-1">Total de Motos</div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="text-3xl font-black text-green-600">
              {motorcycles.filter(m => m.status === "available").length}
            </div>
            <div className="text-sm text-zinc-400 mt-1">Disponíveis</div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="text-3xl font-black text-yellow-600">
              {motorcycles.filter(m => m.status === "sold").length}
            </div>
            <div className="text-sm text-zinc-400 mt-1">Vendidas</div>
          </div>
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <div className="text-3xl font-black text-blue-600">
              {motorcycles.filter(m => m.featured).length}
            </div>
            <div className="text-sm text-zinc-400 mt-1">Destaques</div>
          </div>
        </div>

        {/* Botão Adicionar */}
        <div className="mb-6">
          <button
            onClick={handleAdd}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Adicionar Nova Moto
          </button>
        </div>

        {/* Formulário de Adição/Edição */}
        {(isAdding || isEditing) && (
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 mb-8">
            <h3 className="text-xl font-bold mb-6">
              {isAdding ? "Adicionar Nova Moto" : "Editar Moto"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Marca</label>
                <input
                  type="text"
                  value={editForm.brand}
                  onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600"
                  placeholder="Ex: Honda"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Modelo</label>
                <input
                  type="text"
                  value={editForm.model}
                  onChange={(e) => setEditForm({ ...editForm, model: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600"
                  placeholder="Ex: CB 500F"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Ano</label>
                <input
                  type="text"
                  value={editForm.year}
                  onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600"
                  placeholder="Ex: 2023"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Quilometragem</label>
                <input
                  type="text"
                  value={editForm.km}
                  onChange={(e) => setEditForm({ ...editForm, km: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600"
                  placeholder="Ex: 12.000 km"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Preço (opcional)</label>
                <input
                  type="text"
                  value={editForm.price || ""}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600"
                  placeholder="Ex: R$ 32.000"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">URL da Imagem</label>
                <input
                  type="text"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.featured}
                    onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                    className="w-5 h-5 accent-red-600"
                  />
                  <span className="text-sm font-semibold">Destaque</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editForm.status === "available"}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.checked ? "available" : "sold" })}
                    className="w-5 h-5 accent-green-600"
                  />
                  <span className="text-sm font-semibold">Disponível</span>
                </label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
              >
                <Save className="w-5 h-5" />
                Salvar
              </button>
              <button
                onClick={handleCancel}
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* Lista de Motos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motorcycles.map((moto) => (
            <div
              key={moto.id}
              className={`bg-zinc-900 rounded-xl overflow-hidden border-2 transition-all ${
                moto.status === "sold" 
                  ? "border-zinc-800 opacity-60" 
                  : "border-zinc-800 hover:border-red-600"
              }`}
            >
              {/* Status Badge */}
              <div className="flex items-center justify-between p-2 bg-zinc-800">
                <div className="flex items-center gap-2">
                  {moto.featured && (
                    <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                      DESTAQUE
                    </span>
                  )}
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    moto.status === "available" 
                      ? "bg-green-600 text-white" 
                      : "bg-yellow-600 text-black"
                  }`}>
                    {moto.status === "available" ? "DISPONÍVEL" : "VENDIDA"}
                  </span>
                </div>
              </div>

              {/* Imagem */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={moto.image}
                  alt={`${moto.brand} ${moto.model}`}
                  className="w-full h-full object-cover"
                />
                {moto.status === "sold" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-3xl font-black text-yellow-400">VENDIDA</span>
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-xl font-black">{moto.brand}</h3>
                  <p className="text-lg text-zinc-400">{moto.model}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <span className="text-zinc-500">Ano:</span>
                    <span className="ml-2 font-semibold">{moto.year}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500">KM:</span>
                    <span className="ml-2 font-semibold">{moto.km}</span>
                  </div>
                </div>

                {moto.price && (
                  <div className="text-2xl font-black text-red-600">{moto.price}</div>
                )}

                {/* Ações */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => toggleStatus(moto.id)}
                    className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      moto.status === "available"
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {moto.status === "available" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {moto.status === "available" ? "Marcar Vendida" : "Disponibilizar"}
                  </button>
                  <button
                    onClick={() => toggleFeatured(moto.id)}
                    className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                      moto.featured
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-zinc-700 hover:bg-zinc-600"
                    }`}
                  >
                    {moto.featured ? "Remover Destaque" : "Destacar"}
                  </button>
                  <button
                    onClick={() => handleWhatsApp(moto)}
                    className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => handleEdit(moto)}
                    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(moto.id)}
                    className="col-span-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Remover
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {motorcycles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg">Nenhuma moto cadastrada ainda.</p>
            <button
              onClick={handleAdd}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-all"
            >
              Adicionar Primeira Moto
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
