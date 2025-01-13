import { stripIndents } from "common-tags";

// Emails

export const colabulaEmails = {
  main: "info@colabula.com",
  support: "support@colabula.com",
  privacy: "privacy@colabula.com",
};

// Main site labels

export const siteHeaderContent = {
  logo: {
    text: "Colabula",
    badge: "Beta",
  },
  productMenu: {
    trigger: "Product",
    items: [
      {
        title: "For students",
        href: "/product#students",
        description: "Learn how Colabula can help students excel",
      },
      {
        title: "For teachers",
        href: "/product#teachers",
        description: "Discover tools to enhance your teaching experience",
      },
      {
        title: "Features",
        href: "/product",
        description: "Explore all the features Colabula has to offer",
      },
    ],
  },
  schoolsMenu: {
    trigger: "Schools",
    items: [
      {
        title: "Schools",
        href: "/schools",
        description: "Solutions for secondary art education",
      },
      {
        title: "Case studies",
        href: "/schools#case-studies",
        description: "See how other institutions use Colabula",
      },
    ],
  },
  mobileMenu: {
    items: [
      {
        title: "Product",
        href: "/product",
        description: "Learn how Colabula can help students excel",
      },
      {
        title: "Schools",
        href: "/schools",
        description: "Educational institutions using Colabula",
      },
      {
        title: "Open Source",
        href: "/open-source",
        description: "Our commitment to open source",
      },
      {
        title: "Pricing",
        href: "/pricing",
        description: "Plans and pricing options",
      },
      {
        title: "Request a Demo",
        href: "/demo",
        description: "See Colabula in action",
      },
    ],
  },
  navigation: {
    openSource: "Open source",
    requestDemo: "Request a demo",
    login: "Log in",
    signup: "Sign up",
  },
};

export const siteFooterContent = {
  copyright: {
    company: "Cold Sundays, Ltd.",
  },
  links: [
    {
      title: "About us",
      href: "/about",
    },
    {
      title: "Status",
      href: "https://status.colabula.com",
    },
    {
      title: "Source code",
      href: "https://github.com/et0and/colabula",
    },
    {
      title: "Privacy Policy",
      href: "/privacy",
    },
    {
      title: "Terms of Service",
      href: "/tos",
    },
  ],
};

// Marketing landing content

export const heroContent = {
  title: "The all-in-one workspace for art teachers",
  subtitle: "Share. Grade. Collaborate.",
  ctaButton: "Get Colabula free",
  trustedByText: "Trusted by teachers at",
  imageAlt: "Illustration of a person using Colabula",
};

export const featuresContent = {
  title: "Get feedback from a community of educators.",
  description:
    "Connected to all secondary schools across Aotearoa, Colabula has a national network of teachers and educators.",
  featureOneTitle: "Instant tagging",
  featureOneDescription:
    "Let AI generate tags and identify key subject matter.",
  featureTwoTitle: "Open Source",
  featureTwoDescription: "Build upon an open source platform, licensed A-GPL.",
  featureThreeTitle: "Cloud import (upcoming)",
  featureThreeDescription:
    "Microsoft OneDrive, Google Drive, Dropbox and more - import directly from your work accounts",
};

export const getStartedContent = {
  title: "Because teachers deserve a better way",
};

export const productShowcaseContent = {
  title: "Built with teachers in mind",
  nceaFeatureCaption:
    "Refer to the appropriate Achievement Standard, whenever you need it",
  gradesFeatureCaption:
    "Give feedback through indicative grades tied to the NCEA system",
  globalSearchFeatureCaption: "Search for anything, anywhere",
  autoTaggingFeatureCaption:
    "Let AI (Llama Vision) handle auto-tagging of uploaded work",
  shareLinkFeatureCaption:
    "Share specific entries with others, or bookmark them for later",
  commentsFeatureCaption:
    "Threaded comments for better conversations with colleagues",
};

// Marketing pages

export const companyInfo = {
  coldSundays: {
    name: "Cold Sundays Ltd",
    url: "https://cold-sundays.com",
  },
  yufugumi: {
    name: "Yufugumi Holdings",
    url: "https://yufugumi.com",
  },
};

