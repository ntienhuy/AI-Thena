// ===== COMMON JAVASCRIPT FILE - COMPLETE FIX =====

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize immediately if CONFIG exists, otherwise wait
    if (typeof CONFIG !== 'undefined') {
        initializeAll();
    } else {
        // Wait for CONFIG to be available
        let checkCount = 0;
        const checkConfig = setInterval(function() {
            checkCount++;
            if (typeof CONFIG !== 'undefined') {
                clearInterval(checkConfig);
                initializeAll();
            } else if (checkCount > 20) { // Stop after 2 seconds
                clearInterval(checkConfig);
                console.error('CONFIG not loaded after 2 seconds');
                // Initialize with defaults
                initializeWithDefaults();
            }
        }, 100);
    }
});

// Initialize all common elements
function initializeAll() {
    initializeLabHeader();
    initializeNavigation();
    initializeMobileMenu();
    initializeHeaderScroll();
    initializeFooter();
}

// Initialize with default values if CONFIG fails to load
function initializeWithDefaults() {
    const labNameElement = document.getElementById('lab-name');
    if (labNameElement) {
        labNameElement.innerHTML = '<span>AI-THENA Lab</span>';
    }
    initializeNavigation();
    initializeMobileMenu();
    initializeHeaderScroll();
}

// Initialize Lab Name and Logo in Header
function initializeLabHeader() {
    const labNameElement = document.getElementById('lab-name');
    if (!labNameElement) return;
    
    // Get lab name and logo from CONFIG
    const labName = (window.CONFIG && CONFIG.labName) ? CONFIG.labName : 'AI-THENA Lab';
    const labLogo = (window.CONFIG && CONFIG.labLogo) ? CONFIG.labLogo : '';
    
    // Build the header content
    let headerHTML = '';
    
    // Add logo if it exists
    if (labLogo && labLogo !== '') {
        headerHTML += `<img src="${labLogo}" alt="${labName}" class="lab-logo" style="height: 40px; margin-right: 10px; vertical-align: middle;">`;
    }
    
    // Add lab name
    headerHTML += `<span>${labName}</span>`;
    
    // Set the content
    labNameElement.innerHTML = headerHTML;
    
    // Make sure the logo class styling is applied
    labNameElement.style.display = 'flex';
    labNameElement.style.alignItems = 'center';
    labNameElement.style.gap = '0.5rem';
}

// Initialize Navigation Menu
function initializeNavigation() {
    const navElement = document.querySelector('.nav-links');
    if (!navElement) return;
    
    // Get current page
    const currentPath = window.location.pathname;
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';
    
    // Create navigation HTML
    const navHTML = `
        <li><a href="index.html" class="${(currentPage === 'index.html' || currentPage === '') ? 'active' : ''}">Home</a></li>
        <li><a href="research.html" class="${currentPage === 'research.html' ? 'active' : ''}">Research</a></li>
        <li><a href="team.html" class="${currentPage === 'team.html' ? 'active' : ''}">Team</a></li>
        <li><a href="publications.html" class="${currentPage === 'publications.html' ? 'active' : ''}">Publications</a></li>
        <li><a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">Contact</a></li>
    `;
    
    // Only set if empty to avoid duplicates
    if (navElement.children.length === 0) {
        navElement.innerHTML = navHTML;
    }
}

