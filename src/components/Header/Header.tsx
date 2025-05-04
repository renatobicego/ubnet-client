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
  const [isLightMode, setIsLightMode] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const { isLightSection } = useIntersectionObserver();

  useEffect(() => {
    setIsLightMode(isLightSection);
  }, [isLightSection]);

  const bgColor = isLightMode ? "bg-primary/50" : "bg-white/20";
  return (
    <Navbar
      ref={headerRef}
      classNames={{
        wrapper: "w-full max-w-full h-12 md:h-14 px-0",
        base: `max-w-screen-xl w-auto px-4 md:px-8 rounded-full top-4 ${bgColor} transition transition-all backdrop-blur-2xl backdrop-saturate-100
         mx-4 md:mx-12 lg:mx-16 xl:mx-20 2xl:!mx-auto`,
      }}
      isBlurred
      id="nav-bar-header"
    >
      <NavbarBrand>
        <Image src="/logo.png" alt="logo ubnet" className="max-md:w-20" />
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 lg:flex" justify="center">
        <NavbarItem>
          <Link className={"text-white"} href="#">
            Avisos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link aria-current="page" className={"text-white"} href="#">
            Servicios
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className={"text-white"} href="#">
            Mapa de Cobertura
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className={"text-white"} href="#">
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
