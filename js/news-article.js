// ===== NEWS ARTICLE PAGE JAVASCRIPT - UPDATED FOR NEW HTML STRUCTURE =====

let currentArticle = null;

document.addEventListener('DOMContentLoaded', function() {
    // Get article ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    console.log('=== NEWS ARTICLE PAGE ===');
    console.log('Article ID from URL:', articleId);
    
    if (articleId) {
        showLoading();
        loadArticle(articleId);
    } else {
        console.error('No article ID provided in URL');
        showErrorState('No article ID provided in the URL');
    }
    
    // Initialize animations
    if (typeof initializeAnimationObserver !== 'undefined') {
        initializeAnimationObserver();
    }
});

function showLoading() {
    document.getElementById('loading-state').style.display = 'block';
    document.getElementById('article-hero').style.display = 'none';
    document.getElementById('article-container').style.display = 'none';
    document.getElementById('error-state').style.display = 'none';
}

function showArticle() {
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('article-hero').style.display = 'block';
    document.getElementById('article-container').style.display = 'block';
    document.getElementById('error-state').style.display = 'none';
}

function showError() {
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('article-hero').style.display = 'none';
    document.getElementById('article-container').style.display = 'none';
    document.getElementById('error-state').style.display = 'block';
}

function loadArticle(articleId) {
    console.log('Attempting to load article:', articleId);
    
    // Wait for CONFIG to be loaded with multiple attempts
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds total
    
    const checkConfig = () => {
        attempts++;
        console.log(`Config check attempt ${attempts}`);
        
        if (typeof CONFIG !== 'undefined' && CONFIG.news && CONFIG.news.articles) {
            console.log('CONFIG found successfully');
            console.log('Available articles:', CONFIG.news.articles.map(a => a.id));
            
            // Find article in CONFIG data
            const article = CONFIG.news.articles.find(a => a.id === articleId);
            
            if (article) {
                console.log('Article found:', article.title);
                currentArticle = article;
                populateArticle(article);
                showArticle();
            } else {
                console.error('Article not found with ID:', articleId);
                console.log('Available article IDs:', CONFIG.news.articles.map(a => a.id));
                showErrorState(`Article with ID "${articleId}" not found`);
            }
        } else if (attempts < maxAttempts) {
            console.log('CONFIG not ready, retrying...');
            setTimeout(checkConfig, 100);
        } else {
            console.error('CONFIG failed to load after maximum attempts');
            console.log('CONFIG state:', typeof CONFIG);
            if (typeof CONFIG !== 'undefined') {
                console.log('CONFIG.news state:', CONFIG.news);
            }
            showErrorState('Configuration failed to load. Please refresh the page.');
        }
    };
    
    checkConfig();
}

function populateArticle(article) {
    console.log('Populating article:', article.title);
    
    try {
        // Update page title
        document.title = `${article.title} - AI-THENA Lab`;
        
        // Breadcrumb
        const breadcrumbTitle = document.getElementById('breadcrumb-title');
        if (breadcrumbTitle) {
            breadcrumbTitle.textContent = article.title.length > 50 ? 
                article.title.substring(0, 50) + '...' : article.title;
        }
        
        // Category
        const categoryElement = document.getElementById('article-category');
        if (categoryElement && article.category) {
            const categoryData = CONFIG.news.categories?.find(cat => cat.value === article.category);
            categoryElement.textContent = categoryData ? categoryData.label : article.category.toUpperCase();
            categoryElement.className = `article-category ${article.category}`;
        }
        
        // Title
        const titleElement = document.getElementById('article-title');
        if (titleElement) titleElement.textContent = article.title;
        
        // Date
        const dateElement = document.getElementById('article-date');
        if (dateElement && article.date) {
            const date = new Date(article.date);
            dateElement.textContent = date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        // Author
        const authorElement = document.getElementById('article-author');
        if (authorElement) {
            authorElement.textContent = article.author || 'AI-THENA Lab';
        }
        
        // Read time (estimate based on content length)
        const readTimeElement = document.getElementById('article-read-time');
        if (readTimeElement && article.content) {
            const wordCount = article.content.split(' ').length;
            const readTime = Math.ceil(wordCount / 200); // Average reading speed
            readTimeElement.textContent = `${readTime} min read`;
        } else if (readTimeElement) {
            readTimeElement.textContent = '3 min read';
        }
        
        // Summary
        const summaryElement = document.getElementById('article-summary');
        if (summaryElement && article.summary) {
            summaryElement.textContent = article.summary;
        }
        
        // Image
        const imageElement = document.getElementById('article-image');
        if (imageElement && article.image) {
            imageElement.src = article.image;
            imageElement.alt = article.title;
            imageElement.style.display = 'block';
            
            // Handle image load errors
            imageElement.onerror = function() {
                console.log('Image failed to load:', article.image);
                this.style.display = 'none';
            };
        }
        
        // Content
        const contentElement = document.getElementById('article-content-body');
        if (contentElement) {
            if (article.content) {
                contentElement.innerHTML = article.content;
            } else {
                // Fallback content if no detailed content is available
                contentElement.innerHTML = `
                    <p>${article.summary || 'Content for this article is currently being prepared.'}</p>
                    <p>For more information about this topic, please contact our lab through the contact page.</p>
                `;
            }
        }
        
        // Tags
        const tagsContainer = document.getElementById('article-tags');
        if (tagsContainer && article.tags && article.tags.length > 0) {
            tagsContainer.innerHTML = '';
            article.tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'article-tag';
                tagElement.textContent = tag;
                tagsContainer.appendChild(tagElement);
            });
            tagsContainer.style.display = 'flex';
        } else if (tagsContainer) {
            tagsContainer.style.display = 'none';
        }
        
        // Links
        const linksContainer = document.getElementById('article-links');
        const linksContent = document.getElementById('article-links-container');
        if (linksContainer && linksContent && article.links && article.links.length > 0) {
            linksContent.innerHTML = '';
            article.links.forEach(link => {
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.textContent = link.text;
                linkElement.target = '_blank';
                linkElement.rel = 'noopener noreferrer';
                linksContent.appendChild(linkElement);
            });
            linksContainer.style.display = 'block';
        } else if (linksContainer) {
            linksContainer.style.display = 'none';
        }
        
        console.log('Article populated successfully');
        
    } catch (error) {
        console.error('Error populating article:', error);
        showErrorState('Error loading article content');
    }
}

function loadRelatedArticles(currentArticle) {
    // Related articles functionality has been removed
    // This function is kept for compatibility but does nothing
    return;
}

function createRelatedCard(article) {
    // Related cards functionality has been removed
    // This function is kept for compatibility but does nothing
    return document.createElement('div');
}

function showErrorState(errorMessage = 'Article not found') {
    console.log('Showing error state:', errorMessage);
    
    const errorMessageElement = document.getElementById('error-message');
    if (errorMessageElement) {
        errorMessageElement.textContent = errorMessage;
    }
    
    showError();
}

// Function to share article (optional enhancement)
function shareArticle() {
    if (navigator.share && currentArticle) {
        navigator.share({
            title: currentArticle.title,
            text: currentArticle.summary,
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('Article URL copied to clipboard!');
        }).catch(err => {
            console.log('Failed to copy URL:', err);
            // Fallback: show URL in prompt
            prompt('Copy this URL:', window.location.href);
        });
    }
}

// Export function for potential use
window.shareArticle = shareArticle;