// Initialize Footer
function initializeFooter() {
    // Set footer sections
    const footerContent = document.querySelector('.footer-content');
    if (footerContent && window.CONFIG && CONFIG.footer && CONFIG.footer.sections) {
        footerContent.innerHTML = '';
        
        CONFIG.footer.sections.forEach(section => {
            if (!section.title || !section.links || section.links.length === 0) return;
            
            const footerSection = document.createElement('div');
            footerSection.className = 'footer-section';
            
            const validLinks = section.links.filter(link => link.text && link.url);
            if (validLinks.length === 0) return;
            
            const linksHTML = validLinks
                .map(link => `<li><a href="${link.url}" ${link.external ? 'target="_blank" rel="noopener"' : ''}>${link.text}</a></li>`)
                .join('');
            
            footerSection.innerHTML = `
                <h4>${section.title}</h4>
                <ul class="footer-links">${linksHTML}</ul>
            `;
            
            footerContent.appendChild(footerSection);
        });
    }
    
    // Set footer text
    const footerText = document.getElementById('footer-text');
    if (footerText) {
        let footerHTML = '&copy; ';
        
        if (window.CONFIG && CONFIG.footer && CONFIG.footer.copyright) {
            const year = CONFIG.footer.copyright.year || new Date().getFullYear();
            const holder = CONFIG.footer.copyright.holder || (CONFIG.labName || 'AI-THENA Lab');
            const rights = CONFIG.footer.copyright.rights || 'All rights reserved';
            footerHTML += `${year} ${holder}. ${rights}`;
            
            if (CONFIG.footer.tagline) {
                footerHTML += ` | ${CONFIG.footer.tagline}`;
            }
        } else {
            footerHTML += `${new Date().getFullYear()} AI-THENA Lab. All rights reserved.`;
        }
        
        footerText.innerHTML = footerHTML;
    }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileToggle || !navLinks) return;
    
    // Remove any existing mobile menu
    const existingMenu = document.querySelector('.mobile-menu');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    // Create new mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    const mobileNav = document.createElement('ul');
    mobileMenu.appendChild(mobileNav);
    document.querySelector('header').appendChild(mobileMenu);
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        // Update mobile menu content
        mobileNav.innerHTML = navLinks.innerHTML;
        
        // Toggle active states
        mobileMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Add scroll effect to header
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    
    // Check initial scroll position
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
    
    // Add scroll listener
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Utility function to create research cards
function createResearchCard(area) {
    if (!area) return null;
    
    const card = document.createElement('div');
    card.className = 'research-card';
    
    const icon = area.icon || '🔬';
    const title = area.title || 'Research Area';
    const description = area.shortDescription || area.description || '';
    
    let cardHTML = `<h3>${icon} ${title}</h3>`;
    
    if (description) {
        cardHTML += `<p>${description}</p>`;
    }
    
    if (area.leadResearcher || area.publications) {
        cardHTML += '<div class="research-meta">';
        if (area.leadResearcher) {
            cardHTML += `<span class="research-lead">Lead: ${area.leadResearcher}</span>`;
        }
        if (area.publications) {
            cardHTML += `<span class="research-pubs">${area.publications} publications</span>`;
        }
        cardHTML += '</div>';
    }
    
    if (area.keywords && area.keywords.length > 0) {
        cardHTML += '<div class="research-keywords">';
        area.keywords.slice(0, 3).forEach(keyword => {
            cardHTML += `<span class="keyword-tag">${keyword}</span>`;
        });
        cardHTML += '</div>';
    }
    
    card.innerHTML = cardHTML;
    return card;
}

// Utility function to create team member cards
function createTeamMemberCard(member) {
    if (!member) return null;
    
    const card = document.createElement('div');
    card.className = 'team-member';
    
    const initials = member.initials || (member.name ? member.name.split(' ').map(n => n[0]).join('') : '?');
    
    let cardHTML = '';
    
    if (member.image) {
        cardHTML += `<img src="${member.image}" alt="${member.name}" class="member-photo" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 1rem; display: block; object-fit: cover;">`;
    } else {
        cardHTML += `<div class="member-avatar">${initials}</div>`;
    }
    
    if (member.name) {
        cardHTML += `<h3>${member.name}</h3>`;
    }
    
    if (member.role) {
        cardHTML += `<p class="role">${member.role}</p>`;
    }
    
    if (member.bio || member.description) {
        cardHTML += `<p class="description">${member.bio || member.description}</p>`;
    }
    
    if (member.email) {
        cardHTML += `<p class="contact-info"><a href="mailto:${member.email}">${member.email}</a></p>`;
    }
    
    card.innerHTML = cardHTML;
    return card;
}

// Utility function to create publication entries
function createPublicationEntry(publication) {
    if (!publication) return null;
    
    const div = document.createElement('div');
    div.className = 'publication';
    
    let pubHTML = '';
    
    if (publication.award) {
        pubHTML += `<span class="pub-award" style="display: inline-block; background: linear-gradient(45deg, #ffd700, #ffed4e); color: #333; padding: 0.2rem 0.6rem; border-radius: 15px; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem;">${publication.award}</span>`;
    }
    
    pubHTML += `<div class="publication-title">${publication.title || 'Untitled'}</div>`;
    
    if (publication.authors && publication.authors.length > 0) {
        pubHTML += `<div class="pub-authors" style="color: #666; font-style: italic; margin: 0.5rem 0;">${publication.authors.join(', ')}</div>`;
    }
    
    pubHTML += '<div class="publication-meta">';
    if (publication.venue) {
        pubHTML += publication.venue;
    }
    if (publication.year) {
        pubHTML += ` (${publication.year})`;
    }
    if (publication.citations) {
        pubHTML += ` - ${publication.citations} citations`;
    }
    pubHTML += '</div>';
    
    const links = [];
    if (publication.pdf) links.push(`<a href="${publication.pdf}" class="pub-link">PDF</a>`);
    if (publication.arxiv) links.push(`<a href="${publication.arxiv}" class="pub-link">arXiv</a>`);
    if (publication.code) links.push(`<a href="${publication.code}" class="pub-link">Code</a>`);
    
    if (links.length > 0) {
        pubHTML += `<div class="pub-links" style="margin-top: 0.5rem; display: flex; gap: 1rem;">${links.join('')}</div>`;
    }
    
    div.innerHTML = pubHTML;
    return div;
}

// Animation observer for fade-in effects
function initializeAnimationObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
}


