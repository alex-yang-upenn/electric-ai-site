/**
 * ─────────────────────────────────────────────────────────────
 *  REAL CONTACT INFO — edit this file only.
 *  Every email link, phone link, founder card, footer line and
 *  page metadata on the site reads from these values.
 * ─────────────────────────────────────────────────────────────
 */

export type Founder = {
  name: string;
  role: string;
  /** One line shown under the name on the team card. */
  bio: string;
  /** Full URL, or "" to hide the icon. */
  linkedin: string;
  /** Path under /public (e.g. "/images/team/jane.jpg"), or "" to show initials. */
  image: string;
};

export const siteConfig = {
  name: "ElectricAI Labs",
  shortName: "ElectricAI",
  domain: "electric-ai.link",
  url: "https://electric-ai.link",
  tagline: "The data layer for physical AI.",
  description:
    "ElectricAI Labs turns real-world expert video into structured training data for intelligent robots.",

  contact: {
    email: "alexyang@electric-ai.link",
    /** Human-readable form shown on the page. */
    phone: "+1 (408) 714-8735",
    /** Dial string used for the tel: link — digits and a leading + only. */
    phoneHref: "+14087148735",
    location: "Philadelphia, PA",
  },

  founders: [
    {
      name: "Chinmay Govind",
      role: "Co-founder & CEO",
      bio: "Robotics & computer vision. Previously building perception systems for autonomous vehicles.",
      linkedin: "https://www.linkedin.com/in/chinmaygovind",
      image: "/headshots/cgovind.jpeg",
    },
    {
      name: "Alex Yang",
      role: "Co-founder & CTO",
      bio: "Machine learning for video understanding and human motion capture.",
      linkedin: "https://www.linkedin.com/in/chuhua-yang",
      image: "/headshots/chukyang.jpg",
    },
  ] satisfies Founder[],

  social: {
    /** Full URLs, or "" to hide. */
    linkedin: "",
    x: "",
  },
};

/** Pre-filled mailto link used by every "Talk to us" button. */
export function mailto(subject = "Hello from electric-ai.link") {
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}`;
}
