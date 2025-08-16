// ===== HOME PAGE CONFIGURATION - UPDATED =====

const CONFIG_HOME = {
    // Hero Section
    hero: {
        title: "Advancing Intelligence Through Human-Enhanced Neural Architectures",
        subtitle: "Pioneering research in artificial intelligence, machine learning, and neural computation",
        ctaText: "Explore Our Research",
        ctaLink: "research.html"
    },
    
    // Welcome Section
    welcome: {
        title: "Welcome to AI-THENA Lab",
        text: "We are at the forefront of artificial intelligence research, pushing the boundaries of what's possible in machine learning, natural language processing, and computer vision. Our interdisciplinary team of researchers, engineers, and students work together to solve some of the most challenging problems in AI.",
        highlights: [
            "State-of-the-art research facilities",
            "Collaboration with leading tech companies",
            "Award-winning faculty and researchers",
            "Cutting-edge GPU clusters for deep learning"
        ]
    },
    
    // Statistics to display (pulls from CONFIG_LAB.stats)
    featuredStats: [
        { key: "researchAreas", label: "Research Areas", icon: "🔬" },
        { key: "teamMembers", label: "Team Members", icon: "👥" },
        { key: "publications", label: "Publications", icon: "📚" },
        { key: "yearsOfExcellence", label: "Years of Excellence", icon: "⭐" }
    ],
    
    // Featured Research Areas (number of items to show from research areas)
    featuredResearchCount: 2,
    
    // News Section Configuration
    news: {
        showSection: true,
        maxItems: 5,
        title: "Recent Updates",
        viewAllText: "View All News →",
        viewAllLink: "news.html"
    },
    
    // Testimonials
    testimonials: [
        {
            text: "AI-THENA Lab is pushing the boundaries of what's possible in machine learning. Their work on efficient transformers is groundbreaking.",
            author: "Dr. Yann LeCun",
            role: "Chief AI Scientist, Meta",
            image: "images/testimonial1.jpg"
        },
        {
            text: "The research coming out of this lab is consistently among the most innovative and impactful in the field.",
            author: "Prof. Andrew Ng",
            role: "Founder, DeepLearning.AI",
            image: "images/testimonial2.jpg"
        }
    ],
    
    // Quick Links
    quickLinks: [
        { text: "Join Our Team", link: "contact.html#opportunities", icon: "🚀" },
        { text: "Latest Publications", link: "publications.html", icon: "📄" },
        { text: "Research Projects", link: "research.html#projects", icon: "🔬" },
        { text: "Lab Resources", link: "#", icon: "💻" }
    ]
};