export interface Identity {
  id: string;
  identityId: string;
  name: string;
  role: string;
  organization: string;
  email: string;
  phone: string;
  govIdType: string;
  identityNumber: string;
  publicKey: string;
  verificationStatus: "Verified" | "Pending" | "Rejected" | "Under Review";
  certificateStatus: "Certificate Active" | "Pending Issuance" | "Revoked" | "Expired" | "None";
  createdDate: string;
  supportingDocName?: string;
  trustScore?: number;
}

export interface Validator {
  id: string;
  name: string;
  organization: string;
  trustScore: number; // 0-100
  accuracy: number; // e.g. 98%
  completedVerifications: number;
  availability: "Available" | "Busy" | "Offline";
  status: "Active" | "Under Review" | "Suspended";
  nodeAddress: string;
  lastActive: string;
}

export interface ValidatorVote {
  validatorId: string;
  validatorName: string;
  trustScore: number;
  vote: "Approve" | "Reject" | "Abstain";
  weightedValue: number; // percentage weight contribution
  timestamp: string;
  comments?: string;
}

export interface VotingRequest {
  id: string;
  candidateName: string;
  role: string;
  organization: string;
  identityId: string;
  publicKey: string;
  submissionDate: string;
  verificationStatus: "Approved" | "Pending" | "Rejected";
  votes: ValidatorVote[];
  approvalPercentage: number;
  requiredThreshold: number;
  explanation: string;
}

export interface Certificate {
  id: string;
  certificateId: string;
  holderName: string;
  role: string;
  organization: string;
  issueDate: string;
  expiryDate: string;
  status: "Active" | "Expired" | "Revoked" | "Pending";
  blockchainStatus: "Confirmed" | "Syncing" | "Pending";
  txHash: string;
  blockNumber: number;
  publicKeyHash: string;
  verificationUrl: string;
  revocationReason?: string;
  revokedDate?: string;
}

export interface RevocationRequest {
  id: string;
  certificateId: string;
  holderName: string;
  role: string;
  organization: string;
  reason: string;
  requestedBy: string;
  requestDate: string;
  currentStatus: "Voting in Progress" | "Approved (Revoked)" | "Rejected" | "Pending";
  votes: ValidatorVote[];
  totalApproval: number; // percentage voting to revoke
  requiredThreshold: number;
  lifecycleStage: "ACTIVE" | "REVOCATION REQUEST" | "VALIDATOR VOTING" | "THRESHOLD CHECK" | "REVOKED";
}

export interface BlockchainBlock {
  blockNumber: number;
  hash: string;
  prevHash: string;
  timestamp: string;
  certificateId: string;
  merkleRoot: string;
  txCount: number;
  validatorSignature: string;
  status: "Verified" | "Confirmed";
}

export const MOCK_IDENTITIES: Identity[] = [
  {
    id: "id-1",
    identityId: "TR-ID-10021",
    name: "Dr. Arun Kumar",
    role: "Senior Cardiologist",
    organization: "City Hospital",
    email: "arun.kumar@cityhospital.org",
    phone: "+1 (555) 234-5678",
    govIdType: "Medical License ID",
    identityNumber: "MED-IN-88910",
    publicKey: "0x4F89b...3C91a2",
    verificationStatus: "Verified",
    certificateStatus: "Certificate Active",
    createdDate: "2026-08-14",
    supportingDocName: "Medical_Board_Certification_Arun.pdf",
    trustScore: 96,
  },
  {
    id: "id-2",
    identityId: "TR-ID-10022",
    name: "Dr. Priya Sharma",
    role: "Chief Medical Officer",
    organization: "Metro Health Care",
    email: "priya.sharma@metrohealth.org",
    phone: "+1 (555) 345-6789",
    govIdType: "National Doctor Badge",
    identityNumber: "DOC-99231",
    publicKey: "0x7A12c...9B44d1",
    verificationStatus: "Verified",
    certificateStatus: "Certificate Active",
    createdDate: "2026-08-18",
    supportingDocName: "CMO_Appointment_Letter.pdf",
    trustScore: 98,
  },
  {
    id: "id-3",
    identityId: "TR-ID-10023",
    name: "Dr. Rajesh Mehta",
    role: "Neurologist",
    organization: "Global Care Institute",
    email: "rajesh.m@globalcare.org",
    phone: "+1 (555) 456-7890",
    govIdType: "State Medical Council ID",
    identityNumber: "SMC-77341",
    publicKey: "0x1B34e...8F22a9",
    verificationStatus: "Pending",
    certificateStatus: "Pending Issuance",
    createdDate: "2026-09-10",
    supportingDocName: "Neurology_Fellowship_Cert.pdf",
    trustScore: 84,
  },
  {
    id: "id-4",
    identityId: "TR-ID-10024",
    name: "Dr. Sarah Jenkins",
    role: "Immunologist",
    organization: "Apex Medical Research",
    email: "s.jenkins@apexmed.org",
    phone: "+1 (555) 567-8901",
    govIdType: "Federal Practitioner ID",
    identityNumber: "FPR-44512",
    publicKey: "0x9E76d...1A55c3",
    verificationStatus: "Verified",
    certificateStatus: "Revoked",
    createdDate: "2026-05-20",
    supportingDocName: "Immunology_Board_Verification.pdf",
    trustScore: 62,
  },
  {
    id: "id-5",
    identityId: "TR-ID-10025",
    name: "Dr. Marcus Vance",
    role: "Radiology Specialist",
    organization: "City Hospital",
    email: "m.vance@cityhospital.org",
    phone: "+1 (555) 678-9012",
    govIdType: "Radiology Practitioner ID",
    identityNumber: "RAD-66129",
    publicKey: "0x3D90a...7E11b8",
    verificationStatus: "Under Review",
    certificateStatus: "Pending Issuance",
    createdDate: "2026-09-15",
    supportingDocName: "Radiology_Board_Credential.pdf",
    trustScore: 78,
  },
];

