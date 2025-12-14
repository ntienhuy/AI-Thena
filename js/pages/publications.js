/**
 * PUBLICATIONS PAGE MODULE
 * Handles publications with filtering and pagination
 */

const PublicationsPage = {
    allPublications: [],
    filteredPublications: [],
    publicationPagination: null,

    /**
     * Initialize publications page
     */
    init() {
        this.setPageHeader();
        this.loadPublications();
        this.updateStatistics();
        this.setFeaturedPublications();
        this.initializeFilters();
        this.initializeSearch();
        this.displayPublications();
    },

    /**
     * Set page header
     */
    setPageHeader() {
        DOMUtils.setText(
            document.querySelector('.page-hero h1'),
            ConfigLoader.get('publications.pageTitle', 'Publications')
        );
        DOMUtils.setText(
            document.querySelector('.page-hero p'),
            ConfigLoader.get('publications.pageSubtitle', 'Our research publications')
        );
    },

    /**
     * Load publications
     */
    loadPublications() {
        this.allPublications = ConfigLoader.get('publications.publications', []);

        // Sort by year (newest first)
        this.allPublications.sort((a, b) => b.year - a.year);
        this.filteredPublications = [...this.allPublications];

        // Create pagination
        this.publicationPagination = Pagination.create('publications', {
            itemsPerPage: 10,
            onPageChange: () => this.displayPublications()
        });
    },

    /**
     * Update statistics
     */
    updateStatistics() {
        const totalPubs = document.getElementById('total-publications');
        const totalJournals = document.getElementById('total-journals');
        const totalConferences = document.getElementById('total-conferences');

        if (totalPubs && totalJournals && totalConferences) {
            totalPubs.textContent = this.allPublications.length;

            const journalCount = this.allPublications.filter(p => p.venueType === 'journal').length;
            totalJournals.textContent = journalCount;

            const conferenceCount = this.allPublications.filter(p => p.venueType === 'conference').length;
            totalConferences.textContent = conferenceCount;
        }

        // Update metrics if available
        const stats = ConfigLoader.get('publications.stats', {});
        const metricsGrid = document.querySelector('.metrics-grid');

        if (metricsGrid && Object.keys(stats).length > 0) {
            DOMUtils.clear(metricsGrid);

            const metrics = [
                { value: stats.citations, label: 'Total Citations' },
                { value: stats.hIndex, label: 'h-index' },
                { value: stats.awards, label: 'Awards Received' },
                { value: stats.bestPapers, label: 'Best Paper Awards' }
            ];

            metrics.forEach(metric => {
                if (metric.value) {
                    const card = DOMUtils.createElement('div', ['metric-card']);
                    card.innerHTML = `
                        <h3>${metric.value}</h3>
                        <p>${metric.label}</p>
                    `;
                    metricsGrid.appendChild(card);
                }
            });
        }
    },

    /**
     * Set featured publications
     */
    setFeaturedPublications() {
        const featuredPubs = document.querySelector('.featured-publications');
        if (!featuredPubs) return;

        const featured = ConfigLoader.get('publications.featured', []);

        if (featured.length === 0) {
            DOMUtils.hideIfEmpty(featuredPubs);
            return;
        }

        DOMUtils.clear(featuredPubs);

        featured
            .filter(pub => pub && pub.title)
            .slice(0, 2)
            .forEach(pub => {
                const featuredDiv = DOMUtils.createElement('div', ['featured-pub']);

                const links = [];
                if (pub.pdf) links.push(`<a href="${pub.pdf}" class="pub-link">PDF</a>`);
                if (pub.arxiv) links.push(`<a href="${pub.arxiv}" class="pub-link">arXiv</a>`);
                if (pub.code) links.push(`<a href="${pub.code}" class="pub-link">Code</a>`);

                featuredDiv.innerHTML = `
                    ${pub.award ? `<div class="pub-badge">${pub.award}</div>` : ''}
                    <h3>${pub.title}</h3>
                    ${pub.authors ? `<p class="pub-authors">${pub.authors.join(', ')}</p>` : ''}
                    ${pub.venue ? `<p class="pub-venue">${pub.venue}</p>` : ''}
                    ${pub.abstract ? `<p class="pub-abstract">${pub.abstract}</p>` : ''}
                    ${links.length > 0 ? `<div class="pub-links">${links.join('')}</div>` : ''}
                `;

                featuredPubs.appendChild(featuredDiv);
            });
    },

    /**
     * Initialize filters
     */
    initializeFilters() {
        const filterControls = document.querySelector('.filter-controls');
        if (!filterControls) return;

        // Button filters
        filterControls.addEventListener('click', (e) => {
            if (e.target.matches('.filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                const filter = e.target.getAttribute('data-filter');
                this.applyFilter(filter);
            }
        });

        // Select filter
        const filterSelect = document.querySelector('.filter-select');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                this.applyFilter(e.target.value);
            });
        }
    },

    /**
     * Initialize search
     */
    initializeSearch() {
        const searchInput = document.getElementById('publication-search');
        if (!searchInput) return;

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();

            if (query === '') {
                this.displayPublications();
            } else {
                const searched = this.filteredPublications.filter(pub =>
                    pub.title.toLowerCase().includes(query) ||
                    (pub.authors && pub.authors.some(a => a.toLowerCase().includes(query))) ||
                    (pub.venue && pub.venue.toLowerCase().includes(query))
                );

                Pagination.reset('publications');
                this._displayFilteredPublications(searched);
            }
        });
    },

    /**
     * Apply filter
     */
    applyFilter(filter) {
        let filtered = [];

        if (filter === 'all') {
            filtered = [...this.allPublications];
        } else if (filter === 'journal') {
            filtered = this.allPublications.filter(p => p.venueType === 'journal');
        } else if (filter === 'conference') {
            filtered = this.allPublications.filter(p => p.venueType === 'conference');
        } else {
            // Filter by year
            filtered = this.allPublications.filter(p => p.year == filter);
        }

        this.filteredPublications = filtered;
        Pagination.reset('publications');
        this.displayPublications();
    },

    /**
     * Display publications
     */
    displayPublications() {
        this._displayFilteredPublications(this.filteredPublications);
    },

    /**
     * Display filtered publications
     * @private
     */
    _displayFilteredPublications(publications) {
        const publicationsList = document.getElementById('publications-list');
        const paginationContainer = document.getElementById('pagination-container');

        if (!publicationsList) return;

        // Sort by year
        publications.sort((a, b) => b.year - a.year);

        if (publications.length === 0) {
            publicationsList.innerHTML = '<p style="text-align: center; color: #666;">No publications found.</p>';
            if (paginationContainer) DOMUtils.toggle(paginationContainer, false);
            return;
        }

        DOMUtils.clear(publicationsList);

        // Get current page items
        const currentPublications = Pagination.getCurrentPageItems('publications', publications);

        // Display publications
        currentPublications.forEach(publication => {
            const pubEntry = CardFactory.createPublicationCard(publication);
            if (pubEntry) publicationsList.appendChild(pubEntry);
        });

        // Update pagination info
        const paginationInfo = document.getElementById('pagination-info');
        if (paginationInfo) {
            Pagination.renderInfo('publications', paginationInfo, publications.length);
        }

        // Render pagination controls
        if (paginationContainer) {
            Pagination.render('publications', paginationContainer, publications.length);
        }
    }
};

// Export for use in app.js
window.PublicationsPage = PublicationsPage;