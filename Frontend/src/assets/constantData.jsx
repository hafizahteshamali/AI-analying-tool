import {
  FaCheckSquare,
  FaEnvelope,
  FaFacebook,
  FaFileContract,
  FaPhoneAlt,
  FaRegCheckCircle,
  FaRegClock,
  FaUser,
} from "react-icons/fa";
import { FaInstagram, FaLocationDot, FaWhatsapp } from "react-icons/fa6";
import { IoCheckmarkDoneCircleOutline, IoCloseCircleOutline } from "react-icons/io5";
import { PiChatBold } from "react-icons/pi";

export const footerData = [
  {
    heading: "Links",
    bullets: [
      {
        linkText: "Impressum",
        textLink: "/",
      },
      {
        linkText: "Datenschutz",
        textLink: "/",
      },
      {
        linkText: "Kontakt",
        textLink: "/",
      },
    ],
  },
  {
    heading: "Quick Link",
    bullets: [
      {
        linkText: "Privacy Policy",
        textLink: "/",
      },
      {
        linkText: "Terms Of Use",
        textLink: "/",
      },
      {
        linkText: "FAQ",
        textLink: "/",
      },
    ],
  },
  {
    heading: "Support",
    bullets: [
      {
        linkText: "Austria",
        textLink: "/",
      },
      {
        linkText: "rentalcontract@gmail.com",
        textLink: "/",
      },
      {
        linkText: "+47 00 000 0000",
        textLink: "/",
      },
    ],
  },
];

export const NavigationData = [
  {
    text: "Heim",
    url: "/",
  },
  {
    text: "Wie es funktioniert",
    url: "/how-it-works",
  },
  {
    text: "Vertrag hochladen",
    url: "/score",
  },
  {
    text: "Über uns",
    url: "/about-us",
  },
  {
    text: "FAQ",
    url: "/faqs",
  },
  {
    text: "Kontakt",
    url: "/contact",
  },
];

export const AdminRoutes = [
  {
    url: "", // becomes '/admin'
    text: "Überblick",
  },
  {
    url: "contract-analysis", // becomes '/admin/contract-analysis'
    text: "KI-Vertragsanalysetool",
  },
  {
    url: "training-area",
    text: "Trainingsbereich",
  },
  {
    url: "subscribers",
    text: "Abonnement",
  },
];

export const loginUserOptions = [
  {
    path: "/admin",
    text: "Admin-Panel",
  },
  {
    path: "/admin/subscription",
    text: "Abonnement",
  },
];

export const PremiumOptionRoutesData = [
  {
    path: "/admin/subscription",
    icon: "/assets/images/Admin/ci_chat.png",
    text: "Chat",
    description:
      "Erstellen Sie aus der Analyse heraus neue Mietvertragsklauseln",
  },
  {
    path: "/admin/subscription",
    icon: "/assets/images/Admin/formkit_file.png",
    text: "Mandatsverwaltung",
    description:
      "Verwalten Sie Mandate, die aus analysierten Mietverträgen entstehen",
  },
  {
    path: "/admin/subscription",
    icon: "/assets/images/Admin/message.png",
    text: "E-Mail-Vorlagen",
    description:
      "Verwenden Sie Kl-generierte E-Mail-Vorlagen zur Mandantenkommunikation",
  },
  {
    path: "/admin/subscription",
    icon: "/assets/images/Admin/ep_connection.png",
    text: "API-Integration",
    description: "Binden Sie Mandate über eine API an ein externes System an",
  },
];

export const bannerData = {
  lgHeading: "Ihr Mietvertrag auf dem Prüfstand – Schnell & Sicher!",
  para: "Laden Sie Ihren Mietvertraghoch und lassen Sie unsere KI überprüfen, ob Ihre Rechte gewahrt sind.",
  btnText: "Jetzt Vertrag hochladen",
};

export const howItWorksData = {
  smHeading: "Laden Sie Ihren Vertrag hoch",
  lgHeading: "So funktioniert es!",
  description:
    "Laden Sie Ihren Mietvertrag hoch, lassen Sie ihn von unserer KI automatisch prüfen und erhalten Sie im Handumdrehen einen detaillierten Analysebericht mit klaren Empfehlungen. Schnell, sicher und intuitiv!",
};

