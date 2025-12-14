/**
 * HOME PAGE MODULE
 * Handles home page initialization and content
 */

const HomePage = {
    /**
     * Initialize home page
     */
    init() {
        this.setHeroContent();
        this.setWelcomeSection();
        this.setStatistics();
        this.setFeaturedResearch();
        this.setNewsSection();
    },

    /**
     * Set hero section content
     */
    setHeroContent() {
        const hero = ConfigLoader.get('home.hero', {});

        DOMUtils.setText('lab-title', hero.title || 'Welcome to AI-THENA Lab');
        DOMUtils.setText('lab-description', hero.subtitle || 'Pioneering research in artificial intelligence');

        const ctaButton = document.getElementById('hero-cta');
        if (ctaButton && hero.ctaText) {
            ctaButton.textContent = hero.ctaText;
            ctaButton.href = hero.ctaLink || 'research.html';
        }
    },

    /**
     * Set welcome section
     */
    setWelcomeSection() {
        const welcome = ConfigLoader.get('home.welcome', {});

        // Welcome text
        const welcomeText = document.getElementById('welcome-text');
        if (welcomeText && welcome.text) {
            welcomeText.textContent = welcome.text;
        }

        // Highlights
        const highlightsList = document.getElementById('highlights-list');
        if (highlightsList && welcome.highlights) {
            DOMUtils.clear(highlightsList);

            welcome.highlights.forEach(highlight => {
                const div = DOMUtils.createElement('div', ['highlight-item']);
                div.innerHTML = `✓ ${highlight}`;
                highlightsList.appendChild(div);
            });
        }
    },

    /**
     * Set statistics section
     */
    setStatistics() {
        const statsGrid = document.getElementById('stats-grid');
        if (!statsGrid) return;

        const featuredStats = ConfigLoader.get('home.featuredStats', []);
        const stats = ConfigLoader.calculateStats();

        if (featuredStats.length === 0) {
            DOMUtils.hideIfEmpty(statsGrid);
            return;
        }

        DOMUtils.clear(statsGrid);
        let hasStats = false;

        featuredStats.forEach(stat => {
            const value = stats[stat.key];

            if (value !== undefined && value !== null && value !== '') {
                hasStats = true;
                const statCard = DOMUtils.createElement('div', ['stat-card']);

                statCard.innerHTML = `
                    ${stat.icon ? `<div class="stat-icon" style="font-size: 2.5rem; margin-bottom: 1rem;">${stat.icon}</div>` : ''}
                    <h3 class="stat-number" data-value="${value}">${value}</h3>
                    <p class="stat-label">${stat.label}</p>
                `;

                statsGrid.appendChild(statCard);
            }
        });

        if (!hasStats) {
            DOMUtils.hideIfEmpty(statsGrid);
        } else {
            this._animateStatistics();
        }
    },

    /**
     * Set featured research section
     */
    setFeaturedResearch() {
        const featuredResearch = document.getElementById('featured-research');
        if (!featuredResearch) return;

        const areas = ConfigLoader.get('research.areas', []);
        const featuredCount = ConfigLoader.get('home.featuredResearchCount', 2);

        if (areas.length === 0) {
            DOMUtils.hideIfEmpty(featuredResearch);
            return;
        }

        DOMUtils.clear(featuredResearch);

        areas.slice(0, featuredCount).forEach(area => {
            const card = CardFactory.createResearchCard(area);
            if (card) featuredResearch.appendChild(card);
        });
    },

    /**
     * Set news section
     */
    setNewsSection() {
        const newsList = document.getElementById('news-list');
        if (!newsList) return;

        const articles = ConfigLoader.get('news.articles', []);

        if (articles.length === 0) {
            DOMUtils.hideIfEmpty(newsList);
            return;
        }

        // Sort by date (newest first) and take first 5
        const recentNews = articles
            .filter(article => article && article.title && article.summary)
            .sort((a, b) => DateUtils.sortNewest(a.date, b.date))
            .slice(0, 5);

        if (recentNews.length === 0) {
            DOMUtils.hideIfEmpty(newsList);
            return;
        }

        DOMUtils.clear(newsList);

        recentNews.forEach(article => {
            const newsItem = DOMUtils.createElement('div', ['news-item']);

            if (article.category) {
                newsItem.classList.add(`news-${article.category}`);
            }

            const displayDate = DateUtils.toShort(article.date);

            let newsHTML = `<span class="news-date">${displayDate}</span>`;
            newsHTML += '<div class="news-content-wrapper" style="flex: 1;">';

            if (article.title) {
                newsHTML += `<h4 class="news-title" style="color: #333; font-size: 1.1rem; margin-bottom: 0.3rem; font-weight: 600;">${article.title}</h4>`;
            }

            newsHTML += `<p class="news-content">${article.summary}</p>`;
            newsHTML += `<a href="news-article.html?id=${article.id}" class="news-link" style="color: #667eea; text-decoration: none; font-size: 0.9rem; font-weight: 500;">Read more →</a>`;
            newsHTML += '</div>';

            newsItem.innerHTML = newsHTML;
            newsList.appendChild(newsItem);
        });
    },

    /**
     * Animate statistics counters
     * @private
     */
    _animateStatistics() {
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
                    this._animateValue(element, finalValue);
                    observer.unobserve(element);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => observer.observe(stat));
    },

    /**
     * Animate single value
     * @private
     */
    _animateValue(element, finalValue) {
        if (!finalValue) return;

        const hasPlus = finalValue.toString().includes('+');
        const numericValue = parseFloat(finalValue.toString().replace(/[^0-9.]/g, ''));

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
            if (hasPlus) displayValue += '+';

            element.textContent = displayValue;

            if (currentStep >= steps) {
                element.textContent = finalValue;
                clearInterval(timer);
            }
        }, stepDuration);
    }
};

// Export for use in app.js
window.HomePage = HomePage;