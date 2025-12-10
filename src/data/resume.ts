export const profile = {
  name: 'Aditya Raj',
  title: 'AI Engineer',
  tagline:
    'Result-driven AI Engineer specializing in LLMs, Transformers, and VLMs for robotics and healthcare applications.',
  location: 'India',
  email: 'ms.adityaraj@gmail.com',
  phone: '+91-7543037822',
  linkedin: 'https://www.linkedin.com/in/aditya-raj-aadi0032007/',
  github: 'https://github.com/Aadi0032007'
};

export const summary = [
  'AI Engineer with a strong interdisciplinary focus at the nexus of machine learning, robotics, and healthcare innovation. Experienced in advancing Large Language Models (LLMs), Transformers, and Vision-Language Models (VLMs) to enable robots that perceive, reason, and interact in human-centered environments.',
  'Skilled in designing agentic frameworks that orchestrate multi-modal perception and dialogue, facilitating intuitive and context-aware human-robot collaboration. Background spans prototyping computer vision pipelines for perception and scene understanding, optimizing GPU-accelerated training environments, and building reproducible ML workflows on Azure ML Studio, WandB, and MLFlow.',
  'Motivated by the potential of AI in healthcare, exploring how robotics and multimodal intelligence can augment diagnostics, enhance assistive technologies, and improve patient care outcomes. Combining research rigor with practical deployment to translate state-of-the-art advances in AI into transformative real-world systems.'
];

export const experience = [
  {
    title: 'AI Engineer',
    company: 'Revobots',
    location: 'USA, Remote',
    period: 'Nov 2023 - Present',
    focus:
      'Developing and deploying AI solutions with a focus on machine learning, optimizing neural networks, and managing GPU environments for robot control systems.',
    achievements: [
      'Engineered multi-agent conversational pipelines utilizing LangChain for dynamic context management and coherent human-robot interactions.',
      'Architected Transformer-based models for robotic perception/NLP, optimizing inference latency and accuracy through quantization and model pruning.',
      'Developed and managed end-to-end ML pipelines with Python and PyTorch, incorporating data acquisition, preprocessing, model training, validation, versioning, and deployment.',
      'Leveraged WandB and MLFlow for experiment tracking and checkpoint/version control within the ML pipeline.',
      'Administered and optimized GPU-backed environments, ensuring CUDA/cuDNN/driver compatibility under Ubuntu/Conda for maximum throughput and memory efficiency.',
      'Designed scalable, modular architectures for robot control/decision systems, integrating agentic workflows with perception, planning, and control modules via API interfaces.',
      'Enhanced conversational pipeline coherence through strategic implementation of dynamic context management, memory, and fallback strategies.',
      'Improved AI model performance through optimization of Transformer-based models, leveraging quantization and model pruning techniques.',
      'Streamlined software development operations by reducing time to market through reliable data acquisition, preprocessing, model training, validation, versioning, and deployment processes.'
    ]
  },
  {
    title: 'Software Developer',
    company: 'Sapiens',
    location: 'Bengaluru, India',
    period: 'Jan 2023 - Oct 2023',
    focus:
      'Responsible for software development and issue resolution within insurance products, utilizing Java (EJB) on the IDIT platform.',
    achievements: [
      'Developed software solutions for insurance products using Java (EJB) on the IDIT 17.0 platform.',
      'Contributed to a European project involving the implementation of insurance software.',
      'Addressed and resolved 18 software-related tickets during the project deployment phase, reducing risk of delays and improving efficiency.'
    ]
  },
  {
    title: 'AI Engineer Intern',
    company: 'Intel Corporation',
    location: 'Bengaluru, India',
    period: 'Mar 2022 - Dec 2022',
    focus:
      'Researching, developing, and deploying 3D point-cloud segmentation models and pipelines using Azure and Docker.',
    achievements: [
      'Conducted research and developed a 3D point-cloud segmentation model in collaboration with a team, achieving 96% accuracy and 92% mean IoU.',
      'Engineered an end-to-end pipeline for 3D ML functionality on Azure and containerized deployments with Docker to AKS.',
      'Improved efficiency of implementation by designing cloud-native training and deployment flows that met project deadlines.'
    ]
  },
  {
    title: 'AI Intern',
    company: 'RayReach Technologies',
    location: 'Remote',
    period: 'May 2021 - Aug 2021',
    focus:
      'Training object detection models, managing data acquisition, and implementing notification systems utilizing YOLO and CCTV technologies.',
    achievements: [
      'Trained YOLO v3/v4 models for object detection with centralized CCTV data acquisition.',
      'Implemented notification generation based on object detection results with an accompanying image library for model improvement.',
      'Automated detection pipelines to deliver faster insights and more accessible real-time data.'
    ]
  }
];