export const howWorksCardsData = [
  {
    imgUrl: "./assets/images/Home/encrypt-icon.png",
    heading: "Vertrag hochladen – Sicher und verschlüsselt.",
    para: "Laden Sie Ihren Vertrag unkompliziert per Drag & Drop oder Dateiauswahl hoch. Während des Uploads wird Ihre Dateimit modernster Verschlüsselung geschützt, sodass Ihre Daten jederzeit sicher und vertraulich bleiben.",
  },
  {
    imgUrl: "./assets/images/Home/ai-icon.png",
    heading: "KI-Analyse – Automatische Prüfung relevanter Klauseln.",
    para: "Unsere fortschrittliche KI scannt Ihren Vertrag in Sekunden und identifiziert automatisch alle wichtigen Klauseln, um potenzielle Risiken präzise aufzudecken.",
  },
  {
    imgUrl: "./assets/images/Home/analyses-icon.png",
    heading:
      "Ergebnis erhalten – Detaillierte Analyse und Handlungsempfehlungen.",
    para: "Erhalten Sie in kürzester Zeit einen detaillierten Bericht, der Ihre Vertragsklauseln präzise analysiert und Ihnen klare, umsetzbare Empfehlungen für die nächsten Schritte liefert.",
  },
];

export const uploadRentalData = {
  heading: "Laden Sie Ihren Mietvertrag hoch und erhalten Sie eine Analyse!",
  para: "Unser KI-gestütztes System erleichtert die Überprüfung Ihres Mietvertrags auf potenzielle Probleme. In nur drei einfachen Schritten erhalten Sie eine detaillierte Analyse mit Empfehlungen.",
};

export const AboutSecData = {
  heading: "Über uns",
  description:
    "Wir haben eine KI zur Mietvertragsprüfung entwickelt, weil wir daran glauben, dass jeder Mieter das Recht auf transparente und faire Vertragsbedingungen hat. Unsere Lösung ermöglicht es Ihnen, Mietverträge schnell und unkompliziert auf potenzielle Risiken und unfaire Klauseln zu überprüfen. So möchten wir Missverständnisse und rechtliche Fallstricke im Mietverhältnis frühzeitig erkennen und Ihnen die Sicherheit geben, informierte Entscheidungen zu treffen.",
  imgUrl: "./assets/images/Home/about.jpg",
};

export const howItWorkObject = {
  img: "./assets/images/Home/howItWorks-img.jpg",
  head: "Wie es funktioniert",
  para: "Unser optimierter Prozess erleichtert die Analyse Ihres Mietvertrags in nur drei schnellen Schritten. Mit klaren Grafiken und intuitiven Symbolen werden Sie es schaffen Verstehen Sie jeden Schritt auf einen Blick.",
};

export const howItWorkBullets = [
  {
    image: "./assets/images/Home/01.png",
    smHeading: "Vertrag hochladen",
    desc: "Ziehen Sie Ihren Mietvertrag mühelos per Drag & Drop in unser System. Ihre Datei wird beim Hochladen verschlüsselt, wodurch vollständiger Datenschutz und die Einhaltung von Sicherheitsstandards gewährleistet sind.",
  },
  {
    image: "./assets/images/Home/02.png",
    smHeading: "KI-Analyse",
    desc: "Unsere hochmoderne KI durchsucht Ihren Vertrag sofort nach wichtigen Klauseln wie Mietdauer, Kündigungsbedingungen, Nebenkosten und Mieterhöhungsregeln. Es stellt sicher, dass jedes wichtige Detail sorgfältig überprüft wird, ohne dass manuelle Eingriffe erforderlich sind.",
  },
  {
    image: "./assets/images/Home/03.png",
    smHeading: "Erhalten Sie Ergebnisse",
    desc: "Erhalten Sie einen umfassenden Bericht, der alle Probleme hervorhebt und klare, umsetzbare Empfehlungen bietet. Unsere detaillierte Analyseverschafft Ihnen die Erkenntnisse, die Sie benötigen, um Ihren Vertrag zu verstehen und fundierte Entscheidungen zu treffen.",
  },
];

export const itxSolutionImg = [
  "/assets/images/Home/LOGO-white.png",
  "/assets/images/Home/LOGO-white.png",
  "/assets/images/Home/LOGO-white.png",
  "/assets/images/Home/LOGO-white.png",
  "/assets/images/Home/LOGO-white.png"
];

