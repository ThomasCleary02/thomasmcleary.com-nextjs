import { Variants } from 'framer-motion';

export const effects: Variants = {
  iconHover: {
    scale: 1.1,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const
    }
  },
  heroHover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const
    }
  },
  fadeIn: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  },
  fadeInUp: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  },
  slideIn: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  },
  cardHover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const
    }
  }
}; 