// Script específico para a página de modelos

let filteredMotorcycles = [...motorcyclesData];

// Função para criar card de moto (mesma do script.js mas repetida para independência)
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

// Função para renderizar motos
function renderMotorcycles(motorcycles) {
    const grid = document.getElementById('motorcycles-grid');
    const noResults = document.getElementById('no-results');
    const resultsCount = document.getElementById('results-count');
    
    resultsCount.textContent = motorcycles.length;
    
    if (motorcycles.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    grid.innerHTML = motorcycles.map(moto => createMotorcycleCard(moto)).join('');
}

// Função para extrair valor numérico do preço
function getPriceValue(priceString) {
    if (!priceString) return 0;
    return parseInt(priceString.replace(/[^\d]/g, ''));
}

// Função para aplicar filtros
function applyFilters() {
    const brandFilter = document.getElementById('filter-brand').value;
    const yearFilter = document.getElementById('filter-year').value;
    const priceFilter = document.getElementById('filter-price').value;
    
    filteredMotorcycles = motorcyclesData.filter(moto => {
        // Filtro de marca
        if (brandFilter && moto.brand !== brandFilter) {
            return false;
        }
        
        // Filtro de ano
        if (yearFilter && moto.year !== yearFilter) {
            return false;
        }
        
        // Filtro de preço
        if (priceFilter) {
            const price = getPriceValue(moto.price);
            
            if (priceFilter === '0-15000' && price > 15000) {
                return false;
            }
            if (priceFilter === '15000-25000' && (price < 15000 || price > 25000)) {
                return false;
            }
            if (priceFilter === '25000-35000' && (price < 25000 || price > 35000)) {
                return false;
            }
            if (priceFilter === '35000+' && price < 35000) {
                return false;
            }
        }
        
        return true;
    });
    
    renderMotorcycles(filteredMotorcycles);
}

// Função para limpar filtros
function clearFilters() {
    document.getElementById('filter-brand').value = '';
    document.getElementById('filter-year').value = '';
    document.getElementById('filter-price').value = '';
    
    filteredMotorcycles = [...motorcyclesData];
    renderMotorcycles(filteredMotorcycles);
}

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    renderMotorcycles(motorcyclesData);
    
    // Adicionar event listeners para aplicar filtros ao mudar seleção
    document.getElementById('filter-brand').addEventListener('change', applyFilters);
    document.getElementById('filter-year').addEventListener('change', applyFilters);
    document.getElementById('filter-price').addEventListener('change', applyFilters);
});

// Exportar funções para uso global
window.applyFilters = applyFilters;
window.clearFilters = clearFilters;
