// ===== CONTACT.JS - FIXED VERSION =====

// Wait for DOM and CONFIG to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for CONFIG to load if needed
    if (typeof CONFIG === 'undefined') {
        setTimeout(initializeContactPage, 100);
    } else {
        initializeContactPage();
    }
});

function initializeContactPage() {
    console.log('Initializing contact page...', CONFIG);
    
    if (typeof CONFIG === 'undefined' || !CONFIG.contact) {
        console.error('CONFIG.contact not available');
        return;
    }
    
    // Set page title and subtitle
    setPageHeader();
    
    // Set contact information
    setContactInformation();
    
    // Initialize contact form
    initializeContactForm();
    
    // Set opportunities
    setOpportunities();
    
    // Set FAQ
    setFAQ();
    
    console.log('Contact page initialized successfully');
}

function setPageHeader() {
    const pageTitle = document.querySelector('.page-hero h1');
    const pageSubtitle = document.querySelector('.page-hero p');
    
    if (pageTitle && CONFIG.contact?.pageTitle) {
        pageTitle.textContent = CONFIG.contact.pageTitle;
    }
    if (pageSubtitle && CONFIG.contact?.pageSubtitle) {
        pageSubtitle.textContent = CONFIG.contact.pageSubtitle;
    }
}

function setContactInformation() {
    // Set email
    const emailElement = document.getElementById('contact-email');
    if (emailElement && CONFIG.contact?.primary?.email) {
        emailElement.innerHTML = `<a href="mailto:${CONFIG.contact.primary.email}">${CONFIG.contact.primary.email}</a>`;
    }
    
    // Set location
    const locationElement = document.getElementById('contact-location');
    if (locationElement && CONFIG.contact?.primary?.address) {
        const addr = CONFIG.contact.primary.address;
        const locationParts = [
            addr.line1,
            addr.line2,
            addr.street,
            `${addr.city}, ${addr.state} ${addr.zip}`,
            addr.country
        ].filter(Boolean);
        locationElement.innerHTML = locationParts.join('<br>');
    }
    
    // Set GitHub
    const githubElement = document.getElementById('contact-github');
    if (githubElement && CONFIG.contact?.social?.github) {
        githubElement.href = CONFIG.contact.social.github;
        githubElement.textContent = CONFIG.contact.social.github.replace('https://github.com/', 'github.com/');
    }
    
    // Set phone if there's an element for it
    const phoneElement = document.getElementById('contact-phone');
    if (phoneElement && CONFIG.contact?.primary?.phone) {
        phoneElement.innerHTML = `<a href="tel:${CONFIG.contact.primary.phone}">${CONFIG.contact.primary.phone}</a>`;
    }
}

function initializeContactForm() {
    const form = document.getElementById('contact-form');
    const subjectSelect = document.getElementById('subject');
    
    if (!form || !CONFIG.contact?.form) return;
    
    // Populate subject options
    if (subjectSelect && CONFIG.contact.form.subjects) {
        subjectSelect.innerHTML = '';
        CONFIG.contact.form.subjects.forEach(subject => {
            const option = document.createElement('option');
            option.value = subject.value;
            option.textContent = subject.label;
            subjectSelect.appendChild(option);
        });
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Basic validation
        const requiredFields = CONFIG.contact.form.requiredFields || ['name', 'email', 'subject', 'message'];
        const missing = requiredFields.filter(field => !data[field]?.trim());
        
        const statusElement = document.getElementById('form-status');
        
        if (missing.length > 0) {
            statusElement.textContent = `Please fill in: ${missing.join(', ')}`;
            statusElement.className = 'form-status error';
            return;
        }
        
        // Check message length
        if (CONFIG.contact.form.maxMessageLength && data.message.length > CONFIG.contact.form.maxMessageLength) {
            statusElement.textContent = `Message too long. Maximum ${CONFIG.contact.form.maxMessageLength} characters.`;
            statusElement.className = 'form-status error';
            return;
        }
        
        // Simulate form submission (replace with actual form handler)
        statusElement.textContent = 'Sending message...';
        statusElement.className = 'form-status pending';
        
        setTimeout(() => {
            statusElement.textContent = CONFIG.contact.form.successMessage || 'Message sent successfully!';
            statusElement.className = 'form-status success';
            form.reset();
        }, 1500);
        
        console.log('Form submitted:', data);
    });
}

