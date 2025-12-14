/**
 * PAGINATION COMPONENT
 * Reusable pagination with consistent behavior
 */

const Pagination = {
    instances: {},

    /**
     * Create pagination instance
     * @param {String} id - Unique instance ID
     * @param {Object} options - Configuration options
     */
    create(id, options = {}) {
        const instance = {
            id,
            currentPage: 1,
            totalPages: 1,
            itemsPerPage: options.itemsPerPage || 10,
            container: null,
            infoContainer: null,
            onPageChange: options.onPageChange || null,
            ...options
        };

        this.instances[id] = instance;
        return instance;
    },

    /**
     * Render pagination controls
     * @param {String} id - Instance ID
     * @param {Element} container - Container element
     * @param {Number} totalItems - Total number of items
     */
    render(id, container, totalItems) {
        const instance = this.instances[id];
        if (!instance) {
            console.error(`Pagination instance '${id}' not found`);
            return;
        }

        instance.container = container;
        instance.totalPages = Math.ceil(totalItems / instance.itemsPerPage);

        // Clear container
        DOMUtils.clear(container);

        // Hide if only one page
        if (instance.totalPages <= 1) {
            DOMUtils.toggle(container, false);
            return;
        }

        DOMUtils.toggle(container, true);

        // Previous button
        const prevBtn = this._createButton('← Previous', () => {
            this.goToPage(id, instance.currentPage - 1);
        });
        prevBtn.disabled = instance.currentPage === 1;
        container.appendChild(prevBtn);

        // Page numbers
        const pageButtons = this._createPageButtons(instance);
        DOMUtils.appendChildren(container, pageButtons);

        // Next button
        const nextBtn = this._createButton('Next →', () => {
            this.goToPage(id, instance.currentPage + 1);
        });
        nextBtn.disabled = instance.currentPage === instance.totalPages;
        container.appendChild(nextBtn);
    },

    /**
     * Render pagination info
     * @param {String} id - Instance ID
     * @param {Element} container - Info container element
     * @param {Number} totalItems - Total number of items
     */
    renderInfo(id, container, totalItems) {
        const instance = this.instances[id];
        if (!instance || !container) return;

        instance.infoContainer = container;

        const startIndex = (instance.currentPage - 1) * instance.itemsPerPage + 1;
        const endIndex = Math.min(instance.currentPage * instance.itemsPerPage, totalItems);

        DOMUtils.setText(container, `Showing ${startIndex}-${endIndex} of ${totalItems}`);
    },

    /**
     * Go to specific page
     * @param {String} id - Instance ID
     * @param {Number} pageNumber - Page number
     */
    goToPage(id, pageNumber) {
        const instance = this.instances[id];
        if (!instance) return;

        // Validate page number
        if (pageNumber < 1 || pageNumber > instance.totalPages) return;
        if (pageNumber === instance.currentPage) return;

        instance.currentPage = pageNumber;

        // Trigger callback
        if (instance.onPageChange) {
            instance.onPageChange(pageNumber);
        }

        // Scroll to top
        if (instance.scrollOnChange !== false) {
            DOMUtils.scrollToTop();
        }
    },

    /**
     * Get current page data slice
     * @param {String} id - Instance ID
     * @param {Array} items - All items
     */
    getCurrentPageItems(id, items) {
        const instance = this.instances[id];
        if (!instance) return items;

        const startIndex = (instance.currentPage - 1) * instance.itemsPerPage;
        const endIndex = startIndex + instance.itemsPerPage;

        return items.slice(startIndex, endIndex);
    },

    /**
     * Reset to first page
     * @param {String} id - Instance ID
     */
    reset(id) {
        const instance = this.instances[id];
        if (instance) {
            instance.currentPage = 1;
        }
    },

    /**
     * Create page number buttons
     * @private
     */
    _createPageButtons(instance) {
        const buttons = [];
        const { currentPage, totalPages } = instance;

        // Calculate visible range
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, currentPage + 2);

        // First page
        if (startPage > 1) {
            buttons.push(this._createPageButton(instance, 1));

            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.style.padding = '0.5rem';
                buttons.push(ellipsis);
            }
        }

        // Page range
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(this._createPageButton(instance, i));
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                ellipsis.style.padding = '0.5rem';
                buttons.push(ellipsis);
            }

            buttons.push(this._createPageButton(instance, totalPages));
        }

        return buttons;
    },

    /**
     * Create page number button
     * @private
     */
    _createPageButton(instance, pageNumber) {
        const btn = this._createButton(pageNumber.toString(), () => {
            this.goToPage(instance.id, pageNumber);
        });

        btn.classList.add('page-number');

        if (pageNumber === instance.currentPage) {
            btn.classList.add('active');
        }

        return btn;
    },

    /**
     * Create button element
     * @private
     */
    _createButton(text, onClick) {
        const btn = document.createElement('button');
        btn.className = 'pagination-btn';
        btn.textContent = text;
        btn.onclick = onClick;
        return btn;
    },

    /**
     * Destroy pagination instance
     * @param {String} id - Instance ID
     */
    destroy(id) {
        delete this.instances[id];
    }
};

// Export for use in modules
window.Pagination = Pagination;