export const privacyPageContent = {
  title: "Privacy Policy",
  sections: [
    {
      heading: "Introduction",
      content: stripIndents`
        This Privacy Policy explains how Colabula, operated by ${companyInfo.coldSundays.name} 
        (a subsidiary of ${companyInfo.yufugumi.name}), collects, uses, and protects your 
        information when you use our platform.
      `,
    },
    {
      heading: "Data Collection and Analytics",
      content: stripIndents`
        We use Vercel Analytics as our analytics provider to collect non-identifiable 
        information about platform usage. This helps us improve our services and user
        experience. The collected data is anonymized and used solely for analytical purposes.
      `,
    },
    {
      heading: "Content Ownership and Rights",
      content: stripIndents`
        Colabula, ${companyInfo.coldSundays.name}, and ${companyInfo.yufugumi.name} do not claim ownership of any 
        content uploaded to the platform. All rights remain with the respective copyright 
        holders and authors.
      `,
    },
    {
      heading: "Teacher Responsibilities and Consent",
      content: stripIndents`
        Teachers must obtain explicit consent and permission from students
        (and their guardians where applicable) before uploading any student
        work to Colabula. This includes written consent for sharing student artwork,
        permission to use work for educational purposes, and clear communication about
        how the work will be used.
      `,
    },
    {
      heading: "Data Storage and Security",
      content: stripIndents`
        We store data using secure cloud infrastructure through Cloudflare R2. 
        All data transmissions are encrypted, and we implement industry-standard 
        security measures to protect your information.
      `,
    },
    {
      heading: "User Data and Privacy",
      content: stripIndents`
        We collect and store email addresses for authentication, user-generated content 
        (artwork, comments, feedback), and basic usage data for platform functionality.
      `,
    },
    {
      heading: "Open Source Commitment",
      content: stripIndents`
        Colabula is an open-source platform licensed under AGPL-3.0. Our commitment 
        to transparency extends to our privacy practices, and our source code is 
        publicly available for review.
      `,
    },
    {
      heading: "Changes to Privacy Policy",
      content: stripIndents`
        We reserve the right to update this privacy policy as needed. Users will be 
        notified of any significant changes.
      `,
    },
    {
      heading: "Contact Information",
      content: stripIndents`
        For privacy-related inquiries, please contact us at privacy@colabula.com.
      `,
    },
  ],
};

export const termsOfServiceContent = {
  title: "Terms of Service",
  sections: [
    {
      heading: "1. Acceptance of Terms",
      content: stripIndents`
        By accessing and using Colabula, you agree to be bound by these Terms
        of Service. If you do not agree to these terms, you may not use the
        platform.
      `,
    },
    {
      heading: "2. Use of the Platform",
      content: stripIndents`
        Colabula is provided for educational purposes. You agree to use the
        platform responsibly and in compliance with all applicable laws and
        regulations. You are responsible for all activity that occurs under
        your account.
      `,
    },
    {
      heading: "3. Content Ownership",
      content: stripIndents`
        Students retain full ownership of any content that their teachers
        upload to Colabula. Teachers and other parties may not use content
        published on Colabula for purposes outside of the platform without
        their explicit consent, or permission from their legal guardian(s).
      `,
    },
    {
      heading: "4. Prohibited Conduct",
      content: stripIndents`
        You agree not to use Colabula to:

        * Violate any applicable laws or regulations.
        * Infringe upon the intellectual property rights of others.
        * Upload or share any harmful, offensive, or inappropriate content.
        * Interfere with the operation of the platform.
      `,
    },
    {
      heading: "5. Disclaimer of Warranties",
      content: stripIndents`
        Colabula is provided "as is" without any warranties,
        express or implied. We do not guarantee the availability,
        reliability, or accuracy of the platform.
      `,
    },
    {
      heading: "6. Limitation of Liability",
      content: stripIndents`
        To the maximum extent permitted by law, Colabula shall not be liable
        for any damages arising from the use of the platform.
      `,
    },
    {
      heading: "7. Governing Law",
      content: stripIndents`
        These Terms of Service shall be governed by and construed in
        accordance with the laws of New Zealand.
      `,
    },
    {
      heading: "8. Changes to Terms",
      content: stripIndents`
        We reserve the right to update these Terms of Service at any time.
        You will be notified of any material changes.
      `,
    },
    {
      heading: "9. Contact Us",
      content: stripIndents`
        If you have any questions about these Terms of Service, please
        contact us at info@colabula.com.
      `,
    },
  ],
};

