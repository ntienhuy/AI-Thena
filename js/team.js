// ===== TEAM PAGE JAVASCRIPT - FIXED WITH EMPTY SECTION HANDLING =====

document.addEventListener('DOMContentLoaded', function() {
    if (typeof CONFIG !== 'undefined') {
        initializeTeamPage();
        initializeAnimationObserver();
    } else {
        setTimeout(function() {
            if (typeof CONFIG !== 'undefined') {
                initializeTeamPage();
                initializeAnimationObserver();
            }
        }, 100);
    }
});

function initializeTeamPage() {
    // Set page title and subtitle
    const pageTitle = document.querySelector('.page-hero h1');
    const pageSubtitle = document.querySelector('.page-hero p');
    
    if (pageTitle && CONFIG.team?.pageTitle) {
        pageTitle.textContent = CONFIG.team.pageTitle;
    }
    if (pageSubtitle && CONFIG.team?.pageSubtitle) {
        pageSubtitle.textContent = CONFIG.team.pageSubtitle;
    }
    
    // Populate all sections
    setFacultyMembers();
    setResearchTeam();
    setPhDStudents();
    setMastersStudents();
    setStaff();
    setAlumni();
    setVisitingResearchers();
    setJoinUsSection();
}

function setFacultyMembers() {
    const facultyGrid = document.getElementById('faculty-grid');
    if (!facultyGrid) return;
    
    const facultySection = facultyGrid.closest('.content-section');
    
    if (!CONFIG.team?.faculty || CONFIG.team.faculty.length === 0) {
        // Hide the entire section if no faculty data
        if (facultySection) facultySection.style.display = 'none';
        return;
    }
    
    facultyGrid.innerHTML = '';
    let hasValidMembers = false;
    
    CONFIG.team.faculty
        .filter(member => member && member.name)
        .forEach(member => {
            const card = createTeamMemberCard(member);
            if (card) {
                facultyGrid.appendChild(card);
                hasValidMembers = true;
            }
        });
    
    // Hide section if no valid members were added
    if (!hasValidMembers && facultySection) {
        facultySection.style.display = 'none';
    }
}

function setResearchTeam() {
    const teamGrid = document.getElementById('team-grid');
    if (!teamGrid) return;
    
    const teamSection = teamGrid.closest('.content-section');
    
    if (!CONFIG.team?.postdocs || CONFIG.team.postdocs.length === 0) {
        if (teamSection) teamSection.style.display = 'none';
        return;
    }
    
    teamGrid.innerHTML = '';
    let hasValidMembers = false;
    
    CONFIG.team.postdocs
        .filter(member => member && member.name)
        .forEach(member => {
            const card = createTeamMemberCard(member);
            if (card) {
                teamGrid.appendChild(card);
                hasValidMembers = true;
            }
        });
    
    if (!hasValidMembers && teamSection) {
        teamSection.style.display = 'none';
    }
}

function setPhDStudents() {
    const studentsGrid = document.querySelector('.students-grid');
    if (!studentsGrid) return;
    
    const studentsSection = studentsGrid.closest('.content-section');
    
    if (!CONFIG.team?.phdStudents || CONFIG.team.phdStudents.length === 0) {
        if (studentsSection) studentsSection.style.display = 'none';
        return;
    }
    
    studentsGrid.innerHTML = '';
    let hasValidStudents = false;
    
    CONFIG.team.phdStudents
        .filter(student => student && student.name)
        .forEach(student => {
            const studentCard = document.createElement('div');
            studentCard.className = 'student-card';
            studentCard.innerHTML = `
                <div class="student-info">
                    <h4>${student.name}</h4>
                    ${student.research ? `<p class="student-topic">Research: ${student.research}</p>` : ''}
                    ${student.year ? `<p class="student-year">Year: ${student.year}</p>` : ''}
                    ${student.advisor ? `<p class="student-advisor">Advisor: ${student.advisor}</p>` : ''}
                    ${student.email ? `<p class="student-email"><a href="mailto:${student.email}">${student.email}</a></p>` : ''}
                </div>
            `;
            studentsGrid.appendChild(studentCard);
            hasValidStudents = true;
        });
    
    if (!hasValidStudents && studentsSection) {
        studentsSection.style.display = 'none';
    }
}

