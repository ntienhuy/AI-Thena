// ===== FOOTER CONFIGURATION =====

const CONFIG_FOOTER = {
    // Copyright Information
    copyright: {
        year: 2025,
        holder: "AI-THENA Lab",
        rights: "All rights reserved",
        additionalText: ""
    },
    
    // Footer Tagline
    tagline: "Advancing Intelligence Through Innovation",
    
    // Footer Sections
    sections: [
        {
            title: "Quick Links",
            links: [
                { text: "Research Areas", url: "research.html" },
                { text: "Publications", url: "publications.html" },
                { text: "Team", url: "team.html" },
                { text: "Contact", url: "contact.html" },
                { text: "Lab Resources", url: "#" },
                { text: "Internal Wiki", url: "#", external: true }
            ]
        },
        {
            title: "Opportunities",
            links: [
                { text: "PhD Positions", url: "contact.html#phd" },
                { text: "Postdoc Positions", url: "contact.html#postdoc" },
                { text: "Internships", url: "contact.html#internships" },
                { text: "Visiting Researchers", url: "contact.html#visiting" },
                { text: "Collaborations", url: "contact.html#collaborate" }
            ]
        },
        {
            title: "Resources",
            links: [
                { text: "GitHub", url: "https://github.com/ai-thena", external: true },
                { text: "Datasets", url: "#" },
                { text: "Code", url: "#" },
                { text: "Documentation", url: "#" },
                { text: "Tutorial Videos", url: "#" }
            ]
        },
        {
            title: "Connect",
            links: [
                { text: "Twitter", url: "https://twitter.com/ai_thena_lab", external: true },
                { text: "LinkedIn", url: "https://linkedin.com/company/ai-thena-lab", external: true },
                { text: "YouTube", url: "https://youtube.com/@ai-thena-lab", external: true },
                { text: "Newsletter", url: "contact.html#newsletter" },
                { text: "RSS Feed", url: "/feed.xml" }
            ]
        }
    ],
    
    // Bottom Bar Links
    bottomLinks: [
        // { text: "Privacy Policy", url: "/privacy" },
        // { text: "Terms of Use", url: "/terms" },
        // { text: "Accessibility", url: "/accessibility" },
        // { text: "Sitemap", url: "/sitemap" }
    ],
    
    // Affiliations/Logos
    affiliations: [
        {
            name: "Tech University",
            logo: "images/affiliations/university.png",
            url: "https://university.edu"
        },
        {
            name: "NSF",
            logo: "images/affiliations/nsf.png",
            url: "https://nsf.gov"
        },
        {
            name: "IEEE",
            logo: "images/affiliations/ieee.png",
            url: "https://ieee.org"
        }
    ],
    
    // Display Options
    display: {
        showSocialIcons: true,
        showNewsletter: true,
        showAffiliations: true,
        showBottomLinks: true,
        darkMode: false
    }
};