export const aboutPageContent = {
  title: "About Colabula",
  mainContent: stripIndents`
    Colabula is an open-source platform designed to empower teachers and
    facilitate the sharing of educational resources, specifically
    catering to visual arts education. Developed by Cold Sundays Ltd
    (a subsidiary of Yufugumi Holdings), Colabula aims to provide a secure and transparent environment for
    educators to collaborate, discover, and share inspiring artwork and
    teaching materials.
  `,
  sections: {
    mission: {
      title: "Our mission",
      content: stripIndents`
        We believe in fostering a vibrant community where teachers can
        connect, learn from each other, and access high-quality resources to
        enhance their teaching practice. By providing a dedicated platform
        for visual arts education, we strive to support creativity and
        innovation in the classroom.
      `,
    },
    promise: {
      title: "The Colabula Promise",
      content: stripIndents`
        We are committed to the long-term sustainability of Colabula and the
        valuable content shared within our community. We promise to provide
        full data exports to our users should the platform ever cease
        operations, ensuring the preservation of your valuable resources.
      `,
    },
  },
};

export const openSourcePageContent = {
  title: "Colabula is an open platform",
  sections: [
    stripIndents`
      Many educational technology companies have created products that seemed promising at first but eventually disappeared, leaving schools and students without the tools they depended on.
    `,
    stripIndents`
      Consider Pond - a shared education resources platform run by Network for Learning (N4L) that was once hugely popular with teachers in New Zealand, but was suddenly closed in 2019. Similarly, VisArtsNet, a very popular mailing list run by the Ministry of Education via the TKI Mailing List was recently shutdown, effectively deleting all content and conversations that had been shared there. Besides Facebook groups, there are no other alternatives for teachers to use to share resources with each other.
    `,
    stripIndents`
      While platforms such as Facebook and Instagram are convenient, free and easy to use, their privacy policies and terms of service means that any content submitted to these platforms is granted use by Meta for AI training, 3rd party advertising, and can be used for any purpose. This is not acceptable for a platform that is used to share educational resources.
    `,
    stripIndents`
      Open-source software like Colabula, which uses the AGPL 3.0 license, helps solve this problem by making its code freely available to everyone. Since the code is open for anyone to study, people can find and fix security problems quickly, and schools can trust that their data is being handled properly. Should Colabula in its current form ever shutdown, anyone has fork the code and host their own instance.
    `,
    stripIndents`
      Schools can also modify Colabula to work exactly the way they need it to, instead of having to follow what a company like Meta decides is best.
    `,
    stripIndents`
      By sharing our code openly, we intend to help others who want to create better educational software, leading to more innovation and greater outcomes for everyone.
    `,
    stripIndents`
      For the content and conversations published, we adhere to the "Colabula Promise" - we will provide full Postgres and storage exports to any parties wishing to host their own instance should Colabula ever fold.
    `,
    stripIndents`
      Colabula isn't just making software – we're building a group of people who care about making education better for everyone.
    `,
  ],
};

export const schoolsPageContent = {
  title: "Colabula is for schools",
  sections: [
    stripIndents`
      Colabula enables art teachers across New Zealand to collaborate and provide feedback on student work throughout the entire creative process, from initial sketches to final portfolios.
    `,
    stripIndents`
      Teachers can upload students' initial concepts and sketches, allowing colleagues from other schools to provide early guidance and suggestions. This early feedback can help identify promising directions and potential challenges before significant time is invested.
    `,
    stripIndents`
      As students develop their work, teachers can share updates and receive ongoing feedback. This iterative feedback process helps ensure students are on track with assessment criteria and enables them to benefit from diverse perspectives across the New Zealand art education community.
    `,
    stripIndents`
      Using Colabula's structured assessment tools, teachers can provide indicative grades and detailed feedback, helping to ensure consistency in assessment across different schools and regions.
    `,
    stripIndents`
      Through collaborative feedback and discussion, teachers can engage in ongoing professional development, sharing best practices and staying current with assessment standards and artistic trends.
    `,
    stripIndents`
      By fostering this collaborative environment, Colabula helps create a more connected and supportive art education community across New Zealand, ultimately benefiting both teachers and students in their artistic journey.
    `,
  ],
};

