// ===== PUBLICATIONS PAGE JAVASCRIPT =====
let allPublications = [];
let filteredPublications = [];

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
    
    // Display publications
    displayPublications(filteredPublications);
    
    // Update statistics
    updatePublicationStats();
    
    // Set featured publications
    setFeaturedPublications();
    
    // Initialize filters
    initializeFilters();
    
    // Initialize search
    initializeSearch();
}

function updatePublicationStats() {
    const totalPubs = document.getElementById('total-publications');
    const totalJournals = document.getElementById('total-journals');
    const totalConferences = document.getElementById('total-conferences');

    if (totalPubs && totalJournals && totalConferences) {
        // Đếm tổng số bài báo
        totalPubs.textContent = allPublications.length;

        // Đếm số lượng bài báo tạp chí
        const journalCount = allPublications.filter(p => p.venueType === 'journal').length;
        totalJournals.textContent = journalCount;

        // Đếm số lượng bài báo hội nghị
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

function setFeaturedPublications() {
    const featuredPubs = document.querySelector('.featured-publications');
    if (featuredPubs && CONFIG.publications?.featured) {
        featuredPubs.innerHTML = '';
        
        CONFIG.publications.featured
            .filter(pub => pub && pub.title)
            .slice(0, 2)
            .forEach(pub => {
                const featuredDiv = document.createElement('div');
                featuredDiv.className = 'featured-pub';
                
                const links = [];
                if (pub.pdf) links.push(`<a href="${pub.pdf}" class="pub-link">PDF</a>`);
                if (pub.arxiv) links.push(`<a href="${pub.arxiv}" class="pub-link">arXiv</a>`);
                if (pub.code) links.push(`<a href="${pub.code}" class="pub-link">Code</a>`);
                
                featuredDiv.innerHTML = `
                    ${pub.award ? `<div class="pub-badge">${pub.award}</div>` : ''}
                    <h3>${pub.title}</h3>
                    ${pub.authors ? `<p class="pub-authors">${pub.authors.join(', ')}</p>` : ''}
                    ${pub.venue ? `<p class="pub-venue">${pub.venue}</p>` : ''}
                    ${pub.abstract ? `<p class="pub-abstract">${pub.abstract}</p>` : ''}
                    ${links.length > 0 ? `<div class="pub-links">${links.join('')}</div>` : ''}
                `;
                
                featuredPubs.appendChild(featuredDiv);
            });
    }
}

function displayPublications(publications) {
    const publicationsList = document.getElementById('publications-list');

     // Sắp xếp các bài báo theo năm từ mới nhất đến cũ nhất
    publications.sort((a, b) => b.year - a.year);

    if (publicationsList) {
        publicationsList.innerHTML = '';
        
        if (publications.length === 0) {
            publicationsList.innerHTML = '<p style="text-align: center; color: #666;">No publications found.</p>';
            return;
        }
        
        publications.forEach(publication => {
            const pubEntry = createPublicationEntry(publication);
            if (pubEntry) publicationsList.appendChild(pubEntry);
        });
    }
}

// function initializeFilters() {
//     const filterBtns = document.querySelectorAll('.filter-btn');
//     filterBtns.forEach(btn => {
//         btn.addEventListener('click', function() {
//             // Remove active from all
//             filterBtns.forEach(b => b.classList.remove('active'));
//             // Add active to clicked
//             this.classList.add('active');
            
//             const filter = this.getAttribute('data-filter');
//             if (filter === 'all') {
//                 filteredPublications = [...allPublications];
//             } else if (filter === 'journal') {
//                 filteredPublications = allPublications.filter(p => p.venueType === 'journal');
//             } else if (filter === 'conference') {
//                 filteredPublications = allPublications.filter(p => p.venueType === 'conference');
//             } else {
//                 // Year filter
//                 filteredPublications = allPublications.filter(p => p.year == filter);
//             }
            
//             displayPublications(filteredPublications);
//         });
//     });
// }
function initializeFilters() {
    const filterControls = document.querySelector('.filter-controls');
    
    // Lắng nghe sự kiện click trên toàn bộ container
    filterControls.addEventListener('click', function(e) {
        if (e.target.matches('.filter-btn')) {
            // Xóa class 'active' khỏi tất cả các nút
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            // Thêm class 'active' vào nút vừa được click
            e.target.classList.add('active');

            const filter = e.target.getAttribute('data-filter');
            applyFilter(filter);
        }
    });

    // Lắng nghe sự kiện change trên thẻ <select>
    document.querySelector('.filter-select').addEventListener('change', function(e) {
        // Xóa class 'active' khỏi tất cả các nút khi chọn <select>
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        
        const filter = e.target.value;
        applyFilter(filter);
    });
}

function applyFilter(filter) {
    let filteredPublications = [];

    if (filter === 'all') {
        filteredPublications = [...allPublications];
    } else if (filter === 'journal') {
        filteredPublications = allPublications.filter(p => p.venueType === 'journal');
    } else if (filter === 'conference') {
        filteredPublications = allPublications.filter(p => p.venueType === 'conference');
    } else {
        // Lọc theo năm
        filteredPublications = allPublications.filter(p => p.year == filter);
    }
    
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
                displayPublications(searched);
            }
        });
    }
}