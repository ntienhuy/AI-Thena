// ===== PUBLICATIONS PAGE JAVASCRIPT WITH PAGINATION =====
let allPublications = [];
let filteredPublications = [];
let currentPage = 1;
let itemsPerPage = 10; // Fixed 10 publications per page

document.addEventListener('DOMContentLoaded', function() {
    if (typeof CONFIG !== 'undefined') {
        initializePublicationsPage();
        initializeAnimationObserver();
    } else {
        setTimeout(function() {
            if (typeof CONFIG !== 'undefined') {
                initializePublicationsPage();
                initializeAnimationObserver();
            }
        }, 100);
    }
});

function initializePublicationsPage() {
    // Set page title and subtitle
    const pageTitle = document.querySelector('.page-hero h1');
    const pageSubtitle = document.querySelector('.page-hero p');
    
    if (pageTitle && CONFIG.publications?.pageTitle) {
        pageTitle.textContent = CONFIG.publications.pageTitle;
    }
    if (pageSubtitle && CONFIG.publications?.pageSubtitle) {
        pageSubtitle.textContent = CONFIG.publications.pageSubtitle;
    }
    
    // Store all publications
    allPublications = CONFIG.publications?.publications || [];
    filteredPublications = [...allPublications];
    
    // Sort publications by year (newest first)
    allPublications.sort((a, b) => b.year - a.year);
    filteredPublications.sort((a, b) => b.year - a.year);
    
    // Display publications with pagination
    displayPublications(filteredPublications);
    
    // Update statistics
    updatePublicationStats();
    
    // // Set featured publications
    // setFeaturedPublications();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize search
    initializeSearch();
}

function applyFilter(filter) {
    let newFilteredPublications = [];

    if (filter === 'all') {
        newFilteredPublications = [...allPublications];
    } else if (filter === 'journal') {
        newFilteredPublications = allPublications.filter(p => p.venueType === 'journal');
    } else if (filter === 'conference') {
        newFilteredPublications = allPublications.filter(p => p.venueType === 'conference');
    } else {
        // Filter by year
        newFilteredPublications = allPublications.filter(p => p.year == filter);
    }
    
    filteredPublications = newFilteredPublications;
    currentPage = 1; // Reset to first page when filtering
    displayPublications(filteredPublications);
}

function updatePublicationStats() {
    const totalPubs = document.getElementById('total-publications');
    const totalJournals = document.getElementById('total-journals');
    const totalConferences = document.getElementById('total-conferences');

    if (totalPubs && totalJournals && totalConferences) {
        // Count total publications
        totalPubs.textContent = allPublications.length;

        // Count journal papers
        const journalCount = allPublications.filter(p => p.venueType === 'journal').length;
        totalJournals.textContent = journalCount;

        // Count conference papers
        const conferenceCount = allPublications.filter(p => p.venueType === 'conference').length;
        totalConferences.textContent = conferenceCount;
    }
    
    // Update metrics if available
    if (CONFIG.publications?.stats) {
        const metricsGrid = document.querySelector('.metrics-grid');
        if (metricsGrid) {
            metricsGrid.innerHTML = '';
            
            const metrics = [
                { value: CONFIG.publications.stats.citations, label: 'Total Citations' },
                { value: CONFIG.publications.stats.hIndex, label: 'h-index' },
                { value: CONFIG.publications.stats.awards, label: 'Awards Received' },
                { value: CONFIG.publications.stats.bestPapers, label: 'Best Paper Awards' }
            ];
            
            metrics.forEach(metric => {
                if (metric.value) {
                    const card = document.createElement('div');
                    card.className = 'metric-card';
                    card.innerHTML = `
                        <h3>${metric.value}</h3>
                        <p>${metric.label}</p>
                    `;
                    metricsGrid.appendChild(card);
                }
            });
        }
    }
}

// function setFeaturedPublications() {
//     const featuredPubs = document.querySelector('.featured-publications');
//     if (featuredPubs && CONFIG.publications?.featured) {
//         featuredPubs.innerHTML = '';
        
//         CONFIG.publications.featured
//             .filter(pub => pub && pub.title)
//             .slice(0, 2)
//             .forEach(pub => {
//                 const featuredDiv = document.createElement('div');
//                 featuredDiv.className = 'featured-pub';
                
//                 const links = [];
//                 if (pub.pdf) links.push(`<a href="${pub.pdf}" class="pub-link">PDF</a>`);
//                 if (pub.arxiv) links.push(`<a href="${pub.arxiv}" class="pub-link">arXiv</a>`);
//                 if (pub.code) links.push(`<a href="${pub.code}" class="pub-link">Code</a>`);
                
