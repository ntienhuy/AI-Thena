/**
 * NEWS ARTICLE PAGE MODULE
 * Handles individual news article display
 */

const NewsArticlePage = {
    currentArticle: null,

    /**
     * Initialize news article page
     */
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');

        console.log('=== NEWS ARTICLE PAGE ===');
        console.log('Article ID from URL:', articleId);

        if (articleId) {
            this._showLoading();
            this.loadArticle(articleId);
        } else {
            console.error('No article ID provided in URL');
            this._showError('No article ID provided in the URL');
        }
    },

    /**
     * Load article by ID
     */
    loadArticle(articleId) {
        console.log('Attempting to load article:', articleId);

        const articles = ConfigLoader.get('news.articles', []);

        if (articles.length === 0) {
            console.error('No articles available in CONFIG');
            this._showError('No articles available');
            return;
        }

        console.log('Available articles:', articles.map(a => a.id));

        const article = articles.find(a => a.id === articleId);

        if (article) {
            console.log('Article found:', article.title);
            this.currentArticle = article;
            this._populateArticle(article);
            this._showArticle();
        } else {
            console.error('Article not found with ID:', articleId);
            this._showError(`Article with ID "${articleId}" not found`);
        }
    },

    /**
     * Populate article content
     * @private
     */
    _populateArticle(article) {
        console.log('Populating article:', article.title);

        try {
            // Update page title
            document.title = `${article.title} - AI-THENA Lab`;

            // Breadcrumb
            DOMUtils.setText('breadcrumb-title', StringUtils.truncate(article.title, 50));

            // Category
            const categoryElement = document.getElementById('article-category');
            if (categoryElement && article.category) {
                const categories = ConfigLoader.get('news.categories', []);
                const categoryData = categories.find(cat => cat.value === article.category);
                categoryElement.textContent = categoryData ? categoryData.label : article.category.toUpperCase();
                categoryElement.className = `article-category ${article.category}`;
            }

            // Title
            DOMUtils.setText('article-title', article.title);

            // Date
            const dateElement = document.getElementById('article-date');
            if (dateElement && article.date) {
                dateElement.textContent = DateUtils.toDisplay(article.date);
            }

            // Author
            DOMUtils.setText('article-author', article.author || 'AI-THENA Lab');

            // Read time
            const readTimeElement = document.getElementById('article-read-time');
            if (readTimeElement && article.content) {
                const readTime = StringUtils.estimateReadTime(article.content);
                readTimeElement.textContent = `${readTime} min read`;
            } else if (readTimeElement) {
                readTimeElement.textContent = '3 min read';
            }

            // Summary
            DOMUtils.setText('article-summary', article.summary || '');

            // Image
            const imageElement = document.getElementById('article-image');
            if (imageElement && article.image) {
                imageElement.src = article.image;
                imageElement.alt = article.title;
                DOMUtils.toggle(imageElement, true);

                imageElement.onerror = function () {
                    console.log('Image failed to load:', article.image);
                    DOMUtils.toggle(this, false);
                };
            } else if (imageElement) {
                DOMUtils.toggle(imageElement, false);
            }

            // Content
            const contentElement = document.getElementById('article-content-body');
            if (contentElement) {
                if (article.content) {
                    contentElement.innerHTML = article.content;
                } else {
                    contentElement.innerHTML = `
                        <p>${article.summary || 'Content for this article is currently being prepared.'}</p>
                        <p>For more information about this topic, please contact our lab through the contact page.</p>
                    `;
                }
            }

            // Tags
            const tagsContainer = document.getElementById('article-tags');
            if (tagsContainer && article.tags && article.tags.length > 0) {
                DOMUtils.clear(tagsContainer);
                article.tags.forEach(tag => {
                    const tagElement = DOMUtils.createElement('span', ['article-tag'], tag);
                    tagsContainer.appendChild(tagElement);
                });
                DOMUtils.toggle(tagsContainer, true);
            } else if (tagsContainer) {
                DOMUtils.toggle(tagsContainer, false);
            }

            // Links
            const linksContainer = document.getElementById('article-links');
            const linksContent = document.getElementById('article-links-container');
            if (linksContainer && linksContent && article.links && article.links.length > 0) {
                DOMUtils.clear(linksContent);
                article.links.forEach(link => {
                    const linkElement = document.createElement('a');
                    linkElement.href = link.url;
                    linkElement.textContent = link.text;
                    linkElement.target = '_blank';
                    linkElement.rel = 'noopener noreferrer';
                    linksContent.appendChild(linkElement);
                });
                DOMUtils.toggle(linksContainer, true);
            } else if (linksContainer) {
                DOMUtils.toggle(linksContainer, false);
            }

            console.log('Article populated successfully');

        } catch (error) {
            console.error('Error populating article:', error);
            this._showError('Error loading article content');
        }
    },

    /**
     * Show loading state
     * @private
     */
    _showLoading() {
        DOMUtils.toggle('loading-state', true);
        DOMUtils.toggle('article-hero', false);
        DOMUtils.toggle('article-container', false);
        DOMUtils.toggle('error-state', false);
    },

    /**
     * Show article state
     * @private
     */
    _showArticle() {
        DOMUtils.toggle('loading-state', false);
        DOMUtils.toggle('article-hero', true);
        DOMUtils.toggle('article-container', true);
        DOMUtils.toggle('error-state', false);
    },

    /**
     * Show error state
     * @private
     */
    _showError(errorMessage = 'Article not found') {
        console.log('Showing error state:', errorMessage);

        const errorMessageElement = document.getElementById('error-message');
        if (errorMessageElement) {
            errorMessageElement.textContent = errorMessage;
        }

        DOMUtils.toggle('loading-state', false);
        DOMUtils.toggle('article-hero', false);
        DOMUtils.toggle('article-container', false);
        DOMUtils.toggle('error-state', true);
    },

    /**
     * Share article (optional enhancement)
     */
    share() {
        if (navigator.share && this.currentArticle) {
            navigator.share({
                title: this.currentArticle.title,
                text: this.currentArticle.summary,
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: copy URL to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Article URL copied to clipboard!');
            }).catch(err => {
                console.log('Failed to copy URL:', err);
                prompt('Copy this URL:', window.location.href);
            });
        }
    }
};

// Export for use in app.js
window.NewsArticlePage = NewsArticlePage;

// Export share function for potential use
window.shareArticle = function () {
    NewsArticlePage.share();
};