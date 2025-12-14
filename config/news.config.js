// ===== NEWS PAGE CONFIGURATION =====

const CONFIG_NEWS = {
    // Page Header
    pageTitle: "News & Updates",
    pageSubtitle: "Stay updated with our latest research and announcements",

    // News Categories
    categories: [
        { value: "all", label: "All News" },
        { value: "award", label: "Awards & Recognition" },
        { value: "funding", label: "Funding & Grants" },
        { value: "publication", label: "Publications" },
        { value: "collaboration", label: "Collaborations" },
        { value: "team", label: "Team Updates" },
        { value: "event", label: "Events & Conferences" },
        { value: "infrastructure", label: "Infrastructure" },
        { value: "education", label: "Education & Training" }
    ],

    articles: [
        {
            id: "news-001",
            title: "AI-Thena Researcher Publishes Breakthrough Speech Enhancement Study in Q1 Journal Neurocomputing",
            slug: "ai-thena-neurocomputing-speech-enhancement",
            category: "publication",
            date: "2025-06-30",
            summary: "Nguyen Ngoc Minh Khanh, a Master's student in AI and VINIF scholarship awardee, achieves international recognition with a pioneering cross-architecture knowledge distillation method for speech enhancement, accepted in Elsevier’s Neurocomputing (Q1).",
            content: `
            <p>We are proud to announce that Nguyen Ngoc Minh Khanh, a Master's student in Artificial Intelligence and recipient of the prestigious VINIF Master's scholarship, has had his research accepted for publication in the high-impact international journal <em>Neurocomputing</em> (Q1 ranking).</p>
            
            <h3>About the Paper</h3>
            <ul>
                <li><strong>Title:</strong> Cross-architecture knowledge distillation for speech enhancement: From CMGAN to Unet</li>
                <li><strong>Author:</strong> Nguyen Ngoc Minh Khanh (MSc student in Artificial Intelligence; VINIF Master’s scholarship awardee)</li>
                <li><strong>Supervisor:</strong> Dr. Nguyen Tien Huy – Lecturer, Faculty of Information Technology, VNUHCM; Head of AI-Thena Research Group</li>
            </ul>

            <h3>Research Highlights</h3>
            <p>This study introduces a groundbreaking approach to improving speech quality in noisy environments by transferring knowledge from a Transformer-based model (CMGAN) to a CNN-based model (Unet). It is among the first works to explore knowledge distillation between heterogeneous architectures, delivering significant reductions in computational cost while maintaining high performance—making it ideal for deployment on edge devices such as smartphones and IoT systems.</p>
            <p>Extensive evaluations on benchmark datasets <em>VoiceBank+DEMAND</em> and <em>LibriMix</em> demonstrate superior results compared to existing state-of-the-art speech enhancement methods.</p>

            <h3>About Neurocomputing</h3>
            <p><em>Neurocomputing</em>, published by Elsevier, is a leading Q1-ranked journal with an impact factor of approximately 6.5. It focuses on cutting-edge research in artificial intelligence, deep learning, neural computation, and intelligent systems.</p>
            
            <p>Congratulations to Minh Khanh for this outstanding achievement, marking another milestone for AI-Thena Lab in advancing AI research for real-world applications.</p>
        `,
            image: "images/news/minh-khanh-neurocomputing-2025.jpg",
            tags: ["Neurocomputing", "Speech Enhancement", "Knowledge Distillation", "AI-Thena Lab", "Q1 Publication"],
            author: "AI-Thena Lab",
            featured: true,
            links: [
                { text: "Read Full Paper", url: "https://authors.elsevier.com/a/1lLim3INukW8cn", type: "paper" }
            ]
        },
    ],

    // Display Options
    display: {
        articlesPerPage: 6,
        showCategories: true,
        showSearch: true,
        showFeatured: true,
        showTags: true,
        showAuthor: true,
        showReadTime: true
    },

    // Featured Section
    featured: {
        title: "Featured News",
        count: 3
    },

    // Archive Settings
    archive: {
        enabled: true,
        years: [2024, 2023, 2022, 2021]
    }
};