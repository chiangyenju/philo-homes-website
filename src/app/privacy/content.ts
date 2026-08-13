export type Block =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: { label?: string; text: string }[] }

export type Section = {
  id: string
  heading: string
  blocks: Block[]
}

export const meta = {
  effectiveDate: 'August 12, 2026',
  lastUpdated: 'August 12, 2026',
  version: '1.0',
  applies:
    'Applies to the Philo Homes website (https://philo.homes) and the Philo Homes iOS app.',
}

export const summary = {
  intro:
    'This summary is provided for convenience. Please read the full Privacy Policy below for complete information.',
  items: [
    {
      label: 'What we collect.',
      text: 'Account and contact details (name, email, phone number, company) and videos of your home spaces that you capture or upload for AI design analysis, your design details, payment information (payment handled by our payment processor), usage data, and cookies and similar technologies.',
    },
    {
      label: 'How we use it.',
      text: 'To operate the Philo Homes platform, analyze your spaces and generate AI-powered design recommendations and visualizations, process payments, provide support, improve our services, and comply with law.',
    },
    {
      label: 'Sale and sharing.',
      text: 'We do not sell personal information for money. Whether we “share” personal information for cross-context behavioral advertising depends on the final cookie/SDK configuration — see Section 9.',
    },
    {
      label: 'Your room videos.',
      text: 'Your room videos are used to provide the design services you request. We do not use your room videos to train generalized AI models without your explicit opt-in consent.',
    },
    {
      label: 'Your rights.',
      text: 'Depending on your state, you may have rights to access, correct, delete, and port your personal information, and to opt out of sale, sharing, or targeted advertising. We honor Global Privacy Control (GPC) signals. See Sections 9, 12, and 13.',
    },
    { label: 'Contact.', text: 'info@philo.homes' },
  ],
}

