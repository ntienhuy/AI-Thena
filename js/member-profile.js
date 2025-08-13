// ===== MEMBER PROFILE PAGE JAVASCRIPT =====

// Global variable to store current member data
let currentMember = null;

document.addEventListener('DOMContentLoaded', function() {
    // Get member ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('id');
    
    if (memberId) {
        loadMemberProfile(memberId);
    } else {
        // If no ID provided, show error or redirect to team page
        showErrorState();
    }
    
    // Initialize animations
    if (typeof initializeAnimationObserver !== 'undefined') {
        initializeAnimationObserver();
    }
});

// Load member profile based on ID
function loadMemberProfile(memberId) {
    // Wait for CONFIG to be loaded
    if (typeof CONFIG === 'undefined') {
        setTimeout(() => loadMemberProfile(memberId), 100);
        return;
    }
    
    // Find member in CONFIG data
    const member = findMemberById(memberId);
    
    if (member) {
        currentMember = member;
        populateMemberProfile(member);
    } else {
        showErrorState();
    }
}

// Find member by ID in all team categories
function findMemberById(id) {
    if (!CONFIG.team) return null;
    
    // Search in faculty
    if (CONFIG.team.faculty) {
        const faculty = CONFIG.team.faculty.find(m => m.id === id);
        if (faculty) return { ...faculty, category: 'faculty' };
    }
    
    // Search in postdocs
    if (CONFIG.team.postdocs) {
        const postdoc = CONFIG.team.postdocs.find(m => m.id === id || m.name.toLowerCase().replace(/\s+/g, '-') === id);
        if (postdoc) return { ...postdoc, category: 'postdoc' };
    }
    
    // Search in PhD students
    if (CONFIG.team.phdStudents) {
        const phd = CONFIG.team.phdStudents.find(m => m.name.toLowerCase().replace(/\s+/g, '-') === id);
        if (phd) return { ...phd, category: 'phd' };
    }
    
    // Search in masters students
    if (CONFIG.team.mastersStudents) {
        const masters = CONFIG.team.mastersStudents.find(m => m.name.toLowerCase().replace(/\s+/g, '-') === id);
        if (masters) return { ...masters, category: 'masters' };
    }
    
    // Search in staff
    if (CONFIG.team.staff) {
        const staff = CONFIG.team.staff.find(m => m.name.toLowerCase().replace(/\s+/g, '-') === id);
        if (staff) return { ...staff, category: 'staff' };
    }
    
    // Search in alumni
    if (CONFIG.team.alumni) {
        const alumni = CONFIG.team.alumni.find(m => m.name.toLowerCase().replace(/\s+/g, '-') === id);
        if (alumni) return { ...alumni, category: 'alumni' };
    }
    
    return null;
}

// Populate all member information
function populateMemberProfile(member) {
    // Update page title
    document.title = `${member.name} - AI-THENA Lab`;
    
    // Breadcrumb
    const breadcrumbName = document.getElementById('breadcrumb-name');
    if (breadcrumbName) breadcrumbName.textContent = member.name;
    
    // Photo
    const photo = document.getElementById('member-photo');
    if (photo) {
        if (member.image) {
            photo.src = member.image;
            photo.alt = member.name;
            photo.dataset.name = member.name;
        } else {
            // Replace with initials if no image
            const initials = getInitials(member.name);
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'member-avatar-fallback member-profile-photo';
            avatarDiv.textContent = initials;
            avatarDiv.style.fontSize = '4rem';
            avatarDiv.style.width = '250px';
            avatarDiv.style.height = '250px';
            photo.parentNode.replaceChild(avatarDiv, photo);
        }
    }
    
    // Basic Info
    setElementText('member-name', member.name);
    setElementText('member-role', member.role || 'Researcher');
    
    // Badges
    updateBadges(member);
    
    // Quick Info
    setElementText('member-office', member.office || 'N/A');
    if (member.email) {
        const emailElement = document.getElementById('member-email');
        if (emailElement) {
            emailElement.href = `mailto:${member.email}`;
            emailElement.textContent = member.email;
        }
        setElementText('member-email', member.email);
    }
    setElementText('member-phone', member.phone || 'N/A');
    setElementText('member-hours', member.hours || member.officeHours || 'By appointment');
    
    // Social Links
    updateSocialLinks(member);
    
    // Biography
    const bioElement = document.getElementById('member-bio');
    if (bioElement) {
        if (member.bio) {
            // If bio is an array of paragraphs
            if (Array.isArray(member.bio)) {
                bioElement.innerHTML = member.bio.map(p => `<p>${p}</p>`).join('');
            } else {
                bioElement.innerHTML = `<p>${member.bio}</p>`;
            }
        } else {
            bioElement.innerHTML = `<p>${member.description || 'Biography coming soon.'}</p>`;
        }
    }
    
    // Research Interests
    updateResearchInterests(member);
    
    // Publications
    updatePublications(member);
    
    // Projects
    updateProjects(member);
    
    // Teaching
    updateTeaching(member);
    
    // Students
    updateStudents(member);
    
    // Sidebar Stats
    updateSidebarStats(member);
    
    // Education
    updateEducation(member);
    
    // Awards
    updateAwards(member);
    
    // CV Download
    updateCVLink(member);
    
    // Related Members
    updateRelatedMembers(member);
}

