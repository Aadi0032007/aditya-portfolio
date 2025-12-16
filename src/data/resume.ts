export const profile = {
  name: 'Aditya Raj',
  title: 'AI Engineer',
  tagline:
    'Result driven AI Engineer specializing in LLMs, Transformers, and Vision-Language Models (VLMs) for robotics and healthcare applications.',
  location: 'India',
  email: 'ms.adityaraj@gmail.com',
  phone: '+91-7543037822',
  linkedin: 'https://www.linkedin.com/in/aditya-raj-aadi0032007/',
  github: 'https://github.com/Aadi0032007',
  imageUrl: '/images/me-professional.jpg',
  aboutImage: '/images/me-casual.png'
};

export const summary = [
  'AI Engineer with a strong interdisciplinary focus at the nexus of machine learning, robotics, and healthcare innovation. Experienced in advancing Large Language Models (LLMs), Transformers, and Vision-Language Models (VLMs) to enable robots that perceive, reason, and interact in human-centered environments. Skilled in designing agentic frameworks that orchestrate multi-modal perception and dialogue, facilitating intuitive and context-aware human-robot collaboration.',
  'My background spans applied research and scalable engineering: from prototyping computer vision pipelines for perception and scene understanding, to optimizing GPU-accelerated training environments and building reproducible ML workflows on Azure ML Studio, WandB, and MLFlow. At Revobots, I contributed to the creation of inter-conversational robotic agents, while earlier at Intel I drove efficiency in 3D-ML pipelines on cloud platforms.',
  'Deeply motivated by the potential of AI in healthcare, I explore how robotics and multimodal intelligence can augment diagnostics, enhance assistive technologies, and improve patient care outcomes. Combining research rigor with practical deployment, I aim to translate state-of-the-art advances in AI into transformative real-world systems.'
];

export const experience = [
  {
    title: 'AI Engineer',
    company: 'Revobots',
    location: 'USA, Remote',
    period: 'Nov 2023 - Present',
    focus:
      'Responsible for developing and deploying AI solutions with a focus on machine learning, optimizing neural networks, and managing GPU environments for robot control systems.',
    achievements: [
      'Engineered multi-agent conversational pipelines utilizing LangChain for dynamic context management and coherent human-robot interactions.',
      'Architected Transformer-based models for robotic perception/NLP, optimizing inference latency and accuracy through quantization and model pruning techniques.',
      'Developed and managed end-to-end ML pipelines with Python and PyTorch, incorporating data acquisition, preprocessing, model training, validation, versioning, and deployment.',
      'Leveraged WandB and MLFlow for experiment tracking and checkpoint/version control within the ML pipeline.',
      'Administered and optimized GPU-backed environments, ensuring CUDA/cuDNN/driver compatibility under Ubuntu/Conda for maximum throughput and memory efficiency.',
      'Designed scalable, modular architectures for robot control/decision systems, integrating agentic workflows with perception, planning, and control modules via API interfaces.',
      'Enhanced conversational pipeline coherence through strategic implementation of dynamic context management, memory, and fallback strategies, enabling more natural interactions between human users and robotic agents.',
      'Improved AI model performance through optimization of Transformer-based models, leveraging quantization and model pruning techniques, improving inference latency and accuracy specifically for robotic perception and NLP tasks.',
      'Streamlined software development operations, and reduced the overall time to market by employing data acquisition, preprocessing, model training, validation, versioning, and deployment processes that reduced AI pipeline errors.',
      'Enhanced team collaboration and ensured data validity during the implementation of PyTorch for experiment tracking and checkpoint/version control to decrease the likelihood of mismatched data during deployment.'
    ]
  },
  {
    title: 'Software Developer',
    company: 'Sapiens',
    location: 'Bengaluru, India',
    period: 'Jan 2023 - Oct 2023',
    focus:
      'Responsible for software development and issue resolution within the context of insurance products, utilizing Java and the IDIT platform.',
    achievements: [
      'Developed software solutions for insurance products using Java (EJB) on the IDIT 17.0 platform.',
      'Contributed to a European project involving the implementation of insurance software.',
      'Addressed and resolved 18 software-related tickets during the project deployment phase.',
      'Played a key role in troubleshooting software implementation errors, facilitated a smooth implementation process, by resolving 18 tickets, contributing to a seamless deployment of the software product.',
      'Reduced the risk of project delays, streamlined the project workflow, improved overall resource allocation and enhanced operational efficiency by resolving implementation problems in a cost- and time-effective manner.'
    ]
  },
  {
    title: 'AI Engineer Intern',
    company: 'Intel Corporation',
    location: 'Bengaluru, India',
    period: 'Mar 2022 - Dec 2022',
    focus:
      'Responsible for researching, developing, and deploying 3D point-cloud segmentation models and pipelines using Azure and Docker.',
    achievements: [
      'Conducted research and developed a 3D point-cloud segmentation model in collaboration with a team.',
      'Engineered an end-to-end pipeline for the model, facilitating 3D Machine Learning functionality on Azure.',
      'Containerized the model using Docker and deployed it on Azure Kubernetes Services (AKS).',
      'Achieved a 3D point-cloud segmentation model with an accuracy of 96% and a mean Intersection over Union (mIoU) of 92%, contributing to improved performance.',
      'Improved the efficiency of the implementation process by researching and implementing a suitable Azure end-to-end pipeline.',
      'Contributed to the achievement of project deadlines by using Docker to containerize the model and deploying it on Azure Kubernetes Services (AKS).'
    ]
  },
  {
    title: 'AI Intern',
    company: 'RayReach Technologies',
    location: '',
    period: 'May 2021 - Aug 2021',
    focus:
      'Responsible for training object detection models, managing data acquisition, and implementing notification systems utilizing Yolo and CCTV technologies.',
    achievements: [
      'Trained a Yolo - V3/4 model for object detection.',
      'Utilized centralized connected CCTVs for data acquisition.',
      'Implemented notification generation based on object detection results.',
      'Developed an image library, using existing video feeds to enhance model development.',
      'Enabled data-insights, leading to better management of time and resources via the automation of a Yolo - V3/4 model for object detection and automatic notifications.',
      'Facilitated a more accessible real-time data by utilizing connected CCTVs and generating relevant notifications in an expeditious timeline.'
    ]
  }
];

