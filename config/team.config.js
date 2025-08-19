// ===== TEAM PAGE CONFIGURATION =====

const CONFIG_TEAM = {
    // Page Header
    pageTitle: "Our Team",
    pageSubtitle: "Meet the brilliant minds driving our research forward",

    // Team Overview
    overview: {
        description: "Our diverse team of researchers, engineers, and students brings together expertise from multiple disciplines to tackle the most challenging problems in AI.",
        stats: {
            faculty: 6,
            postdocs: 8,
            phdStudents: 15,
            mastersStudents: 20,
            undergrads: 10,
            staff: 5
        }
    },

    // Faculty Members
    // faculty: [
    //     {
    //         id: "ntienhuy",
    //         name: "Dr. Nguyen Tien Huy",
    //         role: "Lab Director",
    //         initials: "",
    //         image: "images/teams/huy_nguyen.jpg",
    //         email: "s.chen@university.edu",
    //         phone: "",
    //         office: "CSB 301",
    //         website: "https://sarahchen.ai",
    //         scholar: "https://scholar.google.com/citations?user=xxxxx",
    //         github: "https://github.com/sarahchen",
    //         linkedin: "https://linkedin.com/in/sarahchen",
    //         twitter: "https://twitter.com/sarahchen_ai",
    //         bio: "Dr. Sarah Chen is the founding director of AI-THENA Lab. Her research focuses on neural architecture search and efficient deep learning. She received her PhD from MIT and has published over 100 papers in top-tier conferences.",
    //         research: ["Neural Architecture Search", "AutoML", "Efficient AI"],
    //         education: [
    //             { degree: "PhD", field: "Computer Science", institution: "MIT", year: 2012 },
    //             { degree: "MS", field: "Computer Science", institution: "Stanford", year: 2008 },
    //             { degree: "BS", field: "Mathematics", institution: "Caltech", year: 2006 }
    //         ],
    //         awards: [
    //             "NSF CAREER Award (2020)",
    //             "Best Paper Award NeurIPS (2023)",
    //             "MIT TR35 Innovator (2019)"
    //         ],
    //         teaching: ["CS 231: Deep Learning", "CS 532: Advanced Machine Learning"],
    //         students: ["Alice Johnson", "Bob Smith", "Charlie Davis"]
    //     },
    //     {
    //         id: "john-smith",
    //         name: "Prof. John Smith",
    //         role: "Associate Director & Professor",
    //         initials: "JS",
    //         image: "images/team/john-smith.jpg",
    //         email: "j.smith@university.edu",
    //         phone: "+1 (555) 123-4568",
    //         office: "CSB 302",
    //         website: "https://johnsmith.ai",
    //         scholar: "https://scholar.google.com/citations?user=yyyyy",
    //         bio: "Prof. John Smith specializes in natural language processing and large language models. He leads the NLP research group and has extensive industry experience from his time at Google Research.",
    //         research: ["Natural Language Processing", "Language Models", "Machine Translation"],
    //         education: [
    //             { degree: "PhD", field: "Computer Science", institution: "Stanford", year: 2010 },
    //             { degree: "MS", field: "Computer Science", institution: "UC Berkeley", year: 2006 }
    //         ],
    //         awards: [
    //             "ACL Best Paper Award (2022)",
    //             "Google Faculty Research Award (2021)"
    //         ],
    //         teaching: ["CS 224N: Natural Language Processing"],
    //         students: ["Diana Prince", "Eve Taylor"]
    //     },
    //     {
    //         id: "maria-garcia",
    //         name: "Dr. Maria Garcia",
    //         role: "Assistant Professor",
    //         initials: "MG",
    //         image: "images/team/maria-garcia.jpg",
    //         email: "m.garcia@university.edu",
    //         office: "CSB 303",
    //         bio: "Dr. Maria Garcia leads the computer vision research group, focusing on 3D scene understanding and visual reasoning. She joined the lab from Facebook AI Research.",
    //         research: ["Computer Vision", "3D Reconstruction", "Visual Reasoning"],
    //         education: [
    //             { degree: "PhD", field: "Computer Science", institution: "CMU", year: 2018 }
    //         ],
    //         awards: ["CVPR Best Paper Honorable Mention (2023)"],
    //         teaching: ["CS 231A: Computer Vision"],
    //         students: ["Frank Miller", "Grace Lee"]
    //     },
    //     {
    //         id: "alex-johnson",
    //         name: "Dr. Alex Johnson",
    //         role: "Assistant Professor",
    //         initials: "AJ",
    //         image: "images/team/alex-johnson.jpg",
    //         email: "a.johnson@university.edu",
    //         office: "CSB 304",
    //         bio: "Dr. Alex Johnson specializes in reinforcement learning and robotics. His work focuses on safe and sample-efficient RL algorithms for real-world applications.",
    //         research: ["Reinforcement Learning", "Robotics", "Multi-Agent Systems"],
    //         education: [
    //             { degree: "PhD", field: "Robotics", institution: "UC Berkeley", year: 2019 }
    //         ],
    //         awards: ["ICML Best Paper Award (2023)"],
    //         teaching: ["CS 234: Reinforcement Learning"],
    //         students: ["Henry Wilson", "Iris Chen"]
    //     },
    //     {
    //         id: "lisa-wang",
    //         name: "Prof. Lisa Wang",
    //         role: "Professor",
    //         initials: "LW",
    //         image: "images/team/lisa-wang.jpg",
    //         email: "l.wang@university.edu",
    //         office: "CSB 305",
    //         bio: "Prof. Lisa Wang is a leading researcher in AI safety and ethics. She chairs the department's AI Ethics Committee and advises on responsible AI development.",
    //         research: ["AI Safety", "Machine Learning Fairness", "Interpretable AI"],
    //         education: [
    //             { degree: "PhD", field: "Computer Science", institution: "Harvard", year: 2011 }
    //         ],
    //         awards: ["ACM Fellow (2022)", "AI Safety Research Award (2023)"],
    //         teaching: ["CS 182: Ethics in AI"],
    //         students: ["Jack Brown", "Kate Anderson"]
    //     },
    //     {
    //         id: "tom-wilson",
    //         name: "Dr. Tom Wilson",
    //         role: "Research Scientist",
    //         initials: "TW",
    //         image: "images/team/tom-wilson.jpg",
    //         email: "t.wilson@university.edu",
    //         office: "CSB 306",
    //         bio: "Dr. Tom Wilson leads the Efficient AI group, working on model compression and edge deployment. Previously, he was a principal researcher at NVIDIA.",
    //         research: ["Model Compression", "Edge AI", "Neural Network Pruning"],
    //         education: [
    //             { degree: "PhD", field: "Electrical Engineering", institution: "Princeton", year: 2015 }
    //         ],
    //         awards: ["NVIDIA Research Excellence Award (2020)"],
    //         students: ["Laura Martinez", "Mike Davis"]
    //     }
    // ],

    // Postdoctoral Researchers
    postdocs: [
        {
            id: "ntienhuy",
            name: "Dr. Nguyen Tien Huy",
            role: "Leader",
            initials: "",
            image: "images/teams/huy_nguyen.jpg",
            email: "ntienhuy@fit.hcmus.edu.vn",
            phone: "",
            office: "",
            website: "",
            scholar: "",
            github: "",
            linkedin: "",
            twitter: "",
            bio: "Dr. Nguyen Tien Huy is a faculty member in the Department of Computer Science, Faculty of Information Technology, University of Science, VNUHCM. He received his PhD in Information Science from the Japan Advanced Institute of Science and Technology (JAIST) in 2019. His research focuses on Natural Language Processing and Deep Learning.",
            research: ["Natural Language Processing", "Deep Learning"],
            education: [
                { degree: "PhD", field: "Information Science", institution: "Japan Advanced Institute of Science and Technology (JAIST)", year: 2019 }
            ],
            awards: [],
            teaching: [
                "Intelligent Systems",
                "Intelligent Data Analysis",
                "Machine Learning",
                "Web Data Science"
            ],
            students: []
        },
        {
            id: "lttung",
            name: "Dr. Le Thanh Tung",
            role: "Key Member",
            initials: "",
            image: "images/teams/tung_le.jpg",
            email: "lttung@fit.hcmus.edu.vn",
            phone: "",
            office: "",
            website: "",
            scholar: "",
            github: "",
            linkedin: "",
            twitter: "",
            bio: "Dr. Le Thanh Tung is a faculty member in the Department of Knowledge Engineering, Faculty of Information Technology, University of Science, VNUHCM. He received his PhD in Information Science from the Japan Advanced Institute of Science and Technology (JAIST) in 2021. His research focuses on Natural Language Processing, Multi-modal Machine Comprehension, and Deep Learning.",
            research: ["Natural Language Processing", "Multi-modal Machine Comprehension", "Deep Learning"],
            education: [
                { degree: "PhD", field: "Information Science", institution: "Japan Advanced Institute of Science and Technology (JAIST)", year: 2021 }
            ],
            awards: [],
            teaching: [
                "Deep Learning",
                "Advanced Natural Language Processing",
                "Text Data Mining and Processing",
                "Introduction to Statistical Linguistics and Applications"
            ],
            students: []
        },
        // {
        //     name: "Dr. Sofia Martinez",
        //     initials: "SM",
        //     image: "images/team/sofia-martinez.jpg",
        //     email: "s.martinez@university.edu",
        //     mentor: "Dr. Maria Garcia",
        //     research: "3D Computer Vision, Scene Understanding",
        //     bio: "Research on 3D scene reconstruction from images.",
        //     startYear: 2024,
        //     publications: 5
        // },
        // {
        //     name: "Dr. James Lee",
        //     initials: "JL",
        //     image: "images/team/james-lee.jpg",
        //     email: "j.lee@university.edu",
        //     mentor: "Dr. Alex Johnson",
        //     research: "Safe Reinforcement Learning",
        //     bio: "Developing formally verified safe RL algorithms.",
        //     startYear: 2024,
        //     publications: 4
        // }
    ],

    // // PhD Students
    // phdStudents: [
    //     {
    //         name: "Alice Johnson",
    //         initials: "AJ",
    //         year: 4,
    //         advisor: "Dr. Sarah Chen",
    //         research: "Efficient Transformers",
    //         thesis: "Linear Attention Mechanisms for Long Sequences",
    //         email: "alice.j@university.edu",
    //         website: "https://alicejohnson.ai",
    //         publications: 5,
    //         expectedGraduation: "2025"
    //     },
    //     {
    //         name: "Bob Smith",
    //         initials: "BS",
    //         year: 3,
    //         advisor: "Dr. Sarah Chen",
    //         research: "Neural Architecture Search",
    //         thesis: "Gradient-based NAS for Vision Transformers",
    //         email: "bob.s@university.edu",
    //         publications: 3,
    //         expectedGraduation: "2026"
    //     },
    //     {
    //         name: "Charlie Davis",
    //         initials: "CD",
    //         year: 2,
    //         advisor: "Dr. Sarah Chen",
    //         research: "Model Compression",
    //         thesis: "Knowledge Distillation for Edge Devices",
    //         email: "charlie.d@university.edu",
    //         publications: 2,
    //         expectedGraduation: "2027"
    //     },
    //     {
    //         name: "Diana Prince",
    //         initials: "DP",
    //         year: 5,
    //         advisor: "Prof. John Smith",
    //         research: "Multilingual NLP",
    //         thesis: "Cross-lingual Transfer Learning at Scale",
    //         email: "diana.p@university.edu",
    //         website: "https://dianaprince.ai",
    //         publications: 7,
    //         expectedGraduation: "2025"
    //     },
    //     {
    //         name: "Eve Taylor",
    //         initials: "ET",
    //         year: 3,
    //         advisor: "Prof. John Smith",
    //         research: "Language Model Interpretability",
    //         thesis: "Understanding Attention Patterns in LLMs",
    //         email: "eve.t@university.edu",
    //         publications: 4,
    //         expectedGraduation: "2026"
    //     },
    //     {
    //         name: "Frank Miller",
    //         initials: "FM",
    //         year: 2,
    //         advisor: "Dr. Maria Garcia",
    //         research: "3D Vision",
    //         thesis: "Neural Radiance Fields for Dynamic Scenes",
    //         email: "frank.m@university.edu",
    //         publications: 2,
    //         expectedGraduation: "2027"
    //     },
    //     {
    //         name: "Grace Lee",
    //         initials: "GL",
    //         year: 4,
    //         advisor: "Dr. Maria Garcia",
    //         research: "Visual Question Answering",
    //         thesis: "Compositional Reasoning in Vision-Language Models",
    //         email: "grace.l@university.edu",
    //         publications: 6,
    //         expectedGraduation: "2025"
    //     },
    //     {
    //         name: "Henry Wilson",
    //         initials: "HW",
    //         year: 3,
    //         advisor: "Dr. Alex Johnson",
    //         research: "Multi-Agent RL",
    //         thesis: "Emergent Communication in Multi-Agent Systems",
    //         email: "henry.w@university.edu",
    //         publications: 3,
    //         expectedGraduation: "2026"
    //     },
    //     {
    //         name: "Iris Chen",
    //         initials: "IC",
    //         year: 1,
    //         advisor: "Dr. Alex Johnson",
    //         research: "Robotics",
    //         thesis: "Learning Dexterous Manipulation from Demonstrations",
    //         email: "iris.c@university.edu",
    //         publications: 1,
    //         expectedGraduation: "2028"
    //     },
    //     {
    //         name: "Jack Brown",
    //         initials: "JB",
    //         year: 3,
    //         advisor: "Prof. Lisa Wang",
    //         research: "AI Fairness",
    //         thesis: "Mitigating Bias in Foundation Models",
    //         email: "jack.b@university.edu",
    //         publications: 4,
    //         expectedGraduation: "2026"
    //     }
    // ],

    // // Masters Students (sample)
    // mastersStudents: [
    //     {
    //         name: "Oliver Zhang",
    //         initials: "OZ",
    //         program: "MS CS",
    //         year: 2,
    //         advisor: "Dr. Tom Wilson",
    //         project: "Quantization Methods for LLMs"
    //     },
    //     {
    //         name: "Sophia Kim",
    //         initials: "SK",
    //         program: "MS AI",
    //         year: 1,
    //         advisor: "Dr. Sarah Chen",
    //         project: "Efficient Vision Transformers"
    //     },
    //     {
    //         name: "Lucas Brown",
    //         initials: "LB",
    //         program: "MS CS",
    //         year: 2,
    //         advisor: "Prof. John Smith",
    //         project: "Prompt Engineering for Code Generation"
    //     }
    // ],

    // // Research Staff
    // staff: [
    //     {
    //         name: "Jennifer Adams",
    //         role: "Lab Manager",
    //         initials: "JA",
    //         email: "j.adams@university.edu",
    //         phone: "+1 (555) 123-4570",
    //         office: "CSB 200",
    //         responsibilities: ["Lab operations", "Grant administration", "Event coordination"]
    //     },
    //     {
    //         name: "Michael Chen",
    //         role: "Senior Research Engineer",
    //         initials: "MC",
    //         email: "m.chen@university.edu",
    //         responsibilities: ["Infrastructure management", "Cluster administration", "Software development"]
    //     },
    //     {
    //         name: "Sarah Johnson",
    //         role: "Data Scientist",
    //         initials: "SJ",
    //         email: "s.johnson@university.edu",
    //         responsibilities: ["Dataset curation", "Experiment tracking", "Data analysis"]
    //     },
    //     {
    //         name: "David Kim",
    //         role: "Systems Administrator",
    //         initials: "DK",
    //         email: "d.kim@university.edu",
    //         responsibilities: ["IT support", "Network management", "Security"]
    //     },
    //     {
    //         name: "Emily White",
    //         role: "Administrative Assistant",
    //         initials: "EW",
    //         email: "e.white@university.edu",
    //         phone: "+1 (555) 123-4571",
    //         responsibilities: ["Administrative support", "Meeting coordination", "Travel arrangements"]
    //     }
    // ],

    // // Alumni
    // alumni: [
    //     {
    //         name: "Dr. Robert Zhang",
    //         initials: "RZ",
    //         graduationYear: 2023,
    //         degree: "PhD",
    //         advisor: "Dr. Sarah Chen",
    //         thesis: "Efficient Neural Architecture Search via Weight Sharing",
    //         currentPosition: "Research Scientist",
    //         currentOrganization: "Google DeepMind",
    //         image: "images/alumni/robert-zhang.jpg"
    //     },
    //     {
    //         name: "Dr. Amanda Liu",
    //         initials: "AL",
    //         graduationYear: 2023,
    //         degree: "PhD",
    //         advisor: "Prof. John Smith",
    //         thesis: "Multilingual Pretraining for Low-Resource Languages",
    //         currentPosition: "Assistant Professor",
    //         currentOrganization: "Stanford University",
    //         image: "images/alumni/amanda-liu.jpg"
    //     },
    //     {
    //         name: "Dr. Kevin Park",
    //         initials: "KP",
    //         graduationYear: 2022,
    //         degree: "PhD",
    //         advisor: "Dr. Maria Garcia",
    //         thesis: "Self-Supervised Learning for 3D Scene Understanding",
    //         currentPosition: "Senior Research Scientist",
    //         currentOrganization: "Meta Reality Labs",
    //         image: "images/alumni/kevin-park.jpg"
    //     },
    //     {
    //         name: "Dr. Jessica Wong",
    //         initials: "JW",
    //         graduationYear: 2022,
    //         degree: "PhD",
    //         advisor: "Dr. Alex Johnson",
    //         thesis: "Safe Exploration in Deep Reinforcement Learning",
    //         currentPosition: "ML Engineer",
    //         currentOrganization: "Tesla Autopilot",
    //         image: "images/alumni/jessica-wong.jpg"
    //     },
    //     {
    //         name: "Dr. Daniel Martinez",
    //         initials: "DM",
    //         graduationYear: 2021,
    //         degree: "PhD",
    //         advisor: "Prof. Lisa Wang",
    //         thesis: "Interpretable Machine Learning for Healthcare",
    //         currentPosition: "Principal Data Scientist",
    //         currentOrganization: "Microsoft Health AI",
    //         image: "images/alumni/daniel-martinez.jpg"
    //     },
    //     {
    //         name: "Dr. Rachel Green",
    //         initials: "RG",
    //         graduationYear: 2021,
    //         degree: "PhD",
    //         advisor: "Dr. Tom Wilson",
    //         thesis: "Neural Network Pruning via Lottery Ticket Hypothesis",
    //         currentPosition: "Research Scientist",
    //         currentOrganization: "Apple Machine Learning",
    //         image: "images/alumni/rachel-green.jpg"
    //     }
    // ],

    // // Visiting Researchers
    // visiting: [
    //     {
    //         name: "Prof. Yuki Tanaka",
    //         initials: "YT",
    //         homeInstitution: "University of Tokyo",
    //         duration: "Jan 2024 - Dec 2024",
    //         research: "Cross-cultural AI and multilingual models",
    //         host: "Prof. John Smith"
    //     },
    //     {
    //         name: "Dr. Marco Rossi",
    //         initials: "MR",
    //         homeInstitution: "ETH Zurich",
    //         duration: "Sep 2024 - Mar 2025",
    //         research: "Robustness in neural networks",
    //         host: "Prof. Lisa Wang"
    //     }
    // ],

    // Join Us Section
    opportunities: {
        title: "Join Our Team",
        description: "We're always looking for talented researchers and students passionate about AI. If you're interested in joining our lab, we'd love to hear from you!",
        openPositions: [
            {
                "title": "Undergraduate Student Positions (Multiple)",
                "deadline": "Open until filled",
                "description": "Multiple fully-funded PhD positions are available to research cutting-edge areas of AI, including Multilingual Visual Question Answering and Explainable AI (XAI).",
                "requirements": [
                    "Basic knowledge of Machine Learning and Deep Learning",
                    "Proficiency in Python programming",
                    "Ability to read and understand English research papers",
                    "Proactive and eager to learn"
                ],
                "link": "#"
            },
            {
                "title": "Master's Student Positions (Multiple)",
                "deadline": "Open until filled",
                "description": "Multiple fully-funded PhD positions are available to research cutting-edge areas of AI, including Multilingual Visual Question Answering and Explainable AI (XAI).",
                "requirements": [
                    "Solid knowledge of Machine Learning and Deep Learning",
                    "Experience in conducting research projects",
                    "Good programming skills, especially with AI frameworks like PyTorch/TensorFlow",
                    "Ability to read and synthesize complex research literature"
                ],
                "link": "#"
            },
            {
                "title": "PhD Positions (Multiple)",
                "deadline": "Open until filled",
                "description": "Multiple fully-funded PhD positions are available to research cutting-edge areas of AI, including Multilingual Visual Question Answering and Explainable AI (XAI).",
                "requirements": [
                    "Master's degree in Computer Science, Mathematics, or a related field",
                    "Prior research experience and publications",
                    "In-depth knowledge of Deep Learning and Large Language Models (LLMs)",
                    "Ability to conduct independent research and solve complex problems"
                ],
                "link": "#"
            }

        ],
        howToApply: {
            phd: "PhD applications are processed through the university's graduate admissions system. Application deadline: December 15.",
            postdoc: "Please send your CV, research statement, and three reference letters to the relevant faculty member.",
            staff: "Staff positions are posted on the university HR website. Please apply through the official portal.",
            visiting: "Visiting researcher positions are arranged on a case-by-case basis. Please contact the faculty member you wish to work with."
        }
    }
};