export const MOCK_VALIDATORS: Validator[] = [
  {
    id: "val-a",
    name: "Validator A (Apex National Registry)",
    organization: "National Medical Board Authority",
    trustScore: 90,
    accuracy: 98,
    completedVerifications: 324,
    availability: "Available",
    status: "Active",
    nodeAddress: "0x88F1...90A1",
    lastActive: "2 mins ago",
  },
  {
    id: "val-b",
    name: "Validator B (Health Trust Network)",
    organization: "Inter-Hospital Security Alliance",
    trustScore: 80,
    accuracy: 95,
    completedVerifications: 280,
    availability: "Available",
    status: "Active",
    nodeAddress: "0x72E3...11B4",
    lastActive: "Just now",
  },
  {
    id: "val-c",
    name: "Validator C (Global Health Identity)",
    organization: "International PKI Accreditation Consortium",
    trustScore: 70,
    accuracy: 91,
    completedVerifications: 195,
    availability: "Busy",
    status: "Active",
    nodeAddress: "0x34C9...88D2",
    lastActive: "15 mins ago",
  },
  {
    id: "val-d",
    name: "Validator D (Regional Cyber Auth)",
    organization: "Regional Health Information Network",
    trustScore: 50,
    accuracy: 78,
    completedVerifications: 88,
    availability: "Offline",
    status: "Under Review",
    nodeAddress: "0x19A4...55E9",
    lastActive: "3 hours ago",
  },
];

export const MOCK_VOTING_REQUEST: VotingRequest = {
  id: "vote-101",
  candidateName: "Dr. Arun Kumar",
  role: "Doctor / Senior Cardiologist",
  organization: "City Hospital",
  identityId: "TR-ID-10021",
  publicKey: "0x4F89b910a372183e91024bcda98a123f829c3C91a2",
  submissionDate: "2026-09-16 09:30 AM",
  verificationStatus: "Approved",
  approvalPercentage: 75,
  requiredThreshold: 70,
  explanation: "Approval threshold reached because the combined trust-weighted approval is 75%, exceeding the 70% requirement.",
  votes: [
    {
      validatorId: "val-a",
      validatorName: "Validator A (National Board)",
      trustScore: 90,
      vote: "Approve",
      weightedValue: 30,
      timestamp: "2026-09-16 10:15 AM",
      comments: "Verified against national registry database. Public key hash matches.",
    },
    {
      validatorId: "val-b",
      validatorName: "Validator B (Health Trust Network)",
      trustScore: 80,
      vote: "Approve",
      weightedValue: 25,
      timestamp: "2026-09-16 10:45 AM",
      comments: "Cross-checked City Hospital employment credential. Valid.",
    },
    {
      validatorId: "val-c",
      validatorName: "Validator C (Global Health Identity)",
      trustScore: 70,
      vote: "Approve",
      weightedValue: 20,
      timestamp: "2026-09-16 11:20 AM",
      comments: "Supporting documents authenticated cleanly.",
    },
    {
      validatorId: "val-d",
      validatorName: "Validator D (Regional Cyber Auth)",
      trustScore: 50,
      vote: "Reject",
      weightedValue: 10,
      timestamp: "2026-09-16 11:50 AM",
      comments: "Requires secondary manual review for regional license renewal.",
    },
  ],
};