// Update badges based on member category and status
function updateBadges(member) {
    const badgesContainer = document.querySelector('.member-badges');
    if (!badgesContainer) return;
    
    badgesContainer.innerHTML = '';
    
    // Category badge
    if (member.category) {
        const categoryBadge = document.createElement('span');
        categoryBadge.className = `badge badge-${member.category}`;
        categoryBadge.textContent = member.category.charAt(0).toUpperCase() + member.category.slice(1);
        badgesContainer.appendChild(categoryBadge);
    }
    
    // Status badge
    if (member.status || member.category !== 'alumni') {
        const statusBadge = document.createElement('span');
        statusBadge.className = 'badge badge-active';
        statusBadge.textContent = member.status || 'Active';
        badgesContainer.appendChild(statusBadge);
    }
    
    // Additional badges
    if (member.tags) {
        member.tags.forEach(tag => {
            const tagBadge = document.createElement('span');
            tagBadge.className = 'badge';
            tagBadge.textContent = tag;
            tagBadge.style.background = 'linear-gradient(45deg, #9c27b0, #ba68c8)';
            tagBadge.style.color = 'white';
            badgesContainer.appendChild(tagBadge);
        });
    }
}

// Update social links
function updateSocialLinks(member) {
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
            if (url) {
                element.href = url;
                element.style.display = 'inline-flex';
            } else {
                element.style.display = 'none';
            }
        }
    }
}

// Update research interests
function updateResearchInterests(member) {
    const container = document.getElementById('research-interests');
    if (!container) return;
    
    if (member.research && member.research.length > 0) {
        container.innerHTML = '';
        member.research.forEach(interest => {
            const item = document.createElement('div');
            item.className = 'interest-item';
            
            // Try to match icon based on keywords
            const icon = getResearchIcon(interest);
            
            item.innerHTML = `
                <span class="interest-icon">${icon}</span>
                <div>
                    <h4>${interest}</h4>
                    <p>${getResearchDescription(interest)}</p>
                </div>
            `;
            container.appendChild(item);
        });
    } else {
        container.innerHTML = '<p class="empty-state">Research interests will be updated soon.</p>';
    }
}

// Update publications
function updatePublications(member) {
    const container = document.getElementById('member-publications');
    if (!container) return;
    
    // Get member's publications from CONFIG
    const memberPubs = getMemberPublications(member.name);
    
    if (memberPubs.length > 0) {
        container.innerHTML = '';
        // Show only first 5 publications
        memberPubs.slice(0, 5).forEach(pub => {
            const pubElement = createPublicationEntry(pub);
            if (pubElement) container.appendChild(pubElement);
        });
    } else {
        container.innerHTML = '<p class="empty-state">Publications will be listed here.</p>';
    }
    
    // Update publication stats
    setElementText('pub-count', member.publications || memberPubs.length || '0');
    setElementText('citation-count', member.citations || '0');
    setElementText('h-index', member.hIndex || '0');
}

