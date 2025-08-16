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
        // {
        //     id: "news-002",
        //     title: "Major NSF Grant Awarded for Explainable AI Research",
        //     slug: "nsf-grant-explainable-ai-research",
        //     category: "funding",
        //     date: "2024-11-20",
        //     summary: "Lab receives $2M NSF grant to develop new frameworks for making AI systems more interpretable and trustworthy.",
        //     content: `
        //         <p>The National Science Foundation has awarded our lab a $2 million grant over three years to advance research in explainable artificial intelligence (XAI).</p>

        //         <p>The project, titled "Towards Trustworthy AI: Developing Interpretable and Explainable Machine Learning Systems," will focus on creating new methodologies to make AI decision-making processes more transparent and understandable to humans.</p>

        //         <h3>Research Objectives</h3>
        //         <ul>
        //             <li>Develop novel explainability techniques for deep neural networks</li>
        //             <li>Create user-friendly interfaces for AI explanation</li>
        //             <li>Establish evaluation metrics for explanation quality</li>
        //             <li>Build open-source tools for the research community</li>
        //         </ul>

        //         <p>This funding will support two PhD students and one postdoctoral researcher, as well as enable collaboration with industry partners to ensure real-world applicability of our research.</p>
        //     `,
        //     image: "images/news/nsf-grant-2024.jpg",
        //     tags: ["NSF", "Grant", "Explainable AI", "Funding"],
        //     author: "AI-THENA Lab",
        //     featured: true,
        //     links: [
        //         { text: "NSF Award Details", url: "#", type: "external" },
        //         { text: "Project Overview", url: "#", type: "project" }
        //     ]
        // },
        // {
        //     id: "news-003",
        //     title: "New PhD Students Join Our Research Team",
        //     slug: "new-phd-students-join-team",
        //     category: "team",
        //     date: "2024-10-15",
        //     summary: "Three talented PhD students join our growing research team, bringing expertise in computer vision, NLP, and robotics.",
        //     content: `
        //         <p>We are excited to welcome three exceptional PhD students to our research team this fall semester.</p>

        //         <h3>New Team Members</h3>

        //         <h4>Maria Rodriguez</h4>
        //         <p>Maria joins us from UC Berkeley with a focus on computer vision and 3D scene understanding. She previously worked on autonomous vehicle perception systems and has published papers on multi-modal learning.</p>

        //         <h4>David Kim</h4>
        //         <p>David brings expertise in natural language processing and conversational AI. He completed his MS at Stanford, where he worked on large language models and dialogue systems.</p>

        //         <h4>Sarah Johnson</h4>
        //         <p>Sarah's research interests lie in robotics and reinforcement learning. She has experience in developing learning algorithms for robotic manipulation and navigation tasks.</p>

        //         <p>These additions bring our total PhD student count to 18, strengthening our research capabilities across multiple AI domains. We look forward to their contributions to our ongoing projects and new research directions.</p>
        //     `,
        //     image: "images/news/new-students-2024.jpg",
        //     tags: ["PhD Students", "New Members", "Team Growth"],
        //     author: "AI-THENA Lab",
        //     featured: false,
        //     links: []
        // },
        // {
        //     id: "news-004",
        //     title: "OpenAI Collaboration on AI Safety Research",
        //     slug: "openai-collaboration-ai-safety",
        //     category: "collaboration",
        //     date: "2024-09-30",
        //     summary: "Strategic partnership with OpenAI announced to advance research in AI safety and alignment, focusing on responsible AI development.",
        //     content: `
        //         <p>We are pleased to announce a new research collaboration with OpenAI focused on advancing AI safety and alignment research.</p>

        //         <p>This partnership will combine our lab's expertise in interpretable AI with OpenAI's capabilities in large-scale language models to address critical challenges in AI safety.</p>

        //         <h3>Collaboration Focus Areas</h3>
        //         <ul>
        //             <li>Developing safety evaluation frameworks for large language models</li>
        //             <li>Creating interpretability tools for understanding model behavior</li>
        //             <li>Establishing best practices for responsible AI deployment</li>
        //             <li>Training the next generation of AI safety researchers</li>
        //         </ul>

        //         <p>The collaboration includes joint research projects, student exchange programs, and shared resources for conducting large-scale experiments.</p>

        //         <p>"This partnership represents a significant step forward in our mission to ensure AI systems are safe, beneficial, and aligned with human values," said Prof. Lisa Wang, who leads our AI safety research group.</p>
        //     `,
        //     image: "images/news/openai-collaboration.jpg",
        //     tags: ["OpenAI", "Collaboration", "AI Safety", "Partnership"],
        //     author: "AI-THENA Lab",
        //     featured: true,
        //     links: [
        //         { text: "OpenAI Blog Post", url: "#", type: "external" },
        //         { text: "AI Safety Research", url: "#", type: "research" }
        //     ]
        // },
        // {
        //     id: "news-005",
        //     title: "Summer Internship Program Success",
        //     slug: "summer-internship-program-success",
        //     category: "education",
        //     date: "2024-08-25",
        //     summary: "Our summer internship program concludes with outstanding results - 12 published papers and innovative project demonstrations.",
        //     content: `
        //         <p>Our 2024 summer internship program has concluded with remarkable success, hosting 15 undergraduate students from universities across the globe.</p>

        //         <h3>Program Highlights</h3>
        //         <ul>
        //             <li>12 research papers submitted to top-tier conferences</li>
        //             <li>5 innovative AI demos developed</li>
        //             <li>3 patent applications filed</li>
        //             <li>2 open-source tools released to the community</li>
        //         </ul>

        //         <p>The 10-week program paired students with faculty mentors and PhD students to work on cutting-edge research projects spanning computer vision, natural language processing, and robotics.</p>

        //         <h3>Notable Projects</h3>

        //         <h4>EfficientVision: Real-time Object Detection on Mobile Devices</h4>
        //         <p>Students developed a novel neural architecture that achieves 95% accuracy while running at 30 FPS on smartphones.</p>

        //         <h4>ChatLab: Conversational Interface for Scientific Literature</h4>
        //         <p>An AI assistant that helps researchers navigate and understand complex scientific papers through natural language interactions.</p>

        //         <p>Many of our interns have received offers to continue their research as PhD students, reflecting the high quality of work produced during the program.</p>
        //     `,
        //     image: "images/news/summer-interns-2024.jpg",
        //     tags: ["Internship", "Summer Program", "Education", "Research"],
        //     author: "AI-THENA Lab",
        //     featured: false,
        //     links: [
        //         { text: "View Demo Videos", url: "#", type: "demo" },
        //         { text: "Internship Program", url: "#", type: "program" }
        //     ]
        // },
        // {
        //     id: "news-006",
        //     title: "New NVIDIA DGX H100 Systems Installed",
        //     slug: "nvidia-dgx-h100-systems-installed",
        //     category: "infrastructure",
        //     date: "2024-07-10",
        //     summary: "State-of-the-art GPU cluster expansion with NVIDIA DGX H100 systems enhances our computational capabilities for large-scale AI research.",
        //     content: `
        //         <p>We have significantly expanded our computational infrastructure with the installation of new NVIDIA DGX H100 systems, bringing our total GPU count to 256 high-performance units.</p>

        //         <h3>New Capabilities</h3>
        //         <ul>
        //             <li>8x NVIDIA DGX H100 systems (64 H100 GPUs total)</li>
        //             <li>5x faster training for large language models</li>
        //             <li>Support for models with up to 175B parameters</li>
        //             <li>Enhanced multi-node distributed training capabilities</li>
        //         </ul>

        //         <p>This upgrade enables our researchers to tackle more ambitious projects, including training large-scale foundation models and conducting extensive hyperparameter optimization studies.</p>

        //         <p>"The new infrastructure opens up exciting possibilities for our research," said Dr. Tom Wilson, who oversees our computing resources. "We can now experiment with larger models and more complex architectures that were previously computationally prohibitive."</p>

        //         <p>The systems are already being utilized for several ongoing projects, including our work on efficient transformers and multi-modal learning architectures.</p>
        //     `,
        //     image: "images/news/dgx-h100-installation.jpg",
        //     tags: ["Infrastructure", "NVIDIA", "GPU", "Computing"],
        //     author: "AI-THENA Lab",
        //     featured: false,
        //     links: [
        //         { text: "Technical Specifications", url: "#", type: "specs" },
        //         { text: "Usage Guidelines", url: "#", type: "docs" }
        //     ]
        // },
        // {
        //     id: "news-007",
        //     title: "ICML 2024: Three Papers Accepted",
        //     slug: "icml-2024-three-papers-accepted",
        //     category: "publication",
        //     date: "2024-05-15",
        //     summary: "Three research papers from our lab accepted at ICML 2024, covering advances in federated learning, neural architecture search, and AI fairness.",
        //     content: `
        //         <p>We are delighted to announce that three papers from our lab have been accepted for presentation at the International Conference on Machine Learning (ICML) 2024.</p>

        //         <h3>Accepted Papers</h3>

        //         <h4>1. "FedNAS: Federated Neural Architecture Search for Heterogeneous Clients"</h4>
        //         <p><strong>Authors:</strong> Alice Johnson, Bob Smith, Dr. Sarah Chen</p>
        //         <p>This work addresses the challenge of finding optimal neural architectures in federated learning settings where clients have diverse computational capabilities and data distributions.</p>

        //         <h4>2. "Bias Amplification in Large Language Models: A Systematic Analysis"</h4>
        //         <p><strong>Authors:</strong> Diana Prince, Prof. Lisa Wang, Dr. Alex Johnson</p>
        //         <p>A comprehensive study examining how pre-training data bias is amplified in large language models and proposing mitigation strategies.</p>

        //         <h4>3. "Memory-Efficient Transformers via Gradient Checkpointing and Mixed Precision"</h4>
        //         <p><strong>Authors:</strong> Charlie Davis, Dr. Tom Wilson, Prof. John Smith</p>
        //         <p>Novel techniques for reducing memory consumption in transformer training, enabling larger models on resource-constrained hardware.</p>

        //         <p>The conference will be held in Vienna, Austria, from July 21-27, 2024. Our team looks forward to presenting these contributions to the international machine learning community.</p>
        //     `,
        //     image: "images/news/icml-2024-papers.jpg",
        //     tags: ["ICML", "Publications", "Research", "Conference"],
        //     author: "AI-THENA Lab",
        //     featured: false,
        //     links: [
        //         { text: "ICML 2024", url: "#", type: "conference" },
        //         { text: "Paper Preprints", url: "#", type: "paper" }
        //     ]
        // },
        // {
        //     id: "news-008",
        //     title: "AI Ethics Workshop Hosted",
        //     slug: "ai-ethics-workshop-hosted",
        //     category: "event",
        //     date: "2024-04-20",
        //     summary: "Successfully hosted international workshop on AI Ethics and Fairness, bringing together 150 researchers from academia and industry.",
        //     content: `
        //         <p>Our lab successfully hosted the International Workshop on AI Ethics and Fairness, attracting over 150 participants from leading universities and technology companies worldwide.</p>

        //         <h3>Workshop Highlights</h3>
        //         <ul>
        //             <li>12 invited talks from renowned experts</li>
        //             <li>30 poster presentations from emerging researchers</li>
        //             <li>Panel discussion on regulatory frameworks</li>
        //             <li>Hands-on tutorials on bias detection tools</li>
        //         </ul>

        //         <h3>Keynote Speakers</h3>
        //         <ul>
        //             <li>Dr. Timnit Gebru - On algorithmic bias in hiring systems</li>
        //             <li>Prof. Cynthia Dwork - Differential privacy for fairness</li>
        //             <li>Dr. Safiya Noble - Intersectionality in AI systems</li>
        //             <li>Prof. Michael Kearns - Economic perspectives on AI fairness</li>
        //         </ul>

        //         <p>The workshop facilitated important discussions on the responsible development and deployment of AI systems, with particular focus on mitigating bias and ensuring equitable outcomes across different demographic groups.</p>

        //         <p>Key outcomes include the formation of a collaborative research network and plans for a joint position paper on best practices for ethical AI development.</p>
        //     `,
        //     image: "images/news/ai-ethics-workshop.jpg",
        //     tags: ["Workshop", "AI Ethics", "Event", "Fairness"],
        //     author: "AI-THENA Lab",
        //     featured: false,
        //     links: [
        //         { text: "Workshop Proceedings", url: "#", type: "proceedings" },
        //         { text: "Video Recordings", url: "#", type: "video" }
        //     ]
        // }
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