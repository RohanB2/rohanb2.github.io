// This file contains all the content for the site
// Update this file whenever I need to add, change, or remove experiences, projects, or designs.
// Site will automatically update to reflect the changes.

export const education = [
  {
    institution: 'University of Virginia',
    degree: 'B.S. COMPUTER SCIENCE & B.A. MATHEMATICS',
    description: 'GPA: 3.8/4.0\nRelevant Coursework: \n• CS 2100: Data Structures and Algorithms 1\n• CS 2120: Discrete Math and Theory 1\n• CS 2130: Computer Systems and Organizations 1\n• APMA 3080: Linear Algebra',
  },
  {
    institution: 'Heritage High School',
    degree: 'ADVANCED STUDIES DIPLOMA',
    description: 'GPA: 4.47/4.0\nActivities: President of Computer Science Honor Society, Meetings Coordinator of Science National Honor Society, NHS, Engineering Club, & CyberPatriot.\n\nRelevant coursework: AP Calculus BC, AP Computer Science A, Web Development, AP Microeconomics, AP Macroeconomics, AP Statistics, AP Chemistry, DE Physics 1 & 2, AP Physics C Mechanics, and AP Language and Composition.',
  }
]

export const work = [
  {
    role: 'Software Engineer Intern',
    company: 'Arcturus Technologies',
    period: 'Jun 2024 — Aug 2024',
    description: 'Streamlined internal data workflows by creating automated scripts, improving data processing efficiency by 15%.',
  },
  {
    role: 'Tutor',
    company: 'Mathnasium',
    period: '2022 — 2025',
    description: 'Provided personalized tutoring in mathematics for students of various ages and skill levels, helping them improve their understanding and performance in the subject.',
  },
]

export const projects = [
  {
    title: 'UVA-SIS Sniper',
    description: "A Python script that monitors UVA course enrollment through the actual SIS API and sends real-time Discord or email notifications when spots open up in your tracked classes.",
    tech: ['Python', 'Google Cloud Platform', 'Discord Webhooks', 'SIS API'],
    demo: '#',
    github: 'https://github.com/RohanB2/SIS-Enrollment-Sniper'
  },
  {
    title: 'Music Agenda',
    description: "A premium macOS app for tracking your album listening journey. Search Apple Music's catalog, build your personal listening agenda, and track your progress song by song.",
    tech: ['Swift', 'iTunesAPI', 'SwiftUI', 'xCode'],
    demo: '#',
    github: 'https://github.com/RohanB2/MusicAgenda'
  },
  {
    title: 'Algorithmic Backtester',
    description: 'A backtesting engine utilizing Monte Carlo simulations and historical bootstrapping to evaluate algorithmic trading strategies against statistical distributions.\n\n' +
      'Implemented comprehensive risk and statistical metrics such as Sharpe Ratios, drawdown profiles, and confidence intervals in order to benchmark baseline strategy performance directly against simulated market paths.',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
    demo: '#',
    github: '#'
  }
]

export interface DesignItem {
  id: string;
  src: string;
  alt: string;
  link?: string;
}

export const designs: DesignItem[] = [
  {
    // Use the s3 links from Behance projects by just inspect element, or put them in assets folder.
    // Links work better.

    // No link, will open in fullscreen viewer

    id: 'design-1',
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/899641250714081.6a25f2ced4065.png',
    alt: 'UVA Mens Tennis 2026 All ACC & POTY',
    link: 'https://www.behance.net/gallery/250714081/UVA-Mens-Tennis-2026'
  },
  {
    id: 'design-2',
    src: 'https://mir-s3-cdn-cf.behance.net/project_modules/hd_webp/4ecf0c250759347.6a26ec76e5df5.png',
    alt: 'Malik Thomas Countdown',
    link: 'https://www.behance.net/gallery/250759347/Malik-Thomas-Countdown?platform=direct'
  },
  {
    id: 'design-3',
    src: '/assets/Brunson-NYK-Poster-W-Circles.png',
    alt: 'Brunson Burner (2024-2025)'
  },
  {
    id: 'design-4',
    src: '/assets/Apple-Airpods-2-Advertisment.png',
    alt: 'Apple Airpods 2 Advertisment'
  },
  {
    id: 'design-5',
    src: '/assets/never-will-be-design.png',
    alt: 'Experiemental Design'
  },
  {
    id: 'design-6',
    src: '/assets/Experimental-Gradiant.png',
    alt: 'Experimental Gradients'
  },
  {
    id: 'design-7',
    src: '/assets/Steelseries-Arctis-9X.png',
    alt: 'Arctis 9X Advertisement'
  },
  {
    id: 'design-8',
    src: '/assets/Naive-Rumble-Twitter-Header.png',
    alt: 'Rumble Twitter Header'
  },
    {
    id: 'design-9',
    src: '/assets/Greenzy-Twitter-Header-Gradient.png',
    alt: 'Gradient Twitter Header'
  },
  {
    id: 'design-10',
    src: '/assets/Parallel-Arno-Twitter-Header.png',
    alt: 'Arno Twitter Header'
  }
]

export const about = [
  "I'm a Computer Science & Math student at UVA with a deep interest in the intersection of software and hardware. I love exploring how things work under the hood, spending my time building projects, learning about systems, and keeping up with the latest in the tech space.",
  "Beyond coding, I'm a massive sports fan—especially when it comes to basketball. I merge this passion with digital art through sports graphic design, spending my free time creating dynamic player graphics and improving my skills in Photoshop.",
  "A lot of the projects I work on have been practical and fruitful in some aspect of my life. Whether I'm automating a tedious task to make my own routine more efficient or building out a larger system, I'm driven by the desire to create solutions that are useful and speed things up."
]