export const accordionData = [
  {
    id: 0,
    question: "Was prüft die KI genau?",
    answer:
      "Ja, Ihre Sicherheit hat für uns höchste Priorität. Ihr Vertrag wird beim Upload verschlüsselt übertragen und sicher gespeichert. Wir halten uns strikt an die DSGVO sowie an branchenübliche Sicherheitsstandards, um den Schutz Ihrer sensiblen Daten zu gewährleisten.",
  },
  {
    id: 1,
    question: "Ist mein Vertrag sicher?",
    answer:
      "Ja, Ihre Sicherheit hat für uns höchste Priorität. Ihr Vertrag wird beim Upload verschlüsselt übertragen und sicher gespeichert. Wir halten uns strikt an die DSGVO sowie an branchenübliche Sicherheitsstandards, um den Schutz Ihrer sensiblen Daten zu gewährleisten.",
  },
  {
    id: 2,
    question: "Funktioniert die Analyse auch für handschriftliche Verträge?",
    answer:
      "Ja, Ihre Sicherheit hat für uns höchste Priorität. Ihr Vertrag wird beim Upload verschlüsselt übertragen und sicher gespeichert. Wir halten uns strikt an die DSGVO sowie an branchenübliche Sicherheitsstandards, um den Schutz Ihrer sensiblen Daten zu gewährleisten.",
  },
  {
    id: 3,
    question: "Kann ich nach der Analyse rechtliche Beratung erhalten?",
    answer:
      "Ja, Ihre Sicherheit hat für uns höchste Priorität. Ihr Vertrag wird beim Upload verschlüsselt übertragen und sicher gespeichert. Wir halten uns strikt an die DSGVO sowie an branchenübliche Sicherheitsstandards, um den Schutz Ihrer sensiblen Daten zu gewährleisten.",
  },
];

export const contactData = {
  heading: "Scheuen Sie sich nicht, mit uns Hallo zu sagen!",
  contactDetails: [
    {
      label: "Email:",
      value: "Itx-solution@info.com",
    },
    {
      label: "Phone:",
      value: "+42 000 000000",
    },
    {
      label: "Address:",
      value: "Austria Vienne",
    },
  ],
};

export const FooterData = [
  {
    bullets: [
      {
        linkText: "Impressum",
        textLink: "/",
      },
      {
        linkText: "Partner & Presse",
        textLink: "/",
      },
      {
        linkText: "Datenschutzrichtlinie",
        textLink: "/",
      },
      {
        linkText: "Allgemeine Geschäftsbedingungen",
        textLink: "/",
      },
    ],
  },
  {
    bullets: [
      {
        linkText: "Über uns",
        textLink: "/",
      },
      {
        linkText: "Kontakt",
        textLink: "/",
      },
      {
        linkText: "Vertrag hochladen",
        textLink: "/",
      },
      {
        linkText: "Wie es funktioniert",
        textLink: "/",
      },
    ],
  },
];

export const socialIcons = [
  {
    icon: <FaFacebook className="text-2xl text-[var(--white-color)]" />,
    url: "/",
  },
  {
    icon: <FaInstagram className="text-2xl text-[var(--white-color)]" />,
    url: "/",
  },
  {
    icon: <FaWhatsapp className="text-2xl text-[var(--white-color)]" />,
    url: "/",
  },
];

//Contact Page

export const connectTeamBannerData = {
  lgHeading: "Verbinden Sie sich mit unserem Team",
  para: "Großartig! Wir freuen uns, von Ihnen zu hören und lassen Sie uns gemeinsam etwas Besonderes beginnen. Rufen Sie uns für jede Anfrage an",
};

export const contactFormDetails = {
  heading: "Kontaktdaten",
  description:
    "Haben Sie Fragen zu unserem KI-Vertragsanalyseservice? Wir sind hier, um zu helfen! Wenn Sie Unterstützung benötigen, Feedback haben oder mehr über unseren Prozess erfahren möchten, nutzen Sie bitte das untenstehende Kontaktformular. Geben Sie Ihren Namen, Ihre E-Mail-Adresse und Ihre Nachricht ein. Einer unserer Teammitglieder wird umgehend antworten.",
  socialLinks: [
    {
      icon: (
        <FaEnvelope className="text-xl text-[var(--white-color)] border-none" />
      ),
      text: "Email:",
      value: "Itx-solution@info.com",
    },
    {
      icon: (
        <FaPhoneAlt className="text-xl text-[var(--white-color)] border-none" />
      ),
      text: "Phone:",
      value: "+42 000 000000",
    },
    {
      icon: (
        <FaLocationDot className="text-xl text-[var(--white-color)] border-none" />
      ),
      text: "Address:",
      value: "Austria Vienne",
    },
  ],
  contactLinks: [
    {
      iconUrl: <FaFacebook className="text-xl text-[var(--white-color)]" />,
      iconLink: "/",
    },
    {
      iconUrl: <FaInstagram className="text-xl text-[var(--white-color)]" />,
      iconLink: "/",
    },
    {
      iconUrl: <FaWhatsapp className="text-xl text-[var(--white-color)]" />,
      iconLink: "/",
    },
  ],
};