function setMastersStudents() {
    // Check if there's a masters students section
    const mastersGrid = document.querySelector('.masters-grid');
    if (!mastersGrid) return;
    
    const mastersSection = mastersGrid.closest('.content-section');
    
    if (!CONFIG.team?.mastersStudents || CONFIG.team.mastersStudents.length === 0) {
        if (mastersSection) mastersSection.style.display = 'none';
        return;
    }
    
    mastersGrid.innerHTML = '';
    let hasValidStudents = false;
    
    CONFIG.team.mastersStudents
        .filter(student => student && student.name)
        .forEach(student => {
            const studentCard = document.createElement('div');
            studentCard.className = 'student-card';
            studentCard.innerHTML = `
                <div class="student-info">
                    <h4>${student.name}</h4>
                    ${student.program ? `<p class="student-program">Program: ${student.program}</p>` : ''}
                    ${student.project ? `<p class="student-topic">Project: ${student.project}</p>` : ''}
                    ${student.year ? `<p class="student-year">Year: ${student.year}</p>` : ''}
                    ${student.advisor ? `<p class="student-advisor">Advisor: ${student.advisor}</p>` : ''}
                </div>
            `;
            mastersGrid.appendChild(studentCard);
            hasValidStudents = true;
        });
    
    if (!hasValidStudents && mastersSection) {
        mastersSection.style.display = 'none';
    }
}

function setStaff() {
    const staffGrid = document.querySelector('.staff-grid');
    if (!staffGrid) return;
    
    const staffSection = staffGrid.closest('.content-section');
    
    if (!CONFIG.team?.staff || CONFIG.team.staff.length === 0) {
        if (staffSection) staffSection.style.display = 'none';
        return;
    }
    
    staffGrid.innerHTML = '';
    let hasValidStaff = false;
    
    CONFIG.team.staff
        .filter(member => member && member.name)
        .forEach(member => {
            const staffCard = document.createElement('div');
            staffCard.className = 'team-member';
            staffCard.innerHTML = `
                ${member.image ? 
                    `<img src="${member.image}" alt="${member.name}" class="member-photo">` :
                    `<div class="member-avatar">${member.initials || member.name.split(' ').map(n => n[0]).join('')}</div>`
                }
                <h3>${member.name}</h3>
                <p class="role">${member.role || 'Staff'}</p>
                ${member.responsibilities && member.responsibilities.length > 0 ? 
                    `<p class="description">${member.responsibilities.join(' • ')}</p>` : ''}
                ${member.email ? 
                    `<p class="contact-info"><a href="mailto:${member.email}">${member.email}</a></p>` : ''}
            `;
            staffGrid.appendChild(staffCard);
            hasValidStaff = true;
        });
    
    if (!hasValidStaff && staffSection) {
        staffSection.style.display = 'none';
    }
}

