// ===== CONTACT PAGE CONFIGURATION =====

const CONFIG_CONTACT = {
    // Page Header
    pageTitle: "Contact Us",
    pageSubtitle: "Get in touch with our team",
    
    // Primary Contact Information
    primary: {
        email: "info@ai-thena-lab.edu",
        phone: "+1 (555) 123-4567",
        fax: "+1 (555) 123-4568",
        address: {
            line1: "AI-THENA Lab",
            line2: "Faculty of Information Technology",
            line3: "University of Science, Vietnam National University, Ho Chi Minh City",
            street: "227 Nguyen Van Cu, Cho Quan Ward, District 5",
            city: "Ho Chi Minh City",
            // state: "TC",
            // zip: "12345",
            country: "Viet Nam"
        },
        // coordinates: {
        //     lat: 37.4419,
        //     lng: -122.1430
        // }
    },
    
    // Office Hours
    officeHours: {
        regular: {
            monday: "9:00 AM - 5:00 PM",
            tuesday: "9:00 AM - 5:00 PM",
            wednesday: "9:00 AM - 5:00 PM",
            thursday: "9:00 AM - 5:00 PM",
            friday: "9:00 AM - 5:00 PM",
            saturday: "Closed",
            sunday: "Closed"
        },
        labAccess: "24/7 for authorized personnel",
        holidays: "Closed on university holidays"
    },
    
    // Social Media & Online Presence
    social: {
        twitter: "https://twitter.com/ai_thena_lab",
        linkedin: "https://linkedin.com/company/ai-thena-lab",
        github: "https://github.com/ai-thena",
        youtube: "https://youtube.com/@ai-thena-lab",
        medium: "https://medium.com/@ai-thena-lab"
    },
    
    // Contact Form Configuration
    form: {
        enabled: true,
        subjects: [
            { value: "", label: "Select a subject" },
            { value: "collaboration", label: "Research Collaboration" },
            { value: "positions", label: "Open Positions" },
            { value: "prospective", label: "Prospective Student" },
            { value: "media", label: "Media Inquiry" },
            { value: "industry", label: "Industry Partnership" },
            { value: "general", label: "General Inquiry" },
            { value: "technical", label: "Technical Support" },
            { value: "other", label: "Other" }
        ],
        requiredFields: ["name", "email", "subject", "message"],
        maxMessageLength: 2000,
        successMessage: "Thank you for your message! We will get back to you within 2-3 business days.",
        errorMessage: "There was an error sending your message. Please try again or email us directly."
    },
    
    // Key Contacts
    keyContacts: [
        {
            category: "Lab Administration",
            contacts: [
                {
                    name: "Dr. Sarah Chen",
                    role: "Lab Director",
                    email: "s.chen@university.edu",
                    phone: "+1 (555) 123-4567",
                    office: "CSB 301",
                    hours: "By appointment"
                },
                {
                    name: "Jennifer Adams",
                    role: "Lab Manager",
                    email: "j.adams@university.edu",
                    phone: "+1 (555) 123-4570",
                    office: "CSB 200",
                    hours: "Mon-Fri 9AM-5PM"
                }
            ]
        },
        {
            category: "Research Inquiries",
            contacts: [
                {
                    name: "Prof. John Smith",
                    role: "Associate Director",
                    email: "j.smith@university.edu",
                    area: "Natural Language Processing"
                },
                {
                    name: "Dr. Maria Garcia",
                    role: "Computer Vision Lead",
                    email: "m.garcia@university.edu",
                    area: "Computer Vision & 3D Understanding"
                },
                {
                    name: "Dr. Alex Johnson",
                    role: "RL Group Lead",
                    email: "a.johnson@university.edu",
                    area: "Reinforcement Learning & Robotics"
                }
            ]
        },
        {
            category: "Student Affairs",
            contacts: [
                {
                    name: "Graduate Admissions",
                    email: "grad-admissions@university.edu",
                    phone: "+1 (555) 123-4444",
                    description: "For PhD and MS program inquiries"
                },
                {
                    name: "Undergraduate Research",
                    email: "undergrad-research@university.edu",
                    description: "For undergraduate research opportunities"
                }
            ]
        }
    ],
    
    // Opportunities Section
    opportunities: [
        {
            title: "PhD Positions",
            icon: "🎓",
            description: "We're looking for motivated PhD students to join our research team. Full funding available for qualified candidates.",
            link: "#phd-positions",
            deadline: "December 15, 2024",
            status: "open"
        },
        {
            title: "Postdoc Positions",
            icon: "👨‍🔬",
            description: "Multiple postdoctoral positions available in NLP, Computer Vision, and Reinforcement Learning.",
            link: "#postdoc-positions",
            deadline: "Open until filled",
            status: "open"
        },
        {
            title: "Visiting Researchers",
            icon: "🌍",
            description: "We welcome visiting researchers and scholars for collaborative projects and knowledge exchange.",
            link: "#visiting",
            deadline: "Rolling basis",
            status: "open"
        },
        {
            title: "Industry Collaboration",
            icon: "🤝",
            description: "Partner with us on cutting-edge AI research projects and technology transfer opportunities.",
            link: "#industry",
            deadline: "Always open",
            status: "open"
        },
        {
            title: "Summer Internships",
            icon: "☀️",
            description: "Summer research internships for undergraduate and graduate students.",
            link: "#internships",
            deadline: "March 1, 2025",
            status: "upcoming"
        },
        {
            title: "Research Engineer",
            icon: "💻",
            description: "Full-time position to support research infrastructure and software development.",
            link: "#engineer",
            deadline: "Open until filled",
            status: "open"
        }
    ],
    
    // FAQ Section
    faq: [
        {
            question: "How can I apply for a PhD position?",
            answer: "PhD applications are processed through the university's graduate admissions system. The application deadline is December 15 for Fall admission. Please visit the graduate school website for detailed application requirements. We encourage you to contact potential advisors before applying."
        },
        {
            question: "Do you offer internship opportunities?",
            answer: "Yes, we offer summer internship programs for both undergraduate and graduate students. Applications typically open in January for the following summer. Selected interns work closely with our research teams on cutting-edge projects."
        },
        {
            question: "Can I visit the lab?",
            answer: "We welcome visitors! Please contact us at least two weeks in advance to schedule a lab tour. We regularly host prospective students, collaborators, and industry partners. Tours typically last 1-2 hours and include demonstrations of our research."
        },
        {
            question: "How can I collaborate with your lab?",
            answer: "We're always open to collaboration opportunities. Please send a detailed proposal outlining your research interests, potential collaboration areas, and expected outcomes to our lab director. We're particularly interested in interdisciplinary collaborations."
        },
        {
            question: "Do you have funding for international students?",
            answer: "Yes, we provide full funding (tuition + stipend) for all admitted PhD students, regardless of nationality. The funding typically includes teaching or research assistantships. International students should check visa requirements early."
        },
        {
            question: "What programming languages should I know?",
            answer: "Most of our research uses Python with deep learning frameworks like PyTorch and TensorFlow. Familiarity with C++, CUDA, and JavaScript is beneficial for certain projects. We provide training for specialized tools."
        },
        {
            question: "Can undergraduate students join research projects?",
            answer: "Absolutely! We encourage motivated undergraduate students to participate in research. You can join through independent study courses, summer programs, or as research assistants. Contact faculty members whose research interests align with yours."
        },
        {
            question: "What computational resources are available?",
            answer: "Our lab has access to a state-of-the-art GPU cluster with 256 NVIDIA A100 GPUs, plus dedicated workstations for each researcher. We also have cloud computing credits for large-scale experiments."
        },
        {
            question: "How often do you publish research?",
            answer: "Our lab publishes 30-40 papers annually at top-tier venues like NeurIPS, ICML, CVPR, and ACL. PhD students typically publish 2-3 papers per year. We strongly encourage open science and release code for most projects."
        },
        {
            question: "Do you offer remote positions?",
            answer: "While we prefer in-person collaboration for the best research experience, we do offer hybrid arrangements for certain positions. Postdocs and visiting researchers may have more flexibility. Please discuss specific arrangements during the application process."
        }
    ],
    
    // Directions & Parking
    directions: {
        fromAirport: {
            name: "Tech City International Airport (TCI)",
            distance: "15 miles",
            time: "25 minutes",
            instructions: "Take Highway 101 North to University Exit. Turn right on Innovation Drive. The Computer Science Building is on your left."
        },
        parking: {
            visitor: "Visitor parking is available in Lot C near the Computer Science Building. Daily permits can be purchased at the kiosk.",
            rate: "$5/hour or $20/day",
            accessible: "Accessible parking spaces are available near all building entrances."
        },
        publicTransit: {
            bus: "Bus lines 23 and 45 stop at the University Transit Center",
            train: "Light rail Blue Line to University Station, then 10-minute walk",
            shuttle: "Free campus shuttle runs every 15 minutes during academic sessions"
        }
    },
    
    // Map Configuration
    map: {
        enabled: true,
        provider: "google", // google, mapbox, openstreetmap
        zoom: 16,
        markerTitle: "AI-THENA Lab",
        style: "roadmap" // roadmap, satellite, hybrid, terrain
    },
    
    // Newsletter Signup
    newsletter: {
        enabled: true,
        title: "Stay Updated",
        description: "Subscribe to our newsletter for the latest research updates, publications, and opportunities.",
        frequency: "Monthly",
        placeholder: "Enter your email address",
        buttonText: "Subscribe",
        successMessage: "Thank you for subscribing! Please check your email to confirm.",
        privacyNote: "We respect your privacy and will never share your information."
    },
    
    // Emergency Contacts
    emergency: {
        campusSecurity: "+1 (555) 911-1111",
        buildingMaintenance: "+1 (555) 123-5555",
        itSupport: "+1 (555) 123-4545"
    }
};