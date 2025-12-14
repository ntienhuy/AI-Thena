/**
 * MEMBER PROFILE PAGE MODULE
 * Handles individual member profile display
 */

const MemberProfilePage = {
    currentMember: null,

    /**
     * Initialize member profile page
     */
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        const memberId = urlParams.get('id');

        if (memberId) {
            this.loadMemberProfile(memberId);
        } else {
            this._showErrorState();
        }
    },

    /**
     * Load member profile by ID
     */
    loadMemberProfile(memberId) {
        const member = this._findMemberById(memberId);

        if (member) {
            this.currentMember = member;
            this._populateMemberProfile(member);
        } else {
            this._showErrorState();
        }
    },

    /**
     * Find member by ID
     * @private
     */
    _findMemberById(id) {
        const searchCategories = ['advisors', 'members', 'phdStudents', 'masterStudents', 'undergraduates', 'alumni'];

        for (const category of searchCategories) {
            const members = ConfigLoader.get(`team.${category}`, []);
            const member = members.find(m =>
                m.id === id || StringUtils.slugify(m.name) === id
            );

            if (member) {
                return { ...member, category };
            }
        }

        return null;
    },

    /**
     * Populate member profile
     * @private
     */
    _populateMemberProfile(member) {
        // Update page title
        const displayName = this._getNameWithTitle(member.name, member.title);
        document.title = `${displayName} - AI-THENA Lab`;

        // Breadcrumb
        DOMUtils.setText('breadcrumb-name', displayName);

        // Photo
        this._setMemberPhoto(member);

        // Basic info
        DOMUtils.setText('member-name', displayName);
        DOMUtils.setText('member-role', member.role || 'Researcher');

        // Badges
        this._updateBadges(member);

        // Quick info
        this._setQuickInfo(member);

        // Social links
        this._updateSocialLinks(member);

        // Biography
        this._setBiography(member);

        // Research interests
        this._setResearchInterests(member);

        // Publications
        this._setPublications(member);

        // Projects
        this._setProjects(member);

        // Teaching
        this._setTeaching(member);

        // Students
        this._setStudents(member);

        // Sidebar
        this._setSidebarStats(member);
        this._setEducation(member);
        this._setAwards(member);
        this._setCVLink(member);
        this._setRelatedMembers(member);
    },

    /**
     * Set member photo
     * @private
     */
    _setMemberPhoto(member) {
        const photo = document.getElementById('member-photo');
        if (!photo) return;

        if (member.image) {
            photo.src = member.image;
            photo.alt = member.name;
            photo.dataset.name = member.name;
        } else {
            const avatar = ImageHandler.createAvatar(member.name, { size: '250px', fontSize: '4rem' });
            avatar.className = 'member-profile-photo';
            photo.parentNode.replaceChild(avatar, photo);
        }
    },

    /**
     * Update badges
     * @private
     */
    _updateBadges(member) {
        const badgesContainer = document.querySelector('.member-badges');
        if (!badgesContainer) return;

        DOMUtils.clear(badgesContainer);

        // Category badge
        if (member.category) {
            const badge = DOMUtils.createElement('span', [`badge`, `badge-${member.category}`]);
            badge.textContent = StringUtils.capitalize(member.category);
            badgesContainer.appendChild(badge);
        }

        // Status badge
        if (member.status || member.category !== 'alumni') {
            const badge = DOMUtils.createElement('span', ['badge', 'badge-active']);
            badge.textContent = member.status || 'Active';
            badgesContainer.appendChild(badge);
        }

        // Tags
        if (member.tags) {
            member.tags.forEach(tag => {
                const badge = DOMUtils.createElement('span', ['badge']);
                badge.textContent = tag;
                badge.style.background = 'linear-gradient(45deg, #9c27b0, #ba68c8)';
                badge.style.color = 'white';
                badgesContainer.appendChild(badge);
            });
        }
    },

    /**
     * Set quick info
     * @private
     */
    _setQuickInfo(member) {
        DOMUtils.setText('member-office', member.office || 'N/A');
        DOMUtils.setText('member-phone', member.phone || 'N/A');
        DOMUtils.setText('member-hours', member.hours || member.officeHours || 'By appointment');

        const emailElement = document.getElementById('member-email');
        if (emailElement && member.email) {
            emailElement.href = `mailto:${member.email}`;
            emailElement.textContent = member.email;
        }
    },

    /**
     * Update social links
     * @private
     */
    _updateSocialLinks(member) {
        const links = {
            'link-email': member.email ? `mailto:${member.email}` : null,
            'link-scholar': member.scholar,
            'link-github': member.github,
            'link-linkedin': member.linkedin,
            'link-twitter': member.twitter,
            'link-website': member.website
        };

        for (const [id, url] of Object.entries(links)) {
            const element = document.getElementById(id);
            if (element) {
                element.href = url || '#';
                DOMUtils.toggle(element, !!url);
            }
        }
    },

    /**
     * Set biography
     * @private
     */
    _setBiography(member) {
        const bioElement = document.getElementById('member-bio');
        if (!bioElement) return;

        if (member.bio) {
            if (Array.isArray(member.bio)) {
                bioElement.innerHTML = member.bio.map(p => `<p>${p}</p>`).join('');
            } else {
                bioElement.innerHTML = `<p>${member.bio}</p>`;
            }
        } else {
            bioElement.innerHTML = `<p>${member.description || 'Biography coming soon.'}</p>`;
        }
    },

    /**
     * Set research interests
     * @private
     */
    _setResearchInterests(member) {
        const container = document.getElementById('research-interests');
        if (!container) return;

        if (member.research && member.research.length > 0) {
            DOMUtils.clear(container);
            member.research.forEach(interest => {
                const item = DOMUtils.createElement('div', ['interest-item']);
                const icon = this._getResearchIcon(interest);

                item.innerHTML = `
                    <span class="interest-icon">${icon}</span>
                    <div>
                        <h4>${interest}</h4>
                        <p>${this._getResearchDescription(interest)}</p>
                    </div>
                `;
                container.appendChild(item);
            });
        } else {
            container.innerHTML = '<p class="empty-state">Research interests will be updated soon.</p>';
        }
    },

    /**
     * Set publications
     * @private
     */
    _setPublications(member) {
        const container = document.getElementById('member-publications');
        if (!container) return;

        const memberPubs = this._getMemberPublications(member.name);

        if (memberPubs.length > 0) {
            DOMUtils.clear(container);
            memberPubs.slice(0, 5).forEach(pub => {
                const pubElement = CardFactory.createPublicationCard(pub);
                if (pubElement) container.appendChild(pubElement);
            });
        } else {
            container.innerHTML = '<p class="empty-state">Publications will be listed here.</p>';
        }

        // Update stats
        DOMUtils.setText('pub-count', member.publications || memberPubs.length || '0');
        DOMUtils.setText('citation-count', member.citations || '0');
        DOMUtils.setText('h-index', member.hIndex || '0');
    },

    /**
     * Get member publications
     * @private
     */
    _getMemberPublications(memberName) {
        const publications = ConfigLoader.get('publications.publications', []);
        const lastName = memberName.split(' ').pop().toLowerCase();

        return publications.filter(pub =>
            pub.authors && pub.authors.some(author =>
                author.toLowerCase().includes(lastName)
            )
        );
    },

    /**
     * Set projects
     * @private
     */
    _setProjects(member) {
        const container = document.getElementById('member-projects');
        if (!container) return;

        const memberProjects = this._getMemberProjects(member.name);

        if (memberProjects.length > 0) {
            DOMUtils.clear(container);
            memberProjects.forEach(project => {
                const projectCard = DOMUtils.createElement('div', ['project-card']);
                projectCard.innerHTML = `
                    <h4>${project.title}</h4>
                    <p class="project-role">Role: ${project.principalInvestigator === member.name ? 'Principal Investigator' : 'Team Member'}</p>
                    <p>${project.description}</p>
                `;
                container.appendChild(projectCard);
            });
        } else if (member.projects && member.projects.length > 0) {
            DOMUtils.clear(container);
            member.projects.forEach(projectName => {
                const projectCard = DOMUtils.createElement('div', ['project-card']);
                projectCard.innerHTML = `
                    <h4>${projectName}</h4>
                    <p>Active research project</p>
                `;
                container.appendChild(projectCard);
            });
        } else {
            container.innerHTML = '<p class="empty-state">No current projects listed.</p>';
        }
    },

    /**
     * Get member projects
     * @private
     */
    _getMemberProjects(memberName) {
        const projects = ConfigLoader.get('research.projects', []);
        return projects.filter(project =>
            project.principalInvestigator === memberName ||
            (project.team && project.team.includes(memberName))
        );
    },

    /**
     * Set teaching
     * @private
     */
    _setTeaching(member) {
        const container = document.getElementById('member-teaching');
        if (!container) return;

        if (member.teaching && member.teaching.length > 0) {
            DOMUtils.clear(container);
            member.teaching.forEach(course => {
                const teachingItem = DOMUtils.createElement('div', ['teaching-item']);

                if (typeof course === 'string') {
                    teachingItem.innerHTML = `
                        <h4>${course}</h4>
                        <p>Course details available upon request</p>
                    `;
                } else {
                    teachingItem.innerHTML = `
                        <h4>${course.name || course}</h4>
                        <p>${course.description || 'Course description'}</p>
                        ${course.semester ? `<span class="course-info">${course.semester}</span>` : ''}
                    `;
                }
                container.appendChild(teachingItem);
            });
        } else {
            DOMUtils.hideIfEmpty(container);
        }
    },

    /**
     * Set students
     * @private
     */
    _setStudents(member) {
        const container = document.getElementById('member-students');
        if (!container) return;

        if (member.students && member.students.length > 0) {
            DOMUtils.clear(container);
            member.students.forEach(studentName => {
                const studentCard = DOMUtils.createElement('div', ['student-card-mini']);
                const avatar = ImageHandler.createAvatar(studentName, { size: '60px', fontSize: '1.5rem' });

                studentCard.appendChild(avatar);
                studentCard.innerHTML += `
                    <h5>${studentName}</h5>
                    <p>PhD Student</p>
                `;
                container.appendChild(studentCard);
            });
        } else {
            DOMUtils.hideIfEmpty(container);
        }
    },

    /**
     * Set sidebar stats
     * @private
     */
    _setSidebarStats(member) {
        const yearsActive = member.startYear ? DateUtils.yearsSince(member.startYear) : 1;
        DOMUtils.setText('years-active', yearsActive);

        const studentsCount = member.students ? member.students.length : 0;
        DOMUtils.setText('students-count', studentsCount);

        const papersCount = member.publications || this._getMemberPublications(member.name).length;
        DOMUtils.setText('papers-count', papersCount);

        const awardsCount = member.awards ? member.awards.length : 0;
        DOMUtils.setText('awards-count', awardsCount);
    },

    /**
     * Set education
     * @private
     */
    _setEducation(member) {
        const container = document.getElementById('member-education');
        if (!container) return;

        if (member.education && member.education.length > 0) {
            DOMUtils.clear(container);
            member.education.forEach(edu => {
                const eduItem = DOMUtils.createElement('div', ['education-item']);
                eduItem.innerHTML = `
                    <div class="degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
                    <div class="institution">${edu.institution}</div>
                    <div class="year">${edu.year}</div>
                `;
                container.appendChild(eduItem);
            });
        } else {
            DOMUtils.hideIfEmpty(container);
        }
    },

    /**
     * Set awards
     * @private
     */
    _setAwards(member) {
        const container = document.getElementById('member-awards');
        if (!container) return;

        if (member.awards && member.awards.length > 0) {
            DOMUtils.clear(container);
            member.awards.forEach(award => {
                const awardItem = DOMUtils.createElement('div', ['award-item']);

                if (typeof award === 'string') {
                    const match = award.match(/\((\d{4})\)/);
                    const year = match ? match[1] : '20XX';
                    const name = award.replace(/\(\d{4}\)/, '').trim();

                    awardItem.innerHTML = `
                        <span class="award-year">${year}</span>
                        <span class="award-name">${name}</span>
                    `;
                } else {
                    awardItem.innerHTML = `
                        <span class="award-year">${award.year || '20XX'}</span>
                        <span class="award-name">${award.name || award}</span>
                    `;
                }
                container.appendChild(awardItem);
            });
        } else {
            DOMUtils.hideIfEmpty(container);
        }
    },

    /**
     * Set CV link
     * @private
     */
    _setCVLink(member) {
        const cvButton = document.getElementById('download-cv');
        if (!cvButton) return;

        if (member.cv) {
            cvButton.href = member.cv;
        } else {
            cvButton.href = '#';
            cvButton.onclick = (e) => {
                e.preventDefault();
                alert('CV will be available soon.');
            };
        }
    },

    /**
     * Set related members
     * @private
     */
    _setRelatedMembers(member) {
        const container = document.getElementById('related-members');
        if (!container) return;

        const related = this._findRelatedMembers(member);

        if (related.length > 0) {
            DOMUtils.clear(container);
            related.slice(0, 5).forEach(relMember => {
                const relDiv = document.createElement('a');
                relDiv.className = 'related-member';
                relDiv.href = `member-profile.html?id=${relMember.id || StringUtils.slugify(relMember.name)}`;

                const avatar = ImageHandler.createAvatar(relMember.name, { size: '40px', fontSize: '1rem' });
                relDiv.appendChild(avatar);

                relDiv.innerHTML += `
                    <div class="related-member-info">
                        <h5>${relMember.name}</h5>
                        <p>${relMember.role || 'Researcher'}</p>
                    </div>
                `;
                container.appendChild(relDiv);
            });
        } else {
            DOMUtils.hideIfEmpty(container);
        }
    },

    /**
     * Find related members
     * @private
     */
    _findRelatedMembers(member) {
        const related = [];

        // Find supervisor
        if (member.supervisor) {
            const advisors = ConfigLoader.get('team.advisors', []);
            const members = ConfigLoader.get('team.members', []);

            const supervisor = [...advisors, ...members].find(m => m.name === member.supervisor);
            if (supervisor) related.push(supervisor);
        }

        // Find students if member is advisor/researcher
        const allStudents = [
            ...ConfigLoader.get('team.phdStudents', []),
            ...ConfigLoader.get('team.masterStudents', []),
            ...ConfigLoader.get('team.undergraduates', [])
        ];

        const students = allStudents.filter(s => s.supervisor === member.name);
        related.push(...students);

        return related;
    },

    /**
     * Get research icon
     * @private
     */
    _getResearchIcon(research) {
        const icons = {
            'neural': '🧠',
            'vision': '👁️',
            'language': '🗣️',
            'nlp': '🗣️',
            'learning': '📚',
            'robot': '🤖',
            'efficient': '⚡',
            'safety': '🔒',
            'ethics': '⚖️',
            'auto': '🔄',
            'data': '📊',
            'ai': '🤖'
        };

        const lowerResearch = research.toLowerCase();
        for (const [key, icon] of Object.entries(icons)) {
            if (lowerResearch.includes(key)) return icon;
        }
        return '🔬';
    },

    /**
     * Get research description
     * @private
     */
    _getResearchDescription(research) {
        const descriptions = {
            'Neural Architecture Search': 'Automating the design of neural networks',
            'Natural Language Processing': 'Understanding and generating human language',
            'Computer Vision': 'Teaching machines to see and understand visual information',
            'Reinforcement Learning': 'Learning through interaction and rewards',
            'Efficient AI': 'Making AI faster and more resource-efficient'
        };

        return descriptions[research] || `Advanced research in ${research.toLowerCase()}`;
    },

    /**
     * Show error state
     * @private
     */
    _showErrorState() {
        const mainContent = document.querySelector('.profile-main');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="content-section">
                    <h2 class="section-title">Member Not Found</h2>
                    <p style="text-align: center; padding: 2rem;">
                        Sorry, we couldn't find the member you're looking for.
                    </p>
                    <div style="text-align: center;">
                        <a href="team.html" class="back-link">← Back to Team</a>
                    </div>
                </div>
            `;
        }
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

// Export for use in app.js
window.MemberProfilePage = MemberProfilePage;