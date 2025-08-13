// ===== HOME PAGE JAVASCRIPT - FIXED CONFIG CONNECTION =====

document.addEventListener('DOMContentLoaded', function() {
    // Wait for CONFIG to load
    setTimeout(function() {
        if (window.CONFIG) {
            initializeHomePage();
            initializeAnimationObserver();
        }
    }, 100);
});

// Initialize Home Page Content
function initializeHomePage() {
    setHeroContent();
    setWelcomeSection();
    setStatistics();
    setFeaturedResearch();
    setNewsSection();
}

// Set Hero Content
function setHeroContent() {
    const titleElement = document.getElementById('lab-title');
    const descElement = document.getElementById('lab-description');
    const ctaElement = document.getElementById('hero-cta');
    
    if (titleElement && CONFIG.home && CONFIG.home.hero) {
        titleElement.textContent = CONFIG.home.hero.title || 'Welcome to AI-THENA Lab';
    }
    
    if (descElement && CONFIG.home && CONFIG.home.hero) {
        descElement.textContent = CONFIG.home.hero.subtitle || 'Pioneering research in artificial intelligence';
    }
    
    if (ctaElement && CONFIG.home && CONFIG.home.hero) {
        ctaElement.textContent = CONFIG.home.hero.ctaText || 'Explore Our Research';
        ctaElement.href = CONFIG.home.hero.ctaLink || 'research.html';
    }
}

// Set Welcome Section
function setWelcomeSection() {
    const welcomeText = document.getElementById('welcome-text');
    const highlightsList = document.getElementById('highlights-list');
    
    if (welcomeText && CONFIG.home && CONFIG.home.welcome) {
        welcomeText.textContent = CONFIG.home.welcome.text || '';
        if (!CONFIG.home.welcome.text) {
            welcomeText.style.display = 'none';
        }
    }
    
    if (highlightsList && CONFIG.home && CONFIG.home.welcome && CONFIG.home.welcome.highlights) {
        highlightsList.innerHTML = '';
        if (CONFIG.home.welcome.highlights.length > 0) {
            CONFIG.home.welcome.highlights.forEach(highlight => {
                if (highlight) {
                    const div = document.createElement('div');
                    div.className = 'highlight-item';
                    div.innerHTML = `✓ ${highlight}`;
                    highlightsList.appendChild(div);
                }
            });
        } else {
            highlightsList.style.display = 'none';
        }
    }
}

// Set Statistics
function setStatistics() {
    const statsGrid = document.getElementById('stats-grid');
    
    if (!statsGrid || !CONFIG.home || !CONFIG.home.featuredStats || !CONFIG.stats) {
        if (statsGrid) {
            const statsSection = statsGrid.closest('.stats-section');
            if (statsSection) statsSection.style.display = 'none';
        }
        return;
    }
    
    statsGrid.innerHTML = '';
    let hasStats = false;
    
    CONFIG.home.featuredStats.forEach(stat => {
        const value = CONFIG.stats[stat.key];
        
        if (value !== undefined && value !== null && value !== '') {
            hasStats = true;
            const statCard = document.createElement('div');
            statCard.className = 'stat-card';
            
            statCard.innerHTML = `
                ${stat.icon ? `<div class="stat-icon" style="font-size: 2.5rem; margin-bottom: 1rem;">${stat.icon}</div>` : ''}
                <h3 class="stat-number" data-value="${value}">${value}</h3>
                <p class="stat-label">${stat.label}</p>
            `;
            
            statsGrid.appendChild(statCard);
        }
    });
    
    if (!hasStats) {
        const statsSection = statsGrid.closest('.stats-section');
        if (statsSection) statsSection.style.display = 'none';
    } else {
        animateStatistics();
    }
}

// Set Featured Research
function setFeaturedResearch() {
    const featuredResearch = document.getElementById('featured-research');
    
    if (!featuredResearch || !CONFIG.research || !CONFIG.research.areas) {
        if (featuredResearch) {
            const section = featuredResearch.closest('.content-section');
            if (section) section.style.display = 'none';
        }
        return;
    }
    
    featuredResearch.innerHTML = '';
    
    const featuredCount = (CONFIG.home && CONFIG.home.featuredResearchCount) || 2;
    const researchAreas = CONFIG.research.areas
        .filter(area => area && area.title)
        .slice(0, featuredCount);
    
    if (researchAreas.length === 0) {
        const section = featuredResearch.closest('.content-section');
        if (section) section.style.display = 'none';
        return;
    }
    
    researchAreas.forEach(area => {
        const card = createResearchCard(area);
        if (card) {
            featuredResearch.appendChild(card);
        }
    });
}

// Set News Section
function setNewsSection() {
    const newsList = document.getElementById('news-list');
    
    if (!newsList || !CONFIG.home || !CONFIG.home.news || CONFIG.home.news.length === 0) {
        if (newsList) {
            const section = newsList.closest('.content-section');
            if (section) section.style.display = 'none';
        }
        return;
    }
    
    newsList.innerHTML = '';
    
    const newsItems = CONFIG.home.news
        .filter(item => item && item.content)
        .slice(0, 5);
    
    if (newsItems.length === 0) {
        const section = newsList.closest('.content-section');
        if (section) section.style.display = 'none';
        return;
    }
    
    newsItems.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        if (item.category) {
            newsItem.classList.add(`news-${item.category}`);
        }
        
        let newsHTML = '';
        if (item.date) {
            newsHTML += `<span class="news-date">${item.date}</span>`;
        }
        
        newsHTML += '<div class="news-content-wrapper" style="flex: 1;">';
        if (item.title) {
            newsHTML += `<h4 class="news-title" style="color: #333; font-size: 1.1rem; margin-bottom: 0.3rem; font-weight: 600;">${item.title}</h4>`;
        }
        newsHTML += `<p class="news-content">${item.content}</p>`;
        if (item.link && item.link !== '#') {
            newsHTML += `<a href="${item.link}" class="news-link" style="color: #667eea; text-decoration: none; font-size: 0.9rem; font-weight: 500;">Read more →</a>`;
        }
        newsHTML += '</div>';
        
        newsItem.innerHTML = newsHTML;
        newsList.appendChild(newsItem);
    });
}

// Animate Statistics
function animateStatistics() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.getAttribute('data-value');
                animateValue(element, finalValue);
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Animate a value
function animateValue(element, finalValue) {
    if (!finalValue) return;
    
    const hasPlus = finalValue.toString().includes('+');
    const hasDollar = finalValue.toString().includes('$');
    const hasM = finalValue.toString().includes('M');
    
    let numericValue = parseFloat(finalValue.toString().replace(/[^0-9.]/g, ''));
    
    if (isNaN(numericValue)) {
        element.textContent = finalValue;
        return;
    }
    
    const duration = 1500;
    const steps = 30;
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentValue = Math.round(numericValue * progress);
        
        let displayValue = currentValue.toString();
        if (hasDollar) displayValue = '$' + displayValue;
        if (hasM) displayValue += 'M';
        if (hasPlus) displayValue += '+';
        
        element.textContent = displayValue;
        
        if (currentStep >= steps) {
            element.textContent = finalValue;
            clearInterval(timer);
        }
    }, stepDuration);
}