function setAlumni() {
    const alumniList = document.querySelector('.alumni-list');
    if (!alumniList) return;
    
    const alumniSection = alumniList.closest('.content-section');
    
    if (!CONFIG.team?.alumni || CONFIG.team.alumni.length === 0) {
        if (alumniSection) alumniSection.style.display = 'none';
        return;
    }
    
    alumniList.innerHTML = '';
    let hasValidAlumni = false;
    
    CONFIG.team.alumni
        .filter(alum => alum && alum.name)
        .slice(0, 10) // Show first 10 alumni
        .forEach(alum => {
            const alumniItem = document.createElement('div');
            alumniItem.className = 'alumni-item';
            alumniItem.innerHTML = `
                <h4>${alum.name}${alum.initials ? ` (${alum.initials})` : ''}</h4>
                <p>
                    ${alum.degree ? alum.degree : ''} 
                    ${alum.graduationYear ? `(${alum.graduationYear})` : ''}
                    ${alum.thesis ? ` - "${alum.thesis}"` : ''}
                </p>
                ${alum.currentPosition || alum.currentOrganization ? 
                    `<p class="alumni-current">
                        ${alum.currentPosition ? alum.currentPosition : ''}
                        ${alum.currentOrganization ? ` at ${alum.currentOrganization}` : ''}
                    </p>` : ''}
            `;
            alumniList.appendChild(alumniItem);
            hasValidAlumni = true;
        });
    
    if (!hasValidAlumni && alumniSection) {
        alumniSection.style.display = 'none';
    }
}

function setVisitingResearchers() {
    const visitingGrid = document.querySelector('.visiting-grid');
    if (!visitingGrid) return;
    
    const visitingSection = visitingGrid.closest('.content-section');
    
    if (!CONFIG.team?.visiting || CONFIG.team.visiting.length === 0) {
        if (visitingSection) visitingSection.style.display = 'none';
        return;
    }
    
    visitingGrid.innerHTML = '';
    let hasValidVisitors = false;
    
    CONFIG.team.visiting
        .filter(visitor => visitor && visitor.name)
        .forEach(visitor => {
            const visitorCard = document.createElement('div');
            visitorCard.className = 'team-member';
            visitorCard.innerHTML = `
                <div class="member-avatar">${visitor.initials || visitor.name.split(' ').map(n => n[0]).join('')}</div>
                <h3>${visitor.name}</h3>
                <p class="role">Visiting Researcher</p>
                ${visitor.homeInstitution ? `<p class="institution">From: ${visitor.homeInstitution}</p>` : ''}
                ${visitor.duration ? `<p class="duration">Duration: ${visitor.duration}</p>` : ''}
                ${visitor.research ? `<p class="description">${visitor.research}</p>` : ''}
                ${visitor.host ? `<p class="host">Host: ${visitor.host}</p>` : ''}
            `;
            visitingGrid.appendChild(visitorCard);
            hasValidVisitors = true;
        });
    
    if (!hasValidVisitors && visitingSection) {
        visitingSection.style.display = 'none';
    }
}

function setJoinUsSection() {
    const ctaSection = document.querySelector('.cta-section');
    if (!ctaSection) return;
    
    // Check if there are any opportunities
    const hasOpportunities = CONFIG.team?.opportunities?.openPositions && 
                            CONFIG.team.opportunities.openPositions.length > 0;
    
    if (!hasOpportunities && !CONFIG.team?.opportunities?.description) {
        ctaSection.style.display = 'none';
        return;
    }
    
    // Set description
    const sectionIntro = ctaSection.querySelector('.section-intro');
    if (sectionIntro && CONFIG.team?.opportunities?.description) {
        sectionIntro.textContent = CONFIG.team.opportunities.description;
    }
    
    // Add open positions if available
    if (hasOpportunities) {
        const positionsContainer = document.createElement('div');
        positionsContainer.className = 'opportunities-grid';
        positionsContainer.style.marginTop = '2rem';
        
        CONFIG.team.opportunities.openPositions.forEach(position => {
            const posCard = document.createElement('div');
            posCard.className = 'opportunity-card';
            posCard.innerHTML = `
                <h3>${position.title}</h3>
                ${position.description ? `<p>${position.description}</p>` : ''}
                ${position.deadline ? `<p style="color: #667eea; font-weight: 600;">Deadline: ${position.deadline}</p>` : ''}
                ${position.requirements && position.requirements.length > 0 ? 
                    `<ul style="margin: 1rem 0; padding-left: 1.5rem;">
                        ${position.requirements.map(req => `<li>${req}</li>`).join('')}
                    </ul>` : ''}
                ${position.link ? `<a href="${position.link}" class="opportunity-link">Learn More →</a>` : ''}
            `;
            positionsContainer.appendChild(posCard);
        });
        
        // Insert positions before the buttons
        const ctaButtons = ctaSection.querySelector('.cta-buttons');
        if (ctaButtons) {
            ctaSection.insertBefore(positionsContainer, ctaButtons);
        } else {
            ctaSection.appendChild(positionsContainer);
        }
    }
}

