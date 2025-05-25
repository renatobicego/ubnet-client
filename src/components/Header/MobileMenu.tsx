import {
  useDisclosure,
  Button,
  Drawer,
  DrawerContent,
  DrawerBody,
  Link,
} from "@heroui/react";
import React from "react";

const MobileMenu = () => {
  const menuItems = [
    {
      label: "Avisos",
      href: "/#avisos",
    },
    {
      label: "Servicios",
      href: "/planes",
    },
    {
      label: "Mapa de Cobertura",
      href: "/cobertura",
    },
    {
      label: "Sobre Nosotros",
      href: "/sobre-nosotros",
    },
    {
      label: "Contacto",
      href: "/#contacto",
    },
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        variant="light"
        className="relative bg-transparent p-0 text-white"
        aria-label="Menu"
      >
        <div className="mb-0.5 flex h-6 w-6 flex-col items-center justify-center">
          <span
            className={`block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
              isOpen ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`my-1 block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 transform bg-current transition duration-300 ease-in-out ${
              isOpen ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </div>
      </Button>
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: "bg-white/20 backdrop-blur-2xl ",
          closeButton: "text-white top-4 right-6 p-0 [&>svg]:size-5",
        }}
      >
        <DrawerContent>
          <DrawerBody>
            <ul className="flex flex-col gap-4 pt-12">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;