export const projects = [
  {
    title: 'Patient Monitoring Robot (Oregon State University)',
    description:
      'AI-integrated mobile robot designed for enhanced patient care and monitoring with navigation, sensing, and data analysis.',
    details: [
      'Implemented AI algorithms to improve real-time data collection and personalized care insights.',
      "Focused on navigation system design to ensure smooth movement within healthcare environments and clinical corridors.",
      'Contributed to the development of a mobile solution focused on patient monitoring across dynamic indoor spaces.'
    ],
    tech: ['Navigation systems', 'Real-time analysis'],
    linkLabel: 'Portfolio',
    linkUrl: 'https://pmr-osu.github.io/'
  },
  {
    title: '3D Object Detection & Segmentation (Autonomous Driving)',
    description:
      'Advanced 3D machine learning pipeline focused on object detection and segmentation for autonomous vehicle perception.',
    details: [
      "Model training and development to accurately extract relevant information from autonomous vehicle peripherals using the Kitti dataset.",
      'Improved system efficiency by upgrading detection and segmentation accuracy on existing AV stacks.'
    ],
    tech: ['3D Machine Learning', 'Segmentation']
  },
  {
    title: 'Chest X-Ray Infection Analysis',
    description: 'U-Net segmentation model for medical imaging to mark infection areas and percentage for COVID-19 & Pneumonia.',
    details: [
      'Processed and analyzed over 12k pre-processed images from Qatar University dataset.',
      'Achieved a mean IoU of 94% in accurately highlighting infectious areas and lung damage percentages.'
    ],
    tech: ['12k images processed', '94% Mean IoU'],
    linkLabel: 'Results',
    linkUrl: 'https://drive.google.com/drive/folders/14V-x_i9ZHS2Qapu47nTWBvNFhCHMUgTa'
  },
  {
    title: 'Impregnable Healthcare IoT Ecosystem',
    description:
      'Secure healthcare ecosystem integrating AI and Blockchain with IoT-based machine learning and end-to-end APIs.',
    details: [
      'Collaborated with a team of 3 to design and build an IoT healthcare ecosystem using blockchain for privacy and efficiency.',
      'Implemented AI functionalities to automate data collection, security maintenance, risk assessment, and e-report generation.'
    ],
    tech: ['Blockchain', 'IoT', 'End-to-end APIs'],
    linkLabel: 'GitHub',
    linkUrl: 'https://github.com/m-a-rahul/IHE-Models'
  },
  {
    title: 'Hand Gesture Control for AR/VR',
    description: 'Real-time hand gesture interpretation to control remote robots and AR objects using Google\'s Mediapipe.',
    details: [
      'Integrated hand geometry to improve accessibility of a remote functioning robot.',
      "Combined hand geometry, Google’s Mediapipe, and remote functions to establish responsive AR/VR interactions." 
    ],
    linkLabel: 'GitHub',
    linkUrl: 'https://github.com/Capstone-Self-Learning-Robotic-System'
  },
  {
    title: 'AI Recycling Robotics',
    description: 'AI-enabled recycling system exploring robotics and perception for sustainable automation.',
    details: ['Explored robotic perception to sort and manage recyclables with AI-driven policies.'],
    linkLabel: 'GitHub',
    linkUrl: 'https://github.com/osu-ai-recycling/ai-recycling/tree/main'
  }
];

export const skills = {
  technical: [
    'Python',
    'PyTorch',
    'TensorFlow',
    'LangChain',
    'LLM',
    'Azure',
    'Docker',
    '3D-Machine Learning',
    'Git',
    'Hugging Face'
  ],
  soft: ['Problem-solving', 'Collaboration', 'Communication', 'Adaptability', 'Time management'],
  competencies: [
    'Machine Learning Pipeline Development',
    'AI Model Architecture & Optimization',
    'Cloud-Based AI Solution Deployment',
    'Robotics Perception & NLP',
    'Data Acquisition & Preprocessing'
  ],
  awards: [
    '2nd All India Rank in Flipkart Grid 4.0 Competition.',
    'Authored Publication on AI Healthcare in Springer (https://link.springer.com/chapter/10.1007/978-981-19-5191-6_24).'
  ]
};

export const extraLinks = [
  { label: 'Research paper', url: 'https://link.springer.com/chapter/10.1007/978-981-19-5191-6_24' },
  { label: 'Flipkart Grid 4.0 runners up', url: 'https://www.instagram.com/p/CkAvMk6JTEs/?igsh=NWl3ODZyd2VhNmVq' },
  { label: 'Patient monitoring project', url: 'https://github.com/schofija/patient-monitoring/tree/master?tab=readme-ov-file' },
  { label: 'PMR portfolio', url: 'https://pmr-osu.github.io/' },
  { label: 'AI recycling project', url: 'https://github.com/osu-ai-recycling/ai-recycling/tree/main' },
  { label: 'Robotic AI with AR project', url: 'https://github.com/Capstone-Self-Learning-Robotic-System' },
  { label: 'Lung Infection project results', url: 'https://drive.google.com/drive/folders/14V-x_i9ZHS2Qapu47nTWBvNFhCHMUgTa' }
];
