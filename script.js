// Configuração do WhatsApp
const WHATSAPP_NUMBER = '5543999999999'; // Substituir pelo número real

// Dados das motos (podem ser editados aqui)
const motorcyclesData = [
    {
        id: 1,
        brand: 'Honda',
        model: 'CB 500F',
        year: '2022',
        km: '12.000 km',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop',
        featured: true,
        price: 'R$ 32.000'
    },
    {
        id: 2,
        brand: 'Yamaha',
        model: 'MT-03',
        year: '2023',
        km: '5.000 km',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
        featured: true,
        price: 'R$ 28.000'
    },
    {
        id: 3,
        brand: 'Kawasaki',
        model: 'Ninja 400',
        year: '2021',
        km: '18.000 km',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop',
        featured: false,
        price: 'R$ 30.000'
    },
    {
        id: 4,
        brand: 'BMW',
        model: 'G 310 R',
        year: '2023',
        km: '8.000 km',
        image: 'https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800&h=600&fit=crop',
        featured: false,
        price: 'R$ 25.000'
    },
    {
        id: 5,
        brand: 'Honda',
        model: 'CG 160',
        year: '2022',
        km: '15.000 km',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
        featured: false,
        price: 'R$ 12.000'
    },
    {
        id: 6,
        brand: 'Yamaha',
        model: 'Factor 150',
        year: '2023',
        km: '3.000 km',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop',
        featured: false,
        price: 'R$ 11.500'
    }
];

// Função para abrir WhatsApp
function openWhatsApp(message = '') {
    const defaultMessage = 'Olá! Vim pelo site e gostaria de mais informações sobre as motos disponíveis.';
    const text = message ? `Olá! Tenho interesse em ${message}. Pode me passar mais informações?` : defaultMessage;
    const encodedMessage = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

// Função para criar card de moto
function createMotorcycleCard(moto) {
    return `
        <div class="motorcycle-card">
            ${moto.featured ? '<div class="motorcycle-badge">DESTAQUE</div>' : ''}
            <div class="motorcycle-image">
                <img src="${moto.image}" alt="${moto.brand} ${moto.model}">
            </div>
            <div class="motorcycle-info">
                <h3 class="motorcycle-title">${moto.brand}</h3>
                <p class="motorcycle-model">${moto.model}</p>
                <div class="motorcycle-details">
                    <div>
                        <span>Ano:</span>
                        <span>${moto.year}</span>
                    </div>
                    <div>
                        <span>KM:</span>
                        <span>${moto.km}</span>
                    </div>
                </div>
                ${moto.price ? `<div class="motorcycle-price">${moto.price}</div>` : ''}
                <button class="motorcycle-button" onclick="openWhatsApp('${moto.brand} ${moto.model} ${moto.year}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Tenho interesse
                </button>
            </div>
        </div>
    `;
}

// Função para carregar motos
function loadMotorcycles() {
    const grid = document.getElementById('motorcycles-grid');
    
    if (motorcyclesData.length === 0) {
        grid.innerHTML = `
            <div style="text-align: center; padding: 5rem 0; grid-column: 1 / -1;">
                <p style="color: var(--color-zinc-400); font-size: 1.125rem;">Nenhuma moto disponível no momento.</p>
                <p style="color: var(--color-zinc-500); font-size: 0.875rem; margin-top: 0.5rem;">Entre em contato para mais informações.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = motorcyclesData.map(moto => createMotorcycleCard(moto)).join('');
}

// Smooth scroll para links internos
document.addEventListener('DOMContentLoaded', function() {
    // Carregar motos
    loadMotorcycles();
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scroll down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll up
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
});

// Função para adicionar nova moto (útil para gerenciamento)
function addMotorcycle(moto) {
    motorcyclesData.push(moto);
    loadMotorcycles();
}

// Função para remover moto
function removeMotorcycle(id) {
    const index = motorcyclesData.findIndex(m => m.id === id);
    if (index > -1) {
        motorcyclesData.splice(index, 1);
        loadMotorcycles();
    }
}

// Exportar funções para uso global
window.openWhatsApp = openWhatsApp;
window.addMotorcycle = addMotorcycle;
window.removeMotorcycle = removeMotorcycle;
