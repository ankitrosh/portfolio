export interface SiteConfig {
  title: string;
  description: string;
  author: {
    name: string;
    bio: string;
    avatar?: string;
  };
  social: {
    github?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    email?: string;
  };
  siteUrl: string;
}

export const config: SiteConfig = {
  title: "Ankit's Journey",
  description: "A Website showcaasing my experience and projects",
  author: {
    name: "Ankit Roshan Talluri",
    bio: "I am a curious developer, currently pursuing my Master's in ECE at University of Washington, Seattle focusing coursework on AI/ML. I previously was a Full Stack Developer ~2 yrs of experience.",
    // avatar: "/images/avatar.jpg" // Uncomment and add your avatar image to public/images/
  },
  social: {
    github: "https://github.com/ankitrosh",
    linkedin: "https://www.linkedin.com/in/ankit-roshan-talluri-08866a318/",
    email: "talluriankit10@gmail.com",
  },
  // siteUrl: "https://volks-typo.example.com"
  siteUrl: "#",
};

// Export constants for SEO component
export const SITE_TITLE = config.title;
export const SITE_DESCRIPTION = config.description;