export const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: "cert-1",
    certificateId: "TR-CERT-2026-001245",
    holderName: "Dr. Arun Kumar",
    role: "Doctor (Cardiology)",
    organization: "City Hospital",
    issueDate: "2026-09-18",
    expiryDate: "2028-09-18",
    status: "Active",
    blockchainStatus: "Confirmed",
    txHash: "0x8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    blockNumber: 10242,
    publicKeyHash: "SHA256:a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
    verificationUrl: "https://trustrank-pki.org/verify?id=TR-CERT-2026-001245",
  },
  {
    id: "cert-2",
    certificateId: "TR-CERT-2026-001246",
    holderName: "Dr. Priya Sharma",
    role: "Chief Medical Officer",
    organization: "Metro Health Care",
    issueDate: "2026-08-20",
    expiryDate: "2028-08-20",
    status: "Active",
    blockchainStatus: "Confirmed",
    txHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b",
    blockNumber: 10239,
    publicKeyHash: "SHA256:b88a912e7741cc8921da81923091e919283f129a",
    verificationUrl: "https://trustrank-pki.org/verify?id=TR-CERT-2026-001246",
  },
  {
    id: "cert-3",
    certificateId: "TR-CERT-2026-001201",
    holderName: "Dr. Sarah Jenkins",
    role: "Immunologist",
    organization: "Apex Medical Research",
    issueDate: "2026-05-22",
    expiryDate: "2028-05-22",
    status: "Revoked",
    blockchainStatus: "Confirmed",
    txHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d",
    blockNumber: 10188,
    publicKeyHash: "SHA256:c99b821f8832bb1234ea9912049182a1299e821b",
    verificationUrl: "https://trustrank-pki.org/verify?id=TR-CERT-2026-001201",
    revocationReason: "Private key compromised during network audit",
    revokedDate: "2026-09-02",
  },
  {
    id: "cert-4",
    certificateId: "TR-CERT-2024-000890",
    holderName: "Dr. Robert Vance",
    role: "General Surgeon",
    organization: "St. Jude Hospital",
    issueDate: "2024-01-10",
    expiryDate: "2026-01-10",
    status: "Expired",
    blockchainStatus: "Confirmed",
    txHash: "0x9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e",
    blockNumber: 9450,
    publicKeyHash: "SHA256:d11c823e9901aa88231c991823901a88291f092c",
    verificationUrl: "https://trustrank-pki.org/verify?id=TR-CERT-2024-000890",
  },
  {
    id: "cert-5",
    certificateId: "TR-CERT-2026-001289",
    holderName: "Dr. Rajesh Mehta",
    role: "Neurologist",
    organization: "Global Care Institute",
    issueDate: "2026-09-18",
    expiryDate: "2028-09-18",
    status: "Pending",
    blockchainStatus: "Pending",
    txHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
    blockNumber: 0,
    publicKeyHash: "SHA256:e22d991f0023bb99341d00293091e900381f123d",
    verificationUrl: "https://trustrank-pki.org/verify?id=TR-CERT-2026-001289",
  },
];

export const MOCK_REVOCATION_REQUEST: RevocationRequest = {
  id: "rev-201",
  certificateId: "TR-CERT-2026-001245",
  holderName: "Dr. Arun Kumar",
  role: "Doctor",
  organization: "City Hospital",
  reason: "Private key compromised due to unauthorized device transfer",
  requestedBy: "City Hospital Cyber Security Team",
  requestDate: "2026-09-17 04:15 PM",
  currentStatus: "Voting in Progress",
  totalApproval: 65,
  requiredThreshold: 70,
  lifecycleStage: "VALIDATOR VOTING",
  votes: [
    {
      validatorId: "val-a",
      validatorName: "Validator A (National Board)",
      trustScore: 90,
      vote: "Approve",
      weightedValue: 30,
      timestamp: "2026-09-17 05:00 PM",
      comments: "Security report verified. Recommend key invalidation.",
    },
    {
      validatorId: "val-b",
      validatorName: "Validator B (Health Trust Network)",
      trustScore: 80,
      vote: "Approve",
      weightedValue: 25,
      timestamp: "2026-09-17 05:30 PM",
      comments: "Organization security contact confirmed breach event.",
    },
    {
      validatorId: "val-c",
      validatorName: "Validator C (Global Health Identity)",
      trustScore: 70,
      vote: "Reject",
      weightedValue: 20,
      timestamp: "2026-09-17 06:10 PM",
      comments: "Requesting secondary identity confirmation before revoking active credential.",
    },
    {
      validatorId: "val-d",
      validatorName: "Validator D (Regional Cyber Auth)",
      trustScore: 50,
      vote: "Approve",
      weightedValue: 10,
      timestamp: "2026-09-17 06:45 PM",
      comments: "Provisional approval for emergency suspension.",
    },
  ],
};