export const sections: Section[] = [
  {
    id: 'introduction-and-scope',
    heading: '1. Introduction and Scope',
    blocks: [
      {
        type: 'p',
        text: 'Maven Design LLC. (“Philo Homes,” “we,” “us,” or “our”) operates an AI-powered home design platform that generates interior design recommendations and visualizations based on videos, and details you share about your spaces. This Privacy Policy describes how we collect, use, disclose, and retain personal information when you:',
      },
      {
        type: 'ul',
        items: [
          { text: 'visit or interact with our website at https://philo.homes (the “Site”);' },
          { text: 'download or use the Philo Homes iOS application (the “App”);' },
          {
            text: 'create design projects, or purchase subscriptions or services, through the Site or the App (together, the “Services”); or',
          },
          { text: 'communicate with us, including for customer support or sales.' },
        ],
      },
      { type: 'h3', text: '1.1 One Policy for the Website and the iOS App' },
      {
        type: 'p',
        text: 'This is a single Privacy Policy that governs both the Site and the App. Unless a disclosure is expressly identified as applying to only one platform (see Sections 6 and 7), every section of this Policy applies to both. This Policy is available from the footer of every page of the Site and, within the App, from the registration screen and the account/profile settings page, where it also serves — together with the notices presented in those flows — as our Notice at Collection under California law.',
      },
      {
        type: 'p',
        text: 'This Privacy Policy applies to consumers and to business contacts (for example, individuals who interact with us on behalf of a company). It does not apply to personal information we process about our job applicants, employees, or contractors in their capacity as such; that information is covered by a separate workforce privacy notice.',
      },
    ],
  },
  {
    id: 'information-we-collect',
    heading: '2. Personal Information We Collect',
    blocks: [
      { type: 'h3', text: '2.1 Information You Provide to Us' },
      {
        type: 'ul',
        items: [
          {
            label: 'Account and contact information:',
            text: 'full name, email address, phone number, company name (for professional or business accounts), and account credentials (username and password).',
          },
          {
            label: 'Room videos:',
            text: 'videos of your rooms and home spaces that you capture in the App or upload through the Site or the App for AI design analysis.',
          },
          {
            label: 'Design details:',
            text: 'room details and measurements, and the design preferences, questionnaire responses, and notes you choose to provide.',
          },
          {
            label: 'Order and delivery information:',
            text: 'shipping address, order details, and purchase history for products or materials you order through the Services.',
          },
          {
            label: 'Payment information:',
            text: 'payment card number and expiration date. Payment information is collected directly by our PCI DSS–compliant payment processor through hosted payment fields. Philo Homes does not receive or store full payment card numbers; we retain only tokenized references and the last four digits for order management and support.',
          },
          {
            label: 'Communications:',
            text: 'the contents of support requests, feedback, and survey responses, and related contact history.',
          },
        ],
      },
      { type: 'h3', text: '2.2 Information We Collect Automatically' },
      {
        type: 'ul',
        items: [
          {
            label: 'Usage and behavior data:',
            text: 'your interactions with the Site and App, such as features used, designs viewed and saved, pages and screens visited, session timestamps, settings, and crash and diagnostic logs.',
          },
          {
            label: 'Device and technical information:',
            text: 'IP address, device and mobile identifiers, operating system and App version, browser type, and network information.',
          },
          {
            label: 'Approximate location:',
            text: 'general location inferred from your IP address (for example, city-level location used for service configuration and security).',
          },
          {
            label: 'Cookies, SDKs, and similar technologies,',
            text: 'as described in Section 6.',
          },
        ],
      },
      { type: 'h3', text: '2.3 AI-Generated Information' },
      {
        type: 'p',
        text: 'When our systems analyze your room videos and design details, we create information derived from them and associated with your account, including: attributes of your spaces detected from your videos (for example, room type, dimensions and layout, furnishings, materials, and lighting); inferences about your style and design preferences; and the design recommendations and AI-generated visualizations produced for your projects.',
      },
      { type: 'h3', text: '2.4 Sensitive Personal Information' },
      {
        type: 'p',
        text: 'We collect the following categories of “sensitive personal information” as defined by California law: (i) account log-in credentials in combination with a password; and (ii) the contents of videos of your home, which may incidentally reveal sensitive information depending on what is visible in the spaces you capture (for example, religious items, medications, or documents).',
      },
      {
        type: 'p',
        text: 'We use and disclose sensitive personal information only for the purposes permitted by California privacy regulations, such as providing the Services you request, maintaining security and integrity, preventing fraud, verifying quality, and complying with law. We do not use sensitive personal information to infer characteristics about you. Accordingly, we are not required to offer, and do not offer, a “Limit the Use of My Sensitive Personal Information” link at this time.',
      },
      { type: 'h3', text: '2.5 Categories of Personal Information Under the CCPA/CPRA' },
      {
        type: 'p',
        text: 'This Section lists the categories of personal information defined by California privacy law that we have collected in the preceding 12 months (or, for a new service, that we intend to collect), and the categories of recipients to which we disclose each for a business purpose. Whether any category is “sold” or “shared” is addressed in Section 9.',
      },
      { type: 'p', text: 'Categories we collect.' },
      {
        type: 'ul',
        items: [
          {
            label: 'Identifiers:',
            text: 'name, email address, phone number, IP address, device and online identifiers, and account username.',
          },
          {
            label: 'Customer records information:',
            text: 'name, telephone number, and tokenized payment information.',
          },
          {
            label: 'Internet or other electronic network activity information:',
            text: 'your interactions with the Site and App, features used, designs viewed and saved, session timestamps, and crash and diagnostic logs.',
          },
          {
            label: 'Geolocation data (approximate only):',
            text: 'general location inferred from your IP address. We do not collect precise geolocation.',
          },
          {
            label: 'Audio, electronic, visual, thermal, olfactory, or similar information:',
            text: 'the videos of your home spaces that you capture or upload for AI design analysis. Videos may include an audio track, which we retain as part of the video file but do not analyze. We do not collect thermal or olfactory information.',
          },
          {
            label: 'Professional or employment-related information (limited):',
            text: 'company name and role, for professional or business accounts.',
          },
          {
            label: 'Inferences:',
            text: 'AI-detected attributes of your spaces, and inferences about your style and design preferences.',
          },
          {
            label: 'Sensitive personal information:',
            text: 'account log-in credentials in combination with a password, and the contents of the videos you upload. See Section 2.4.',
          },
        ],
      },
      { type: 'p', text: 'Categories of recipients.' },
      {
        type: 'ul',
        items: [
          {
            label: 'Cloud hosting, storage, and IT providers:',
            text: 'all of the categories listed above, for hosting, storage, and operation of the Services.',
          },
          {
            label: 'Payment processor:',
            text: 'identifiers and customer records information.',
          },
          {
            label: 'Customer support providers:',
            text: 'identifiers, customer records information, and the contents of your support requests.',
          },
          {
            label: 'Security and monitoring providers:',
            text: 'identifiers, internet or other electronic network activity information, and account log-in credentials, for fraud prevention and to maintain security and integrity.',
          },
          {
            label: 'Analytics providers:',
            text: 'identifiers and internet or other electronic network activity information.',
          },
        ],
      },
      {
        type: 'p',
        text: 'We do not collect personal information categories not listed above, and we do not use personal information for purposes materially different from those described in Section 4 without first updating our Notice at Collection.',
      },
    ],
  },
  {
    id: 'sources',
    heading: '3. Sources of Personal Information',
    blocks: [
      {
        type: 'p',
        text: 'We collect personal information: (a) directly from you, when you create an account, build a design project, capture or upload content, or contact us; (b) automatically, from your use of the App and the Site; (c) from our service providers, such as confirmation of payment from our payment processor; and (d) from app store platforms in connection with App distribution.',
      },
    ],
  },
  {
    id: 'how-we-use',
    heading: '4. How We Use Personal Information',
    blocks: [
      {
        type: 'p',
        text: 'We use personal information for the following business and commercial purposes:',
      },
      {
        type: 'ul',
        items: [
          {
            label: 'Providing the Services:',
            text: 'creating and administering accounts; hosting your design projects; processing payments; and enabling you to view, save, and share your designs.',
          },
          {
            label: 'AI-powered design features:',
            text: 'analyzing the videos and details you provide to generate design recommendations and visualizations, as described in Section 5.',
          },
          {
            label: 'Customer support:',
            text: 'responding to requests, troubleshooting, and improving support quality.',
          },
          {
            label: 'Security, integrity, and fraud prevention:',
            text: 'authenticating users; detecting, investigating, and preventing security incidents and fraudulent or illegal activity; and debugging and repairing errors.',
          },
          {
            label: 'Improvement and development:',
            text: 'understanding how the Services are used and improving and developing features, using aggregated or de-identified data where feasible.',
          },
          {
            label: 'Communications:',
            text: 'sending transactional and service messages (e.g., project updates, security alerts, changes to terms or this Policy) and, with the choices required by law, marketing communications you can opt out of at any time.',
          },
          {
            label: 'Legal compliance:',
            text: 'complying with applicable law, responding to lawful requests, and enforcing our terms.',
          },
          {
            label: 'With your consent,',
            text: 'for any other purpose disclosed to you at the time of collection.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Consistent with California privacy regulations, our collection, use, retention, and sharing of personal information is limited to what is reasonably necessary and proportionate to achieve the purposes above, consistent with your reasonable expectations. We do not use personal information for materially incompatible secondary purposes without providing notice and obtaining any consent required by law.',
      },
    ],
  },
  {
    id: 'ai-features',
    heading: '5. AI Features and Automated Processing',
    blocks: [
      {
        type: 'p',
        text: 'Philo Homes uses machine-learning and generative-AI models to analyze the room videos and design details you provide, detect the characteristics of your spaces, and generate design recommendations and visualizations. Your room videos are stored in, and analyzed within, our own cloud environment, and are not sent to third-party AI providers. From the information you provide we build a three-dimensional model of your space. Where a design visualization is generated, we send the third-party provider only a derived, non-identifying representation of your space, such as geometry, depth and segmentation data, and a text description of the requested style. We do not send your room videos, and we do not send information that identifies you or your account.',
      },
      {
        type: 'ul',
        items: [
          {
            label: 'Third-party AI providers.',
            text: 'We do not send your room videos, or any information that identifies you or your account, to third-party AI model providers. Where we use such providers to generate visualizations, we send only derived, non-identifying inputs, and we require them by written contract not to retain those inputs beyond what is needed to return a result and not to use them to train their models.',
          },
          {
            label: 'Model training.',
            text: 'We do not use your room videos, or your design details, to train or improve generalized AI or machine-learning models without your explicit opt-in consent. We may use aggregated or de-identified data that does not identify you to evaluate and improve model performance.',
          },
          {
            label: 'Automated decision-making.',
            text: 'Our design recommendations are suggestions for your consideration. We do not use your personal information to make fully automated decisions that produce legal or similarly significant effects concerning you.',
          },
        ],
      },
    ],
  },
  {
    id: 'cookies',
    heading: '6. Cookies, SDKs, and Similar Technologies',
    blocks: [
      {
        type: 'p',
        text: 'The Site uses cookies and similar technologies (such as pixels and local storage), and the App may include software development kits (SDKs) that collect information in comparable ways. Depending on the final configuration, these fall into the following categories:',
      },
      {
        type: 'ul',
        items: [
          {
            label: 'Strictly necessary:',
            text: 'required for the Site and App to function (authentication, security, load balancing). These cannot be switched off.',
          },
          { label: 'Functional:', text: 'remembering preferences and settings.' },
          { label: 'Analytics:', text: 'helping us understand how the Services are used.' },
          {
            label: 'Advertising.',
            text: 'We do not currently use advertising cookies, pixels, or SDKs, and the Services do not support cross-context behavioral advertising. If we introduce these technologies, we will update this Section and Section 9 and provide the notices described there before doing so.',
          },
        ],
      },
      {
        type: 'p',
        text: 'You can manage cookies through your browser settings and, where deployed, through our cookie preference center; on iOS, you can also limit tracking through your device’s privacy settings. You can additionally use an opt-out preference signal such as Global Privacy Control, as described in Section 9.',
      },
    ],
  },
  {
    id: 'platform-disclosures',
    heading: '7. Platform-Specific Disclosures: iOS App and Website',
    blocks: [
      { type: 'h3', text: '7.1 iOS App Permissions' },
      {
        type: 'p',
        text: 'The App requests the following device permissions, each of which is optional and can be granted or revoked at any time in your iOS Settings (declining a permission may limit related features):',
      },
      {
        type: 'ul',
        items: [
          { label: 'Camera —', text: 'to capture videos of your spaces for design analysis.' },
          {
            label: 'Photo Library —',
            text: 'to let you upload existing videos and save generated designs.',
          },
          {
            label: 'Notifications —',
            text: 'to send you project updates and service messages you have enabled.',
          },
          {
            label: 'Microphone —',
            text: 'required by iOS to record video in the App. Videos you record include an audio track. We do not analyze, transcribe, or otherwise use the audio; it is retained only as part of the video file.',
          },
        ],
      },
      { type: 'h3', text: '7.2 Website' },
      {
        type: 'p',
        text: 'The cookie disclosures in Section 6 apply to the Site. If you upload content through the Site, your browser will request access to your files or camera at the time of upload; we receive only the content you choose to submit.',
      },
      { type: 'h3', text: '7.3 Same Rights on Both Platforms' },
      {
        type: 'p',
        text: 'Your privacy rights and choices under Sections 9, 12, and 13 are identical whether you use the Site or the App, and requests submitted through either platform apply to your account as a whole.',
      },
    ],
  },
  {
    id: 'how-we-disclose',
    heading: '8. How We Disclose Personal Information',
    blocks: [
      {
        type: 'p',
        text: 'We disclose personal information to the following categories of recipients:',
      },
      {
        type: 'ul',
        items: [
          {
            label: 'Service providers and contractors',
            text: 'that process personal information on our behalf under written contracts containing the terms required by California privacy law (purpose limitation, prohibitions on retention, use, or disclosure outside the contract, no resale, obligations to assist with consumer rights requests, audit rights, and breach notification). Categories include: cloud hosting and storage; payment processing; customer support tooling; communications delivery (email/SMS/push); security and monitoring; and analytics.',
          },
          {
            label: 'Corporate transactions:',
            text: 'in connection with a merger, acquisition, financing, reorganization, or sale of assets, subject to this Policy and applicable law; we will provide notice (and choices where required) before your personal information becomes subject to a materially different privacy policy.',
          },
          {
            label: 'Legal and protective disclosures:',
            text: 'to comply with law or legal process, or to protect the rights, safety, and property of Philo Homes, our users, or others.',
          },
          {
            label: 'At your direction:',
            text: 'when you share content (for example, sharing a design or project) or ask us to disclose information to a third party.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Your room videos receive heightened protection. We do not disclose your room videos except: (a) to service providers as necessary to store them and provide the AI design features described in Section 5; (b) at your direction or with your consent; (c) in response to valid legal process; or (d) if we believe in good faith that disclosure is necessary to prevent imminent danger of death or serious physical injury.',
      },
    ],
  },
  {
    id: 'sale-or-sharing',
    heading: '9. Sale or Sharing of Personal Information; Your Privacy Choices',
    blocks: [
      {
        type: 'p',
        text: 'We do not sell personal information in exchange for money. Under California law, however, “selling” and “sharing” can include making personal information available to third-party advertising and analytics companies through cookies, SDKs, and pixels.',
      },
      {
        type: 'p',
        text: 'We do not sell or share personal information as those terms are defined by the CCPA/CPRA, and we have not done so in the preceding 12 months. Although not required to, we honor Global Privacy Control signals as an expression of your preferences should our practices change.',
      },
      { type: 'h3', text: '9.1 Minors' },
      {
        type: 'p',
        text: 'We do not knowingly sell or share the personal information of consumers under 16 years of age. Consumers who are at least 13 and under 16 must affirmatively opt in before any sale or sharing; for consumers under 13, opt-in consent must be provided by a parent or guardian. Our registration flow includes an age confirmation step. See also Section 14.',
      },
      { type: 'h3', text: '9.2 Notice of Financial Incentive' },
      {
        type: 'p',
        text: 'We do not currently offer financial incentives or price/service differences in exchange for the retention, sale, or sharing of personal information.',
      },
    ],
  },
  {
    id: 'retention',
    heading: '10. Data Retention',
    blocks: [
      {
        type: 'p',
        text: 'We retain personal information only for as long as we need it to provide the Services to you, or for other legitimate business purposes such as resolving disputes, maintaining safety and security, and complying with our legal obligations. How long we retain personal information depends on the type of information, how we use it, and in many cases your own choices:',
      },
      {
        type: 'ul',
        items: [
          {
            label: 'Information we retain until you delete it.',
            text: 'You can delete individual room videos, individual design projects, or your entire account at any time. When you do, we remove the corresponding information from our active systems within 30 days, unless we need to retain it for one of the reasons described below, or it has already been de-identified and disassociated from your account.',
          },
          {
            label: 'Information we retain for longer for legal, security, or safety reasons.',
            text: 'In some cases we retain information even after you delete it: transaction records, which we keep for 7 years to meet tax, accounting, and audit obligations; records we are legally required to preserve, which we keep for the duration of the relevant obligation; information needed to investigate or prevent fraud, abuse, or security incidents; and the audit record of a privacy request, which we keep for at least 24 months as required by California privacy regulations so that we can demonstrate that we complied with your request.',
          },
          {
            label: 'Factors we consider.',
            text: 'In setting these periods we consider our purpose for processing the information; the amount, nature, and sensitivity of the information; the potential risk of harm from unauthorized use or disclosure; whether the purpose can be achieved with de-identified or aggregated data; and any legal requirements that apply to us.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Where we maintain de-identified data, we maintain and use it only in de-identified form and do not attempt to re-identify it, as California privacy law requires of businesses that maintain de-identified data.',
      },
    ],
  },
  {
    id: 'security',
    heading: '11. Security',
    blocks: [
      {
        type: 'p',
        text: 'We maintain reasonable administrative, technical, and physical safeguards appropriate to the nature of the personal information we process, consistent with the reasonable-security requirements of California law and the New York SHIELD Act. These include encryption of personal information and sensitive personal information in transit and at rest with managed key controls; single sign-on and multi-factor authentication for administrative access; role-based, least-privilege access controls with periodic reviews; centralized, tamper-resistant audit logging with anomaly alerting; vendor security due diligence and contractual safeguards; a written information security program reviewed at least annually; and an incident response plan reflecting the breach-notification laws of all U.S. states.',
      },
      {
        type: 'p',
        text: 'No method of transmission or storage is completely secure. If we become aware of a security incident affecting your personal information, we will notify you and regulators as required by applicable law. If you have reason to believe your interaction with us is no longer secure, please contact us immediately at info@philo.homes.',
      },
    ],
  },
  {
    id: 'california-rights',
    heading: '12. Your California Privacy Rights',
    blocks: [
      {
        type: 'p',
        text: 'If you are a California resident, you have the following rights, subject to legal exceptions:',
      },
      {
        type: 'ul',
        items: [
          {
            label: 'Right to Know / Access.',
            text: 'To request the categories of personal information we have collected about you, the categories of sources, our purposes, the categories of recipients, and the specific pieces of personal information we hold, delivered in a portable and readily usable format.',
          },
          {
            label: 'Right to Delete.',
            text: 'To request deletion of personal information we collected from you. Where a statutory exception applies (for example, completing a transaction, security, or legal obligations), we will document the exception relied upon. We will also direct our service providers and contractors to delete, and notify third parties to whom we sold or shared the information, unless doing so is impossible or involves disproportionate effort.',
          },
          {
            label: 'Right to Correct.',
            text: 'To request correction of inaccurate personal information, taking into account the nature of the information and purposes of processing. We will also instruct our service providers to correct the information.',
          },
          { label: 'Right to Opt Out of Sale/Sharing.', text: 'As described in Section 9.' },
          {
            label: 'Right to Limit Use of Sensitive Personal Information.',
            text: 'Not applicable at this time, because we use sensitive personal information only for permitted purposes — see Section 2.4.',
          },
          {
            label: 'Right to Non-Discrimination.',
            text: 'We will not discriminate or retaliate against you for exercising your rights.',
          },
        ],
      },
      { type: 'h3', text: '12.1 How to Exercise Your Rights' },
      {
        type: 'p',
        text: 'Because Philo Homes operates exclusively online and has a direct relationship with you, our designated method for submitting privacy rights requests is email. Requests may be submitted from either platform and apply to your account as a whole:',
      },
      {
        type: 'ul',
        items: [
          {
            label: 'Email:',
            text: 'info@philo.homes — please include “Privacy Request” in the subject line and tell us which right you wish to exercise.',
          },
        ],
      },
      { type: 'h3', text: '12.2 Verification and Response Timing' },
      {
        type: 'p',
        text: 'We will confirm receipt of a request to know, delete, or correct within 10 business days and describe our verification process, and we will respond substantively within 45 calendar days, extendable once by an additional 45 days with notice. We verify requests by matching information you provide against information in our systems; for requests involving specific pieces of personal information, we apply a higher verification standard and may request a signed declaration under penalty of perjury. Requests to access by default cover the 12 months preceding the request; you may request information beyond 12 months (for data collected on or after January 1, 2022), and we will provide it unless doing so proves impossible or would involve disproportionate effort. We maintain records of consumer requests for at least 24 months.',
      },
      { type: 'h3', text: '12.3 Authorized Agents' },
      {
        type: 'p',
        text: 'You may use an authorized agent to submit requests. We will require the agent to provide signed permission demonstrating authorization, and we may also require you to verify your identity directly with us or confirm that you granted the permission.',
      },
      { type: 'h3', text: '12.4 California “Shine the Light”' },
      {
        type: 'p',
        text: 'Under California’s “Shine the Light” law, California residents may request information about disclosure of personal information to third parties for those parties’ direct marketing purposes. Philo Homes does not disclose personal information to third parties for their own direct marketing purposes.',
      },
    ],
  },
  {
    id: 'other-state-rights',
    heading: '13. Privacy Rights in Other U.S. States',
    blocks: [
      {
        type: 'p',
        text: 'Residents of states with comprehensive privacy laws — including Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Montana, Delaware, New Hampshire, New Jersey, Kentucky, Maryland, Minnesota, and others as their laws take effect — may have the right to: confirm whether we process their personal data and access it; correct inaccuracies; delete personal data; obtain a portable copy; and opt out of targeted advertising, the sale of personal data, and certain profiling in furtherance of decisions that produce legal or similarly significant effects. We honor universal opt-out mechanisms (such as GPC) where required by state law.',
      },
      {
        type: 'p',
        text: 'You may exercise these rights through the methods in Section 12.1. If we decline to act on your request, you may appeal by replying to our response or by emailing us with the subject line “Privacy Appeal.” We will respond to appeals within the period required by your state’s law (generally 45 to 60 days). If your appeal is denied, you may contact your state Attorney General.',
      },
    ],
  },
  {
    id: 'childrens-privacy',
    heading: '14. Children’s Privacy',
    blocks: [
      {
        type: 'p',
        text: 'The Services are intended for individuals 18 years of age or older, and our registration flow includes an age confirmation step. The Services are not directed to minors, and we do not knowingly collect personal information from anyone under 18. If we learn that we have collected personal information from a child under 13 without verifiable parental consent as required by COPPA, we will delete it. If you believe a minor has provided us personal information, contact us at info@philo.homes. Restrictions on selling or sharing minors’ personal information are described in Section 9.1. Note that videos you upload may incidentally include children in your home; you control that content and can delete it as described in Sections 10 and 15.',
      },
    ],
  },
  {
    id: 'room-videos-and-others',
    heading: '15. Your Room Videos and Other People',
    blocks: [
      {
        type: 'p',
        text: 'You decide what to photograph or record and what to upload. Before uploading videos that include other identifiable individuals — such as family members, roommates, or guests — please make sure you have their permission. We encourage you to avoid capturing people, documents, screens, or other sensitive items that are not needed for design analysis. You can delete individual uploads and projects at any time through your account, as described in Section 10, and deletion requests are honored on both the Site and the App.',
      },
    ],
  },
  {
    id: 'international-users',
    heading: '16. International Users',
    blocks: [
      {
        type: 'p',
        text: 'The Services are operated from the United States and are intended for U.S. residents. If you access the Services from outside the United States, you understand that your personal information will be processed in the United States.',
      },
    ],
  },
  {
    id: 'changes',
    heading: '17. Changes to This Privacy Policy',
    blocks: [
      {
        type: 'p',
        text: 'We review this Privacy Policy at least once every 12 months and whenever our practices, the Services, or applicable law change, and we update the “Last Updated” date above with each revision. Prior versions are archived at https://philo.homes/privacy/archive.',
      },
      { type: 'p', text: 'How we notify you depends on the significance of the change:' },
      {
        type: 'ul',
        items: [
          {
            label: 'Material changes',
            text: '(for example, collecting new categories of personal information, using personal information for materially new purposes, beginning to sell or share personal information, materially extending retention periods, or changing how your uploaded videos are used, including for AI training): we will provide advance notice by email to your registered address and by prominent notice in the App and on the Site before the change takes effect. We will not collect new categories of personal information or use personal information for materially new purposes until the updated notice is in place, and we will not apply material changes retroactively to previously collected personal information without your consent where required by law.',
          },
          {
            label: 'Other changes',
            text: '(clarifications, formatting, updated legal references, non-material process adjustments): we will post the updated Policy with a revised “Last Updated” date.',
          },
        ],
      },
      {
        type: 'p',
        text: 'Your continued use of the Services after the effective date of an updated Policy constitutes acknowledgment of the update; where consent is required by law, we will obtain it.',
      },
    ],
  },
]

export const contact = {
  heading: '18. Contact Us; Accessibility',
  company: 'Maven Design LLC',
  address: '950 Green St, Ann Arbor, MI 48104',
  email: 'info@philo.homes',
  web: 'https://philo.homes',
  accessibility:
    'If you have a disability and need this Policy in an alternative format, contact us using the information above and we will provide it.',
}
