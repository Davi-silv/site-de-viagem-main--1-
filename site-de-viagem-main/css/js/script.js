// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize tab functionality
    initTabs();

    // Initialize hotel cards
    loadHotels();

    // Initialize flight deals
    loadFlightDeals();

    // Handle search form submission
    initSearchForm();

    // Handle newsletter form submission
    initNewsletterForm();

    // Initialize portfolio visibility
    initPortfolioVisibility();

    // --- Autocomplete para Origem e Destino ---
    const destinos = [
        'Rio de Janeiro', 'Paris', 'Nova York', 'Tóquio', 'Sydney', 'Dubai', 'Roma', 'Cancún', 'Lisboa'
    ];
    const origens = [
        'São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte', 'Salvador', 'Recife', 'Fortaleza', 'Curitiba', 'Porto Alegre'
    ];

    function setupAutocomplete(inputId, suggestionsId, dataList) {
        const input = document.getElementById(inputId);
        const suggestions = document.getElementById(suggestionsId);
        if (!input || !suggestions) return;

        input.addEventListener('input', function () {
            const value = this.value.toLowerCase();
            suggestions.innerHTML = '';
            if (!value) {
                suggestions.style.display = 'none';
                return;
            }
            const filtered = dataList.filter(item => item.toLowerCase().includes(value));
            if (filtered.length === 0) {
                suggestions.style.display = 'none';
                return;
            }
            filtered.forEach(item => {
                const div = document.createElement('div');
                div.className = 'autocomplete-item';
                div.textContent = item;
                div.onclick = function () {
                    input.value = item;
                    suggestions.innerHTML = '';
                    suggestions.style.display = 'none';
                };
                suggestions.appendChild(div);
            });
            suggestions.style.display = 'block';
        });

        // Esconde sugestões ao perder o foco
        input.addEventListener('blur', function () {
            setTimeout(() => { suggestions.style.display = 'none'; }, 100);
        });
        input.addEventListener('focus', function () {
            if (suggestions.innerHTML) suggestions.style.display = 'block';
        });
    }

    setupAutocomplete('input-origem', 'sugestoes-origem', origens);
    setupAutocomplete('input-destino', 'sugestoes-destino', destinos);
});

// Initialize portfolio visibility
function initPortfolioVisibility() {
    const portfolioSection = document.getElementById('portfolio');
    const portfolioLink = document.querySelector('a[href="#portfolio"]');
    const allSections = document.querySelectorAll('section');
    const closeButton = document.querySelector('.close-portfolio');

    // Função para mostrar o portfólio e ocultar outras seções
    function showPortfolio(e) {
        if (e) e.preventDefault();

        // Oculta todas as seções exceto o header e o hero
        allSections.forEach(section => {
            if (section.id !== 'home' && section.id !== 'portfolio') {
                section.style.display = 'none';
            }
        });

        // Mostra a seção de portfólio com animação
        portfolioSection.style.display = 'block';
        setTimeout(() => {
            portfolioSection.classList.add('visible');
        }, 10);

        // Scroll suave até o portfólio
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Função para voltar à visualização normal
    function hidePortfolio(e) {
        if (e) e.preventDefault();

        // Inicia a animação de fade out
        portfolioSection.classList.remove('visible');

        // Após a animação de fade out, oculta o portfólio e mostra as outras seções
        setTimeout(() => {
            portfolioSection.style.display = 'none';

            // Mostra todas as seções novamente
            allSections.forEach(section => {
                if (section.id !== 'portfolio') {
                    section.style.display = '';
                }
            });

            // Scroll suave para o topo da página
            document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });

            // Atualiza a URL removendo o hash
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }, 500);
    }

    // Adiciona event listener para o link do portfólio
    portfolioLink.addEventListener('click', showPortfolio);

    // Adiciona event listener para o botão de fechar
    closeButton.addEventListener('click', hidePortfolio);

    // Remove o event listener anterior do botão de fechar
    closeButton.removeAttribute('onclick');

    // Adiciona event listener para o botão voltar do navegador
    window.addEventListener('popstate', () => {
        if (!window.location.hash.includes('portfolio')) {
            hidePortfolio();
        }
    });

    // Verifica se o hash da URL já está apontando para o portfólio
    if (window.location.hash === '#portfolio') {
        showPortfolio();
    }
}

// Tab functionality
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            // Update form fields based on selected tab
            updateFormFields(button.dataset.tab);
        });
    });
}