// // Enhanced createTeamMemberCard function with better empty data handling
// function createTeamMemberCard(member) {
//     if (!member || !member.name) return null;
    
//     const card = document.createElement('div');
//     card.className = 'team-member';
    
//     const initials = member.initials || (member.name ? member.name.split(' ').map(n => n[0]).join('') : '?');
    
//     let cardHTML = '';
    
//     // Add image or avatar
//     if (member.image) {
//         cardHTML += `<img src="${member.image}" alt="${member.name}" class="member-photo" style="width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 1rem; display: block; object-fit: cover;">`;
//     } else {
//         cardHTML += `<div class="member-avatar">${initials}</div>`;
//     }
    
//     // Add name
//     cardHTML += `<h3>${member.name}</h3>`;
    
//     // Add role
//     if (member.role) {
//         cardHTML += `<p class="role">${member.role}</p>`;
//     }
    
//     // Add bio/description
//     if (member.bio || member.description) {
//         const text = member.bio || member.description;
//         // Truncate long descriptions
//         const maxLength = 150;
//         const displayText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//         cardHTML += `<p class="description">${displayText}</p>`;
//     }
    
//     // Add contact info
//     if (member.email || member.website || member.office) {
//         cardHTML += '<div class="contact-info" style="margin-top: 0.5rem; font-size: 0.9rem;">';
//         if (member.email) {
//             cardHTML += `<p><a href="mailto:${member.email}" style="color: #667eea; text-decoration: none;">✉ ${member.email}</a></p>`;
//         }
//         if (member.office) {
//             cardHTML += `<p>📍 ${member.office}</p>`;
//         }
//         if (member.website) {
//             cardHTML += `<p><a href="${member.website}" target="_blank" style="color: #667eea; text-decoration: none;">🌐 Website</a></p>`;
//         }
//         cardHTML += '</div>';
//     }
    
//     card.innerHTML = cardHTML;
//     return card;
// }


// Modified createTeamMemberCard function with profile links
function createTeamMemberCard(member) {
    if (!member || !member.name) return null;
    
    const card = document.createElement('div');
    card.className = 'team-member';
    
    // Create member ID for URL
    const memberId = member.id || member.name.toLowerCase().replace(/\s+/g, '-');
    
    // Make the card clickable
    card.style.cursor = 'pointer';
    card.onclick = function() {
        window.location.href = `member-profile.html?id=${memberId}`;
    };
    
    const initials = member.initials || getInitials(member.name);
    
    let cardHTML = '';
    
    // Add image or avatar
    if (member.image) {
        cardHTML += `<img src="${member.image}" alt="${member.name}" class="member-photo">`;
    } else {
        cardHTML += `<div class="member-avatar">${initials}</div>`;
    }
    
    // Add name as a link
    cardHTML += `<h3><a href="member-profile.html?id=${memberId}" style="text-decoration: none; color: inherit;">${member.name}</a></h3>`;
    
    if (member.role) {
        cardHTML += `<p class="role">${member.role}</p>`;
    }
    
  
    // Add "View Profile" link
    cardHTML += `<a href="member-profile.html?id=${memberId}" class="view-profile-link" style="color: #667eea; text-decoration: none; font-weight: 600; margin-top: 0.5rem; display: inline-block;">View Profile →</a>`;

    card.innerHTML = cardHTML;
    return card;
}