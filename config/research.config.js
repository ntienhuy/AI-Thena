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

    
    // // Current Projects
    // projects: [
    //     {
    //         id: "athena",
    //         title: "Project Athena",
    //         status: "active",
    //         priority: "high",
    //         description: "Developing next-generation transformer architectures with 10x improved efficiency",
    //         longDescription: "This project aims to revolutionize transformer architectures by introducing novel attention mechanisms that scale linearly with sequence length while maintaining or improving performance.",
    //         startDate: "2024-01",
    //         endDate: "2025-12",
    //         progress: 45,
    //         funding: "$1.2M",
    //         fundingSource: "NSF",
    //         principalInvestigator: "Dr. Sarah Chen",
    //         teamSize: 8,
    //         tags: ["Deep Learning", "Transformers", "Efficiency"],
    //         publications: ["Efficient Transformers: A Survey", "Linear Attention Mechanisms"],
    //         partners: ["Google Research", "MIT CSAIL"],
    //         outcomes: [
    //             "3 published papers",
    //             "2 patent applications",
    //             "Open-source framework released"
    //         ]
    //     },
    //     {
    //         id: "minerva",
    //         title: "Project Minerva",
    //         status: "active",
    //         priority: "high",
    //         description: "Multi-modal learning for unified perception across vision, language, and audio",
    //         longDescription: "Creating a unified framework for processing and understanding information across multiple modalities, enabling AI systems to perceive the world more like humans do.",
    //         startDate: "2024-03",
    //         endDate: "2026-03",
    //         progress: 30,
    //         funding: "$800K",
    //         fundingSource: "DARPA",
    //         principalInvestigator: "Prof. John Smith",
    //         teamSize: 6,
    //         tags: ["Multi-modal", "Computer Vision", "NLP"],
    //         publications: ["Unified Multi-modal Transformers"],
    //         partners: ["Microsoft Research"],
    //         outcomes: [
    //             "Novel architecture design",
    //             "State-of-the-art results on 5 benchmarks"
    //         ]
    //     },
    //     {
    //         id: "apollo",
    //         title: "Project Apollo",
    //         status: "active",
    //         priority: "medium",
    //         description: "Safe reinforcement learning for autonomous vehicle navigation",
    //         longDescription: "Developing safe and robust RL algorithms for autonomous driving, with formal safety guarantees and real-world testing.",
    //         startDate: "2023-06",
    //         endDate: "2025-06",
    //         progress: 65,
    //         funding: "$1.5M",
    //         fundingSource: "Toyota Research",
    //         principalInvestigator: "Dr. Maria Garcia",
    //         teamSize: 10,
    //         tags: ["RL", "Robotics", "Safety"],
    //         publications: ["Safe Exploration in Continuous Action Spaces"],
    //         partners: ["Toyota Research", "Waymo"],
    //         outcomes: [
    //             "Safety-certified RL framework",
    //             "Successful real-world trials"
    //         ]
    //     },
    //     {
    //         id: "hermes",
    //         title: "Project Hermes",
    //         status: "planning",
    //         priority: "high",
    //         description: "Federated learning framework for privacy-preserving medical AI",
    //         longDescription: "Building a federated learning platform that enables training on distributed medical data while preserving patient privacy.",
    //         startDate: "2025-01",
    //         endDate: "2027-12",
    //         progress: 10,
    //         funding: "$2M",
    //         fundingSource: "NIH",
    //         principalInvestigator: "Dr. Alex Johnson",
    //         teamSize: 12,
    //         tags: ["Privacy", "Medical AI", "Federated Learning"],
    //         publications: [],
    //         partners: ["Mayo Clinic", "Johns Hopkins"],
    //         outcomes: []
    //     },
    //     {
    //         id: "zeus",
    //         title: "Project Zeus",
    //         status: "completed",
    //         priority: "low",
    //         description: "Large-scale pretraining for domain-specific language models",
    //         longDescription: "Successfully developed and deployed domain-specific language models for scientific literature, achieving state-of-the-art performance.",
    //         startDate: "2023-01",
    //         endDate: "2024-12",
    //         progress: 100,
    //         funding: "$500K",
    //         fundingSource: "Internal",
    //         principalInvestigator: "Prof. Lisa Wang",
    //         teamSize: 4,
    //         tags: ["NLP", "Pretraining", "Domain Adaptation"],
    //         publications: ["SciBERT: A Pretrained Language Model for Scientific Text"],
    //         partners: ["Allen Institute for AI"],
    //         outcomes: [
    //             "Released 3 pretrained models",
    //             "20K+ downloads",
    //             "Used by 50+ research groups"
    //         ]
    //     }
    // ],
    
    // // Collaborations
    // collaborations: {
    //     academic: [
    //         {
    //             name: "MIT CSAIL",
    //             logo: "images/partners/mit.png",
    //             url: "https://csail.mit.edu",
    //             description: "Computer vision and robotics research",
    //             projects: ["Project Athena", "3D Vision"],
    //             since: 2018
    //         },
    //         {
    //             name: "Stanford AI Lab",
    //             logo: "images/partners/stanford.png",
    //             url: "https://ai.stanford.edu",
    //             description: "Natural language processing and deep learning",
    //             projects: ["Multilingual NLP", "Project Minerva"],
    //             since: 2019
    //         },
    //         {
    //             name: "UC Berkeley BAIR",
    //             logo: "images/partners/berkeley.png",
    //             url: "https://bair.berkeley.edu",
    //             description: "Reinforcement learning and robotics",
    //             projects: ["Project Apollo", "Multi-Agent RL"],
    //             since: 2020
    //         },
    //         {
    //             name: "Oxford ML Research",
    //             logo: "images/partners/oxford.png",
    //             url: "#",
    //             description: "AI safety and alignment research",
    //             projects: ["AI Safety Framework"],
    //             since: 2021
    //         },
    //         {
    //             name: "Carnegie Mellon LTI",
    //             logo: "images/partners/cmu.png",
    //             url: "#",
    //             description: "Language technologies and speech processing",
    //             projects: ["Speech Recognition", "Dialog Systems"],
    //             since: 2017
    //         }
    //     ],
    //     industry: [
    //         {
    //             name: "Google Research",
    //             logo: "images/partners/google.png",
    //             url: "#",
    //             description: "Large language models and efficient AI",
    //             projects: ["Project Athena", "Efficient Transformers"],
    //             since: 2019,
    //             funding: "$2M"
    //         },
    //         {
    //             name: "Microsoft Research",
    //             logo: "images/partners/microsoft.png",
    //             url: "#",
    //             description: "Multi-modal learning and cloud AI",
    //             projects: ["Project Minerva", "Azure ML Integration"],
    //             since: 2020,
    //             funding: "$1.5M"
    //         },
    //         {
    //             name: "NVIDIA AI",
    //             logo: "images/partners/nvidia.png",
    //             url: "#",
    //             description: "GPU optimization and efficient computing",
    //             projects: ["Green AI", "Model Acceleration"],
    //             since: 2018,
    //             funding: "$800K"
    //         },
    //         {
    //             name: "OpenAI",
    //             logo: "images/partners/openai.png",
    //             url: "#",
    //             description: "AI safety and alignment research",
    //             projects: ["Safety Benchmarks", "Value Alignment"],
    //             since: 2022,
    //             funding: "$500K"
    //         },
    //         {
    //             name: "Meta AI",
    //             logo: "images/partners/meta.png",
    //             url: "#",
    //             description: "Computer vision and social AI",
    //             projects: ["3D Understanding", "Social Intelligence"],
    //             since: 2021,
    //             funding: "$1M"
    //         }
    //     ]
    // },
    
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