function setOpportunities() {
    const oppGrid = document.querySelector('.opportunities-grid');
    if (!oppGrid || !CONFIG.contact?.opportunities) return;
    
    oppGrid.innerHTML = '';
    
    CONFIG.contact.opportunities
        .filter(opp => opp && opp.title)
        .forEach(opp => {
            const oppCard = document.createElement('div');
            oppCard.className = 'opportunity-card';
            
            // Add status class for styling
            if (opp.status) {
                oppCard.classList.add(`status-${opp.status}`);
            }
            
            oppCard.innerHTML = `
                ${opp.icon ? `<div class="opportunity-icon">${opp.icon}</div>` : ''}
                <h3>${opp.title}</h3>
                ${opp.description ? `<p>${opp.description}</p>` : ''}
                ${opp.deadline ? `<p class="deadline"><strong>Deadline:</strong> ${opp.deadline}</p>` : ''}
                ${opp.link ? `<a href="${opp.link}" class="opportunity-link">Learn More →</a>` : ''}
            `;
            oppGrid.appendChild(oppCard);
        });
}

function setFAQ() {
    const faqList = document.querySelector('.faq-list');
    if (!faqList || !CONFIG.contact?.faq) return;
    
    // Create wrapper section if it doesn't exist
    const faqSection = faqList.closest('.faq-section') || wrapFAQInSection(faqList);
    
    faqList.innerHTML = '';
    
    CONFIG.contact.faq
        .filter(item => item && item.question && item.answer)
        .forEach(item => {
            const faqItem = document.createElement('details');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <summary>${item.question}</summary>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            `;
            
            // Add smooth animation for open/close
            faqItem.addEventListener('toggle', function() {
                if (this.open) {
                    // Close other FAQs for accordion behavior (optional)
                    // document.querySelectorAll('.faq-item[open]').forEach(other => {
                    //     if (other !== this) other.removeAttribute('open');
                    // });
                }
            });
            
            faqList.appendChild(faqItem);
        });
}

function wrapFAQInSection(faqList) {
    const wrapper = document.createElement('div');
    wrapper.className = 'faq-section';
    
    const title = document.createElement('h2');
    title.className = 'section-title';
    title.textContent = 'Frequently Asked Questions';
    
    wrapper.appendChild(title);
    faqList.parentNode.insertBefore(wrapper, faqList);
    wrapper.appendChild(faqList);
    
    return wrapper;
}

// Additional helper functions

function populateKeyContacts() {
    // If you have a section for key contacts in your HTML
    const contactsSection = document.querySelector('.key-contacts');
    if (!contactsSection || !CONFIG.contact?.keyContacts) return;
    
    contactsSection.innerHTML = '';
    
    CONFIG.contact.keyContacts.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'contact-category';
        categoryDiv.innerHTML = `
            <h3>${category.category}</h3>
            <div class="contacts-list">
                ${category.contacts.map(contact => `
                    <div class="contact-person">
                        <h4>${contact.name}</h4>
                        <p class="role">${contact.role}</p>
                        ${contact.email ? `<p><a href="mailto:${contact.email}">${contact.email}</a></p>` : ''}
                        ${contact.phone ? `<p><a href="tel:${contact.phone}">${contact.phone}</a></p>` : ''}
                        ${contact.office ? `<p>Office: ${contact.office}</p>` : ''}
                        ${contact.hours ? `<p>Hours: ${contact.hours}</p>` : ''}
                        ${contact.area ? `<p>Area: ${contact.area}</p>` : ''}
                        ${contact.description ? `<p>${contact.description}</p>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
        contactsSection.appendChild(categoryDiv);
    });
}

// Initialize map if needed
function initializeMap() {
    if (!CONFIG.contact?.map?.enabled || !CONFIG.contact?.primary?.coordinates) return;
    
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;
    
    // Replace placeholder with actual map
    const coords = CONFIG.contact.primary.coordinates;
    mapContainer.innerHTML = `
        <div class="map-placeholder">
            <p>📍 ${CONFIG.contact.primary.address.line1}</p>
            <p>${CONFIG.contact.primary.address.street}</p>
            <p>${CONFIG.contact.primary.address.city}, ${CONFIG.contact.primary.address.state} ${CONFIG.contact.primary.address.zip}</p>
            <p><strong>Coordinates:</strong> ${coords.lat}, ${coords.lng}</p>
        </div>
    `;
}

// Call additional setup functions if needed
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (typeof CONFIG !== 'undefined' && CONFIG.contact) {
            initializeMap();
            populateKeyContacts();
        }
    }, 200);
});