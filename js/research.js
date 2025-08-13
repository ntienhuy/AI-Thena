// ===== RESEARCH PAGE JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof CONFIG !== 'undefined') {
        initializeResearchPage();
        initializeAnimationObserver();
    } else {
        setTimeout(function() {
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
    
    // Populate current projects
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

function setCurrentProjects() {
    const projectsList = document.querySelector('.projects-list');
    if (projectsList && CONFIG.research?.projects) {
        projectsList.innerHTML = '';
        
        CONFIG.research.projects
            .filter(project => project && project.title)
            .forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                let statusClass = 'status-active';
                if (project.status === 'planning') statusClass = 'status-planning';
                else if (project.status === 'completed') statusClass = 'status-completed';
                
                projectCard.innerHTML = `
                    <h3>${project.title}</h3>
                    <p class="project-status">Status: <span class="${statusClass}">${project.status}</span></p>
                    <p>${project.description}</p>
                    ${project.funding ? `<p class="project-funding">Funding: ${project.funding}</p>` : ''}
                    ${project.tags && project.tags.length > 0 ? `
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                `;
                
                projectsList.appendChild(projectCard);
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