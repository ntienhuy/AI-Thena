/**
 * STRING UTILITIES
 * Reusable string manipulation helpers
 */

const StringUtils = {
    /**
     * Truncate string to max length
     * @param {String} str - String to truncate
     * @param {Number} maxLength - Maximum length
     * @param {String} suffix - Suffix to add (default: '...')
     */
    truncate(str, maxLength, suffix = '...') {
        if (!str || str.length <= maxLength) return str;
        return str.substring(0, maxLength - suffix.length) + suffix;
    },

    /**
     * Get initials from name
     * @param {String} name - Full name
     * @param {Number} maxInitials - Max number of initials
     */
    getInitials(name, maxInitials = 2) {
        if (!name) return '?';

        const parts = name.trim().split(/\s+/);

        if (parts.length === 1) {
            return parts[0].substring(0, maxInitials).toUpperCase();
        }

        return parts
            .map(part => part[0])
            .join('')
            .substring(0, maxInitials)
            .toUpperCase();
    },

    /**
     * Create slug from string (for URLs)
     * @param {String} str - String to slugify
     */
    slugify(str) {
        if (!str) return '';

        return str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    /**
     * Capitalize first letter
     * @param {String} str - String to capitalize
     */
    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Capitalize each word
     * @param {String} str - String to capitalize
     */
    capitalizeWords(str) {
        if (!str) return '';
        return str.split(' ').map(word => this.capitalize(word)).join(' ');
    },

    /**
     * Strip HTML tags
     * @param {String} html - HTML string
     */
    stripHTML(html) {
        if (!html) return '';
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    },

    /**
     * Count words in string
     * @param {String} str - String to count
     */
    countWords(str) {
        if (!str) return 0;
        return str.trim().split(/\s+/).length;
    },

    /**
     * Estimate reading time (words per minute)
     * @param {String} str - Text content
     * @param {Number} wpm - Words per minute (default: 200)
     */
    estimateReadTime(str, wpm = 200) {
        const words = this.countWords(str);
        return Math.ceil(words / wpm);
    },

    /**
     * Generate random ID
     * @param {String} prefix - Optional prefix
     */
    generateId(prefix = 'id') {
        return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    },

    /**
     * Check if string is email
     * @param {String} str - String to check
     */
    isEmail(str) {
        if (!str) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(str);
    },

    /**
     * Check if string is URL
     * @param {String} str - String to check
     */
    isURL(str) {
        if (!str) return false;
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Highlight search terms in text
     * @param {String} text - Text to search in
     * @param {String} query - Search query
     */
    highlightSearch(text, query) {
        if (!text || !query) return text;

        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
};

// Export for use in modules
window.StringUtils = StringUtils;