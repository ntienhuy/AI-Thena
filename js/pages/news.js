/**
 * NEWS PAGE MODULE
 * Handles news with filtering, search and pagination
 */

const NewsPage = {
    allNews: [],
    filteredNews: [],
    newsPagination: null,

    /**
     * Initialize news page
     */
    init() {
        this.setPageHeader();
        this.loadNews();
        this.initializeFilters();
        this.initializeSearch();
        this.displayNews();
    },

    /**
     * Set page header
     */
    setPageHeader() {
        DOMUtils.setText(
            document.getElementById('page-title'),
            ConfigLoader.get('news.pageTitle', 'News & Updates')
        );
        DOMUtils.setText(
            document.getElementById('page-subtitle'),
            ConfigLoader.get('news.pageSubtitle', 'Latest news from our lab')
        );
    },

    /**
     * Load news
     */
    loadNews() {
        this.allNews = ConfigLoader.get('news.articles', []);

        // Sort by date (newest first)
        this.allNews.sort((a, b) => DateUtils.sortNewest(a.date, b.date));
        this.filteredNews = [...this.allNews];

        // Create pagination
        const itemsPerPage = ConfigLoader.get('news.display.articlesPerPage', 6);
        this.newsPagination = Pagination.create('news', {
            itemsPerPage,
            onPageChange: () => this.displayNews()
        });
    },

    /**
     * Initialize filters
     */
    initializeFilters() {
        // Category filter
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            const categories = ConfigLoader.get('news.categories', []);

            DOMUtils.clear(categoryFilter);
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.value;
                option.textContent = category.label;
                categoryFilter.appendChild(option);
            });

            categoryFilter.addEventListener('change', () => this.applyFilters());
        }

        // Year filter
        const yearFilter = document.getElementById('year-filter');
        if (yearFilter) {
            const years = [...new Set(this.allNews.map(article => new Date(article.date).getFullYear()))];
            years.sort((a, b) => b - a);

            DOMUtils.clear(yearFilter);
            yearFilter.innerHTML = '<option value="all">All Years</option>';
            years.forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearFilter.appendChild(option);
            });

            yearFilter.addEventListener('change', () => this.applyFilters());
        }
    },

    /**
     * Initialize search
     */
    initializeSearch() {
        const searchInput = document.getElementById('news-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', () => this.applyFilters());
    },

    /**
     * Apply filters
     */
    applyFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const yearFilter = document.getElementById('year-filter');
        const searchInput = document.getElementById('news-search');

        const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
        const selectedYear = yearFilter ? yearFilter.value : 'all';
        const searchQuery = searchInput ? searchInput.value.toLowerCase() : '';

        this.filteredNews = this.allNews.filter(article => {
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

        Pagination.reset('news');
        this.displayNews();
    },

    /**
     * Display news
     */
    displayNews() {
        const newsContainer = document.getElementById('news-grid');
        const noResults = document.getElementById('no-results');

        if (!newsContainer) return;

        // Check if empty
        if (this.filteredNews.length === 0) {
            DOMUtils.toggle(newsContainer, false);
            if (noResults) DOMUtils.toggle(noResults, true);

            const pagination = document.getElementById('pagination');
            if (pagination) DOMUtils.toggle(pagination, false);
            return;
        } else {
            DOMUtils.toggle(newsContainer, true);
            if (noResults) DOMUtils.toggle(noResults, false);
        }

        // Get current page items
        const articlesToShow = Pagination.getCurrentPageItems('news', this.filteredNews);

        // Clear and populate
        DOMUtils.clear(newsContainer);
        articlesToShow.forEach(article => {
            const newsCard = CardFactory.createNewsCard(article);
            if (newsCard) newsContainer.appendChild(newsCard);
        });

        // Update pagination
        const pagination = document.getElementById('pagination');
        if (pagination) {
            Pagination.render('news', pagination, this.filteredNews.length);
        }
    }
};

// Export for use in app.js
window.NewsPage = NewsPage;