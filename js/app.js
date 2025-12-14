/**
 * MAIN APPLICATION
 * Central initialization and orchestration
 */

const App = {
    currentPage: null,
    initialized: false,

    /**
     * Initialize application
     */
    init() {
        console.log('🚀 Initializing AI-THENA Lab Application...');

        // Wait for CONFIG to be ready
        ConfigLoader.waitForConfig((config) => {
            if (!config) {
                console.error('❌ Failed to load configuration');
                this._showError('Configuration failed to load. Please refresh the page.');
                return;
            }

            console.log('✅ Configuration loaded successfully');

            // Validate config
            if (!ConfigLoader.validate()) {
                console.warn('⚠️ Some configuration fields are missing');
            }

            // Initialize core components
            this._initializeCore();

            // Initialize page-specific module
            this._initializePage();

            this.initialized = true;
            console.log('✅ Application initialized successfully');
        }, 5000);
    },

    /**
     * Initialize core components
     * @private
     */
    _initializeCore() {
        // Initialize navigation (header/footer/mobile menu)
        Navigation.init();

        // Initialize image error handling
        ImageHandler.initializeAll();

        // Initialize animations (if available)
        if (typeof initializeAnimationObserver !== 'undefined') {
            initializeAnimationObserver();
        }
    },

    /**
     * Initialize page-specific module
     * @private
     */
    _initializePage() {
        this.currentPage = this._detectCurrentPage();
        console.log(`📄 Loading page: ${this.currentPage}`);

        const pageModules = {
            'index.html': window.HomePage,
            'home': window.HomePage,
            'research.html': window.ResearchPage,
            'team.html': window.TeamPage,
            'publications.html': window.PublicationsPage,
            'news.html': window.NewsPage,
            'news-article.html': window.NewsArticlePage,
            'contact.html': window.ContactPage,
            'member-profile.html': window.MemberProfilePage
        };

        const pageModule = pageModules[this.currentPage];

        if (pageModule && pageModule.init) {
            try {
                pageModule.init();
                console.log(`✅ ${this.currentPage} module loaded`);
            } catch (error) {
                console.error(`❌ Error loading ${this.currentPage}:`, error);
                this._showError(`Failed to load page content: ${error.message}`);
            }
        } else {
            console.warn(`⚠️ No module found for page: ${this.currentPage}`);
        }
    },

    /**
     * Detect current page from URL
     * @private
     */
    _detectCurrentPage() {
        const path = window.location.pathname;
        let page = path.substring(path.lastIndexOf('/') + 1);

        // Default to index.html
        if (!page || page === '') {
            page = 'index.html';
        }

        return page;
    },

    /**
     * Show error message to user
     * @private
     */
    _showError(message) {
        const main = document.querySelector('main');
        if (main) {
            const errorDiv = DOMUtils.createElement('div', ['error-message']);
            errorDiv.style.cssText = `
                background: #fee;
                border: 2px solid #fcc;
                border-radius: 8px;
                padding: 2rem;
                margin: 2rem;
                text-align: center;
                color: #c33;
            `;
            errorDiv.innerHTML = `
                <h3>⚠️ Error</h3>
                <p>${message}</p>
            `;
            main.insertBefore(errorDiv, main.firstChild);
        }
    },

    /**
     * Global error handler
     */
    handleError(error, context = '') {
        console.error(`❌ Error${context ? ` in ${context}` : ''}:`, error);

        // Log to external service if needed
        // Analytics.logError(error, context);
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Global error handler
window.addEventListener('error', (event) => {
    App.handleError(event.error, 'Global');
});

// Export for debugging
window.App = App;