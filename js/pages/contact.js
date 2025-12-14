/**
 * CONTACT PAGE MODULE
 * Handles contact form and opportunities
 */

const ContactPage = {
    /**
     * Initialize contact page
     */
    init() {
        this.setPageHeader();
        this.setContactInformation();
        this.initializeContactForm();
        this.setOpportunitiesFromTeam();
        this.setFAQ();
    },

    /**
     * Set page header
     */
    setPageHeader() {
        DOMUtils.setText(
            document.querySelector('.page-hero h1'),
            ConfigLoader.get('contact.pageTitle', 'Contact Us')
        );
        DOMUtils.setText(
            document.querySelector('.page-hero p'),
            ConfigLoader.get('contact.pageSubtitle', 'Get in touch with our team')
        );
    },

    /**
     * Set contact information
     */
    setContactInformation() {
        // Email
        const emailElement = document.getElementById('contact-email');
        const email = ConfigLoader.get('contact.primary.email', '');
        if (emailElement && email) {
            emailElement.innerHTML = `<a href="mailto:${email}">${email}</a>`;
        }

        // Location
        const locationElement = document.getElementById('contact-location');
        const address = ConfigLoader.get('contact.primary.address', {});
        if (locationElement && address.line1) {
            const locationParts = [
                address.line1,
                address.line2,
                `${address.street}, ${address.city}, ${address.country}`
            ].filter(Boolean);
            locationElement.innerHTML = locationParts.join('<br><br>');
        }

        // GitHub
        const githubElement = document.getElementById('contact-github');
        const github = ConfigLoader.get('contact.social.github', '');
        if (githubElement && github) {
            githubElement.href = github;
            githubElement.textContent = github.replace('https://github.com/', 'github.com/');
        }

        // Phone
        const phoneElement = document.getElementById('contact-phone');
        const phone = ConfigLoader.get('contact.primary.phone', '');
        if (phoneElement && phone) {
            phoneElement.innerHTML = `<a href="tel:${phone}">${phone}</a>`;
        }
    },

    /**
     * Initialize contact form
     */
    initializeContactForm() {
        const form = document.getElementById('contact-form');
        const subjectSelect = document.getElementById('subject');

        if (!form) return;

        // Populate subject options
        if (subjectSelect) {
            const subjects = ConfigLoader.get('contact.form.subjects', []);
            DOMUtils.clear(subjectSelect);

            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject.value;
                option.textContent = subject.label;
                subjectSelect.appendChild(option);
            });
        }

        // Handle form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Validation
            const requiredFields = ConfigLoader.get('contact.form.requiredFields', ['name', 'email', 'subject', 'message']);
            const missing = requiredFields.filter(field => !data[field]?.trim());

            const statusElement = document.getElementById('form-status');

            if (missing.length > 0) {
                statusElement.textContent = `Please fill in: ${missing.join(', ')}`;
                statusElement.className = 'form-status error';
                return;
            }

            // Check message length
            const maxLength = ConfigLoader.get('contact.form.maxMessageLength', 5000);
            if (data.message.length > maxLength) {
                statusElement.textContent = `Message too long. Maximum ${maxLength} characters.`;
                statusElement.className = 'form-status error';
                return;
            }

            // Simulate submission
            statusElement.textContent = 'Sending message...';
            statusElement.className = 'form-status pending';

            setTimeout(() => {
                const successMessage = ConfigLoader.get('contact.form.successMessage', 'Message sent successfully!');
                statusElement.textContent = successMessage;
                statusElement.className = 'form-status success';
                form.reset();
            }, 1500);

            console.log('Form submitted:', data);
        });
    },

    /**
     * Set opportunities from team config
     */
    setOpportunitiesFromTeam() {
        const oppGrid = document.querySelector('.opportunities-grid');
        if (!oppGrid) return;

        const teamOpportunities = ConfigLoader.get('team.opportunities.openPositions', []);

        DOMUtils.clear(oppGrid);

        if (teamOpportunities.length === 0) {
            this._showDefaultOpportunities(oppGrid);
            return;
        }

        // Use team opportunities data
        teamOpportunities
            .filter(opp => opp && opp.title)
            .forEach(opp => {
                const oppCard = DOMUtils.createElement('div', ['opportunity-card']);

                if (opp.status) {
                    oppCard.classList.add(`status-${opp.status}`);
                }

                const opportunityId = StringUtils.slugify(opp.title);

                oppCard.innerHTML = `
                    <div id="${opportunityId}"></div>
                    ${opp.icon ? `<div class="opportunity-icon">${opp.icon}</div>` : ''}
                    <h3>${opp.title}</h3>
                    ${opp.description ? `<p>${opp.description}</p>` : ''}
                    ${opp.requirements && opp.requirements.length > 0 ? `
                        <div class="requirements">
                            <h4>Requirements:</h4>
                            <ul>
                                ${opp.requirements.map(req => `<li>${req}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${opp.deadline ? `<p class="deadline"><strong>Deadline:</strong> ${opp.deadline}</p>` : ''}
                    ${opp.link && opp.link !== '#' ?
                        `<a href="${opp.link}" class="opportunity-link">Apply Now →</a>` :
                        `<a href="#contact-form" class="opportunity-link">Contact Us →</a>`
                    }
                `;

                oppGrid.appendChild(oppCard);
            });
    },

    /**
     * Show default opportunities
     * @private
     */
    _showDefaultOpportunities(oppGrid) {
        const defaultOpportunities = [
            {
                title: "PhD Positions",
                icon: "🎓",
                description: "We're looking for motivated PhD students to join our research team. Full funding available for qualified candidates.",
                deadline: "Rolling basis",
                status: "open"
            },
            {
                title: "Postdoc Positions",
                icon: "👨‍🔬",
                description: "Multiple postdoctoral positions available in NLP, Computer Vision, and Machine Learning.",
                deadline: "Open until filled",
                status: "open"
            },
            {
                title: "Research Internships",
                icon: "💻",
                description: "Summer and semester internships for undergraduate and graduate students.",
                deadline: "March 1, 2025",
                status: "upcoming"
            },
            {
                title: "Industry Collaboration",
                icon: "🤝",
                description: "Partner with us on cutting-edge AI research projects and technology transfer opportunities.",
                deadline: "Always open",
                status: "open"
            }
        ];

        defaultOpportunities.forEach(opp => {
            const oppCard = DOMUtils.createElement('div', ['opportunity-card']);

            if (opp.status) {
                oppCard.classList.add(`status-${opp.status}`);
            }

            oppCard.innerHTML = `
                ${opp.icon ? `<div class="opportunity-icon">${opp.icon}</div>` : ''}
                <h3>${opp.title}</h3>
                ${opp.description ? `<p>${opp.description}</p>` : ''}
                ${opp.deadline ? `<p class="deadline"><strong>Deadline:</strong> ${opp.deadline}</p>` : ''}
                <a href="#contact-form" class="opportunity-link">Learn More →</a>
            `;

            oppGrid.appendChild(oppCard);
        });
    },

    /**
     * Set FAQ section
     */
    setFAQ() {
        const faqList = document.querySelector('.faq-list');
        if (!faqList) return;

        const faqItems = ConfigLoader.get('contact.faq', []);

        if (faqItems.length === 0) {
            DOMUtils.hideIfEmpty(faqList);
            return;
        }

        DOMUtils.clear(faqList);

        faqItems
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

                faqList.appendChild(faqItem);
            });
    }
};

// Export for use in app.js
window.ContactPage = ContactPage;