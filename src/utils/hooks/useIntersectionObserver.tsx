import { useEffect, useState } from "react";

export const useIntersectionObserver = () => {
  const [isDarkSection, setIsDarkSection] = useState(true);

  useEffect(() => {
    // Function to determine if a section should use dark mode for the header
    const checkIfDarkSection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Only consider elements that are intersecting with the observation area
        if (entry.isIntersecting) {
          // Check if the intersecting section has the 'dark-section' class
          const isDark = entry.target.classList.contains("dark-section");
          setIsDarkSection(isDark);
        }
      });
    };

    // Create an observer with a threshold that triggers when 50% of the target is visible
    const observer = new IntersectionObserver(checkIfDarkSection, {
      threshold: 0.5,
      rootMargin: "-80px 0px 0px 0px", // Adjust based on header height
    });

    // Observe all sections that should affect the header
    const sections = document.querySelectorAll('section[data-observe="true"]');
    sections.forEach((section) => {
      observer.observe(section);
    });

    // Cleanup function to disconnect the observer when component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return { isDarkSection };
};
