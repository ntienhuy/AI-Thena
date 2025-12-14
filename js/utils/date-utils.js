/**
 * DATE UTILITIES
 * Consistent date formatting across the application
 */

const DateUtils = {
    /**
     * Format date with custom options
     * @param {String|Date} date - Date string or Date object
     * @param {Object} options - Intl.DateTimeFormat options
     */
    format(date, options = {}) {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        if (!(dateObj instanceof Date) || isNaN(dateObj)) {
            return 'Invalid Date';
        }

        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return dateObj.toLocaleDateString('en-US', { ...defaultOptions, ...options });
    },

    /**
     * Format for standard display (Month Day, Year)
     * @param {String|Date} date - Date to format
     */
    toDisplay(date) {
        return this.format(date, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Format for short display (Mon DD, YYYY)
     * @param {String|Date} date - Date to format
     */
    toShort(date) {
        return this.format(date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    /**
     * Format for compact display (MM/DD/YYYY)
     * @param {String|Date} date - Date to format
     */
    toCompact(date) {
        const dateObj = typeof date === 'string' ? new Date(date) : date;

        if (!(dateObj instanceof Date) || isNaN(dateObj)) {
            return 'Invalid Date';
        }

        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();

        return `${month}/${day}/${year}`;
    },

    /**
     * Calculate years since a given year
     * @param {Number} year - Starting year
     */
    yearsSince(year) {
        const currentYear = new Date().getFullYear();
        return currentYear - year;
    },

    /**
     * Get relative time (e.g., "2 days ago")
     * @param {String|Date} date - Date to compare
     */
    getRelativeTime(date) {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const now = new Date();
        const diffMs = now - dateObj;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    },

    /**
     * Check if date is recent (within days)
     * @param {String|Date} date - Date to check
     * @param {Number} days - Number of days to consider recent
     */
    isRecent(date, days = 30) {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        const now = new Date();
        const diffMs = now - dateObj;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        return diffDays <= days;
    },

    /**
     * Sort dates (newest first)
     * @param {String|Date} a - First date
     * @param {String|Date} b - Second date
     */
    sortNewest(a, b) {
        const dateA = typeof a === 'string' ? new Date(a) : a;
        const dateB = typeof b === 'string' ? new Date(b) : b;
        return dateB - dateA;
    },

    /**
     * Sort dates (oldest first)
     * @param {String|Date} a - First date
     * @param {String|Date} b - Second date
     */
    sortOldest(a, b) {
        const dateA = typeof a === 'string' ? new Date(a) : a;
        const dateB = typeof b === 'string' ? new Date(b) : b;
        return dateA - dateB;
    }
};

// Export for use in modules
window.DateUtils = DateUtils;