import { useEffect, useState } from "react";

export const useIntersectionObserver = () => {
  const [isLightSection, setIsLightSection] = useState(false);

  useEffect(() => {
    // Function to check which section is behind the header
    const checkSectionBehindHeader = () => {
      const header = document.querySelector("#nav-bar-header") as HTMLElement;
      if (!header) return;

      // Get header position
      const headerRect = header.getBoundingClientRect();

      // Define a point in the middle of the header to check
      const checkX = window.innerWidth / 2; // Center of the screen horizontally
      const checkY = headerRect.top + headerRect.height / 2; // Middle of the header vertically

      // Temporarily hide the header to see what's behind it
      const headerOriginalVisibility = header.style.visibility;
      const headerOriginalPointerEvents = header.style.pointerEvents;

      header.style.visibility = "hidden";
      header.style.pointerEvents = "none";

      // Now get the element at this point - this will be what's behind the header
      const elementBehindHeader = document.elementFromPoint(checkX, checkY);

      // Restore header visibility
      header.style.visibility = headerOriginalVisibility;
      header.style.pointerEvents = headerOriginalPointerEvents;

      if (elementBehindHeader) {
        // Find the closest parent section or the element itself that has data-observe="true"
        let currentElement: Element | null = elementBehindHeader;
        let observableSection: Element | null = null;

        while (currentElement) {
          if (currentElement.getAttribute("data-observe") === "true") {
            observableSection = currentElement;
            break;
          }
          currentElement = currentElement.parentElement;
        }

        // If we found a relevant section, check if it's a light section
        if (observableSection) {
          const isLight = observableSection.classList.contains("light-section");
          setIsLightSection(isLight);
        }
      }
    };

    // Use requestAnimationFrame for smooth performance
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkSectionBehindHeader();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check on initial load
    checkSectionBehindHeader();

    // Check on scroll
    window.addEventListener("scroll", onScroll, { passive: true });

    // Also check on resize as positions might change
    window.addEventListener("resize", checkSectionBehindHeader);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkSectionBehindHeader);
    };
  }, []);

  return { isLightSection };
};
