/**
 * CARD FACTORY
 * Unified card creation for consistent UI components
 */

const CardFactory = {
    /**
     * Create team member card
     * @param {Object} member - Member data
     * @param {Object} options - Display options
     */
    createTeamCard(member, options = {}) {
        if (!member || !member.name) return null;

        const {
            clickable = false,
            showEmail = true,
            showBio = true,
            showOffice = false,
            maxBioLength = 150
        } = options;

        const card = DOMUtils.createElement('div', ['team-member']);
        const memberId = member.id || StringUtils.slugify(member.name);

        // Make card clickable if requested
        if (clickable) {
            card.style.cursor = 'pointer';
            card.onclick = () => {
                window.location.href = `member-profile.html?id=${memberId}`;
            };
        }

        // Image or Avatar
        if (member.image) {
            const img = DOMUtils.createElement('img', ['member-photo']);
            img.src = member.image;
            img.alt = member.name;
            img.dataset.name = member.name;
            img.onerror = function () { ImageHandler.handleError(this); };
            card.appendChild(img);
        } else {
            const avatar = ImageHandler.createAvatar(member.name);
            card.appendChild(avatar);
        }

        // Name with title prefix
        const displayName = this._getNameWithTitle(member.name, member.title);

        if (clickable) {
            const nameLink = DOMUtils.createElement('a');
            nameLink.href = `member-profile.html?id=${memberId}`;
            nameLink.textContent = displayName;
            nameLink.style.textDecoration = 'none';
            nameLink.style.color = 'inherit';
            const nameHeader = DOMUtils.createElement('h3', [], nameLink);
            card.appendChild(nameHeader);
        } else {
            card.appendChild(DOMUtils.createElement('h3', [], displayName));
        }

        // Role
        if (member.role) {
            card.appendChild(DOMUtils.createElement('p', ['role'], member.role));
        }

        // Bio
        if (showBio && (member.bio || member.description)) {
            const bioText = member.bio || member.description;
            const truncatedBio = StringUtils.truncate(bioText, maxBioLength);
            card.appendChild(DOMUtils.createElement('p', ['description'], truncatedBio));
        }

        // Office
        if (showOffice && member.office) {
            card.appendChild(DOMUtils.createElement('p', ['office'], `📍 ${member.office}`));
        }

        // Email
        if (showEmail && member.email) {
            const emailLink = DOMUtils.createElement('a', ['email-link']);
            emailLink.href = `mailto:${member.email}`;
            emailLink.textContent = member.email;
            const emailP = DOMUtils.createElement('p', ['contact-info'], emailLink);
            card.appendChild(emailP);
        }

        // View Profile Link
        if (clickable) {
            const profileLink = DOMUtils.createElement('a', ['view-profile-link']);
            profileLink.href = `member-profile.html?id=${memberId}`;
            profileLink.textContent = 'View Profile →';
            profileLink.style.cssText = 'color: #667eea; text-decoration: none; font-weight: 600; margin-top: 0.5rem; display: inline-block;';
            card.appendChild(profileLink);
        }

        return card;
    },

    /**
     * Create research area card
     * @param {Object} area - Research area data
     * @param {Object} options - Display options
     */
    createResearchCard(area, options = {}) {
        if (!area || !area.title) return null;

        const card = DOMUtils.createElement('div', ['research-card']);

        // Icon & Title
        const icon = area.icon || '🔬';
        const title = `${icon} ${area.title}`;
        card.appendChild(DOMUtils.createElement('h3', [], title));

        // Description
        const description = area.shortDescription || area.description || '';
        if (description) {
            card.appendChild(DOMUtils.createElement('p', [], description));
        }

        // Metadata
        if (area.leadResearcher || area.publications) {
            const metaDiv = DOMUtils.createElement('div', ['research-meta']);

            if (area.leadResearcher) {
                const lead = DOMUtils.createElement('span', ['research-lead']);
                lead.textContent = `Lead: ${area.leadResearcher}`;
                metaDiv.appendChild(lead);
            }

            if (area.publications) {
                const pubs = DOMUtils.createElement('span', ['research-pubs']);
                pubs.textContent = `${area.publications} publications`;
                metaDiv.appendChild(pubs);
            }

            card.appendChild(metaDiv);
        }

        // Keywords
        if (area.keywords && area.keywords.length > 0) {
            const keywordsDiv = DOMUtils.createElement('div', ['research-keywords']);
            area.keywords.slice(0, 3).forEach(keyword => {
                keywordsDiv.appendChild(DOMUtils.createElement('span', ['keyword-tag'], keyword));
            });
            card.appendChild(keywordsDiv);
        }

        return card;
    },

    /**
     * Create publication entry
     * @param {Object} publication - Publication data
     * @param {Object} options - Display options
     */
    createPublicationCard(publication, options = {}) {
        if (!publication || !publication.title) return null;

        const card = DOMUtils.createElement('div', ['publication']);

        // Award badge
        if (publication.award) {
            const badge = DOMUtils.createElement('span', ['pub-award']);
            badge.textContent = publication.award;
            badge.style.cssText = 'display: inline-block; background: linear-gradient(45deg, #ffd700, #ffed4e); color: #333; padding: 0.2rem 0.6rem; border-radius: 15px; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem;';
            card.appendChild(badge);
        }

        // Title
        card.appendChild(DOMUtils.createElement('div', ['publication-title'], publication.title));

        // Authors
        if (publication.authors && publication.authors.length > 0) {
            const authorsDiv = DOMUtils.createElement('div', ['pub-authors']);
            authorsDiv.style.cssText = 'color: #666; font-style: italic; margin: 0.5rem 0;';
            authorsDiv.textContent = publication.authors.join(', ');
            card.appendChild(authorsDiv);
        }

        // Meta (venue, year, citations)
        const meta = DOMUtils.createElement('div', ['publication-meta']);
        let metaText = '';
        if (publication.venue) metaText += publication.venue;
        if (publication.year) metaText += ` (${publication.year})`;
        if (publication.citations) metaText += ` - ${publication.citations} citations`;
        meta.textContent = metaText;
        card.appendChild(meta);

        // Links
        const links = [];
        if (publication.pdf) links.push(this._createLink('PDF', publication.pdf));
        if (publication.arxiv) links.push(this._createLink('arXiv', publication.arxiv));
        if (publication.code) links.push(this._createLink('Code', publication.code));

        if (links.length > 0) {
            const linksDiv = DOMUtils.createElement('div', ['pub-links']);
            linksDiv.style.cssText = 'margin-top: 0.5rem; display: flex; gap: 1rem;';
            DOMUtils.appendChildren(linksDiv, links);
            card.appendChild(linksDiv);
        }

        return card;
    },

    /**
     * Create news card
     * @param {Object} article - News article data
     * @param {Object} options - Display options
     */
    createNewsCard(article, options = {}) {
        if (!article || !article.title) return null;

        const { featured = false } = options;
        const card = DOMUtils.createElement('div', ['news-card']);

        // Featured badge
        if (article.featured && featured) {
            const badge = DOMUtils.createElement('span', ['featured-badge']);
            badge.textContent = 'Featured';
            card.appendChild(badge);
        }

        // Image
        if (article.image) {
            const img = DOMUtils.createElement('img', ['news-card-image']);
            img.src = article.image;
            img.alt = article.title;
            img.onerror = function () { this.style.display = 'none'; };
            card.appendChild(img);
        } else {
            card.appendChild(DOMUtils.createElement('div', ['news-card-image']));
        }

        // Content container
        const content = DOMUtils.createElement('div', ['news-card-content']);

        // Category
        if (article.category) {
            const categoryClass = `news-category ${article.category}`;
            const categoryLabel = this._getCategoryLabel(article.category);
            content.appendChild(DOMUtils.createElement('span', categoryClass.split(' '), categoryLabel));
        }

        // Title
        content.appendChild(DOMUtils.createElement('h3', ['news-title'], article.title));

        // Meta (date, author)
        const meta = DOMUtils.createElement('div', ['news-meta']);
        const date = DateUtils.toDisplay(article.date);
        meta.innerHTML = `<span class="news-date">📅 ${date}</span>`;
        if (article.author) {
            meta.innerHTML += `<span class="news-author">By ${article.author}</span>`;
        }
        content.appendChild(meta);

        // Summary
        if (article.summary) {
            content.appendChild(DOMUtils.createElement('p', ['news-summary'], article.summary));
        }

        // Tags
        if (article.tags && article.tags.length > 0) {
            const tagsDiv = DOMUtils.createElement('div', ['news-tags']);
            article.tags.slice(0, 3).forEach(tag => {
                tagsDiv.appendChild(DOMUtils.createElement('span', ['news-tag'], tag));
            });
            content.appendChild(tagsDiv);
        }

        // Read more link
        const readMore = DOMUtils.createElement('a', ['read-more-btn']);
        readMore.href = `news-article.html?id=${article.id}`;
        readMore.textContent = 'Read More →';
        content.appendChild(readMore);

        card.appendChild(content);

        // Make card clickable
        card.style.cursor = 'pointer';
        card.onclick = function (e) {
            if (!e.target.classList.contains('read-more-btn')) {
                window.location.href = `news-article.html?id=${article.id}`;
            }
        };

        return card;
    },

    /**
     * Helper: Create link element
     * @private
     */
    _createLink(text, url) {
        const link = DOMUtils.createElement('a', ['pub-link']);
        link.href = url;
        link.textContent = text;
        return link;
    },

    /**
     * Helper: Get category label
     * @private
     */
    _getCategoryLabel(categoryValue) {
        const categories = ConfigLoader.get('news.categories', []);
        const category = categories.find(cat => cat.value === categoryValue);
        return category ? category.label : categoryValue.toUpperCase();
    },

    /**
    * Helper: Get name with title prefix
    * @private
    */
    _getNameWithTitle(name, title) {
        if (!title) return name;

        const titleLower = title.toLowerCase();

        if (titleLower.includes('phd') || titleLower.includes('ph.d.')) {
            return `Dr. ${name}`;
        }
        if (titleLower.includes('professor')) {
            return `Prof. ${name}`;
        }
        if (titleLower.includes('master') && titleLower.includes('candidate')) {
            return name;
        }
        if (titleLower.includes('phd') && titleLower.includes('candidate')) {
            return name;
        }
        if (titleLower.includes('bachelor')) {
            return name;
        }

        return name;
    }
};

// Export for use in modules
window.CardFactory = CardFactory;