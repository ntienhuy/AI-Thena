// ===== TEAM PAGE CONFIGURATION =====

const CONFIG_TEAM = {
    // Page Header
    pageTitle: "Our Team",
    pageSubtitle: "Meet the brilliant minds driving our research forward",

    // Scientific Advisors
    advisors: [
        {
            id: "",
            name: "",
            role: "Scientific Advisor",
            title: "Professor",
            initials: "",
            image: "",
            email: "",
            phone: "",
            office: "",
            website: "",
            scholar: "",
            github: "",
            linkedin: "",
            twitter: "",
            bio: "",
            research: [],
            education: [],
            awards: [],
            teaching: [],
            startYear: 2020,
            status: "active"
        }
    ],

    // Research Members
    members: [
        {
            id: "ntienhuy",
            name: "Nguyen Tien Huy",
            role: "Lab Leader",
            title: "PhD",
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
            startYear: 2019,
            status: "active",
            supervisor: "",
            graduationYear: null,
            currentPosition: ""
        },
        {
            id: "lttung",
            name: "Le Thanh Tung",
            role: "Key Member",
            title: "PhD",
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
            startYear: 2021,
            status: "active",
            supervisor: "",
            graduationYear: null,
            currentPosition: ""
        }
    ],

    // PhD Students
    phdStudents: [
        {
            id: "",
            name: "",
            role: "PhD Student",
            title: "PhD Candidate",
            initials: "",
            image: "",
            email: "",
            phone: "",
            office: "",
            website: "",
            scholar: "",
            github: "",
            linkedin: "",
            twitter: "",
            bio: "",
            research: [],
            education: [],
            awards: [],
            teaching: [],
            startYear: 2023,
            status: "active",
            supervisor: "Dr. Nguyen Tien Huy",
            graduationYear: 2027,
            currentPosition: ""
        }
    ],

    // Master's Students
    masterStudents: [
        {
            id: "",
            name: "",
            role: "Master's Student",
            title: "Master's Candidate",
            initials: "",
            image: "",
            email: "",
            phone: "",
            office: "",
            website: "",
            scholar: "",
            github: "",
            linkedin: "",
            twitter: "",
            bio: "",
            research: [],
            education: [],
            awards: [],
            startYear: 2024,
            status: "active",
            supervisor: "Dr. Le Thanh Tung",
            graduationYear: 2026,
            currentPosition: ""
        }
    ],

    // Undergraduate Students
    undergraduates: [
        {
            id: "",
            name: "",
            role: "Undergraduate Student",
            title: "Bachelor's Student",
            initials: "",
            image: "",
            email: "",
            phone: "",
            website: "",
            scholar: "",
            github: "",
            linkedin: "",
            twitter: "",
            bio: "",
            research: [],
            startYear: 2024,
            status: "",
            supervisor: "Dr. Nguyen Tien Huy",
            graduationYear: 2025,
            currentPosition: ""
        }
    ],

    // Alumni
    alumni: [
        {
            id: "",
            name: "",
            role: "Former PhD Student",
            title: "PhD",
            email: "",
            website: "",
            scholar: "",
            linkedin: "",
            startYear: 2018,
            status: "alumni",
            supervisor: "Dr. Nguyen Tien Huy",
            graduationYear: 2022,
            currentPosition: "Assistant Professor at XYZ University"
        }
    ],

    // Join Us Section
    opportunities: {
        title: "Join Our Team",
        description: "We're always looking for talented researchers and students passionate about AI. If you're interested in joining our lab, we'd love to hear from you!",
        openPositions: [
            {
                title: "Undergraduate Student Positions (Multiple)",
                deadline: "Open until filled",
                description: "Multiple positions available for undergraduate students interested in AI research, including Multilingual Visual Question Answering and Explainable AI (XAI).",
                requirements: [
                    "Basic knowledge of Machine Learning and Deep Learning",
                    "Proficiency in Python programming",
                    "Ability to read and understand English research papers",
                    "Proactive and eager to learn"
                ],
                link: "#"
            },
            {
                title: "Master's Student Positions (Multiple)",
                deadline: "Open until filled",
                description: "Multiple positions available for Master's students to research cutting-edge areas of AI, including Multilingual Visual Question Answering and Explainable AI (XAI).",
                requirements: [
                    "Solid knowledge of Machine Learning and Deep Learning",
                    "Experience in conducting research projects",
                    "Good programming skills, especially with AI frameworks like PyTorch/TensorFlow",
                    "Ability to read and synthesize complex research literature"
                ],
                link: "#"
            },
            {
                title: "PhD Positions (Multiple)",
                deadline: "Open until filled",
                description: "Multiple fully-funded PhD positions available to research cutting-edge areas of AI, including Multilingual Visual Question Answering and Explainable AI (XAI).",
                requirements: [
                    "Master's degree in Computer Science, Mathematics, or a related field",
                    "Prior research experience and publications",
                    "In-depth knowledge of Deep Learning and Large Language Models (LLMs)",
                    "Ability to conduct independent research and solve complex problems"
                ],
                link: "#"
            }
        ]
    }
};