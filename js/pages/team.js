/**
 * TEAM PAGE MODULE
 */

const TeamPage = {
    init() {
        this.renderAdvisors();
        this.renderMembers();
        this.renderPhDStudents();
        this.renderMasters();
        this.renderUndergraduates();
        this.renderAlumni();
        this.renderOpportunities();
    },

    renderAdvisors() {
        const grid = document.getElementById('advisors-grid');
        if (!grid) return;

        const advisors = ConfigLoader.get('team.advisors', []);
        DOMUtils.clear(grid);

        if (advisors.length === 0) {
            grid.parentElement.style.display = 'none';
            return;
        }

        advisors.forEach(member => {
            const card = CardFactory.createTeamCard(member, { clickable: true });
            if (card) grid.appendChild(card);
        });
    },

    renderMembers() {
        const grid = document.getElementById('members-grid');
        if (!grid) return;

        const members = ConfigLoader.get('team.members', []);
        DOMUtils.clear(grid);

        if (members.length === 0) {
            grid.parentElement.style.display = 'none';
            return;
        }

        members.forEach(member => {
            const card = CardFactory.createTeamCard(member, { clickable: true });
            if (card) grid.appendChild(card);
        });
    },

    renderPhDStudents() {
        const grid = document.getElementById('phd-grid');
        if (!grid) return;

        const students = ConfigLoader.get('team.phdStudents', []);
        DOMUtils.clear(grid);

        if (students.length === 0) {
            grid.parentElement.style.display = 'none';
            return;
        }

        students.forEach(student => {
            const card = CardFactory.createTeamCard(student, { clickable: true });
            if (card) grid.appendChild(card);
        });
    },

    renderMasters() {
        const grid = document.getElementById('masters-grid');
        if (!grid) return;

        const students = ConfigLoader.get('team.masterStudents', []);
        DOMUtils.clear(grid);

        if (students.length === 0) {
            grid.parentElement.style.display = 'none';
            return;
        }

        students.forEach(student => {
            const card = CardFactory.createTeamCard(student, { clickable: true });
            if (card) grid.appendChild(card);
        });
    },

    renderUndergraduates() {
        const grid = document.getElementById('undergrad-grid');
        if (!grid) return;

        const students = ConfigLoader.get('team.undergraduates', []);
        DOMUtils.clear(grid);

        if (students.length === 0) {
            grid.parentElement.style.display = 'none';
            return;
        }

        students.forEach(student => {
            const card = CardFactory.createTeamCard(student, { clickable: true });
            if (card) grid.appendChild(card);
        });
    },

    renderAlumni() {
        const grid = document.getElementById('alumni-list');
        if (!grid) return;

        const alumni = ConfigLoader.get('team.alumni', []);
        DOMUtils.clear(grid);

        if (alumni.length === 0) {
            grid.parentElement.style.display = 'none';
            return;
        }

        // Đổi class thành team-grid để giống các section khác
        grid.className = 'team-grid';

        alumni.forEach(person => {
            const card = CardFactory.createTeamCard(person, { clickable: false });
            if (card) grid.appendChild(card);
        });
    },

    renderOpportunities() {
        const container = document.getElementById('opportunities-container');
        if (!container) return;

        const opportunities = ConfigLoader.get('team.opportunities.openPositions', []);
        DOMUtils.clear(container);

        if (opportunities.length === 0) return;

        const grid = DOMUtils.createElement('div', ['opportunities-grid']);

        opportunities.forEach(opp => {
            const card = DOMUtils.createElement('div', ['opportunity-card']);

            let html = `<h3>${opp.title}</h3>`;
            if (opp.deadline) html += `<p class="deadline"><strong>Deadline:</strong> ${opp.deadline}</p>`;
            html += `<p>${opp.description}</p>`;

            if (opp.requirements && opp.requirements.length > 0) {
                html += '<ul class="requirements-list">';
                opp.requirements.forEach(req => {
                    html += `<li>${req}</li>`;
                });
                html += '</ul>';
            }

            if (opp.link && opp.link !== '#') {
                html += `<a href="${opp.link}" class="opportunity-link">Learn More →</a>`;
            }

            card.innerHTML = html;
            grid.appendChild(card);
        });

        container.appendChild(grid);
    }
};

window.TeamPage = TeamPage;