export const MOCK_BLOCKCHAIN_BLOCKS: BlockchainBlock[] = [
  {
    blockNumber: 10245,
    hash: "0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    prevHash: "0x8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    timestamp: "2026-09-18 17:45:12",
    certificateId: "TR-CERT-2026-001250",
    merkleRoot: "0x44a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    txCount: 4,
    validatorSignature: "ECDSA_secp256k1_ValidatorA_Sig992",
    status: "Confirmed",
  },
  {
    blockNumber: 10244,
    hash: "0x8f9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b",
    prevHash: "0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
    timestamp: "2026-09-18 16:30:00",
    certificateId: "TR-CERT-2026-001249",
    merkleRoot: "0x33b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    txCount: 3,
    validatorSignature: "ECDSA_secp256k1_ValidatorB_Sig881",
    status: "Confirmed",
  },
  {
    blockNumber: 10243,
    hash: "0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f",
    prevHash: "0x6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e",
    timestamp: "2026-09-18 14:15:22",
    certificateId: "TR-CERT-2026-001248",
    merkleRoot: "0x22c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    txCount: 5,
    validatorSignature: "ECDSA_secp256k1_ValidatorA_Sig774",
    status: "Confirmed",
  },
  {
    blockNumber: 10242,
    hash: "0x6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e",
    prevHash: "0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    timestamp: "2026-09-18 11:00:10",
    certificateId: "TR-CERT-2026-001245",
    merkleRoot: "0x11d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    txCount: 2,
    validatorSignature: "ECDSA_secp256k1_ValidatorC_Sig661",
    status: "Confirmed",
  },
  {
    blockNumber: 10241,
    hash: "0x5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
    prevHash: "0x4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c",
    timestamp: "2026-09-17 22:50:04",
    certificateId: "TR-CERT-2026-001244",
    merkleRoot: "0x00e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9",
    txCount: 6,
    validatorSignature: "ECDSA_secp256k1_ValidatorB_Sig553",
    status: "Confirmed",
  },
];

export const DASHBOARD_STATS = {
  totalIdentities: "1,284",
  activeCertificates: "1,156",
  pendingVerifications: "42",
  activeValidators: "36",
  revokedCertificates: "18",
  blockchainRecords: "1,174",
  systemUptime: "99.98%",
  averageConsensusTime: "1.4s",
};

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: "Doctor Identity",
    description: "Dr. Arun submits his identity details, public key and supporting medical credentials.",
    icon: "UserCheck",
    detail: "Public Key: 0x4F89b...3C91a2",
  },
  {
    step: 2,
    title: "Trusted Validators",
    description: "The system selects decentralized trusted validators to verify the submitted identity.",
    icon: "Users",
    detail: "4 Independent Validators Assigned",
  },
  {
    step: 3,
    title: "Trust Score Weighting",
    description: "Each validator possesses a Trust Score based on historical verification accuracy and performance.",
    icon: "ShieldCheck",
    detail: "A: 90 | B: 80 | C: 70 | D: 50",
  },
  {
    step: 4,
    title: "Trust-Weighted Voting",
    description: "Validators verify the identity and cast Approve or Reject votes. Higher-trust validators have greater voting weight.",
    icon: "Vote",
    detail: "Validator A (30%) + B (25%) + C (20%) Approve",
  },
  {
    step: 5,
    title: "Consensus Calculation",
    description: "The system calculates combined approval weight. Total Approval: 75% vs Required Threshold: 70%.",
    icon: "Award",
    detail: "Result: APPROVED (75% >= 70%)",
  },
  {
    step: 6,
    title: "Digital Certificate Issued",
    description: "A cryptographically signed Digital Certificate is issued after successful consensus.",
    icon: "FileCheck",
    detail: "ID: TR-CERT-2026-001245",
  },
  {
    step: 7,
    title: "Blockchain Record",
    description: "An immutable certificate hash proof is recorded on the tamper-proof blockchain ledger.",
    icon: "Blocks",
    detail: "Block #10242 Hash Recorded",
  },
  {
    step: 8,
    title: "Cross-Org Verification",
    description: "Another hospital or authority can verify the certificate instantly using its Certificate ID.",
    icon: "SearchCheck",
    detail: "Public /verify Search Active",
  },
  {
    step: 9,
    title: "Revocation Request",
    description: "If a certificate or private key is compromised, a revocation request can be initiated.",
    icon: "ShieldAlert",
    detail: "Reason: Key Compromised",
  },
  {
    step: 10,
    title: "Revocation Voting",
    description: "Trusted validators review the revocation request and cast votes.",
    icon: "Vote",
    detail: "Validator Voting in Progress",
  },
  {
    step: 11,
    title: "Certificate Revoked",
    description: "If the required threshold is reached, status transitions from ACTIVE to REVOKED across all systems.",
    icon: "BadgeAlert",
    detail: "Status: ACTIVE ➔ REVOKED",
  },
];
