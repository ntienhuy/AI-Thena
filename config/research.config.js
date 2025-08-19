// ===== RESEARCH PAGE CONFIGURATION =====

const CONFIG_RESEARCH = {
    // Page Header
    pageTitle: "Our Research",
    pageSubtitle: "Exploring the frontiers of artificial intelligence",

    // Research Overview
    overview: {
        title: "Research Overview",
        description: "Our lab focuses on cutting-edge research in artificial intelligence, combining theoretical foundations with practical applications to solve real-world problems. We believe in interdisciplinary collaboration and open science principles.",
        stats: {
            activeProjects: 12,
            completedProjects: 45,
            industryCollaborations: 20,
            researchGrants: "$5M+"
        }
    },

    // Research Areas
    areas: [
        {
            id: "mmke",
            icon: "🧩",
            title: "Multimodal Knowledge Modeling",
            shortDescription: "Modeling knowledge from multiple modalities such as images, text, and audio",
            fullDescription: "Our research focuses on building robust multimodal knowledge representations that integrate diverse data sources, including images, text, and audio. By leveraging cross-modal relationships, we aim to create unified knowledge models that enhance reasoning, retrieval, and understanding across domains.",
            keywords: ["Multimodal Learning", "Knowledge Representation", "Cross-Modal Reasoning", "Information Fusion"],
            leadResearcher: "",
            publications: 0,
            projects: [],
            image: "images/research/mmke.jpg"
        },
        {
            id: "mmpm",
            icon: "📊",
            title: "Multimodal Predictive Modeling",
            shortDescription: "Predictive modeling from multimodal data sources like text, images, and audio",
            fullDescription: "We develop predictive models that utilize multimodal data to improve accuracy, robustness, and interpretability. Our work includes designing architectures capable of fusing textual, visual, and auditory inputs for tasks such as classification, forecasting, and decision support in real-world scenarios.",
            keywords: ["Multimodal Prediction", "Data Fusion", "Deep Learning", "Cross-Modal Modeling"],
            leadResearcher: "",
            publications: 0,
            projects: [],
            image: "images/research/mmpm.jpg"
        },
        {
            id: "xai",
            icon: "🔍",
            title: "Explainable AI",
            shortDescription: "Developing AI models that are transparent and interpretable",
            fullDescription: "Our research investigates methods to make AI systems more explainable and trustworthy. We focus on techniques for visualizing model decision processes, generating human-understandable explanations, and ensuring AI transparency without sacrificing performance.",
            keywords: ["Interpretability", "Transparency", "Model Explainability", "Trustworthy AI"],
            leadResearcher: "",
            publications: 0,
            projects: [],
            image: "images/research/xai.jpg"
        }
    ],


    // Current Projects
    projects:
        [
            {
                "id": "1",
                "title": "Predicting the ability to answer visual questions for the visually impaired using a Residual Attention model",
                "status": "completed",
                "priority": "high",
                "description": "Research on predicting the ability of visually impaired individuals to answer visual questions using a Residual Attention model.",
                "startDate": "2022-05",
                "endDate": "2023-05",
                "fundingSource": "Ho Chi Minh City University of Science, VNU-HCM",
                "principalInvestigator": "Le Thanh Tung",
                
            },
            {
                "id": "2",
                "title": "Answering Vietnamese visual questions using a pre-trained vision-language model",
                "status": "completed",
                "priority": "high",
                "description": "Developing a model to answer visual questions in Vietnamese, leveraging pre-trained vision-language models.",
                "startDate": "2023-06",
                "endDate": "2024-06",
                "fundingSource": "Ho Chi Minh City University of Science, VNU-HCM",
                "principalInvestigator": "Le Thanh Tung",
                
            },
            {
                "id": "3",
                "title": "Voice authentication on mobile devices using Knowledge Distillation",
                "status": "completed",
                "priority": "medium",
                "description": "Research on voice authentication on mobile devices by applying the Knowledge Distillation technique.",
                "startDate": "2022-11",
                "endDate": "2025-01",
                "fundingSource": "Ho Chi Minh City University of Science, VNU-HCM",
                "principalInvestigator": "Nguyen Tien Huy",
              
            },
            {
                "id": "4",
                "title": "Integrating local and global features in a Vietnamese visual question answering model",
                "status": "completed",
                "priority": "high",
                "description": "Research and development of a Vietnamese visual question answering model by integrating local and global features.",
                "startDate": "2024-07",
                "endDate": "2025-07",
                "fundingSource": "Ho Chi Minh City University of Science, VNU-HCM",
                "principalInvestigator": "Le Thanh Tung",
                
            },
            {
                "id": "5",
                "title": "A Vietnamese visual question answering system using a Vietnamese-English mapping mechanism integrated with large language model queries",
                "status": "in_progress",
                "priority": "high",
                "description": "Building a Vietnamese visual question answering system using a Vietnamese-English mapping mechanism and integrating queries with large language models.",
                "startDate": "2025-02",
                "endDate": "2027-02",
                "fundingSource": "Vietnam National University, Ho Chi Minh City",
                "principalInvestigator": "Le Thanh Tung"
            },
            {
                "id": "6",
                "title": "An explainable artificial intelligence model for text classification and question answering tasks",
                "status": "in_progress",
                "priority": "medium",
                "description": "Researching an explainable AI model for text classification and question answering tasks.",
                "startDate": "2025-02",
                "endDate": "2027-02",
                "fundingSource": "Vietnam National University, Ho Chi Minh City",
                "principalInvestigator": "Nguyen Tien Huy"
            },
            {
                "id": "7",
                "title": "A study on Multimodal and Multilingual Automated Fact Check and Reducing Hallucination in LLMs with Direct Preference Optimization",
                "status": "in_progress",
                "priority": "high",
                "description": "Research on multimodal and multilingual automated fact checking and reducing 'hallucination' in LLMs using Direct Preference Optimization.",
                "startDate": "2024-08",
                "endDate": "2026-08",
                "fundingSource": "Asian Office of Aerospace Research and Development",
                "principalInvestigator": "Nguyen Tien Huy"
            }
        ],

    // Collaborations
    collaborations: {
        academic: [
            {
                name: "MIT CSAIL",
                logo: "images/partners/mit.png",
                url: "https://csail.mit.edu",
                description: "Computer vision and robotics research",
                projects: ["Project Athena", "3D Vision"],
                since: 2018
            },
        ],
        industry: [
            {
                name: "Google Research",
                logo: "images/partners/google.png",
                url: "#",
                description: "Large language models and efficient AI",
                projects: ["Project Athena", "Efficient Transformers"],
                since: 2019,
                funding: "$2M"
            },
        ]
    },

    // // Research Resources
    // resources: {
    //     facilities: [
    //         {
    //             name: "GPU Cluster",
    //             description: "256 NVIDIA A100 GPUs for large-scale training",
    //             icon: "🖥️"
    //         },
    //         {
    //             name: "Robotics Lab",
    //             description: "State-of-the-art robotics testing facility",
    //             icon: "🤖"
    //         },
    //         {
    //             name: "VR/AR Lab",
    //             description: "Equipment for immersive AI research",
    //             icon: "🥽"
    //         }
    //     ],
    //     datasets: [
    //         {
    //             name: "AI-THENA Vision Dataset",
    //             size: "10M images",
    //             description: "Annotated images for computer vision research",
    //             link: "#"
    //         },
    //         {
    //             name: "Multilingual Corpus",
    //             size: "100B tokens",
    //             description: "Text data in 50+ languages",
    //             link: "#"
    //         }
    //     ],
    //     software: [
    //         {
    //             name: "THENA-ML Framework",
    //             description: "Our open-source deep learning framework",
    //             stars: 2500,
    //             link: "https://github.com/ai-thena/thena-ml"
    //         },
    //         {
    //             name: "AutoML Toolkit",
    //             description: "Tools for automated machine learning",
    //             stars: 1800,
    //             link: "https://github.com/ai-thena/automl"
    //         }
    //     ]
    // }
};