export const education = [
  {
    institution: 'Vellore Institute of Technology, Vellore',
    degree: 'B.Tech. (IT)',
    period: '2019 - 2023'
  },
  {
    institution: 'DAV Public School, BSEB, Patna',
    degree: 'Senior Secondary School',
    period: '2016 - 2018'
  },
  {
    institution: 'DAV Public School, BSEB, Patna',
    degree: 'Secondary School',
    period: '2014 - 2016'
  }
];

export const projects = [
  {
    title: 'Patient Monitoring Robot (associated with Oregon State University, USA)',
    description:
      'AI-integrated mobile robot designed for enhanced patient care and monitoring.',
    details: [
      'Role: Developer: Contributed to the development of a mobile solution focused on patient monitoring.',
      'Implemented AI algorithms to improve real-time data collection and analysis for personalized care.',
      'Focused on designing and implementing the robot’s navigation system to ensure smooth movement within healthcare environments.'
    ],
    tech: [], // Not explicitly listed in the new text, leaving empty or inferring later
    linkLabel: 'PMR Portfolio',
    linkUrl: 'https://pmr-osu.github.io/'
  },
  {
    title: '3D Object Detection and Segmentation (Related to Autonomous Driving)',
    description:
      'Advanced machine learning project focused on object detection.',
    details: [
      'Role: Developer: Model training and development to accurately extract relevant information from autonomous vehicle’s peripheral.',
      'Leveraged 3D machine learning techniques to achieve high accuracy in detecting and segmenting objects within the Kitti Dataset.',
      'Increased overall efficiency by improving existing systems with better object-detection systems on existing autonomous vehicle systems.'
    ],
    tech: []
  },
  {
    title: 'Infection Area and Percentage of Covid-19 & Pneumonia on Chest X-Ray',
    description:
      'Developed a U-Net segmentation model for medical imaging.',
    details: [
      'Role: Model Developer: Trained the segmentation model to detect infections and calculate the extent of lung damage.',
      'Processed and analyzed over 12k pre-processed images using Qatar University data set, while training and testing U-Net.',
      'Achieved a mean IoU of 94% in accurately highlighting infectious areas.'
    ],
    tech: [],
    linkLabel: 'Results',
    linkUrl: 'https://drive.google.com/drive/folders/14V-x_i9ZHS2Qapu47nTWBvNFhCHMUgTa'
  },
  {
    title: 'Impregnable Healthcare IOT Ecosystem by integrating AI and Blockchain',
    description:
      'Secure healthcare ecosystem that uses IOT based machine learning and blockchain tools to ensure privacy and efficiency.',
    details: [
      'Role: Ecosystem Developer: Collaborated with a team of 3 to design and build an IoT-based Healthcare ecosystem that runs using Blockchain technologies.',
      'Implemented AI functionalities that improved the ability to automate various healthcare needs, including data collection, security maintenance and risk assessment.',
      'Facilitated real-time communications between the device, doctor and patient by creating end-to-end APIs for data collection and streamlined e-report creations.'
    ],
    tech: [],
    linkLabel: 'GitHub',
    linkUrl: 'https://github.com/m-a-rahul/IHE-Models'
  },
  {
    title: 'Hand Gesture Control for AR objects in VR (Metaverse and Robotics)',
    description:
      'Project focused on real-time hand gesture interpretation to perform advanced robotics actions.',
    details: [
      'Role: Augmented reality application developer: Integrated hand geometry to improve accessibility of a remote functioning Robot.',
      "Implemented Google's Mediapipe framework to facilitate bare hand controlled functions, removing robotics operation encumbrances.",
      "Improved augmented reality operability by combining hand geometry, Google’s Mediapipe, and remote functions to establish metaverse and robotics."
    ],
    tech: [],
    linkLabel: 'GitHub',
    linkUrl: 'https://github.com/Capstone-Self-Learning-Robotic-System'
  },
  {
    title: 'AI Recycling Robotics',
    description:
      'AI-enabled recycling system exploring robotics and perception for sustainable automation.',
    details: [], // Not detailed in new text, keeping basic
    tech: [],
    linkLabel: 'GitHub',
    linkUrl: 'https://github.com/osu-ai-recycling/ai-recycling/tree/main'
  }
];

export const skills = {
  technical: [
    'Python',
    'PyTorch',
    'TensorFlow',
    'Langchain',
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
  ]
};

export const achievements = [
  {
    text: 'Secured 2nd All Over India Rank in Flipkart Grid 4.0 Competition, showcasing problem-solving and competitive skills.',
    url: 'https://www.instagram.com/p/CkAvMk6JTEs/?igsh=NWl3ODZyd2VhNmVq'
  },
  {
    text: 'Authored Publication on AI Healthcare in Springer, demonstrating research and publication capabilities within the artificial intelligence domain.',
    url: 'https://link.springer.com/chapter/10.1007/978-981-19-5191-6_24'
  }
];

export const extraLinks = [];

