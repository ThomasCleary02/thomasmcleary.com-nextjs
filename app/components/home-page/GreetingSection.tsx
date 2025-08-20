'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GreetingContent from './GreetingContent';

interface GreetingSectionProps {
  greetingData: {
    greeting: string;
    weather: any;
    location: {
      city: string;
      region: string;
      country: string;
    } | null;
  };
}

export default function GreetingSection({ greetingData }: GreetingSectionProps): React.JSX.Element {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref}>
      {isInView && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94] // Custom easing curve
          }}
          className="w-full"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6, 
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="w-full"
          >
            <GreetingContent greetingData={greetingData} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
