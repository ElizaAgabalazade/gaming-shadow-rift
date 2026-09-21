const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const particleField = document.createElement('div');
  particleField.className = 'ambient-particles';
  const particleCount = window.innerWidth < 700 ? 12 : 24;

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement('span');
    particle.className = 'ambient-particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.setProperty('--particle-duration', `${10 + Math.random() * 15}s`);
    particle.style.setProperty('--particle-delay', `${Math.random() * -18}s`);
    particle.style.setProperty('--particle-drift', `${-80 + Math.random() * 160}px`);
    particleField.appendChild(particle);
  }

  document.body.prepend(particleField);
}

const gameTiles = document.querySelectorAll('.game-tile[data-game-name], .mode-card[data-game-name]');

const featureCards = document.querySelectorAll('.feature-card[data-feature-title]');

if (featureCards.length) {
  const featureModal = document.createElement('div');
  featureModal.className = 'game-details-modal feature-details-modal';
  featureModal.setAttribute('aria-hidden', 'true');
  featureModal.innerHTML = `
    <div class="game-details-dialog" role="dialog" aria-modal="true" aria-labelledby="feature-details-title">
      <button class="game-details-close" type="button" aria-label="Close feature details">&times;</button>
      <div class="feature-details-icon" aria-hidden="true"></div>
      <h2 id="feature-details-title"></h2>
      <p class="feature-details-description"></p>
      <h3>What you can expect</h3>
      <ul class="feature-details-points"></ul>
    </div>`;
  document.body.appendChild(featureModal);

  const featureTitle = featureModal.querySelector('#feature-details-title');
  const featureIcon = featureModal.querySelector('.feature-details-icon');
  const featureDescription = featureModal.querySelector('.feature-details-description');
  const featurePoints = featureModal.querySelector('.feature-details-points');
  const closeFeatureButton = featureModal.querySelector('.game-details-close');

  const closeFeatureModal = () => {
    featureModal.classList.remove('is-open');
    featureModal.setAttribute('aria-hidden', 'true');
  };

  const openFeatureModal = (card) => {
    featureTitle.textContent = card.dataset.featureTitle;
    featureIcon.textContent = card.dataset.featureIcon;
    featureDescription.textContent = card.dataset.featureDescription;
    featurePoints.innerHTML = card.dataset.featurePoints
      .split(',')
      .map((point) => `<li>${point}</li>`)
      .join('');
    featureModal.classList.add('is-open');
    featureModal.setAttribute('aria-hidden', 'false');
    closeFeatureButton.focus();
  };

  featureCards.forEach((card) => {
    card.addEventListener('click', () => openFeatureModal(card));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openFeatureModal(card);
      }
    });
  });

  closeFeatureButton.addEventListener('click', closeFeatureModal);
  featureModal.addEventListener('click', (event) => {
    if (event.target === featureModal) closeFeatureModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeFeatureModal();
  });
}

if (gameTiles.length) {
  const gameModal = document.createElement('div');
  gameModal.className = 'game-details-modal';
  gameModal.setAttribute('aria-hidden', 'true');
  gameModal.innerHTML = `
    <div class="game-details-dialog" role="dialog" aria-modal="true" aria-labelledby="game-details-title">
      <button class="game-details-close" type="button" aria-label="Close game details">&times;</button>
      <h2 id="game-details-title"></h2>
      <p class="game-details-description"></p>
      <div class="game-details-meta">
        <div><span>Genre</span><strong data-detail="genre"></strong></div>
        <div><span>Rating</span><strong data-detail="rating"></strong></div>
        <div><span>Platform</span><strong data-detail="platform"></strong></div>
      </div>
      <h3>Available modes</h3>
      <ul class="game-details-modes"></ul>
      <a class="btn btn-primary" href="store.html">Explore game packs</a>
    </div>`;
  document.body.appendChild(gameModal);

  const modalTitle = gameModal.querySelector('#game-details-title');
  const modalDescription = gameModal.querySelector('.game-details-description');
  const modalModes = gameModal.querySelector('.game-details-modes');
  const closeModalButton = gameModal.querySelector('.game-details-close');

  const closeGameModal = () => {
    gameModal.classList.remove('is-open');
    gameModal.setAttribute('aria-hidden', 'true');
  };

  const openGameModal = (tile) => {
    modalTitle.textContent = tile.dataset.gameName;
    modalDescription.textContent = tile.dataset.gameDescription;
    gameModal.querySelector('[data-detail="genre"]').textContent = tile.dataset.gameGenre;
    gameModal.querySelector('[data-detail="rating"]').textContent = tile.dataset.gameRating;
    gameModal.querySelector('[data-detail="platform"]').textContent = tile.dataset.gamePlatform;
    modalModes.innerHTML = tile.dataset.gameModes
      .split(', ')
      .map((mode) => `<li>${mode}</li>`)
      .join('');
    gameModal.classList.add('is-open');
    gameModal.setAttribute('aria-hidden', 'false');
    closeModalButton.focus();
  };

  gameTiles.forEach((tile) => {
    tile.addEventListener('click', () => openGameModal(tile));
    tile.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openGameModal(tile);
      }
    });
  });

  closeModalButton.addEventListener('click', closeGameModal);
  gameModal.addEventListener('click', (event) => {
    if (event.target === gameModal) closeGameModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeGameModal();
  });
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      const originalText = button.textContent;
      button.textContent = 'Message sent';
      button.disabled = true;

      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
        form.reset();
      }, 1800);
    }
  });
}

