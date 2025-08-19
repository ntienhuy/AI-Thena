// ===== RESEARCH PAGE JAVASCRIPT WITH PAGINATION =====

let allProjects = [];
let currentProjectPage = 1;
let projectsPerPage = 6; // Show 6 projects per page

document.addEventListener('DOMContentLoaded', function () {
    if (typeof CONFIG !== 'undefined') {
        initializeResearchPage();
        initializeAnimationObserver();
    } else {
        setTimeout(function () {
            if (typeof CONFIG !== 'undefined') {
                initializeResearchPage();
                initializeAnimationObserver();
            }
        }, 100);
    }
});

function initializeResearchPage() {
    // Set page title and subtitle
    const pageTitle = document.querySelector('.page-hero h1');
    const pageSubtitle = document.querySelector('.page-hero p');

    if (pageTitle && CONFIG.research?.pageTitle) {
        pageTitle.textContent = CONFIG.research.pageTitle;
    }
    if (pageSubtitle && CONFIG.research?.pageSubtitle) {
        pageSubtitle.textContent = CONFIG.research.pageSubtitle;
    }

    // Set research overview
    setResearchOverview();

    // Populate research areas
    setResearchAreas();

    // Populate current projects with pagination
    setCurrentProjects();

    // Populate collaborations
    setCollaborations();
}

function setResearchOverview() {
    const overviewSection = document.querySelector('.section-intro');
    if (overviewSection && CONFIG.research?.overview?.description) {
        overviewSection.textContent = CONFIG.research.overview.description;
    }
}

function setResearchAreas() {
    const researchGrid = document.getElementById('research-grid');
    if (researchGrid && CONFIG.research?.areas) {
        researchGrid.innerHTML = '';

        CONFIG.research.areas.forEach(area => {
            if (area && area.title) {
                const card = createResearchCard(area);
                if (card) researchGrid.appendChild(card);
            }
        });
    }
}

// UPDATED: Sort projects by status and add pagination
function setCurrentProjects() {
    const projectsList = document.querySelector('.projects-list');
    if (!projectsList || !CONFIG.research?.projects) return;

    // Store all projects and sort by status priority
    allProjects = CONFIG.research.projects
        .filter(project => project && project.title)
        .sort(sortProjectsByStatus);

    // Display projects with pagination
    displayProjects();

    // Add pagination controls
    addProjectPagination();
}

// Sort projects: in_progress first, then completed, then others
function sortProjectsByStatus(a, b) {
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

    // If same priority, sort by start date (newest first)
    if (a.startDate && b.startDate) {
        return new Date(b.startDate) - new Date(a.startDate);
    }

    // Fallback to alphabetical by title
    return a.title.localeCompare(b.title);
}

function displayProjects() {
    const projectsList = document.querySelector('.projects-list');
    if (!projectsList) return;

    // Clear existing projects
    projectsList.innerHTML = '';

    // Calculate which projects to show
    const startIndex = (currentProjectPage - 1) * projectsPerPage;
    const endIndex = startIndex + projectsPerPage;
    const projectsToShow = allProjects.slice(startIndex, endIndex);

    // Display projects
    projectsToShow.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        // Determine status class and display text
        let statusClass = 'status-active';
        let statusText = project.status || 'active';

        if (project.status === 'in_progress' || project.status === 'active' || project.status === 'ongoing') {
            statusClass = 'status-active';
            statusText = 'In Progress';
        } else if (project.status === 'completed') {
            statusClass = 'status-completed';
            statusText = 'Completed';
        } else if (project.status === 'planning') {
            statusClass = 'status-planning';
            statusText = 'Planning';
        }

        // Build project dates
        let dateInfo = '';
        if (project.startDate) {
            const startDate = new Date(project.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short'
            });
            dateInfo = `Started: ${startDate}`;

            if (project.endDate) {
                const endDate = new Date(project.endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short'
                });
                dateInfo += ` - ${endDate}`;
            }
        }

        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p class="project-status">Status: <span class="${statusClass}">${statusText}</span></p>
            ${dateInfo ? `<p class="project-dates" style="color: #999; font-size: 0.9rem; margin: 0.5rem 0;">${dateInfo}</p>` : ''}
            <p>${project.description}</p>
            ${project.principalInvestigator ? `<p class="project-pi" style="color: #667eea; font-weight: 500;">PI: ${project.principalInvestigator}</p>` : ''}
            ${project.fundingSource ? `<p class="project-funding" style="color: #4caf50; font-weight: 500;">Funding: ${project.fundingSource}</p>` : ''}
            ${project.outcomes && project.outcomes.length > 0 ? `
                <div class="project-outcomes" style="margin-top: 1rem;">
                    <strong>Outcomes:</strong>
                    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                        ${project.outcomes.map(outcome => `<li style="color: #666; margin-bottom: 0.3rem;">${outcome}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            ${project.tags && project.tags.length > 0 ? `
                <div class="project-tags" style="margin-top: 1rem;">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
        `;

        projectsList.appendChild(projectCard);
    });

    // Update pagination info
    updateProjectPaginationInfo();
}

