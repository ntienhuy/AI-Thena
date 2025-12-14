/**
 * CONFIG LOADER
 * Centralized configuration access with validation and helpers
 */

const ConfigLoader = {
    _config: null,
    _ready: false,
    _callbacks: [],

    /**
     * Wait for CONFIG to be ready
     * @param {Function} callback - Function to call when ready
     * @param {Number} timeout - Max wait time in ms
     */
    waitForConfig(callback, timeout = 5000) {
        if (this._ready && this._config) {
            callback(this._config);
            return;
        }

        this._callbacks.push(callback);

        const startTime = Date.now();
        const checkInterval = setInterval(() => {
            if (typeof window.CONFIG !== 'undefined') {
                this._config = window.CONFIG;
                this._ready = true;
                clearInterval(checkInterval);

                // Execute all waiting callbacks
                this._callbacks.forEach(cb => cb(this._config));
                this._callbacks = [];
            } else if (Date.now() - startTime > timeout) {
                clearInterval(checkInterval);
                console.error('CONFIG failed to load within timeout');
                this._callbacks.forEach(cb => cb(null));
                this._callbacks = [];
            }
        }, 50);
    },

    /**
     * Get config value by path
     * @param {String} path - Dot notation path (e.g., 'team.faculty')
     * @param {*} fallback - Fallback value if not found
     */
    get(path, fallback = null) {
        if (!this._config) return fallback;

        const keys = path.split('.');
        let value = this._config;

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return fallback;
            }
        }

        return value !== undefined ? value : fallback;
    },

    /**
     * Check if config is loaded
     */
    isLoaded() {
        return this._ready && this._config !== null;
    },

    /**
     * Get lab information
     */
    getLab() {
        return {
            name: this.get('labName', 'AI-THENA Lab'),
            logo: this.get('labLogo', ''),
            description: this.get('labDescription', ''),
            established: this.get('established', new Date().getFullYear())
        };
    },

    /**
     * Calculate statistics from config data
     */
    calculateStats() {
        const stats = {};

        // Research areas
        const areas = this.get('research.areas', []);
        stats.researchAreas = areas.length;

        // Team members - updated to match new config structure
        let teamCount = 0;
        const team = this.get('team', {});

        // Count active members from each group
        ['advisors', 'members', 'phdStudents', 'masterStudents', 'undergraduates'].forEach(group => {
            if (Array.isArray(team[group])) {
                // Only count members with status "active" or without status field
                const activeMembers = team[group].filter(member =>
                    (member.id && member.id.trim() !== '') &&
                    (member.name && member.name.trim() !== '') &&
                    (!member.status || member.status === 'active' || member.id)
                );
                teamCount += activeMembers.length;
            }
        });

        stats.teamMembers = teamCount;

        // Publications
        const pubs = this.get('publications.publications', []);
        stats.publications = pubs.length;

        // Years of excellence
        const established = this.get('established', new Date().getFullYear());
        stats.yearsOfExcellence = new Date().getFullYear() - established;

        return stats;
    },

    /**
     * Validate required config fields
     */
    validate() {
        const required = [
            'labName',
            'home',
            'research',
            'team',
            'publications',
            'contact',
            'footer'
        ];

        const missing = required.filter(field => !this.get(field));

        if (missing.length > 0) {
            console.warn('Missing required config fields:', missing);
            return false;
        }

        return true;
    }
};

// Export for use in modules
window.ConfigLoader = ConfigLoader;