// Export functions for use in other files
window.createResearchCard = createResearchCard;
window.createTeamMemberCard = createTeamMemberCard;
window.createPublicationEntry = createPublicationEntry;
window.initializeAnimationObserver = initializeAnimationObserver;


// ===== IMAGE PLACEHOLDER HANDLER =====
// Add this to your common.js file or create a new file called image-handler.js

// Function to handle image loading errors
function handleImageError(img) {
    // Check if it's already been handled to avoid infinite loop
    if (img.dataset.errorHandled === 'true') return;
    
    img.dataset.errorHandled = 'true';
    
    // Try to use lab logo first
    if (CONFIG && CONFIG.labLogo && CONFIG.labLogo !== '' && img.src !== CONFIG.labLogo) {
        img.src = CONFIG.labLogo;
        img.style.objectFit = 'contain';
        img.style.padding = '10px';
        img.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
    } else {
        // If logo also fails or not available, replace with initials div
        replaceWithInitials(img);
    }
}

// Function to replace image with initials
function replaceWithInitials(img) {
    // Get the person's name from alt text or data attribute
    const name = img.alt || img.dataset.name || 'Unknown';
    const initials = getInitials(name);
    
    // Create a div with initials
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'member-avatar-fallback';
    avatarDiv.textContent = initials;
    
    // Copy some attributes for styling consistency
    if (img.className) {
        avatarDiv.className += ' ' + img.className;
    }
    
    // Apply styles based on the original image type
    if (img.classList.contains('member-photo')) {
        avatarDiv.style.width = '100px';
        avatarDiv.style.height = '100px';
        avatarDiv.style.borderRadius = '50%';
        avatarDiv.style.margin = '0 auto 1rem';
        avatarDiv.style.display = 'flex';
        avatarDiv.style.alignItems = 'center';
        avatarDiv.style.justifyContent = 'center';
        avatarDiv.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        avatarDiv.style.color = 'white';
        avatarDiv.style.fontSize = '2rem';
        avatarDiv.style.fontWeight = 'bold';
    }
    
    // Replace the image with the avatar div
    img.parentNode.replaceChild(avatarDiv, img);
}

// Function to get initials from name
function getInitials(name) {
    if (!name || name === 'Unknown') return '?';
    
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return parts.map(part => part[0]).join('').substring(0, 2).toUpperCase();
}

// Function to create a placeholder image URL (optional - for default images)
function getPlaceholderImage(text, size = 100) {
    // Create a canvas-based placeholder
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size/3}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size/2, size/2);
    
    return canvas.toDataURL();
}

// Initialize image error handlers when DOM is loaded
function initializeImageHandlers() {
    // Add error handler to all existing images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add error handler
        img.addEventListener('error', function() {
            handleImageError(this);
        });
        
        // Check if image is already broken
        if (img.complete && img.naturalHeight === 0) {
            handleImageError(img);
        }
    });
    
    // Also handle dynamically added images using MutationObserver
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.tagName === 'IMG') {
                    node.addEventListener('error', function() {
                        handleImageError(this);
                    });
                } else if (node.querySelectorAll) {
                    const imgs = node.querySelectorAll('img');
                    imgs.forEach(img => {
                        img.addEventListener('error', function() {
                            handleImageError(this);
                        });
                    });
                }
            });
        });
    });
    
    // Start observing
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Enhanced createTeamMemberCard with image error handling
function createTeamMemberCardWithPlaceholder(member) {
    if (!member || !member.name) return null;
    
    const card = document.createElement('div');
    card.className = 'team-member';
    
    const initials = member.initials || getInitials(member.name);
    
    let cardHTML = '';
    
    // Add image with error handling or default avatar
    if (member.image) {
        cardHTML += `
            <img src="${member.image}" 
                 alt="${member.name}" 
                 data-name="${member.name}"
                 class="member-photo" 
                 onerror="handleImageError(this)"
                 style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 1rem; display: block; object-fit: cover;">
        `;
    } else {
        // Use placeholder directly if no image provided
        cardHTML += `<div class="member-avatar">${initials}</div>`;
    }
    
    // Add name and other details
    cardHTML += `<h3>${member.name}</h3>`;
    
    if (member.role) {
        cardHTML += `<p class="role">${member.role}</p>`;
    }
    
    if (member.bio || member.description) {
        const text = member.bio || member.description;
        const maxLength = 150;
        const displayText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
        cardHTML += `<p class="description">${displayText}</p>`;
    }
    
    if (member.email) {
        cardHTML += `<p class="contact-info"><a href="mailto:${member.email}">${member.email}</a></p>`;
    }
    
    card.innerHTML = cardHTML;
    return card;
}

// Add this to the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize image handlers after a short delay to ensure CONFIG is loaded
    setTimeout(function() {
        initializeImageHandlers();
    }, 100);
});

// Export functions for use in other files
window.handleImageError = handleImageError;
window.getPlaceholderImage = getPlaceholderImage;
window.createTeamMemberCardWithPlaceholder = createTeamMemberCardWithPlaceholder;