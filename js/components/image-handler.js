/**
 * IMAGE HANDLER
 * Unified image loading and fallback handling
 */

const ImageHandler = {
    /**
     * Handle image loading error
     * @param {HTMLImageElement} img - Image element
     */
    handleError(img) {
        if (!img || img.dataset.errorHandled === 'true') return;

        img.dataset.errorHandled = 'true';

        // Try lab logo first
        const labLogo = ConfigLoader.get('labLogo', '');
        if (labLogo && labLogo !== '' && img.src !== labLogo) {
            img.src = labLogo;
            img.style.objectFit = 'contain';
            img.style.padding = '10px';
            img.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        } else {
            // Replace with initials avatar
            this.replaceWithAvatar(img);
        }
    },

    /**
     * Replace image with initials avatar
     * @param {HTMLImageElement} img - Image element
     */
    replaceWithAvatar(img) {
        const name = img.alt || img.dataset.name || 'Unknown';
        const avatar = this.createAvatar(name);

        // Copy classes
        if (img.className) {
            avatar.className = img.className;
        }

        // Replace image with avatar
        img.parentNode.replaceChild(avatar, img);
    },

    /**
     * Create initials avatar element
     * @param {String} name - Person's name
     * @param {Object} options - Styling options
     */
    createAvatar(name, options = {}) {
        const {
            size = '100px',
            fontSize = '2rem',
            bgColor = 'linear-gradient(45deg, #667eea, #764ba2)',
            textColor = 'white'
        } = options;

        const initials = StringUtils.getInitials(name);
        const avatar = document.createElement('div');
        avatar.className = 'member-avatar-fallback';
        avatar.textContent = initials;

        // Apply styles
        Object.assign(avatar.style, {
            width: size,
            height: size,
            borderRadius: '50%',
            margin: '0 auto 1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: bgColor,
            color: textColor,
            fontSize: fontSize,
            fontWeight: 'bold'
        });

        return avatar;
    },

    /**
     * Initialize image error handling for all images on page
     */
    initializeAll() {
        // Handle existing images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add error handler
            img.addEventListener('error', () => this.handleError(img));

            // Check if already broken
            if (img.complete && img.naturalHeight === 0) {
                this.handleError(img);
            }
        });

        // Watch for dynamically added images
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.tagName === 'IMG') {
                        node.addEventListener('error', () => this.handleError(node));
                    } else if (node.querySelectorAll) {
                        const imgs = node.querySelectorAll('img');
                        imgs.forEach(img => {
                            img.addEventListener('error', () => this.handleError(img));
                        });
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    /**
     * Create placeholder image data URL
     * @param {String} text - Text to display
     * @param {Number} size - Size in pixels
     */
    createPlaceholder(text, size = 100) {
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');

        // Gradient background
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);

        // Text
        ctx.fillStyle = 'white';
        ctx.font = `bold ${size / 3}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, size / 2, size / 2);

        return canvas.toDataURL();
    }
};

// Export for use in modules
window.ImageHandler = ImageHandler;

// Global error handler function for inline onerror
window.handleImageError = function (img) {
    ImageHandler.handleError(img);
};