/**
 * NAVIGATION COMPONENT
 * Header, footer, and mobile menu management
 */

const Navigation = {
    currentPage: '',

    /**
     * Initialize navigation
     */
    init() {
        this.currentPage = this._detectCurrentPage();
        this.initializeHeader();
        this.initializeFooter();
        this.initializeMobileMenu();
        this.initializeScrollBehavior();
    },

    /**
     * Initialize header and lab name
     */
    initializeHeader() {
        const labNameElement = document.getElementById('lab-name');
        if (!labNameElement) return;

        const lab = ConfigLoader.getLab();
        let headerHTML = '<a href="index.html" style="display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit;">';

        // Add logo if available
        if (lab.logo && lab.logo !== '') {
            headerHTML += `<img src="${lab.logo}" alt="${lab.name}" class="lab-logo" style="height: 40px; vertical-align: middle;">`;
        }

        // Add lab name
        headerHTML += `<span>${lab.name}</span>`;
        headerHTML += '</a>';

        labNameElement.innerHTML = headerHTML;
        labNameElement.style.display = 'flex';
        labNameElement.style.alignItems = 'center';

        // Initialize navigation links
        this._renderNavLinks();
    },

    /**
     * Render navigation links
     * @private
     */
    _renderNavLinks() {
        const navElement = document.querySelector('.nav-links');
        if (!navElement || navElement.children.length > 0) return;

        const pages = [
            { name: 'Home', url: 'index.html' },
            { name: 'Research', url: 'research.html' },
            { name: 'Team', url: 'team.html' },
            { name: 'Publications', url: 'publications.html' },
            { name: 'News', url: 'news.html' },
            { name: 'Contact', url: 'contact.html' }
        ];

        pages.forEach(page => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = page.url;
            a.textContent = page.name;

            if (this._isCurrentPage(page.url)) {
                a.classList.add('active');
            }

            li.appendChild(a);
            navElement.appendChild(li);
        });
    },

    /**
     * Initialize footer
     */
    initializeFooter() {
        this._renderFooterSections();
        this._renderFooterText();
    },

    /**
     * Render footer sections
     * @private
     */
    _renderFooterSections() {
        const footerContent = document.querySelector('.footer-content');
        if (!footerContent) return;

        const sections = ConfigLoader.get('footer.sections', []);

        if (sections.length === 0) {
            this._renderDefaultFooter(footerContent);
            return;
        }

        DOMUtils.clear(footerContent);

        sections.forEach(section => {
            if (!section.title || !section.links || section.links.length === 0) return;

            const footerSection = DOMUtils.createElement('div', ['footer-section']);

            const title = DOMUtils.createElement('h4', [], section.title);
            footerSection.appendChild(title);

            const linksList = DOMUtils.createElement('ul', ['footer-links']);

            section.links
                .filter(link => link.text && link.url)
                .forEach(link => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.textContent = link.text;

                    if (link.external) {
                        a.target = '_blank';
                        a.rel = 'noopener';
                    }

                    li.appendChild(a);
                    linksList.appendChild(li);
                });

            footerSection.appendChild(linksList);
            footerContent.appendChild(footerSection);
        });
    },

    /**
     * Render default footer if no config
     * @private
     */
    _renderDefaultFooter(footerContent) {
        if (footerContent.children.length > 0) return;

        footerContent.innerHTML = `
            <div class="footer-section">
                <h4>Quick Links</h4>
                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="research.html">Research</a></li>
                    <li><a href="team.html">Team</a></li>
                    <li><a href="publications.html">Publications</a></li>
                    <li><a href="news.html">News</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Connect</h4>
                <ul class="footer-links">
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>
        `;
    },

    /**
     * Render footer text
     * @private
     */
    _renderFooterText() {
        const footerText = document.getElementById('footer-text');
        if (!footerText) return;

        const copyright = ConfigLoader.get('footer.copyright', {});
        const year = copyright.year || new Date().getFullYear();
        const holder = copyright.holder || ConfigLoader.get('labName', 'AI-THENA Lab');
        const rights = copyright.rights || 'All rights reserved';
        const tagline = ConfigLoader.get('footer.tagline', '');

        let html = `&copy; ${year} ${holder}. ${rights}`;
        if (tagline) {
            html += ` | ${tagline}`;
        }

        footerText.innerHTML = html;
    },

    /**
     * Initialize mobile menu
     */
    initializeMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (!mobileToggle || !navLinks) return;

        // Remove existing mobile menu
        const existingMenu = document.querySelector('.mobile-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        // Create new mobile menu
        const mobileMenu = DOMUtils.createElement('div', ['mobile-menu']);
        const mobileNav = DOMUtils.createElement('ul');
        mobileMenu.appendChild(mobileNav);
        document.querySelector('header').appendChild(mobileMenu);

        // Toggle handler
        mobileToggle.addEventListener('click', () => {
            // Update mobile menu content
            mobileNav.innerHTML = navLinks.innerHTML;

            // Toggle active states
            mobileMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    },

    /**
     * Initialize scroll behavior
     */
    initializeScrollBehavior() {
        const header = document.querySelector('header');
        if (!header) return;

        // Check initial scroll position
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }

        // Add scroll listener
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    },

    /**
     * Detect current page
     * @private
     */
    _detectCurrentPage() {
        const path = window.location.pathname;
        const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
        return page;
    },

    /**
     * Check if URL is current page
     * @private
     */
    _isCurrentPage(url) {
        if (this.currentPage === url) return true;
        if (this.currentPage === '' && url === 'index.html') return true;
        if (this.currentPage === 'news-article.html' && url === 'news.html') return true;
        return false;
    }
};

// Export for use in modules
window.Navigation = Navigation;