function addProjectPagination() {
    const projectsSection = document.querySelector('.projects-list').closest('.content-section');
    if (!projectsSection) return;

    // Remove existing pagination
    const existingPagination = projectsSection.querySelector('.projects-pagination');
    if (existingPagination) {
        existingPagination.remove();
    }

    // Calculate total pages
    const totalPages = Math.ceil(allProjects.length / projectsPerPage);

    if (totalPages <= 1) return; // No pagination needed

    // Create pagination container
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'projects-pagination';
    paginationContainer.style.cssText = `
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        margin: 2rem 0;
        flex-wrap: wrap;
    `;

    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.className = 'pagination-btn';
    prevBtn.disabled = currentProjectPage === 1;
    prevBtn.onclick = () => {
        if (currentProjectPage > 1) {
            currentProjectPage--;
            displayProjects();
            scrollToProjects();
        }
    };
    paginationContainer.appendChild(prevBtn);

    // Page numbers
    const startPage = Math.max(1, currentProjectPage - 2);
    const endPage = Math.min(totalPages, currentProjectPage + 2);

    // First page
    if (startPage > 1) {
        const firstBtn = createProjectPageButton(1, totalPages);
        paginationContainer.appendChild(firstBtn);
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0.5rem';
            paginationContainer.appendChild(ellipsis);
        }
    }

    // Page range
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createProjectPageButton(i, totalPages);
        paginationContainer.appendChild(pageBtn);
    }

    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '0.5rem';
            paginationContainer.appendChild(ellipsis);
        }
        const lastBtn = createProjectPageButton(totalPages, totalPages);
        paginationContainer.appendChild(lastBtn);
    }

    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.className = 'pagination-btn';
    nextBtn.disabled = currentProjectPage === totalPages;
    nextBtn.onclick = () => {
        if (currentProjectPage < totalPages) {
            currentProjectPage++;
            displayProjects();
            scrollToProjects();
        }
    };
    paginationContainer.appendChild(nextBtn);

    // Add pagination after projects list
    projectsSection.appendChild(paginationContainer);
}

function createProjectPageButton(pageNum, totalPages) {
    const btn = document.createElement('button');
    btn.textContent = pageNum;
    btn.className = 'pagination-btn';
    if (pageNum === currentProjectPage) {
        btn.classList.add('active');
    }
    btn.onclick = () => {
        currentProjectPage = pageNum;
        displayProjects();
        scrollToProjects();
    };
    return btn;
}

function updateProjectPaginationInfo() {
    // Add pagination info
    const projectsSection = document.querySelector('.projects-list').closest('.content-section');
    if (!projectsSection) return;

    // Remove existing info
    const existingInfo = projectsSection.querySelector('.projects-info');
    if (existingInfo) {
        existingInfo.remove();
    }

    // Create new info
    const infoElement = document.createElement('div');
    infoElement.className = 'projects-info';
    infoElement.style.cssText = `
        text-align: center;
        margin: 1rem 0;
        color: #666;
        font-size: 0.95rem;
    `;

    const startIndex = (currentProjectPage - 1) * projectsPerPage + 1;
    const endIndex = Math.min(currentProjectPage * projectsPerPage, allProjects.length);
    const totalProjects = allProjects.length;

    infoElement.textContent = `Showing ${startIndex}-${endIndex} of ${totalProjects} projects`;

    // Insert before projects list
    const projectsList = document.querySelector('.projects-list');
    projectsList.parentNode.insertBefore(infoElement, projectsList);
}

function scrollToProjects() {
    const projectsSection = document.querySelector('.projects-list').closest('.content-section');
    if (projectsSection) {
        projectsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function setCollaborations() {
    const collabGrid = document.querySelector('.collaboration-grid');
    if (collabGrid && CONFIG.research?.collaborations) {
        collabGrid.innerHTML = '';

        // Academic Partners
        if (CONFIG.research.collaborations.academic && CONFIG.research.collaborations.academic.length > 0) {
            const academicCard = document.createElement('div');
            academicCard.className = 'collab-card';
            academicCard.innerHTML = `
                <h4>Academic Partners</h4>
                <ul>
                    ${CONFIG.research.collaborations.academic
                    .filter(partner => partner && partner.name)
                    .map(partner => `<li>${partner.name}</li>`)
                    .join('')}
                </ul>
            `;
            collabGrid.appendChild(academicCard);
        }

        // Industry Partners
        if (CONFIG.research.collaborations.industry && CONFIG.research.collaborations.industry.length > 0) {
            const industryCard = document.createElement('div');
            industryCard.className = 'collab-card';
            industryCard.innerHTML = `
                <h4>Industry Partners</h4>
                <ul>
                    ${CONFIG.research.collaborations.industry
                    .filter(partner => partner && partner.name)
                    .map(partner => `<li>${partner.name}</li>`)
                    .join('')}
                </ul>
            `;
            collabGrid.appendChild(industryCard);
        }
    }
}