// Get publications where member is an author
function getMemberPublications(memberName) {
    if (!CONFIG.publications || !CONFIG.publications.publications) return [];
    
    return CONFIG.publications.publications.filter(pub => 
        pub.authors && pub.authors.some(author => 
            author.toLowerCase().includes(memberName.toLowerCase().split(' ').pop())
        )
    );
}

// Update current projects
function updateProjects(member) {
    const container = document.getElementById('member-projects');
    if (!container) return;
    
    const memberProjects = getMemberProjects(member.name);
    
    if (memberProjects.length > 0) {
        container.innerHTML = '';
        memberProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h4>${project.title}</h4>
                <p class="project-role">Role: ${project.principalInvestigator === member.name ? 'Principal Investigator' : 'Team Member'}</p>
                <p>${project.description}</p>
            `;
            container.appendChild(projectCard);
        });
    } else if (member.projects && member.projects.length > 0) {
        container.innerHTML = '';
        member.projects.forEach(projectName => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h4>${projectName}</h4>
                <p>Active research project</p>
            `;
            container.appendChild(projectCard);
        });
    } else {
        container.innerHTML = '<p class="empty-state">No current projects listed.</p>';
    }
}

// Get projects where member is involved
function getMemberProjects(memberName) {
    if (!CONFIG.research || !CONFIG.research.projects) return [];
    
    return CONFIG.research.projects.filter(project => 
        project.principalInvestigator === memberName ||
        (project.team && project.team.includes(memberName))
    );
}