const productGrid = document.querySelector('.products-grid-store');
const categoryButtons = document.querySelectorAll('.store-sidebar [data-category]');
const minimumPriceFilter = document.querySelector('#price-min-filter');
const priceFilter = document.querySelector('#price-filter');
const priceValue = document.querySelector('#price-value');
const productCount = document.querySelector('#product-count');
const sortProducts = document.querySelector('#sort-products');

if (productGrid && categoryButtons.length && priceFilter && minimumPriceFilter) {
  const productCards = [...productGrid.querySelectorAll('.product-card')];
  let selectedCategory = 'all';

  const updateProducts = () => {
    let minimumPrice = Number(minimumPriceFilter.value);
    let maximumPrice = Number(priceFilter.value);

    if (minimumPrice > maximumPrice) {
      if (document.activeElement === minimumPriceFilter) {
        maximumPrice = minimumPrice;
        priceFilter.value = String(maximumPrice);
      } else {
        minimumPrice = maximumPrice;
        minimumPriceFilter.value = String(minimumPrice);
      }
    }

    const visibleCards = productCards.filter((card) => {
      const matchesCategory = selectedCategory === 'all' || card.dataset.category === selectedCategory;
      const cardPrice = Number(card.dataset.price);
      const matchesPrice = cardPrice >= minimumPrice && cardPrice <= maximumPrice;
      const isVisible = matchesCategory && matchesPrice;
      card.classList.toggle('is-hidden', !isVisible);
      return isVisible;
    });

    if (priceValue) {
      priceValue.textContent = `$${minimumPrice} - $${maximumPrice}`;
    }

    if (productCount) {
      productCount.textContent = `${visibleCards.length} product${visibleCards.length === 1 ? '' : 's'}`;
    }
  };

  categoryButtons.forEach((categoryItem) => {
    const categoryButton = categoryItem.querySelector('button');
    if (!categoryButton) return;

    categoryButton.addEventListener('click', () => {
      selectedCategory = categoryItem.dataset.category;
      categoryButtons.forEach((item) => item.classList.toggle('active', item === categoryItem));
      updateProducts();
    });
  });

  priceFilter.addEventListener('input', updateProducts);
  minimumPriceFilter.addEventListener('input', updateProducts);

  if (sortProducts) {
    sortProducts.addEventListener('change', () => {
      const cards = [...productGrid.querySelectorAll('.product-card')];
      const sortMode = sortProducts.value;

      cards.sort((firstCard, secondCard) => {
        if (sortMode === 'Price: low to high') {
          return Number(firstCard.dataset.price) - Number(secondCard.dataset.price);
        }

        if (sortMode === 'Newest') {
          return Number(secondCard.dataset.order) - Number(firstCard.dataset.order);
        }

        return Number(firstCard.dataset.order) - Number(secondCard.dataset.order);
      });

      cards.forEach((card) => productGrid.appendChild(card));
    });
  }

  updateProducts();
}

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

if (tabButtons.length && tabPanels.length) {
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedTab = button.dataset.tab;
      tabButtons.forEach((tabButton) => tabButton.classList.toggle('active', tabButton === button));
      tabPanels.forEach((panel) => panel.classList.toggle('active', panel.id === `${selectedTab}-panel`));
    });
  });
}

document.querySelectorAll('.auth-form').forEach((authForm) => {
  authForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const button = authForm.querySelector('button[type="submit"]');
    const isSignUp = authForm.dataset.authMode === 'signup';
    const message = document.createElement('p');
    message.className = 'auth-message';
    message.textContent = isSignUp
      ? 'Account created successfully. Welcome to Shadow Rift.'
      : 'Login successful. Welcome back, player.';

    authForm.querySelector('.auth-message')?.remove();
    authForm.appendChild(message);

    if (button) {
      button.disabled = true;
      setTimeout(() => {
        button.disabled = false;
        authForm.reset();
      }, 1400);
    }
  });
});
