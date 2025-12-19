"use client";

import { supabase } from '@/lib/supabase'

type Moto = {
  id: string
  marca: string
  modelo: string
  ano: number
  km: number
  preco: number
  status: string
}

export default async function Home() {
  const { data: motos, error } = await supabase
    .from('motos')
    .select('*')
    .eq('status', 'disponível')

  if (error) {
    return <p>Erro ao carregar motos</p>
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Motos disponíveis</h1>

      {motos?.map((moto: Moto) => (
        <div key={moto.id} style={{ marginBottom: 20 }}>
          <h2>{moto.marca} {moto.modelo}</h2>
          <p>Ano: {moto.ano}</p>
          <p>KM: {moto.km}</p>
          <p>Preço: R$ {moto.preco}</p>
        </div>
      ))}
    </main>
  )
}

import { useState, useEffect } from "react";
import { Phone, MapPin, Instagram, MessageCircle, Check, Shield, Clock, Award, ChevronRight, Star } from "lucide-react";

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

export default function Home() {
  const whatsappNumber = "5543999999999"; // Substituir pelo número real
  const whatsappMessage = encodeURIComponent("Olá! Vim pelo site e gostaria de mais informações sobre as motos disponíveis.");

  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);

  // Carregar motos do localStorage (sincronizado com o CMS)
  useEffect(() => {
    const loadMotorcycles = () => {
      const savedData = localStorage.getItem("lucasmoto_motorcycles");
      if (savedData) {
        const allMotos = JSON.parse(savedData);
        // Filtrar apenas motos disponíveis para o site público
        setMotorcycles(allMotos.filter((m: Motorcycle) => m.status === "available"));
      } else {
        // Dados iniciais caso não exista nada no localStorage
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
        localStorage.setItem("lucasmoto_motorcycles", JSON.stringify(initialData));
        setMotorcycles(initialData);
      }
    };

    loadMotorcycles();

    // Atualizar quando houver mudanças no localStorage (sincronização em tempo real)
    const handleStorageChange = () => {
      loadMotorcycles();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Polling para detectar mudanças na mesma aba
    const interval = setInterval(loadMotorcycles, 2000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const testimonials = [
    {
      name: "Carlos Silva",
      text: "Negociação rápida e sem dor de cabeça. Recomendo!",
      rating: 5
    },
    {
      name: "Marina Santos",
      text: "Atendimento excelente e moto com procedência garantida.",
      rating: 5
    },
    {
      name: "Roberto Lima",
      text: "Melhor experiência de compra que já tive. Profissionais de verdade!",
      rating: 5
    }
  ];

  const handleWhatsApp = (moto?: string) => {
    const message = moto 
      ? encodeURIComponent(`Olá! Tenho interesse na ${moto}. Pode me passar mais informações?`)
      : whatsappMessage;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 sm:h-28">
            <div className="flex items-center">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f0b23d51-7c14-4cff-bc35-9e48b5884c8f.png" 
                alt="Lucas Moto" 
                className="h-20 w-auto sm:h-24"
              />
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#motos" className="text-sm font-medium hover:text-red-600 transition-colors">Motos</a>
              <a href="#como-funciona" className="text-sm font-medium hover:text-red-600 transition-colors">Como Funciona</a>
              <a href="#diferenciais" className="text-sm font-medium hover:text-red-600 transition-colors">Diferenciais</a>
              <button 
                onClick={() => handleWhatsApp()}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </nav>

            <button 
              onClick={() => handleWhatsApp()}
              className="md:hidden bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-all"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight">
                Sua próxima moto está aqui.
                <span className="block text-red-600 mt-2">Procedência, confiança e negociação justa.</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
                Venda de motos novas e seminovas em Londrina, com compra, troca e consignação.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#motos"
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                Ver motos disponíveis
                <ChevronRight className="w-5 h-5" />
              </a>
              <button 
                onClick={() => handleWhatsApp()}
                className="w-full sm:w-auto bg-white hover:bg-zinc-100 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto pt-12">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-red-600">+500</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1">Motos vendidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-red-600">100%</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1">Procedência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-red-600">5★</div>
                <div className="text-xs sm:text-sm text-zinc-400 mt-1">Avaliação</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Motos */}
      <section id="motos" className="py-20 sm:py-32 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              Motos <span className="text-red-600">Disponíveis</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Seleção premium de motocicletas com procedência garantida
            </p>
          </div>

          {motorcycles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-400 text-lg">Nenhuma moto disponível no momento.</p>
              <p className="text-zinc-500 text-sm mt-2">Entre em contato para mais informações.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {motorcycles.map((moto) => (
                  <div 
                    key={moto.id}
                    className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all duration-300 hover:scale-[1.02]"
                  >
                    {moto.featured && (
                      <div className="bg-red-600 text-white text-xs font-bold px-4 py-2 text-center">
                        DESTAQUE
                      </div>
                    )}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={moto.image} 
                        alt={`${moto.brand} ${moto.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-2xl font-black">{moto.brand}</h3>
                        <p className="text-xl text-zinc-400">{moto.model}</p>
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

                      <button 
                        onClick={() => handleWhatsApp(`${moto.brand} ${moto.model} ${moto.year}`)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Tenho interesse
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <button 
                  onClick={() => handleWhatsApp("ver todas as motos disponíveis")}
                  className="bg-white hover:bg-zinc-100 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                >
                  Ver todas as motos
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 sm:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              Como <span className="text-red-600">Funciona</span>
            </h2>
            <p className="text-lg text-zinc-400">
              Processo simples e transparente para você sair pilotando
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Escolha sua moto", desc: "Navegue pelo nosso catálogo premium", icon: "🏍️" },
              { step: "02", title: "Fale com consultor", desc: "Atendimento personalizado via WhatsApp", icon: "💬" },
              { step: "03", title: "Negocie", desc: "Condições justas e transparentes", icon: "🤝" },
              { step: "04", title: "Saia pilotando", desc: "Documentação e entrega ágil", icon: "✅" }
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="text-6xl mb-4">{item.icon}</div>
                <div className="text-5xl font-black text-red-600">{item.step}</div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compra, Troca e Consignação */}
      <section className="py-20 sm:py-32 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-5xl font-black">
                  Compra, Troca e <span className="text-red-600">Consignação</span>
                </h2>
                <p className="text-lg text-zinc-400">
                  Quer vender ou trocar sua moto? Na Lucas Moto você encontra:
                </p>
                
                <div className="space-y-4">
                  {[
                    "Avaliação justa e transparente",
                    "Processo rápido e seguro",
                    "Melhor valor para sua moto",
                    "Documentação completa"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="bg-red-600 rounded-full p-1">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-lg">{item}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => handleWhatsApp("vender minha moto")}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
                >
                  Quero vender minha moto
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop"
                  alt="Consignação"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section id="diferenciais" className="py-20 sm:py-32 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              Por que escolher a <span className="text-red-600">Lucas Moto</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Procedência Garantida", desc: "Todas as motos com histórico completo" },
              { icon: Award, title: "Motos Selecionadas", desc: "Rigoroso processo de qualidade" },
              { icon: Clock, title: "Atendimento Ágil", desc: "Resposta rápida e eficiente" },
              { icon: MapPin, title: "Loja Física", desc: "Visite nosso showroom em Londrina" }
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 hover:border-red-600 transition-all duration-300 hover:scale-105 text-center space-y-4">
                <div className="bg-red-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <item.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prova Social */}
      <section className="py-20 sm:py-32 bg-zinc-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black mb-4">
              O que dizem nossos <span className="text-red-600">clientes</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-red-600 text-red-600" />
                  ))}
                </div>
                <p className="text-lg italic">"{testimonial.text}"</p>
                <p className="font-bold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-black to-red-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl sm:text-6xl font-black">
              Pronto para sair de <span className="text-red-600">moto nova?</span>
            </h2>
            <p className="text-xl text-zinc-300">
              Fale agora com a Lucas Moto no WhatsApp e encontre a moto perfeita para você.
            </p>
            <button 
              onClick={() => handleWhatsApp()}
              className="bg-white hover:bg-zinc-100 text-black px-12 py-6 rounded-lg font-black text-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              <MessageCircle className="w-6 h-6" />
              Falar no WhatsApp agora
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-800 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <img 
                src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/f0b23d51-7c14-4cff-bc35-9e48b5884c8f.png" 
                alt="Lucas Moto" 
                className="h-20 w-auto sm:h-24"
              />
              <p className="text-zinc-400">
                Sua concessionária de confiança em Londrina
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Contato</h3>
              <div className="space-y-2 text-zinc-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>(43) 9999-9999</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Londrina, PR</span>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="w-4 h-4" />
                  <a href="https://instagram.com/lucasmoto" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
                    @lucasmoto
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">Horário de Atendimento</h3>
              <div className="text-zinc-400 space-y-1">
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 13h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 text-center text-zinc-500 text-sm">
            <p>&copy; 2024 Lucas Moto. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Flutuante */}
      <button 
        onClick={() => handleWhatsApp()}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50 animate-pulse"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