export const contactFAQsData = {
  lgHeading: "Häufig gestellte Fragen",
  subTitle: "Mehr als 500+ Kunden vertrauen darauf",
  imgUrl: "/assets/images/Contact/faqs-img.png",
};

//How It Works

export const howItWorksPageData = {
  lgHeading: "Laden Sie Ihren Mietvertrag hoch und erhalten Sie eine Analyse!",
  para: "Unser KI-gestütztes System erleichtert die Überprüfung Ihres Mietvertrags auf potenzielle Probleme. In nur drei einfachen Schritten erhalten Sie eine detaillierte Analyse mit Empfehlungen.",
};

export const howItWorksDetails = {
  smHeading: "Laden Sie Ihren Vertrag hoch",
  lgHeading: "So funktioniert es!",
  description:
    "Laden Sie Ihren Mietvertrag hoch, lassen Sie ihn von unserer KI automatisch prüfen und erhalten Sie im Handumdrehen einen detaillierten Analysebericht mit klaren Empfehlungen. Schnell, sicher und intuitiv!",
};

//About Us

export const AboutPageBannerData = {
  lgHeading: "Mit KI verborgene Erkenntnisse in Ihrem Mietvertrag freisetzen",
  para: "Unsere KI durchforstet Ihren Mietvertrag eingehend, um übersehene Details und potenzielle Risiken aufzudecken und Ihnen dabei zu helfen, Ihre Rechte selbstbewusst zu wahren.",
  greenBtnText: "Laden Sie Ihren Vertrag hoch",
  loginBtnText: "Log in",
  counters: [
    {
      numbers: "500+",
      text: "Tägliche Benutzer",
    },
    {
      numbers: "4500+",
      text: "erfolgreiche Verträge",
    },
    {
      numbers: "5000+",
      text: "zufriedene Kunden",
    },
  ],
};

export const ContractSolutionData = {
  smHeading: "Über uns",
  heading: "Ihre Vertragslösungen sind hier",
  description:
    "Wir sind der festen Überzeugung, dass Transparenz und Fairness in Verträgen für jeden zugänglich sein sollten. Aus diesem Grund haben wir unsere innovative KI-gestützte Vertragsanalyseplattform entwickelt, um Ihnen schnelle und zuverlässige Einblicke in Ihre Mietverträge zu ermöglichen. Wir möchten Ihnen dabei helfen, Ihre Rechte zu verstehen und potenzielle Risiken zu erkennen, damit Sie fundierte Entscheidungen mit Zuversicht treffen können.",
};

export const HowsWorkData = {
  smHeading: "Laden Sie Ihren Vertrag hoch",
  heading: "So funktioniert es!",
  para: "Laden Sie Ihren Mietvertrag hoch, lassen Sie ihn von unserer KI automatisch prüfen und erhalten Sie im Handumdrehen einen detaillierten Analysebericht mit klaren Empfehlungen. Schnell, sicher und intuitiv!",
};

export const PrivacyAndSecurityData = {
  heading: "Datenschutz und Sicherheit",
  para: "Ihre Privatsphäre hat für uns oberste Priorität. Wir verwenden modernste Verschlüsselung und befolgen strenge Datenschutzbestimmungen, einschließlich der DSGVO, um Ihre vertraulichenInformationen zu schützen. Vom sicheren Hochladen von Dokumenten bis hin zur vertraulichen Analyse ist jeder Schritt unseres Prozesses auf Ihre Sicherheit ausgelegt. Sie können darauf vertrauen, dass wir Ihre Daten mit größter Sorgfalt und Integrität behandeln.",
  img: "./assets/images/About/banner-img.png",
};

//FAQs Page

export const FAQsBannerData = {
  heading: "häufig gestellte Fragen",
  description:
    "Unser FAQ-Bereich bietet umfassende Antworten auf häufige Fragen zu unserem KI-gestützten Mietvertragsanalyseservice. Erfahren Sie, wie unser System funktioniert, welche Sicherheitsmaßnahmen wir verwenden und wie Sie Ihre Dokumente hochladen. Egal, ob Sie neu oder wiederkehrend sind,unsere FAQs bieten Ihnen die Einblicke, die Sie benötigen, um Ihre Rechte sicher zu wahren.",
  img: "./assets/images/FAQs/banner-img.png",
};

