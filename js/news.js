// ===== NEWS PAGE JAVASCRIPT =====

let allNews = [];
let filteredNews = [];
let currentPage = 1;
let itemsPerPage = 6;

document.addEventListener('DOMContentLoaded', function() {
    if (typeof CONFIG !== 'undefined') {
        initializeNewsPage();
        initializeAnimationObserver();
    } else {
        setTimeout(function() {
            if (typeof CONFIG !== 'undefined') {
                initializeNewsPage();
                initializeAnimationObserver();
            }
        }, 100);
    }
});

function initializeNewsPage() {
    // Set page title and subtitle
    const pageTitle = document.getElementById('page-title');
    const pageSubtitle = document.getElementById('page-subtitle');
    
    if (pageTitle && CONFIG.news?.pageTitle) {
        pageTitle.textContent = CONFIG.news.pageTitle;
    }
    if (pageSubtitle && CONFIG.news?.pageSubtitle) {
        pageSubtitle.textContent = CONFIG.news.pageSubtitle;
    }
    
    // Store all news articles
    allNews = CONFIG.news?.articles || [];
    filteredNews = [...allNews];
    
    // Sort news by date (newest first)
    allNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Set items per page from config
    itemsPerPage = CONFIG.news?.display?.articlesPerPage || 6;
    
    // Initialize components
    initializeFilters();
    initializeSearch();
    displayNews();
    
    console.log('News page initialized with', allNews.length, 'articles');
}

function initializeFilters() {
    // Populate category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter && CONFIG.news?.categories) {
        categoryFilter.innerHTML = '';
        CONFIG.news.categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.value;
            option.textContent = category.label;
            categoryFilter.appendChild(option);
        });
        
        categoryFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    // Populate year filter
    const yearFilter = document.getElementById('year-filter');
    if (yearFilter) {
        const years = [...new Set(allNews.map(article => new Date(article.date).getFullYear()))];
        years.sort((a, b) => b - a);
        
        yearFilter.innerHTML = '<option value="all">All Years</option>';
        years.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearFilter.appendChild(option);
        });
        
        yearFilter.addEventListener('change', function() {
            applyFilters();
        });
    }
}

function initializeSearch() {
    const searchInput = document.getElementById('news-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilters();
        });
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const yearFilter = document.getElementById('year-filter');
    const searchInput = document.getElementById('news-search');
    
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const selectedYear = yearFilter ? yearFilter.value : 'all';
    const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';
    
    filteredNews = allNews.filter(article => {
        // Category filter
        const categoryMatch = selectedCategory === 'all' || article.category === selectedCategory;
        
        // Year filter
        const articleYear = new Date(article.date).getFullYear().toString();
        const yearMatch = selectedYear === 'all' || articleYear === selectedYear;
        
        // Search filter
        const searchMatch = searchQuery === '' || 
            article.title.toLowerCase().includes(searchQuery) ||
            article.summary.toLowerCase().includes(searchQuery) ||
            (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchQuery)));
        
        return categoryMatch && yearMatch && searchMatch;
    });
    
    currentPage = 1;
    displayNews();
}

function displayFeaturedNews() {
    // Featured news section has been removed
    // This function is kept for compatibility but does nothing
    return;
}

function displayNews() {
    const newsContainer = document.getElementById('news-grid');
    const noResults = document.getElementById('no-results');
    
    if (!newsContainer) return;
    
    // Hide/show no results message
    if (filteredNews.length === 0) {
        newsContainer.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        document.getElementById('pagination').style.display = 'none';
        return;
    } else {
        newsContainer.style.display = 'grid';
        if (noResults) noResults.style.display = 'none';
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const articlesToShow = filteredNews.slice(startIndex, endIndex);
    
    // Clear and populate news container
    newsContainer.innerHTML = '';
    articlesToShow.forEach(article => {
        const newsCard = createNewsCard(article, false);
        newsContainer.appendChild(newsCard);
    });
    
    // Update pagination
    updatePagination();
}

function createNewsCard(article, isFeatured = false) {
    const card = document.createElement('div');
    card.className = 'news-card';
    
    // Debug logging
    console.log('Creating news card for article:', article.id, article.title);
    
    // Format date
    const date = new Date(article.date);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Create category badge with appropriate class
    const categoryClass = article.category ? article.category : '';
    
    let cardHTML = '';
    
    // Featured badge
    if (article.featured && isFeatured) {
        cardHTML += '<span class="featured-badge">Featured</span>';
    }
    
    // Article image (placeholder if none)
    if (article.image) {
        cardHTML += `<img src="${article.image}" alt="${article.title}" class="news-card-image" onerror="this.style.display='none'">`;
    } else {
        cardHTML += '<div class="news-card-image"></div>';
    }
    
    cardHTML += '<div class="news-card-content">';
    
    // Category badge
    if (article.category && CONFIG.news?.display?.showCategories) {
        const categoryLabel = CONFIG.news.categories.find(cat => cat.value === article.category)?.label || article.category;
        cardHTML += `<span class="news-category ${categoryClass}">${categoryLabel}</span>`;
    }
    
    // Title
    cardHTML += `<h3 class="news-title">${article.title}</h3>`;
    
    // Meta information
    cardHTML += '<div class="news-meta">';
    cardHTML += `<span class="news-date">📅 ${formattedDate}</span>`;
    if (CONFIG.news?.display?.showAuthor && article.author) {
        cardHTML += `<span class="news-author">By ${article.author}</span>`;
    }
    cardHTML += '</div>';
    
    // Summary
    if (article.summary) {
        cardHTML += `<p class="news-summary">${article.summary}</p>`;
    }
    
    // Tags
    if (article.tags && article.tags.length > 0 && CONFIG.news?.display?.showTags) {
        cardHTML += '<div class="news-tags">';
        article.tags.slice(0, 3).forEach(tag => {
            cardHTML += `<span class="news-tag">${tag}</span>`;
        });
        cardHTML += '</div>';
    }
    
    // Read more link
    const articleUrl = `news-article.html?id=${article.id}`;
    cardHTML += `<a href="${articleUrl}" class="read-more-btn">Read More →</a>`;
    
    cardHTML += '</div>';
    
    card.innerHTML = cardHTML;
    
    // Add click handler for the entire card
    card.addEventListener('click', function(e) {
        // Don't navigate if clicking on the read more link (let it handle navigation)
        if (!e.target.classList.contains('read-more-btn')) {
            console.log('Card clicked, navigating to:', articleUrl);
            window.location.href = articleUrl;
        }
    });
    
    card.style.cursor = 'pointer';
    
    return card;
}

function updatePagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayNews();
            scrollToTop();
        }
    });
    paginationContainer.appendChild(prevBtn);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    if (startPage > 1) {
        const firstBtn = createPageButton(1);
        paginationContainer.appendChild(firstBtn);
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0.5rem';
            paginationContainer.appendChild(ellipsis);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i);
        paginationContainer.appendChild(pageBtn);
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0.5rem';
            paginationContainer.appendChild(ellipsis);
        }
        const lastBtn = createPageButton(totalPages);
        paginationContainer.appendChild(lastBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayNews();
            scrollToTop();
        }
    });
    paginationContainer.appendChild(nextBtn);
}

function createPageButton(pageNum) {
    const btn = document.createElement('button');
    btn.textContent = pageNum;
    if (pageNum === currentPage) {
        btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
        currentPage = pageNum;
        displayNews();
        scrollToTop();
    });
    return btn;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to get news article by ID (for linking)
function getNewsArticleById(id) {
    return allNews.find(article => article.id === id);
}

// Export function for use in news article page
window.getNewsArticleById = getNewsArticleById;