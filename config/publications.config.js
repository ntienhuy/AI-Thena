// ===== PUBLICATIONS PAGE CONFIGURATION =====

const CONFIG_PUBLICATIONS = {
    // Page Header
    pageTitle: "Publications",
    pageSubtitle: "Our contributions to the scientific community",

    // // Publication Statistics
    // stats: {
    //     total: 150,
    //     journal: 45,
    //     conference: 85,
    //     workshop: 20,
    //     citations: 5250,
    //     hIndex: 42,
    //     awards: 15,
    //     bestPapers: 8
    // },

    // // Featured Publications
    // featured: [
    //     {
    //         id: "pub-001",
    //         title: "Efficient Transformers: A Comprehensive Survey and New Directions",
    //         authors: ["Sarah Chen", "Alice Johnson", "Bob Smith", "John Smith"],
    //         venue: "NeurIPS 2024",
    //         venueType: "conference",
    //         year: 2024,
    //         award: "Best Paper Award",
    //         abstract: "This groundbreaking work introduces a novel approach to transformer architectures that reduces computational requirements by 90% while maintaining state-of-the-art performance. We present LinearAttention, a new attention mechanism that scales linearly with sequence length.",
    //         keywords: ["Transformers", "Efficient AI", "Attention Mechanisms"],
    //         pdf: "papers/efficient-transformers-2024.pdf",
    //         arxiv: "https://arxiv.org/abs/2024.xxxxx",
    //         code: "https://github.com/ai-thena/efficient-transformers",
    //         slides: "slides/neurips2024-efficient.pdf",
    //         video: "https://youtube.com/watch?v=xxxxx",
    //         bibtex: "@inproceedings{chen2024efficient, title={Efficient Transformers}, author={Chen, Sarah and Johnson, Alice}, booktitle={NeurIPS}, year={2024}}",
    //         citations: 125,
    //         project: "Project Athena"
    //     }
    // ],

    // All Publications (sorted by year, then venue)
    publications: [
        // 2024 Publications
        {
            "id": "pub-001",
            "title": "EnTube: Exploring key video features for advancing YouTube engagement",
            "authors": [
                "Truong Le",
                "Minh-Vuong Nguyen-Thi",
                "Minh-Tu Le",
                "Hien-Vi Nguyen-Thi",
                "Tung Le",
                "Huy Tien Nguyen"
            ],
            "venue": "Entertainment Computing",
            "venueType": "journal",
            "year": 2025,
            "month": "March",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-002",
            "title": "Multi Visual and Textual Embedding on Visual Question Answering for Blind People",
            "authors": [
                "Tung Le",
                "Huy Tien Nguyen",
                "Minh Le Nguyen"
            ],
            "venue": "Neurocomputing",
            "venueType": "journal",
            "year": 2021,
            "month": "September",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-003",
            "title": "PhraseTransformer: an incorporation of local context information into sequence-to-sequence semantic parsing",
            "authors": [
                "Nguyen Phuong Minh",
                "Tung Le",
                "Huy Tien Nguyen",
                "Minh Le Nguyen"
            ],
            "venue": "Applied Intelligence",
            "venueType": "journal",
            "year": 2022,
            "month": "November",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-004",
            "title": "SubTST: a consolidation of sub-word latent topics and sentence transformer in semantic representation",
            "authors": [
                "Binh Dang",
                "Tung Le",
                "Minh Le Nguyen"
            ],
            "venue": "Applied Intelligence",
            "venueType": "journal",
            "year": 2022,
            "month": "October",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-005",
            "title": "Advancing Vietnamese Visual Question Answering with Transformer and Convolutional Integration",
            "authors": [
                "Ngoc Son Nguyen",
                "Van Son Nguyen",
                "Tung Le"
            ],
            "venue": "Computers and Electrical Engineering",
            "venueType": "journal",
            "year": 2024,
            "month": "October",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-006",
            "title": "How rationals boost textual entailment modeling: Insights from large language models",
            "authors": [
                "Duc-Huy Pham",
                "Tung Le",
                "Huy Tien Nguyen"
            ],
            "venue": "Computers and Electrical Engineering",
            "venueType": "journal",
            "year": 2024,
            "month": "October",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-007",
            "title": "Lightweight speaker verification with integrated VAD and speech enhancement",
            "authors": [
                "Kiet Anh Hoang",
                "Tung Le",
                "Huy Tien Nguyen"
            ],
            "venue": "Digital Signal Processing",
            "venueType": "journal",
            "year": 2025,
            "month": "April",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-008",
            "title": "Integrating Voice Activity Detection to Enhance Robustness of On-Device Speaker Verification",
            "authors": [
                "Kiet Anh Hoang",
                "Khanh Duong",
                "Triet Nguyen Van Minh",
                "Tung Le",
                "Huy Tien Nguyen"
            ],
            "venue": "PRICAI 2024: Trends in Artificial Intelligence: 21st Pacific Rim International Conference on Artificial Intelligence",
            "venueType": "conference",
            "year": 2024,
            "month": "November",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-009",
            "title": "AMAMP: A Two-Phase Adaptive Multi-hop Attention Message Passing Mechanism for Logical Reasoning Machine Reading Comprehension",
            "authors": [
                "Khai T. Phan",
                "Tung Le",
                "Nhi Thao Tran"
            ],
            "venue": "Computational Collective Intelligence: 16th International Conference",
            "venueType": "conference",
            "year": 2024,
            "month": "September",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-010",
            "title": "Fusing Visual and Textual Representations via Multi-layer Fusing Transformers for Vietnamese Visual Question Answering",
            "authors": [
                "Cong Phu Nguyen",
                "Huy Tien Nguyen",
                "Tung Le"
            ],
            "venue": "Computational Collective Intelligence: 16th International Conference",
            "venueType": "conference",
            "year": 2024,
            "month": "September",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-011",
            "title": "A Study on Effectiveness of BERT Models and Task-Conditioned Reasoning Strategy for Medical Visual Question Answering",
            "authors": [
                "Chau Nguyen",
                "Tung Le",
                "Nguyen-Khang Le",
                "Trung-Tin Pham",
                "Le-Minh Nguyen"
            ],
            "venue": "Artificial Intelligence for Communications and Networks. AICON 2022. Lecture Notes of the Institute for Computer Sciences, Social Informatics and Telecommunications Engineering, vol 477. Springer",
            "venueType": "conference",
            "year": 2023,
            "month": "March",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-012",
            "title": "A Novel Pipeline to Enhance Question-Answering Model by Identifying Relevant Information",
            "authors": [
                "Nguyen-Khang Le",
                "Dieu-Hien Nguyen",
                "Thi-Thu-Trang Nguyen",
                "Minh Phuong Nguyen",
                "Tung Le",
                "Minh Le Nguyen"
            ],
            "venue": "New Frontiers in Artificial Intelligence: JSAI-isAI 2021 Workshops, JURISIN, LENLS18, SCIDOCA, Kansei-AI, AI-BIZ, Pages 296–311, Revised Selected Papers. Springer-Verlag, Berlin, Heidelberg.",
            "venueType": "conference",
            "year": 2021,
            "month": "November",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-013",
            "title": "Combining Multi-vision Embedding in Contextual Attention for Vietnamese Visual Question Answering",
            "authors": [
                "Anh Duc Nguyen",
                "Tung Le",
                "Huy Tien Nguyen"
            ],
            "venue": "Image and Video Technology: 10th Pacific-Rim Symposium, PSIVT 2022, Virtual Event, Proceedings. Springer-Verlag, Berlin, Heidelberg.",
            "venueType": "conference",
            "year": 2022,
            "month": "November",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-014",
            "title": "VIMQA: A Vietnamese Dataset for Advanced Reasoning and Explainable Multi-hop Question Answering",
            "authors": [
                "Khang Le",
                "Hien Nguyen",
                "Tung Le Thanh",
                "Minh Nguyen"
            ],
            "venue": "Proceedings of the Thirteenth Language Resources and Evaluation Conference",
            "venueType": "conference",
            "year": 2022,
            "month": null,
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-015",
            "title": "An Unsupervised Learning Method to improve Legal Document Retrieval task at ALQAC 2022",
            "authors": [
                "Dat T. Nguyen",
                "Hieu Nguyen",
                "Tung Le",
                "Le-Minh Nguyen"
            ],
            "venue": "2022 14th International Conference on Knowledge and Systems Engineering (KSE)",
            "venueType": "conference",
            "year": 2022,
            "month": null,
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-016",
            "title": "Air Quality Monitoring and Forecasting System using IoT and Machine Learning Techniques",
            "authors": [
                "Quynh Anh Tran",
                "Quang Hung Dang",
                "Tung Le",
                "Huy Tien Nguyen",
                "Tan Duy Le"
            ],
            "venue": "2022 6th International Conference on Green Technology and Sustainable Development (GTSD)",
            "venueType": "conference",
            "year": 2022,
            "month": null,
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-017",
            "title": "An Effective Method to Answer Multi-hop Questions by Single-hop QA System",
            "authors": [
                "Kong Yuntao",
                "Nguyen Phuong",
                "Teeradaj Racharak",
                "Tung Le",
                "Nguyen Minh"
            ],
            "venue": "Proceedings of the 14th International Conference on Agents and Artificial Intelligence - Volume 2: ICAART",
            "venueType": "conference",
            "year": 2022,
            "month": "February",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-018",
            "title": "Learning Cross-modal Representations with Multi-relations for Image Captioning",
            "authors": [
                "Peng Cheng",
                "Tung Le",
                "Teeradaj Racharak",
                "Cao Yiming",
                "Kong Weikun",
                "Minh Nguyen"
            ],
            "venue": "Proceedings of the 11th International Conference on Pattern Recognition Applications and Methods – ICPRAM",
            "venueType": "conference",
            "year": 2022,
            "month": "February",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-019",
            "title": "Object-less Vision-language Model on Visual Question Classification for Blind People",
            "authors": [
                "Tung Le",
                "Khoa Pho",
                "Thong Bui",
                "Huy Tien Nguyen",
                "Minh Le Nguyen"
            ],
            "venue": "Proceedings of the 14th International Conference on Agents and Artificial Intelligence - Volume 3: ICAART",
            "venueType": "conference",
            "year": 2022,
            "month": "February",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-020",
            "title": "CAE: Mechanism to Diminish the Class Imbalanced in SLU Slot Filling Task",
            "authors": [
                "Nguyen Minh Phuong",
                "Tung Le",
                "Nguyen Le Minh"
            ],
            "venue": "Advances in Computational Collective Intelligence. ICCCI 2022. Communications in Computer and Information Science, vol 1653",
            "venueType": "conference",
            "year": 2022,
            "month": null,
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-021",
            "title": "RVT-Transformer: Residual Attention in Answerability Prediction on Visual Question Answering for Blind People",
            "authors": [
                "Duy-Minh Nguyen-Tran",
                "Tung Le",
                "Khoa Pho",
                "Minh Le Nguyen",
                "Huy Tien Nguyen"
            ],
            "venue": "Advances in Computational Collective Intelligence. ICCCI 2022. Communications in Computer and Information Science, vol 1653.",
            "venueType": "conference",
            "year": 2022,
            "month": null,
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-022",
            "title": "Bi-direction co-attention network on visual question answering for blind people",
            "authors": [
                "Tung Le",
                "Thong Bui",
                "Huy Tien Nguyen",
                "Minh Le Nguyen"
            ],
            "venue": "Fourteenth International Conference on Machine Vision (ICMV 2021)",
            "venueType": "conference",
            "year": 2022,
            "month": "March",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-023",
            "title": "Attention-driven RetinaNet for Parasitic Egg Detection",
            "authors": [
                "Khoa Pho",
                "Han Lam",
                "Tung Le",
                "Huy Tien Nguyen",
                "Atsuo Yoshitaka"
            ],
            "venue": "2022 IEEE International Symposium on Multimedia (ISM)",
            "venueType": "conference",
            "year": 2022,
            "month": null,
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-024",
            "title": "Youtube Engagement Analytics via Deep Multimodal Fusion Model",
            "authors": [
                "Minh-Vuong Nguyen-Thi",
                "Huy Le",
                "Truong Le",
                "Tung Le",
                "Huy Tien Nguyen"
            ],
            "venue": "Image and Video Technology. PSIVT 2022. Lecture Notes in Computer Science, vol 13763. Springer",
            "venueType": "conference",
            "year": 2022,
            "month": null,
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-025",
            "title": "Improving Neural Machine Translation by Efficiently Incorporating Syntactic Templates",
            "authors": [
                "Phuong Nguyen",
                "Tung Le",
                "Thanh-Le Ha",
                "Thai Dang",
                "Khanh Tran",
                "Kim Anh Nguyen",
                "Nguyen Le Minh"
            ],
            "venue": "Advances and Trends in Artificial Intelligence: 35th International Conference on Industrial, Engineering and Other Applications of Applied Intelligent Systems, IEA/AIE 2022, Proceedings. Springer-Verlag, Berlin, Heidelberg.",
            "venueType": "conference",
            "year": 2022,
            "month": "July",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-026",
            "title": "Blockchain-Based Decentralized Digital Content Management and Sharing System",
            "authors": [
                "Thong Bui",
                "Tan Duy Le",
                "Tri-Hai Nguyen",
                "Bogdan Trawinski",
                "Huy Tien Nguyen",
                "Tung Le"
            ],
            "venue": "Intelligent Information and Database Systems: 14th Asian Conference, ACIIDS 2022, Proceedings, Part II. Springer-Verlag, Berlin, Heidelberg.",
            "venueType": "conference",
            "year": 2022,
            "month": "November",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-027",
            "title": "A Correct Face Mask Usage Detection Framework by AioT",
            "authors": [
                "Minh Hoang Pham",
                "Sinh Van Nguyen",
                "Tung Le",
                "Huy Tien Nguyen",
                "Tan Duy Le",
                "Bogdan Trawinski"
            ],
            "venue": "Intelligent Information and Database Systems: 14th Asian Conference, ACIIDS 2022, Proceedings, Part II. Springer-Verlag, Berlin, Heidelberg.",
            "venueType": "conference",
            "year": 2022,
            "month": "November",
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-028",
            "title": "Bi-directional Cross-Attention Network on Vietnamese Visual Question Answering",
            "authors": [
                "Duy-Minh Nguyen-Tran",
                "Tung Le",
                "Minh Le Nguyen",
                "Huy Tien Nguyen"
            ],
            "venue": "Proceedings of the 36th Pacific Asia Conference on Language, Information and Computation",
            "venueType": "conference",
            "year": 2022,
            "month": null,
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
        {
            "id": "pub-029",
            "title": "Vision And Text Transformer For Predicting Answerability On Visual Question Answering",
            "authors": [
                "Tung Le",
                "Huy Tien Nguyen",
                "Minh Le Nguyen"
            ],
            "venue": "2021 IEEE International Conference on Image Processing (ICIP)",
            "venueType": "conference",
            "year": 2021,
            "month": null,
            "award": null,
            "pdf": null,
            "arxiv": null,
            "code": null,
            "citations": null
        },
    ],

    // Filter Options
    filters: {
        years: [2025, 2024, 2023, 2022, 2021, 2020],
        venues: [
            { value: "all", label: "All Venues" },
            { value: "journal", label: "Journals" },
            { value: "conference", label: "Conferences" },
            { value: "workshop", label: "Workshops" }
        ],
        topics: [
            { value: "all", label: "All Topics" },
            { value: "nlp", label: "Natural Language Processing" },
            { value: "cv", label: "Computer Vision" },
            { value: "rl", label: "Reinforcement Learning" },
            { value: "efficient", label: "Efficient AI" },
            { value: "safety", label: "AI Safety & Ethics" },
            { value: "nas", label: "Neural Architecture Search" }
        ]
    },

    // // Download Options
    // downloads: {
    //     completeList: {
    //         title: "Complete Publication List",
    //         description: "PDF containing all publications from the lab",
    //         filename: "ai-thena-publications-complete.pdf",
    //         icon: "📄"
    //     },
    //     bibtex: {
    //         title: "BibTeX File",
    //         description: "Citations for all publications in BibTeX format",
    //         filename: "ai-thena-publications.bib",
    //         icon: "📊"
    //     },
    //     recent: {
    //         title: "Recent Highlights",
    //         description: "Overview of recent high-impact publications",
    //         filename: "ai-thena-recent-highlights.pdf",
    //         icon: "⭐"
    //     }
    // },

    // // Metrics Display
    // metrics: {
    //     showCitations: true,
    //     showHIndex: true,
    //     showAwards: true,
    //     showTrends: true,
    //     citationSource: "Google Scholar",
    //     lastUpdated: "December 1, 2024"
    // },

    // // Related Links
    // relatedLinks: [
    //     {
    //         title: "Google Scholar Profile",
    //         url: "https://scholar.google.com/citations?user=lab-profile",
    //         icon: "🎓"
    //     },
    //     {
    //         title: "DBLP Profile",
    //         url: "https://dblp.org/lab-profile",
    //         icon: "📚"
    //     },
    //     {
    //         title: "arXiv Submissions",
    //         url: "https://arxiv.org/search/?query=ai-thena-lab",
    //         icon: "📝"
    //     },
    //     {
    //         title: "GitHub Repositories",
    //         url: "https://github.com/ai-thena",
    //         icon: "💻"
    //     }
    // ]
};