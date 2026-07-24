// ============================================================
// CERTIFICATES DATA — Single source of truth
// To add a certificate: copy one entry and fill in the fields.
// featured: true  → shows on homepage (max 6 shown)
// ============================================================

export const CERTIFICATES = [
  {
    slug: 'claude-vertex-ai',
    title: 'Claude with Google Vertex AI',
    subtitle: 'Developer Course Completion',
    issuer: 'Anthropic',
    issuerCategory: 'anthropic',
    issueDate: '2026',
    credentialId: 'u9u2smxzy3sx',
    verifyUrl: 'https://verify.skilljar.com/c/u9u2smxzy3sx',
    image: null,
    featured: true,
    skills: [
      'Anthropic Claude API Integration',
      'Google Vertex AI Platform',
      'AI Application Architecture',
      'Prompt Engineering',
      'LLM Safety & Guidelines',
    ],
    relatedProjects: [],
    color: 'var(--color-ai-magenta)',
  },
  {
    slug: 'cpp-programming',
    title: 'C++ Programming',
    subtitle: 'Course Completion Certificate',
    issuer: 'GreyLearn',
    issuerCategory: 'others',
    issueDate: '08 July 2026',
    credentialId: null,
    verifyUrl: null,
    image: '/certs/cert-cpp.png',
    featured: true,
    skills: [
      'C++ Syntax & Object-Oriented Programming',
      'Memory Management & Pointers',
      'Data Structures in C++',
      'Standard Template Library (STL)',
      'File Handling',
    ],
    relatedProjects: [],
    color: 'var(--color-cloud-cyan)',
  },
  {
    slug: 'advanced-excel',
    title: 'Advanced Excel',
    subtitle: 'Course Completion Certificate',
    issuer: 'GreyLearn',
    issuerCategory: 'others',
    issueDate: '08 July 2026',
    credentialId: null,
    verifyUrl: null,
    image: '/certs/cert-excel.png',
    featured: true,
    skills: [
      'Advanced Formulas & Functions',
      'Data Analysis & Pivot Tables',
      'Spreadsheet Automation & Macros',
      'Data Visualization with Charts',
      'VLOOKUP, INDEX-MATCH',
    ],
    relatedProjects: [],
    color: 'var(--color-cyber-purple)',
  },
  // Add more certificates below as you earn them:
  // {
  //   slug: 'aws-cloud-practitioner',
  //   title: 'AWS Cloud Practitioner',
  //   subtitle: 'Foundational Certification',
  //   issuer: 'AWS',
  //   issuerCategory: 'aws',
  //   issueDate: 'TBD',
  //   credentialId: null,
  //   verifyUrl: null,
  //   image: null,
  //   featured: true,
  //   skills: ['Cloud Concepts', 'AWS Core Services', 'Security & Compliance'],
  //   relatedProjects: ['cloud-native-devops-platform'],
  //   color: 'var(--color-cloud-cyan)',
  // },
];

// Issuer categories for filter UI
export const CERT_ISSUERS = [
  { id: 'all', label: 'All Issuers' },
  { id: 'aws', label: 'AWS' },
  { id: 'google', label: 'Google' },
  { id: 'microsoft', label: 'Microsoft' },
  { id: 'cisco', label: 'Cisco' },
  { id: 'redhat', label: 'Red Hat' },
  { id: 'oracle', label: 'Oracle' },
  { id: 'coursera', label: 'Coursera' },
  { id: 'udemy', label: 'Udemy' },
  { id: 'anthropic', label: 'Anthropic' },
  { id: 'others', label: 'Others' },
];

export const getFeaturedCertificates = (max = 6) =>
  CERTIFICATES.filter(c => c.featured).slice(0, max);

export const getCertificateBySlug = (slug) =>
  CERTIFICATES.find(c => c.slug === slug) || null;