export const ExperienceData = {
  heading: "Erleben Sie Attentive in Aktion",
  para: "Vereinbaren Sie einen Termin zum Chatten und erfahren Sie, wie unsere KI-gestützte Analyse verborgene Erkenntnisse in Ihrem Mietvertrag freigibt, die Überprüfung vereinfacht und Ihre Rechte schützt.",
  inputPlaceholder: "Email",
  imgURl: "./assets/images/FAQs/experience-img.png",
};

//Admin Panel

export const overviewData = [
  {
    icon: <FaUser className="text-2xl text-[var(--black-color)] " />,
    text: "Total Users",
    value: "905",
  },
  {
    icon: <FaCheckSquare className="text-2xl text-[var(--black-color)] " />,
    text: "Active",
    value: "64",
  },
  {
    icon: <FaFileContract className="text-2xl text-[var(--black-color)] " />,
    text: "Contracts",
    value: "300",
  },
  {
    icon: <FaRegClock className="text-2xl text-[var(--black-color)] " />,
    text: "Open Trainings",
    value: "48",
  },
];

export const users = [
  {
    datum: "12.05.2024",
    benutzer: "Anna Becker",
    rolle: "Administrator",
    status: "Aktiv",
    abonnement: "Bearbeiten",
  },
  {
    datum: "12.05.2024",
    benutzer: "Max Schmidt",
    rolle: "Trainer",
    status: "inAktiv",
    abonnement: "Bearbeiten",
  },
  {
    datum: "09.05.2024",
    benutzer: "Tim Bauer",
    rolle: "Administrator",
    status: "Aktiv",
    abonnement: "Bearbeiten",
  },
  {
    datum: "09.05.2024",
    benutzer: "Laura Weber",
    rolle: "User",
    status: "Aktiv",
    abonnement: "Bearbeiten",
  },
];


export const subscriptionData = {
  heading: "Flexible",
  highlight: "Pläne",
  para: "Wählen Sie einen Plan, der für Sie und Ihr Team am besten geeignet ist."
} 

export const PlansData = [
  {
    pkgName: "Basic-Abo",
    para: "Nutzen Sie grundlegende Funktionen dieses Tools mit einem Basic-Abonnement.",
    symbol: "€",
    amount: "15",
    user: "/user",
    popular: false,
    bullets: [
      {
        bulletIcon: <FaRegCheckCircle className="text-[var(--secondary-color)]" />,
        text: "Begrenzte KI-Analyse von Verträgen"
      },
      {
        bulletIcon: <FaRegCheckCircle className="text-[var(--secondary-color)]" />,
        text: "Bericht-Download als PDF"
      },
      {
        bulletIcon: <FaRegCheckCircle className="text-[var(--secondary-color)]" />,
        text: "Erstellung per Chat-Prompt"
      },
      {
        bulletIcon: <IoCloseCircleOutline className="text-[#E00000]" />,
        text: " Keine Mandatsverwaltung"
      },
      {
        bulletIcon: <IoCloseCircleOutline className="text-[#E00000]" />,
        text: "Kein E-Mail-Versand"
      },
      {
        bulletIcon: <IoCloseCircleOutline className="text-[#E00000]" />,
        text: "Keine API-Integration"
      },
    ],
    btnText: "Plan wählen" 
  },
  {
    pkgName: "Premium-Abo",
    para: "Nutzen Sie alle Funktionen dieses Tools mit einem Premium-Abonnement.",
    symbol: "€",
    amount: "35",
    user: "/user",
    popular: true,
    bullets: [
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "unbegrenzte KI-Analyse von Verträgen"
      },
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "Bericht-Download als PDF"
      },
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "Erstellung per Chat-Prompt"
      },
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "Mandatsverwaltung"
      },
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "E-Mail-Versand"
      },
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "API-Integration"
      },
    ],
    btnText: "Plan wählen" 
  },
  {
    pkgName: "Pro-Abo",
    para: "Nutzen Sie grundlegende Funktionen dieses Tools mit einem Basic-Abonnement.",
    symbol: "€",
    amount: "25",
    user: "/user",
    popular: false,
    bullets: [
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "Begrenzte KI-Analyse von Verträgen"
      },
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "Bericht-Download als PDF"
      },
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "Erstellung per Chat-Prompt"
      },
      {
        bulletIcon: <FaRegCheckCircle  className="text-[var(--secondary-color)]" />,
        text: "Mandatsverwaltung"
      },
      {
        bulletIcon: <IoCloseCircleOutline className="text-[#E00000]" />,
        text: "Kein E-Mail-Versand"
      },
      {
        bulletIcon: <IoCloseCircleOutline className="text-[#E00000]" />,
        text: "Keine API-Integration"
      },
    ],
    btnText: "Plan wählen" 
  },
]