//                 featuredDiv.innerHTML = `
//                     ${pub.award ? `<div class="pub-badge">${pub.award}</div>` : ''}
//                     <h3>${pub.title}</h3>
//                     ${pub.authors ? `<p class="pub-authors">${pub.authors.join(', ')}</p>` : ''}
//                     ${pub.venue ? `<p class="pub-venue">${pub.venue}</p>` : ''}
//                     ${pub.abstract ? `<p class="pub-abstract">${pub.abstract}</p>` : ''}
//                     ${links.length > 0 ? `<div class="pub-links">${links.join('')}</div>` : ''}
//                 `;
                
//                 featuredPubs.appendChild(featuredDiv);
//             });
//     }
// }

function displayPublications(publications) {
    const publicationsList = document.getElementById('publications-list');
    const paginationContainer = document.getElementById('pagination-container');

    // Sort publications by year (newest first)
    publications.sort((a, b) => b.year - a.year);

    if (publicationsList) {
        publicationsList.innerHTML = '';
        
        if (publications.length === 0) {
            publicationsList.innerHTML = '<p style="text-align: center; color: #666;">No publications found.</p>';
            if (paginationContainer) paginationContainer.style.display = 'none';
            return;
        }
        
        // Calculate pagination
        const totalPages = Math.ceil(publications.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPublications = publications.slice(startIndex, endIndex);
        
        // Display current page publications
        currentPublications.forEach(publication => {
            const pubEntry = createPublicationEntry(publication);
            if (pubEntry) publicationsList.appendChild(pubEntry);
        });
        
        // Update pagination info
        updatePaginationInfo(publications.length, startIndex, endIndex);
        
        // Display pagination controls
        displayPaginationControls(totalPages);
    }
}

function updatePaginationInfo(totalCount, startIndex, endIndex) {
    const paginationInfo = document.getElementById('pagination-info');
    if (paginationInfo) {
        const actualEndIndex = Math.min(endIndex, totalCount);
        paginationInfo.textContent = `Showing ${startIndex + 1}-${actualEndIndex} of ${totalCount} publications`;
    }
}

function displayPaginationControls(totalPages) {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.textContent = '← Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPublications(filteredPublications);
            scrollToTop();
        }
    });
    paginationContainer.appendChild(prevBtn);
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    // First page
    if (startPage > 1) {
        const firstBtn = createPageButton(1, totalPages);
        paginationContainer.appendChild(firstBtn);
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'pagination-ellipsis';
            paginationContainer.appendChild(ellipsis);
        }
    }
    
    // Page range
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = createPageButton(i, totalPages);
        paginationContainer.appendChild(pageBtn);
    }
    
    // Last page
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.className = 'pagination-ellipsis';
            paginationContainer.appendChild(ellipsis);
        }
        const lastBtn = createPageButton(totalPages, totalPages);
        paginationContainer.appendChild(lastBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.textContent = 'Next →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPublications(filteredPublications);
            scrollToTop();
        }
    });
    paginationContainer.appendChild(nextBtn);
}

function createPageButton(pageNum, totalPages) {
    const btn = document.createElement('button');
    btn.className = 'pagination-btn page-number';
    btn.textContent = pageNum;
    if (pageNum === currentPage) {
        btn.classList.add('active');
    }
    btn.addEventListener('click', () => {
        currentPage = pageNum;
        displayPublications(filteredPublications);
        scrollToTop();
    });
    return btn;
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function initializeFilters() {
    const filterControls = document.querySelector('.filter-controls');
    
    // Listen for click events on the entire container
    filterControls.addEventListener('click', function(e) {
        if (e.target.matches('.filter-btn')) {
            // Remove 'active' class from all buttons
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // Add 'active' class to clicked button
            e.target.classList.add('active');

            const filter = e.target.getAttribute('data-filter');
            applyFilter(filter);
        }
    });

    // Listen for change events on select elements
    document.querySelector('.filter-select').addEventListener('change', function(e) {
        // Remove 'active' class from all buttons when select is used
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        
        const filter = e.target.value;
        applyFilter(filter);
    });
}

function applyFilter(filter) {
    let newFilteredPublications = [];

    if (filter === 'all') {
        newFilteredPublications = [...allPublications];
    } else if (filter === 'journal') {
        newFilteredPublications = allPublications.filter(p => p.venueType === 'journal');
    } else if (filter === 'conference') {
        newFilteredPublications = allPublications.filter(p => p.venueType === 'conference');
    } else {
        // Filter by year
        newFilteredPublications = allPublications.filter(p => p.year == filter);
    }
    
    filteredPublications = newFilteredPublications;
    currentPage = 1; // Reset to first page when filtering
    displayPublications(filteredPublications);
}

function initializeSearch() {
    const searchInput = document.getElementById('publication-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query === '') {
                displayPublications(filteredPublications);
            } else {
                const searched = filteredPublications.filter(pub => 
                    pub.title.toLowerCase().includes(query) ||
                    (pub.authors && pub.authors.some(a => a.toLowerCase().includes(query))) ||
                    (pub.venue && pub.venue.toLowerCase().includes(query))
                );
                currentPage = 1; // Reset to first page when searching
                displayPublications(searched);
            }
        });
    }
}