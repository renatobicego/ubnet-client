"use client";
import {
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import PrimaryButton from "../buttons/PrimaryButton";
import MobileMenu from "./MobileMenu";
import { useIntersectionObserver } from "@/utils/hooks/useIntersectionObserver";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Get the current section's dark/light status from the custom hook
  const { isDarkSection } = useIntersectionObserver();

  // Update the header mode based on the current section
  useEffect(() => {
    setIsDarkMode(isDarkSection);
  }, [isDarkSection]);

  const textColor = isDarkMode ? "text-white" : "text-black";
  return (
    <Navbar
      ref={headerRef}
      classNames={{
        wrapper: "w-full max-w-full h-12 md:h-14 px-0",
        base: "max-w-screen-xl w-auto px-4 md:px-8 rounded-full top-4 bg-white/20 backdrop-blur-2xl  backdrop-saturate-100 mx-4 md:mx-12 lg:mx-16 xl:mx-20 2xl:!mx-auto",
      }}
      isBlurred
    >
      <NavbarBrand>
        <Image src="/logo.png" alt="logo ubnet" className="max-md:w-20" />
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 lg:flex" justify="center">
        <NavbarItem>
          <Link className={textColor} href="#">
            Avisos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link aria-current="page" className={textColor} href="#">
            Servicios
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className={textColor} href="#">
            Mapa de Cobertura
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className={textColor} href="#">
            Sobre Nosotros
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <PrimaryButton>Contacto</PrimaryButton>
        </NavbarItem>
        <NavbarItem className="lg:hidden">
          <MobileMenu />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