// Update teaching section
function updateTeaching(member) {
    const container = document.getElementById('member-teaching');
    if (!container) return;
    
    if (member.teaching && member.teaching.length > 0) {
        container.innerHTML = '';
        member.teaching.forEach(course => {
            const teachingItem = document.createElement('div');
            teachingItem.className = 'teaching-item';
            
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
        const section = container.closest('.content-section');
        if (section) section.style.display = 'none';
    }
}

// Update students section
function updateStudents(member) {
    const container = document.getElementById('member-students');
    if (!container) return;
    
    if (member.students && member.students.length > 0) {
        container.innerHTML = '';
        member.students.forEach(studentName => {
            const studentCard = document.createElement('div');
            studentCard.className = 'student-card-mini';
            
            // Try to find student details
            const studentDetails = findStudentByName(studentName);
            
            studentCard.innerHTML = `
                <div class="member-avatar-fallback" style="width: 60px; height: 60px; font-size: 1.5rem; margin: 0 auto 0.5rem;">
                    ${getInitials(studentName)}
                </div>
                <h5>${studentName}</h5>
                <p>${studentDetails ? studentDetails.research : 'PhD Student'}</p>
            `;
            container.appendChild(studentCard);
        });
    } else {
        const section = container.closest('.content-section');
        if (section) section.style.display = 'none';
    }
}

// Find student details by name
function findStudentByName(name) {
    if (!CONFIG.team) return null;
    
    if (CONFIG.team.phdStudents) {
        const phd = CONFIG.team.phdStudents.find(s => s.name === name);
        if (phd) return phd;
    }
    
    if (CONFIG.team.mastersStudents) {
        const masters = CONFIG.team.mastersStudents.find(s => s.name === name);
        if (masters) return masters;
    }
    
    return null;
}

// Update sidebar stats
function updateSidebarStats(member) {
    // Calculate years at lab
    const yearsActive = member.startYear ? new Date().getFullYear() - member.startYear : 
                       member.established ? new Date().getFullYear() - member.established : 0;
    setElementText('years-active', yearsActive || '1');
    
    // Students count
    const studentsCount = member.students ? member.students.length : 0;
    setElementText('students-count', studentsCount);
    
    // Papers count
    const papersCount = member.publications || getMemberPublications(member.name).length;
    setElementText('papers-count', papersCount);
    
    // Awards count
    const awardsCount = member.awards ? member.awards.length : 0;
    setElementText('awards-count', awardsCount);
}

// Update education section
function updateEducation(member) {
    const container = document.getElementById('member-education');
    if (!container) return;
    
    if (member.education && member.education.length > 0) {
        container.innerHTML = '';
        member.education.forEach(edu => {
            const eduItem = document.createElement('div');
            eduItem.className = 'education-item';
            eduItem.innerHTML = `
                <div class="degree">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
                <div class="institution">${edu.institution}</div>
                <div class="year">${edu.year}</div>
            `;
            container.appendChild(eduItem);
        });
    } else {
        const section = container.closest('.sidebar-section');
        if (section) section.style.display = 'none';
    }
}

// Update awards section
function updateAwards(member) {
    const container = document.getElementById('member-awards');
    if (!container) return;
    
    if (member.awards && member.awards.length > 0) {
        container.innerHTML = '';
        member.awards.forEach(award => {
            const awardItem = document.createElement('div');
            awardItem.className = 'award-item';
            
            if (typeof award === 'string') {
                // Parse year from string if possible
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
        const section = container.closest('.sidebar-section');
        if (section) section.style.display = 'none';
    }
}

// Update CV download link
function updateCVLink(member) {
    const cvButton = document.getElementById('download-cv');
    if (!cvButton) return;
    
    if (member.cv) {
        cvButton.href = member.cv;
    } else {
        // Generate CV filename based on member name
        cvButton.href = `#`;
        cvButton.onclick = function(e) {
            e.preventDefault();
            alert('CV will be available soon.');
        };
    }
}

// Update related members
function updateRelatedMembers(member) {
    const container = document.getElementById('related-members');
    if (!container) return;
    
    // Find related members (same research area, advisor, etc.)
    const related = findRelatedMembers(member);
    
    if (related.length > 0) {
        container.innerHTML = '';
        related.slice(0, 5).forEach(relMember => {
            const relDiv = document.createElement('a');
            relDiv.className = 'related-member';
            relDiv.href = `member-profile.html?id=${relMember.id || relMember.name.toLowerCase().replace(/\s+/g, '-')}`;
            
            const initials = getInitials(relMember.name);
            relDiv.innerHTML = `
                <div class="member-avatar-fallback" style="width: 40px; height: 40px; font-size: 1rem;">
                    ${initials}
                </div>
                <div class="related-member-info">
                    <h5>${relMember.name}</h5>
                    <p>${relMember.role || 'Researcher'}</p>
                </div>
            `;
            container.appendChild(relDiv);
        });
    } else {
        const section = container.closest('.sidebar-section');
        if (section) section.style.display = 'none';
    }
}

// Find related members
function findRelatedMembers(member) {
    const related = [];
    if (!CONFIG.team) return related;
    
    // Find members with same advisor
    if (member.advisor) {
        if (CONFIG.team.phdStudents) {
            related.push(...CONFIG.team.phdStudents.filter(s => 
                s.advisor === member.advisor && s.name !== member.name
            ));
        }
    }
    
    // Find advisor
    if (member.advisor && CONFIG.team.faculty) {
        const advisor = CONFIG.team.faculty.find(f => f.name === member.advisor);
        if (advisor) related.push(advisor);
    }
    
    // Find students (if faculty)
    if (member.students) {
        member.students.forEach(studentName => {
            const student = findStudentByName(studentName);
            if (student) related.push(student);
        });
    }
    
    return related;
}

// Helper function to get research icon
function getResearchIcon(research) {
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
    return '🔬'; // Default icon
}

// Helper function to get research description
function getResearchDescription(research) {
    // You can expand this with actual descriptions
    const descriptions = {
        'Neural Architecture Search': 'Automating the design of neural networks',
        'Natural Language Processing': 'Understanding and generating human language',
        'Computer Vision': 'Teaching machines to see and understand visual information',
        'Reinforcement Learning': 'Learning through interaction and rewards',
        'Efficient AI': 'Making AI faster and more resource-efficient'
    };
    
    return descriptions[research] || 'Advanced research in ' + research.toLowerCase();
}

// Helper function to get initials
function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) {
        return parts[0].substring(0, 2).toUpperCase();
    }
    return parts.map(part => part[0]).join('').substring(0, 2).toUpperCase();
}

// Helper function to set element text
function setElementText(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text || '';
}

// Show error state when member not found
function showErrorState() {
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
}