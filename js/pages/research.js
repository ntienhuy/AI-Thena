/**
 * RESEARCH PAGE MODULE
 * Handles research page with projects pagination
 */

const ResearchPage = {
    allProjects: [],
    projectPagination: null,

    /**
     * Initialize research page
     */
    init() {
        this.setPageHeader();
        this.setResearchOverview();
        this.setResearchAreas();
        this.setCurrentProjects();
        this.setCollaborations();
    },

    /**
     * Set page header
     */
    setPageHeader() {
        DOMUtils.setText(
            document.querySelector('.page-hero h1'),
            ConfigLoader.get('research.pageTitle', 'Research')
        );
        DOMUtils.setText(
            document.querySelector('.page-hero p'),
            ConfigLoader.get('research.pageSubtitle', 'Our research areas and projects')
        );
    },

    /**
     * Set research overview
     */
    setResearchOverview() {
        const overviewSection = document.querySelector('.section-intro');
        const description = ConfigLoader.get('research.overview.description', '');

        if (overviewSection && description) {
            overviewSection.textContent = description;
        }
    },

    /**
     * Set research areas
     */
    setResearchAreas() {
        const researchGrid = document.getElementById('research-grid');
        if (!researchGrid) return;

        const areas = ConfigLoader.get('research.areas', []);

        if (areas.length === 0) {
            DOMUtils.hideIfEmpty(researchGrid);
            return;
        }

        DOMUtils.clear(researchGrid);

        areas.forEach(area => {
            if (area && area.title) {
                const card = CardFactory.createResearchCard(area);
                if (card) researchGrid.appendChild(card);
            }
        });
    },

    /**
     * Set current projects with pagination
     */
    setCurrentProjects() {
        const projectsList = document.querySelector('.projects-list');
        if (!projectsList) return;

        const projects = ConfigLoader.get('research.projects', []);

        if (projects.length === 0) {
            DOMUtils.hideIfEmpty(projectsList);
            return;
        }

        // Store and sort projects
        this.allProjects = projects
            .filter(project => project && project.title)
            .sort(this._sortProjectsByStatus);

        // Create pagination instance
        this.projectPagination = Pagination.create('research-projects', {
            itemsPerPage: 6,
            onPageChange: () => this._displayProjects()
        });

        // Initial display
        this._displayProjects();

        // Add pagination controls
        this._addProjectPagination();
    },

    /**
     * Display projects for current page
     * @private
     */
    _displayProjects() {
        const projectsList = document.querySelector('.projects-list');
        if (!projectsList) return;

        DOMUtils.clear(projectsList);

        const currentProjects = Pagination.getCurrentPageItems(
            'research-projects',
            this.allProjects
        );

        currentProjects.forEach(project => {
            const card = this._createProjectCard(project);
            if (card) projectsList.appendChild(card);
        });

        // Update pagination info
        this._updateProjectInfo();
    },

    /**
     * Create project card
     * @private
     */
    _createProjectCard(project) {
        const card = DOMUtils.createElement('div', ['project-card']);

        // Status
        let statusClass = 'status-active';
        let statusText = project.status || 'active';

        if (['in_progress', 'active', 'ongoing'].includes(project.status)) {
            statusClass = 'status-active';
            statusText = 'In Progress';
        } else if (project.status === 'completed') {
            statusClass = 'status-completed';
            statusText = 'Completed';
        } else if (project.status === 'planning') {
            statusClass = 'status-planning';
            statusText = 'Planning';
        }

        // Date info
        let dateInfo = '';
        if (project.startDate) {
            const startDate = DateUtils.toShort(project.startDate);
            dateInfo = `Started: ${startDate}`;

            if (project.endDate) {
                const endDate = DateUtils.toShort(project.endDate);
                dateInfo += ` - ${endDate}`;
            }
        }

        // Build card HTML
        let cardHTML = `<h3>${project.title}</h3>`;
        cardHTML += `<p class="project-status">Status: <span class="${statusClass}">${statusText}</span></p>`;

        if (dateInfo) {
            cardHTML += `<p class="project-dates" style="color: #999; font-size: 0.9rem; margin: 0.5rem 0;">${dateInfo}</p>`;
        }

        cardHTML += `<p>${project.description}</p>`;

        if (project.principalInvestigator) {
            cardHTML += `<p class="project-pi" style="color: #667eea; font-weight: 500;">PI: ${project.principalInvestigator}</p>`;
        }

        if (project.fundingSource) {
            cardHTML += `<p class="project-funding" style="color: #4caf50; font-weight: 500;">Funding: ${project.fundingSource}</p>`;
        }

        if (project.outcomes && project.outcomes.length > 0) {
            cardHTML += `
                <div class="project-outcomes" style="margin-top: 1rem;">
                    <strong>Outcomes:</strong>
                    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                        ${project.outcomes.map(outcome => `<li style="color: #666; margin-bottom: 0.3rem;">${outcome}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        if (project.tags && project.tags.length > 0) {
            cardHTML += `
                <div class="project-tags" style="margin-top: 1rem;">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
        }

        card.innerHTML = cardHTML;
        return card;
    },

    /**
     * Sort projects by status
     * @private
     */
    _sortProjectsByStatus(a, b) {
        const statusPriority = {
            'in_progress': 1,
            'active': 1,
            'ongoing': 1,
            'completed': 2,
            'planning': 3,
            'proposed': 4
        };

        const aPriority = statusPriority[a.status] || 5;
        const bPriority = statusPriority[b.status] || 5;

        if (aPriority !== bPriority) {
            return aPriority - bPriority;
        }

        if (a.startDate && b.startDate) {
            return new Date(b.startDate) - new Date(a.startDate);
        }

        return a.title.localeCompare(b.title);
    },

    /**
     * Add pagination controls
     * @private
     */
    _addProjectPagination() {
        const projectsSection = document.querySelector('.projects-list').closest('.content-section');
        if (!projectsSection) return;

        // Remove existing pagination
        const existingPagination = projectsSection.querySelector('.projects-pagination');
        if (existingPagination) {
            existingPagination.remove();
        }

        // Create pagination container
        const paginationContainer = DOMUtils.createElement('div', ['projects-pagination']);
        paginationContainer.style.cssText = `
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            margin: 2rem 0;
            flex-wrap: wrap;
        `;

        // Render pagination
        Pagination.render('research-projects', paginationContainer, this.allProjects.length);

        // Add to page
        projectsSection.appendChild(paginationContainer);
    },

    /**
     * Update project info
     * @private
     */
    _updateProjectInfo() {
        const projectsSection = document.querySelector('.projects-list').closest('.content-section');
        if (!projectsSection) return;

        // Remove existing info
        const existingInfo = projectsSection.querySelector('.projects-info');
        if (existingInfo) {
            existingInfo.remove();
        }

        // Create info element
        const infoElement = DOMUtils.createElement('div', ['projects-info']);
        infoElement.style.cssText = `
            text-align: center;
            margin: 1rem 0;
            color: #666;
            font-size: 0.95rem;
        `;

        // Render pagination info
        Pagination.renderInfo('research-projects', infoElement, this.allProjects.length);

        // Insert before projects list
        const projectsList = document.querySelector('.projects-list');
        projectsList.parentNode.insertBefore(infoElement, projectsList);
    },

    /**
     * Set collaborations
     */
    setCollaborations() {
        const collabGrid = document.querySelector('.collaboration-grid');
        if (!collabGrid) return;

        const collaborations = ConfigLoader.get('research.collaborations', {});

        DOMUtils.clear(collabGrid);

        // Academic Partners
        if (collaborations.academic && collaborations.academic.length > 0) {
            const academicCard = DOMUtils.createElement('div', ['collab-card']);
            academicCard.innerHTML = `
                <h4>Academic Partners</h4>
                <ul>
                    ${collaborations.academic
                    .filter(partner => partner && partner.name)
                    .map(partner => `<li>${partner.name}</li>`)
                    .join('')}
                </ul>
            `;
            collabGrid.appendChild(academicCard);
        }

        // Industry Partners
        if (collaborations.industry && collaborations.industry.length > 0) {
            const industryCard = DOMUtils.createElement('div', ['collab-card']);
            industryCard.innerHTML = `
                <h4>Industry Partners</h4>
                <ul>
                    ${collaborations.industry
                    .filter(partner => partner && partner.name)
                    .map(partner => `<li>${partner.name}</li>`)
                    .join('')}
                </ul>
            `;
            collabGrid.appendChild(industryCard);
        }
    }
};

// Export for use in app.js
window.ResearchPage = ResearchPage;