// Update form fields based on selected tab
function updateFormFields(tabType) {
    const formGroup = document.querySelector('.form-group');
    let fields = '';

    switch (tabType) {
        case 'voos':
            fields = `
                <input type="text" placeholder="Origem" required>
                <input type="text" placeholder="Destino" required>
                <input type="date" placeholder="Data de ida" required>
                <input type="date" placeholder="Data de volta">
                <select title="Número de passageiros">
                    <option value="">Passageiros</option>
                    <option value="1">1 Passageiro</option>
                    <option value="2">2 Passageiros</option>
                    <option value="3">3+ Passageiros</option>
                </select>
                <button type="submit">Pesquisar Voos</button>
            `;
            break;
        case 'hoteis':
            fields = `
                <input type="text" placeholder="Destino" required>
                <input type="date" placeholder="Check-in" required>
                <input type="date" placeholder="Check-out" required>
                <select title="Número de hóspedes">
                    <option value="">Hóspedes</option>
                    <option value="1">1 Hóspede</option>
                    <option value="2">2 Hóspedes</option>
                    <option value="3">3+ Hóspedes</option>
                </select>
                <button type="submit">Pesquisar Hotéis</button>
            `;
            break;
        case 'pacotes':
            fields = `
                <input type="text" placeholder="Origem" required>
                <input type="text" placeholder="Destino" required>
                <input type="date" placeholder="Data de ida" required>
                <input type="date" placeholder="Data de volta" required>
                <select title="Número de pessoas">
                    <option value="">Pessoas</option>
                    <option value="1">1 Pessoa</option>
                    <option value="2">2 Pessoas</option>
                    <option value="3">3+ Pessoas</option>
                </select>
                <button type="submit">Pesquisar Pacotes</button>
            `;
            break;
    }

    formGroup.innerHTML = fields;
}

// Load hotel cards
function loadHotels() {
    const hotelGrid = document.querySelector('.hotel-grid');
    const hotels = [
        {
            name: 'Hotel Copacabana Palace',
            location: 'Rio de Janeiro, Brasil',
            price: 'R$ 1.200',
            rating: 5,
            description: 'Hotel luxuoso com vista para a praia de Copacabana',
            image: 'https://lh6.googleusercontent.com/proxy/0hmEJgtfkhKe3961-FBv0Lw-pbZxI3OBopNusDAehvZ888gUiB1197gKxM5z-oHedvBX3t7M4zLhNuHchkWA6OOEfpP1p576MAq7hAY5WI1ePu7v3BGSLTNcJq79kid-g7uXllYa_7wqFiMScmqctN72G9Ffq6xuQ-Tc-4zy'
        },
        {
            name: 'Paris Luxury Hotel',
            location: 'Paris, França',
            price: 'R$ 2.500',
            rating: 5,
            description: 'Elegância parisiense com vista para a Torre Eiffel',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6UAR-E4MpPbGD3YspFWcRtGNYCY5G6JI-3A&s'
        },
        {
            name: 'Manhattan Suite',
            location: 'Nova York, EUA',
            price: 'R$ 3.000',
            rating: 4,
            description: 'Suítes modernas no coração de Manhattan',
            image: 'https://media.architecturaldigest.com/photos/674f62ea79b93abe955f5a92/16:9/w_2992,h_1683,c_limit/NYCPH_Park%20Hyatt%20New%20York_Manhattan%20Suite_Dining%20Room_Living%20Room.jpg'
        },
        {
            name: 'Dubai Palm Resort',
            location: 'Dubai, Emirados Árabes',
            price: 'R$ 4.500',
            rating: 5,
            description: 'Luxo e conforto na Palm Jumeirah',
            image: 'https://assets.kerzner.com/api/public/content/7024aab27a0b47068c8fcc8ac3336e77?v=2c6a44c9&t=w2880'
        },
        {
            name: 'Tóquio Sky Hotel',
            location: 'Tóquio, Japão',
            price: 'R$ 2.800',
            rating: 4,
            description: 'Hotel moderno com tecnologia de ponta',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG-GTndb6ZLFXLjOLC3N-8JDN2BxUwosIhhQ&s'
        },
        {
            name: 'Roma Antica Palace',
            location: 'Roma, Itália',
            price: 'R$ 2.200',
            rating: 4,
            description: 'Hospedagem histórica no centro de Roma',
            image: 'https://imgmd.net/images/v1/guia/2917213/onde-ficar-em-roma.jpg'
        },
        {
            name: 'Sydney Harbour View',
            location: 'Sydney, Austrália',
            price: 'R$ 1.800',
            rating: 4,
            description: 'Vista espetacular para a Opera House',
            image: 'https://lirp.cdn-website.com/7a7ddc33/dms3rep/multi/opt/2024-11-05---Harbour-View-Hotel-63_web-432w.jpg'
        },
        {
            name: 'Cancún Paradise Resort',
            location: 'Cancún, México',
            price: 'R$ 2.100',
            rating: 5,
            description: 'Resort all-inclusive à beira-mar',
            image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/d5/7a/70/caption.jpg?w=900&h=-1&s=1'
        }
    ];

    let hotelHTML = '';
    hotels.forEach(hotel => {
        const stars = '⭐'.repeat(hotel.rating);
        hotelHTML += `
            <div class="hotel-card">
                <div class="hotel-image">
                    <img src="${hotel.image}" alt="${hotel.name}">
                </div>
                <div class="hotel-info">
                    <h3>${hotel.name}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${hotel.location}</p>
                    <p class="rating">${stars}</p>
                    <p class="description">${hotel.description}</p>
                    <p class="price"><strong>${hotel.price}</strong> por noite</p>
                    <div class="hotel-buttons">
                        <button class="btn-details" onclick="verDetalhesHotel('${hotel.name}')">Ver Detalhes</button>
                        <button class="btn-reserve" onclick="bookHotel('${hotel.name}')">Reservar Agora</button>
                    </div>
                </div>
            </div>
        `;
    });

    if (hotelGrid) {
        hotelGrid.innerHTML = hotelHTML;
    }
}