export const productPageContent = {
  title: "Colabula is constantly evolving",
  sections: [
    {
      content: stripIndents`
        The Colabula platform is designed to facilitate collaboration and
        feedback among art teachers across New Zealand.
      `,
    },
    {
      heading: "Progress tracking and sharing",
      content: stripIndents`
        Teachers can upload student artwork at various stages, from
        initial concepts to final portfolios. The platform supports
        various image formats with a file size limit of up to 50MiB per
        image, allowing for the sharing of high-resolution work. This
        feature enables colleagues to provide early guidance and iterative
        feedback, ensuring students are on track with assessment criteria.
      `,
    },
    {
      heading: "Collaborative feedback and discussion",
      content: stripIndents`
        Colabula fosters a national network of art educators, promoting
        ongoing professional development and the sharing of best
        practices. Teachers can engage in discussions, offer constructive
        critiques, and provide indicative grades using structured
        assessment tools, helping to maintain consistency in assessment
        across different schools and regions.
      `,
    },
    {
      heading: "Privacy and consent",
      content: stripIndents`
        The platform emphasizes the importance of student privacy.
        Teachers are required to obtain explicit consent from students and
        their guardians before uploading any artwork. Personal
        identifiable information is to be removed or obscured, and sharing
        is restricted to verified art educators within the network.
        Students retain the right to request the removal of their work,
        and the platform ensures the protection of their intellectual
        property.
      `,
    },
    {
      heading: "Technical features",
      list: [
        "Built using Next.js 15 and React 19 with App Router and TypeScript.",
        "Frontend design built using Tailwind CSS and Shadcn UI.",
        "PostgreSQL with Prisma ORM and Supabase for database management.",
        "Cloudflare R2 for secure cloud data storage.",
        "Licensed AGPL-3.0.",
      ],
    },
    {
      content: stripIndents`
        These features collectively aim to create a supportive and
        connected art education community, ultimately benefiting both
        teachers and students in New Zealand.
      `,
    },
  ],
};
// Portal content

export const portalNavigation = {
  navMain: [
    {
      title: "Browse",
      url: "#",
      items: [
        {
          title: "Painting",
          url: "/portal/painting",
          isActive: true,
        },
        {
          title: "Sculpture",
          url: "/portal/sculpture",
        },
        {
          title: "Design",
          url: "/portal/design",
        },
        {
          title: "Photography",
          url: "/portal/photography",
        },
      ],
    },
    {
      title: "Community",
      url: "#",
      items: [
        {
          title: "Recently added",
          url: "#",
        },
        {
          title: "Top rated",
          url: "#",
        },
        {
          title: "Recent discussion",
          url: "#",
        },
        {
          title: "Achievement standards",
          url: "https://www.nzqa.govt.nz/ncea/assessment/search.do?query=visual+arts&view=all&level=all",
        },
        {
          title: "Contribution guide",
          url: "/portal/contributing",
        },
      ],
    },
  ],
};

// Assessment levels information

export const assessmentLevelUrls = {
  "1": "https://www.nzqa.govt.nz/ncea/assessment/search.do?query=visual+arts&view=all&level=01",
  "2": "https://www.nzqa.govt.nz/ncea/assessment/search.do?query=visual+arts&view=all&level=02",
  "3": "https://www.nzqa.govt.nz/ncea/assessment/search.do?query=visual+arts&view=all&level=03",
};

export const assessmentLevelDescriptions = {
  "1.1":
    "This standard focuses on developing ideas in art making through understanding art works and cultural contexts",
  "1.2":
    "This standard focuses on using drawing methods and skills for recording information using wet and dry media",
  "1.3":
    "This standard focuses on producing a body of work informed by established practice",
  "1.4":
    "This standard focuses on producing a resolved work that demonstrates control of skills appropriate to cultural conventions",
  "2.1":
    "This standard focuses on examining and investigating art-making methods and ideas through practical inquiry within identified conventions",
  "2.2":
    "This standard focuses on using drawing methods to apply knowledge of conventions",
  "2.3":
    "This standard focuses on systematically clarifying ideas using drawing informed by established practice",
  "2.4":
    "This standard focuses on producing a systematic body of work that integrates conventions and regenerates ideas",
  "3.1":
    "This standard focuses on critically analysing methods and ideas from established practice",
  "3.2":
    "This standard focuses on extending ideas using drawing methods independently",
  "3.3":
    "This standard focuses on systematically clarifying ideas using drawing informed by established practice",
  "3.4":
    "This standard focuses on producing a systematic body of work that integrates conventions and regenerates ideas",
};
