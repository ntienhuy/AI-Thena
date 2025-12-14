/**
 * DOM UTILITIES
 * Reusable DOM manipulation helpers
 */

const DOMUtils = {
    /**
     * Safely set element text content
     * @param {String|Element} elementOrId - Element or ID
     * @param {String} text - Text to set
     */
    setText(elementOrId, text) {
        const element = this._getElement(elementOrId);
        if (element) {
            element.textContent = text || '';
        }
    },

    /**
     * Safely set element HTML content
     * @param {String|Element} elementOrId - Element or ID
     * @param {String} html - HTML to set
     */
    setHTML(elementOrId, html) {
        const element = this._getElement(elementOrId);
        if (element) {
            element.innerHTML = html || '';
        }
    },

    /**
     * Show or hide element
     * @param {String|Element} elementOrId - Element or ID
     * @param {Boolean} show - True to show, false to hide
     */
    toggle(elementOrId, show) {
        const element = this._getElement(elementOrId);
        if (element) {
            element.style.display = show ? '' : 'none';
        }
    },

    /**
     * Create element with classes and content
     * @param {String} tag - HTML tag name
     * @param {Array|String} classes - Class names
     * @param {String|Element} content - Text or child element
     */
    createElement(tag, classes = [], content = null) {
        const element = document.createElement(tag);

        // Add classes
        if (Array.isArray(classes)) {
            element.classList.add(...classes);
        } else if (classes) {
            element.className = classes;
        }

        // Add content
        if (content !== null) {
            if (typeof content === 'string') {
                element.textContent = content;
            } else if (content instanceof Element) {
                element.appendChild(content);
            }
        }

        return element;
    },

    /**
     * Find closest parent section
     * @param {Element} element - Starting element
     */
    findSection(element) {
        return element ? element.closest('.content-section') : null;
    },

    /**
     * Hide section if empty
     * @param {Element} container - Container element
     */
    hideIfEmpty(container) {
        if (!container) return;

        const section = this.findSection(container);
        const isEmpty = !container.children || container.children.length === 0;

        if (isEmpty && section) {
            section.style.display = 'none';
        }
    },

    /**
     * Clear container content
     * @param {String|Element} elementOrId - Element or ID
     */
    clear(elementOrId) {
        const element = this._getElement(elementOrId);
        if (element) {
            element.innerHTML = '';
        }
    },

    /**
     * Append multiple children
     * @param {Element} parent - Parent element
     * @param {Array} children - Array of child elements
     */
    appendChildren(parent, children) {
        if (!parent || !Array.isArray(children)) return;

        children.forEach(child => {
            if (child instanceof Element) {
                parent.appendChild(child);
            }
        });
    },

    /**
     * Get element by ID or return if already element
     * @private
     */
    _getElement(elementOrId) {
        if (typeof elementOrId === 'string') {
            return document.getElementById(elementOrId);
        }
        return elementOrId instanceof Element ? elementOrId : null;
    },

    /**
     * Scroll to element smoothly
     * @param {String|Element} elementOrId - Element or ID
     */
    scrollTo(elementOrId) {
        const element = this._getElement(elementOrId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    /**
     * Scroll to top of page
     */
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// Export for use in modules
window.DOMUtils = DOMUtils;