// Load flight deals
function loadFlightDeals() {
    const flightDeals = document.querySelector('.flight-deals');
    const deals = [
        {
            from: 'São Paulo',
            to: 'Rio de Janeiro',
            price: 'R$ 400',
            date: '2024-07-15',
            airline: 'LATAM',
            duration: '1h 15min',
            stops: 'Direto',
            image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325'
        },
        {
            from: 'Rio de Janeiro',
            to: 'Paris',
            price: 'R$ 3.800',
            date: '2024-08-20',
            airline: 'Air France',
            duration: '11h 30min',
            stops: '1 parada',
            image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
        },
        {
            from: 'São Paulo',
            to: 'Nova York',
            price: 'R$ 4.200',
            date: '2024-09-10',
            airline: 'American Airlines',
            duration: '10h 45min',
            stops: 'Direto',
            image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'
        },
        {
            from: 'São Paulo',
            to: 'Tóquio',
            price: 'R$ 5.500',
            date: '2024-08-15',
            airline: 'JAL',
            duration: '24h 30min',
            stops: '1 parada',
            image: 'https://images.unsplash.com/photo-1528728329032-2972f65dfb3f'
        },
        {
            from: 'Rio de Janeiro',
            to: 'Lisboa',
            price: 'R$ 3.600',
            date: '2024-07-25',
            airline: 'TAP',
            duration: '9h 45min',
            stops: 'Direto',
            image: 'https://images.unsplash.com/photo-1516834474-48c0abc2a902'
        },
        {
            from: 'São Paulo',
            to: 'Dubai',
            price: 'R$ 4.800',
            date: '2024-09-05',
            airline: 'Emirates',
            duration: '15h 20min',
            stops: '1 parada',
            image: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17'
        }
    ];

    let dealsHTML = '<div class="flight-grid">';
    deals.forEach(deal => {
        dealsHTML += `
            <div class="flight-card">
                <div class="flight-image">
                    <img src="${deal.image}" alt="${deal.to}">
                    <div class="flight-overlay">
                        <span class="airline">${deal.airline}</span>
                    </div>
                </div>
                <div class="flight-info">
                    <div class="flight-route">
                        <h3>${deal.from} → ${deal.to}</h3>
                        <p class="flight-details">
                            <span><i class="fas fa-clock"></i> ${deal.duration}</span>
                            <span><i class="fas fa-plane"></i> ${deal.stops}</span>
                        </p>
                    </div>
                    <div class="flight-data">
                        <p class="date"><i class="far fa-calendar-alt"></i> ${formatDate(deal.date)}</p>
                        <p class="price">${deal.price}</p>
                    </div>
                    <div class="flight-buttons">
                        <button class="btn-details" onclick="verDetalheVoo('${deal.from}', '${deal.to}')">Ver Detalhes</button>
                        <button class="btn-reserve" onclick="bookFlight('${deal.from}', '${deal.to}', '${deal.date}')">Reservar</button>
                    </div>
                </div>
            </div>
        `;
    });
    dealsHTML += '</div>';

    if (flightDeals) {
        flightDeals.innerHTML = dealsHTML;
    }
}

// Format date to Brazilian format
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Handle search form submission
function initSearchForm() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Get active tab
            const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
            // Get form data
            const formData = new FormData(searchForm);

            // Show loading state
            const submitButton = searchForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Pesquisando...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;

                // Show success message
                alert('Pesquisa realizada com sucesso! Em breve você receberá as melhores ofertas por email.');
            }, 1500);
        });
    }
}

// Handle newsletter form submission
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Show success message
                alert('Obrigado por se inscrever! Você receberá nossas melhores ofertas em breve.');
                emailInput.value = '';
            }
        });
    }
}

// Booking functions
function bookHotel(hotelName) {
    alert(`Iniciando reserva para ${hotelName}. Em breve você será redirecionado para o processo de pagamento.`);
}

function bookFlight(from, to, date) {
    alert(`Iniciando reserva de voo de ${from} para ${to} na data ${formatDate(date)}. Em breve você será redirecionado para o processo de pagamento.`);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Handle destination offers button clicks
function verOfertas(destino) {
    alert(`Buscando as melhores ofertas para ${destino}. Em breve você receberá nossas sugestões por email!`);
}

// Adicionar nova função para ver detalhes do hotel
function verDetalhesHotel(hotelName) {
    alert(`Carregando mais informações sobre ${hotelName}...`);
}

// Adicionar função para ver detalhes do voo
function verDetalheVoo(origem, destino) {
    alert(`Carregando detalhes do voo de ${origem} para ${destino}...`);
}
