// ===== HOME PAGE JAVASCRIPT - FIXED TEAM COUNT =====

document.addEventListener('DOMContentLoaded', function() {
    // Wait for CONFIG to load
    setTimeout(function() {
        if (window.CONFIG || window.CONFIG_LAB || window.CONFIG_HOME) {
            initializeHomePage();
            if (typeof initializeAnimationObserver !== 'undefined') {
                initializeAnimationObserver();
            }
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
    
    // Check for hero data in CONFIG_HOME or CONFIG
    const heroData = (window.CONFIG_HOME && CONFIG_HOME.hero) || 
                    (window.CONFIG && CONFIG.home && CONFIG.home.hero);
    
    if (titleElement) {
        titleElement.textContent = (heroData && heroData.title) || 'Welcome to AI-THENA Lab';
    }
    
    if (descElement) {
        descElement.textContent = (heroData && heroData.subtitle) || 'Pioneering research in artificial intelligence';
    }
    
    if (ctaElement) {
        ctaElement.textContent = (heroData && heroData.ctaText) || 'Explore Our Research';
        ctaElement.href = (heroData && heroData.ctaLink) || 'research.html';
    }
}

// Set Welcome Section
function setWelcomeSection() {
    const welcomeText = document.getElementById('welcome-text');
    const highlightsList = document.getElementById('highlights-list');
    
    // Check for welcome data in CONFIG_HOME or CONFIG
    const welcomeData = (window.CONFIG_HOME && CONFIG_HOME.welcome) || 
                       (window.CONFIG && CONFIG.home && CONFIG.home.welcome);
    
    if (welcomeText) {
        const text = welcomeData && welcomeData.text;
        if (text) {
            welcomeText.textContent = text;
        } else {
            welcomeText.style.display = 'none';
        }
    }
    
    if (highlightsList) {
        const highlights = welcomeData && welcomeData.highlights;
        if (highlights && highlights.length > 0) {
            highlightsList.innerHTML = '';
            highlights.forEach(highlight => {
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

// Calculate actual statistics from your data
function calculateActualStats() {
    const stats = {};
    
    // Calculate research areas count
    const researchData = (window.CONFIG_RESEARCH && CONFIG_RESEARCH.areas) || 
                        (window.CONFIG && CONFIG.research && CONFIG.research.areas);
    if (researchData && Array.isArray(researchData)) {
        stats.researchAreas = researchData.length;
    }
    
    // Calculate team members count - FIXED VERSION
    let teamCount = 0;
    const teamData = window.CONFIG_TEAM || (window.CONFIG && CONFIG.team);
    
    if (teamData) {
        // Count faculty
        if (teamData.faculty && Array.isArray(teamData.faculty)) {
            teamCount += teamData.faculty.length;
        }
        
        // Count postdocs (research team)
        if (teamData.postdocs && Array.isArray(teamData.postdocs)) {
            teamCount += teamData.postdocs.length;
        }
        
        // Count PhD students
        if (teamData.phdStudents && Array.isArray(teamData.phdStudents)) {
            teamCount += teamData.phdStudents.length;
        }
        
        // Count Masters students
        if (teamData.mastersStudents && Array.isArray(teamData.mastersStudents)) {
            teamCount += teamData.mastersStudents.length;
        }
        
        // Count staff
        if (teamData.staff && Array.isArray(teamData.staff)) {
            teamCount += teamData.staff.length;
        }
        
        // Count visiting researchers (if any)
        if (teamData.visiting && Array.isArray(teamData.visiting)) {
            teamCount += teamData.visiting.length;
        }
        
        // Count alumni (if you want to include them in total)
        // Uncomment if you want alumni included in total count:
        // if (teamData.alumni && Array.isArray(teamData.alumni)) {
        //     teamCount += teamData.alumni.length;
        // }
    }
    
    stats.teamMembers = teamCount;
    
    // Calculate publications count
    const publicationsData = (window.CONFIG_PUBLICATIONS && CONFIG_PUBLICATIONS.publications) || 
                            (window.CONFIG && CONFIG.publications && CONFIG.publications.publications);
    if (publicationsData && Array.isArray(publicationsData)) {
        stats.publications = publicationsData.length;
    }
    
    // Calculate years of excellence (from lab config)
    const currentYear = new Date().getFullYear();
    const established = (window.CONFIG_LAB && CONFIG_LAB.established) || 
                       (window.CONFIG && CONFIG.established);
    if (established) {
        stats.yearsOfExcellence = currentYear - established;
    }
    
    return stats;
}

// Set Statistics
function setStatistics() {
    const statsGrid = document.getElementById('stats-grid');
    
    if (!statsGrid) {
        return;
    }
    
    // Get home stats configuration
    const homeStats = (window.CONFIG_HOME && CONFIG_HOME.featuredStats) || 
                     (window.CONFIG && CONFIG.home && CONFIG.home.featuredStats);
    
    if (!homeStats) {
        const statsSection = statsGrid.closest('.stats-section');
        if (statsSection) statsSection.style.display = 'none';
        return;
    }
    
    // Calculate actual statistics from your data
    const actualStats = calculateActualStats();
    
    // Get configured stats as fallback
    const configStats = (window.CONFIG_LAB && CONFIG_LAB.stats) || (window.CONFIG && CONFIG.stats);
    
    // Use actual stats if available, otherwise fall back to config stats
    const statsToUse = actualStats || configStats;
    
    if (!statsToUse) {
        const statsSection = statsGrid.closest('.stats-section');
        if (statsSection) statsSection.style.display = 'none';
        return;
    }
    
    statsGrid.innerHTML = '';
    let hasStats = false;
    
    homeStats.forEach(stat => {
        const value = statsToUse[stat.key];
        
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
    
    if (!featuredResearch) {
        return;
    }
    
    // Check for research data in CONFIG_RESEARCH or CONFIG
    const researchData = (window.CONFIG_RESEARCH && CONFIG_RESEARCH.areas) || 
                        (window.CONFIG && CONFIG.research && CONFIG.research.areas);
    
    if (!researchData || researchData.length === 0) {
        const section = featuredResearch.closest('.content-section');
        if (section) section.style.display = 'none';
        return;
    }
    
    featuredResearch.innerHTML = '';
    
    // Get featured count from home config or default to 2
    const homeConfig = (window.CONFIG_HOME) || (window.CONFIG && CONFIG.home) || {};
    const featuredCount = homeConfig.featuredResearchCount || 2;
    
    const researchAreas = researchData
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
    
    if (!newsList) {
        return;
    }
    
    // Check for news data in CONFIG_NEWS or CONFIG
    const newsData = (window.CONFIG_NEWS && CONFIG_NEWS.articles) || 
                     (window.CONFIG && CONFIG.news && CONFIG.news.articles);
    
    if (!newsData || newsData.length === 0) {
        // Fall back to static news if available
        const homeConfig = (window.CONFIG_HOME) || (window.CONFIG && CONFIG.home) || {};
        if (homeConfig.news && homeConfig.news.length > 0) {
            displayStaticNews(newsList);
        } else {
            hideNewsSection(newsList);
        }
        return;
    }
    
    // Use news data from CONFIG_NEWS or CONFIG.news
    displayNewsFromData(newsList, newsData);
}

// Display news from CONFIG.news.articles
function displayNewsFromData(newsList, newsData) {
    newsList.innerHTML = '';
    
    // Sort news by date (newest first) and take first 5
    const recentNews = newsData
        .filter(article => article && article.title && article.summary)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    if (recentNews.length === 0) {
        hideNewsSection(newsList);
        return;
    }
    
    recentNews.forEach(article => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        // Add category class if available
        if (article.category) {
            newsItem.classList.add(`news-${article.category}`);
        }
        
        // Format date
        let displayDate = 'Recent';
        if (article.date) {
            const date = new Date(article.date);
            displayDate = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
        
        let newsHTML = `<span class="news-date">${displayDate}</span>`;
        
        newsHTML += '<div class="news-content-wrapper" style="flex: 1;">';
        
        // Title (use title if available, otherwise use first part of summary)
        const title = article.title;
        if (title) {
            newsHTML += `<h4 class="news-title" style="color: #333; font-size: 1.1rem; margin-bottom: 0.3rem; font-weight: 600;">${title}</h4>`;
        }
        
        // Summary/Content
        newsHTML += `<p class="news-content">${article.summary}</p>`;
        
        // Link to full article
        newsHTML += `<a href="news-article.html?id=${article.id}" class="news-link" style="color: #667eea; text-decoration: none; font-size: 0.9rem; font-weight: 500;">Read more →</a>`;
        
        newsHTML += '</div>';
        
        newsItem.innerHTML = newsHTML;
        newsList.appendChild(newsItem);
    });
    
    // Update the "View All News" link
    updateViewAllNewsLink();
}

// Display static news (fallback)
function displayStaticNews(newsList) {
    newsList.innerHTML = '';
    
    const homeConfig = (window.CONFIG_HOME) || (window.CONFIG && CONFIG.home) || {};
    const newsItems = (homeConfig.news || [])
        .filter(item => item && item.content)
        .slice(0, 5);
    
    if (newsItems.length === 0) {
        hideNewsSection(newsList);
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

// Hide news section if no news available
function hideNewsSection(newsList) {
    const section = newsList.closest('.content-section');
    if (section) section.style.display = 'none';
}

// Update the "View All News" link to point to news page
function updateViewAllNewsLink() {
    const viewAllLink = document.querySelector('.content-section .view-all-link');
    if (viewAllLink && viewAllLink.textContent.includes('News')) {
        viewAllLink.href = 'news.html';
        viewAllLink.textContent = 'View All News →';
    }
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

// Initialize Lab Name and Logo in Header
function initializeLabHeader() {
    const labNameElement = document.getElementById('lab-name');
    if (!labNameElement) return;
    
    // Get lab name and logo from CONFIG
    const labName = (window.CONFIG && CONFIG.labName) ? CONFIG.labName : 'AI-THENA Lab';
    const labLogo = (window.CONFIG && CONFIG.labLogo) ? CONFIG.labLogo : '';
    
    // Build the header content as a clickable link
    let headerHTML = '<a href="index.html" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit;">';
    
    // Add logo if it exists
    if (labLogo && labLogo !== '') {
        headerHTML += `<img src="${labLogo}" alt="${labName}" class="lab-logo" style="height: 40px; vertical-align: middle;">`;
    }
    
    // Add lab name
    headerHTML += `<span>${labName}</span>`;
    
    // Close the link
    headerHTML += '</a>';
    
    // Set the content
    labNameElement.innerHTML = headerHTML;
    
    // Make sure the logo class styling is applied
    labNameElement.style.display = 'flex';
    labNameElement.style.alignItems = 'center';
}