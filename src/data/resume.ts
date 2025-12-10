export const profile = {
  name: 'Aditya Raj',
  title: 'AI Engineer',
  tagline: 'Specializing in LLMs, Transformers, and VLMs for robotics and healthcare.',
  location: 'India',
  email: 'ms.adityaraj@gmail.com',
  linkedin: 'https://linkedin.com/in/aditya-raj-aadi0032007/',
  github: 'https://github.com/Aadi0032007'
};

export const summary =
  'AI Engineer with a strong interdisciplinary focus at the nexus of machine learning, robotics, and healthcare innovation. Experienced in advancing Large Language Models (LLMs), Transformers, and Vision-Language Models (VLMs) to enable robots that perceive, reason, and interact in human-centered environments. My background spans applied research and scalable engineering: from prototyping computer vision pipelines to optimizing GPU-accelerated training environments.';

export const experience = [
  {
    title: 'AI Engineer',
    company: 'Revobots',
    location: 'USA, Remote',
    period: 'Nov 2023 - Present',
    focus: 'Developing and deploying AI solutions, optimizing neural networks, and managing GPU environments for robot control systems.',
    achievements: [
      'Engineered multi-agent conversational pipelines utilizing LangChain for dynamic context management.',
      'Architected Transformer-based models for robotic perception/NLP, optimizing inference latency via quantization and pruning.',
      'Administered GPU-backed environments (CUDA/cuDNN) for maximum throughput.',
      'Designed scalable architectures integrating agentic workflows with perception, planning, and control modules.'
    ]
  },
  {
    title: 'Software Developer',
    company: 'Sapiens',
    location: 'Bengaluru, India',
    period: 'Jan 2023 - Oct 2023',
    focus: 'Java (EJB) development on the IDIT 17.0 platform for insurance products.',
    achievements: [
      'Contributed to a European insurance software implementation project.',
      'Resolved 18 software-related tickets, facilitating smooth deployment and reducing project delays.'
    ]
  },
  {
    title: 'AI Engineer Intern',
    company: 'Intel Corporation',
    location: 'Bengaluru, India',
    period: 'Mar 2022 - Dec 2022',
    focus: 'Researching and deploying 3D point-cloud segmentation models using Azure and Docker.',
    achievements: [
      'Achieved a 3D point-cloud segmentation model with 96% accuracy and 92% mean Intersection over Union (mIoU).',
      'Containerized models using Docker and deployed on Azure Kubernetes Services (AKS).'
    ]
  },
  {
    title: 'AI Intern',
    company: 'RayReach Technologies',
    location: 'Remote',
    period: 'May 2021 - Aug 2021',
    focus: 'Training YOLO v3/v4 object detection models and managing CCTV data acquisition.',
    achievements: ['Implemented notification generation based on object detection results.']
  }
];

export const projects = [
  {
    title: 'Patient Monitoring Robot (Oregon State University)',
    description: 'AI-integrated mobile robot for real-time patient data collection and analysis.',
    tech: ['Navigation systems', 'Real-time Analysis'],
    linkLabel: 'Portfolio'
  },
  {
    title: '3D Object Detection & Segmentation (Autonomous Driving)',
    description: 'Model training to extract info from autonomous vehicle peripherals using the Kitti Dataset.',
    tech: ['3D Machine Learning', 'Segmentation']
  },
  {
    title: 'Chest X-Ray Infection Analysis',
    description: 'U-Net segmentation model to detect COVID-19/Pneumonia and calculate lung damage percentage.',
    tech: ['12k images processed', '94% Mean IoU'],
    linkLabel: 'Results'
  },
  {
    title: 'Impregnable Healthcare IoT Ecosystem',
    description: 'Secure ecosystem using IoT ML and Blockchain for privacy and efficiency.',
    tech: ['Blockchain', 'IoT', 'End-to-end APIs'],
    linkLabel: 'GitHub'
  },
  {
    title: 'Hand Gesture Control for AR/VR',
    description: "Real-time hand gesture interpretation to control remote robots using Google's Mediapipe.",
    linkLabel: 'GitHub'
  }
];

export const skills = {
  technical: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'LLM', 'Azure', 'Docker', '3D-ML', 'Git', 'Hugging Face'],
  soft: ['Problem-solving', 'Collaboration', 'Communication', 'Adaptability'],
  awards: [
    '2nd All India Rank in Flipkart Grid 4.0 Competition.',
    'Authored Publication on AI Healthcare in Springer.'
  ]
};
