"use client";
import Image from "next/image";
import PrimaryButton from "../buttons/PrimaryButton";
import { Link } from "@heroui/react";
import { FaPhone, FaWhatsapp } from "react-icons/fa6";
import ProtectPersonalData from "../modals/legals/ProtectPersonalData";
import TermsConditions from "../modals/legals/TermsConditions";
import LawConsumer from "../modals/legals/LawConsumer";
import RulesClientsTIC from "../modals/legals/RulesClientsTIC";

const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center bg-black px-8 pt-4 pb-8 md:px-12 lg:px-16 xl:px-20">
      <div className="flex w-full max-w-screen-xl items-center justify-between max-md:flex-col max-md:items-start">
        <Image
          width={400}
          height={146}
          src="/logo-footer.png"
          alt="logo ubnet"
          className="max-lg:w-1/2"
          unoptimized
        />
        <address className="flex flex-col items-start gap-2.5 text-white not-italic md:items-end">
          <h6 className="font-medium">Nuestro contacto</h6>
          <PrimaryButton
            color="secondary"
            as={Link}
            target="_blank"
            startContent={<FaPhone />}
            className="pl-6"
            href="tel:08103421001"
          >
            0810 342 1001
          </PrimaryButton>
          <PrimaryButton
            color="secondary"
            startContent={<FaWhatsapp className="size-5" />}
            target="_blank"
            className="pl-6"
            as={Link}
            href="https://wa.me/+542974738886"
          >
            297 473 8886
          </PrimaryButton>
          <p className="text-xs md:text-sm xl:text-base">
            Todos los días de 9hs a 21hs
          </p>
        </address>
      </div>
      <nav className="mt-4 flex w-full max-w-screen-xl flex-col items-start justify-end md:gap-4 lg:flex-row lg:items-center">
        <ProtectPersonalData />
        <TermsConditions />
        <LawConsumer />
        <RulesClientsTIC />
      </nav>
      <hr className="my-4 w-full max-w-screen-xl text-white" />
      <Link href="https://dutsiland.com" target="_blank">
        <Image
          width={170}
          height={30}
          className="max-md:w-1/2"
          src="/dutsiland.png"
          alt="logo dutsiland"
          unoptimized
        />
      </Link>
    </footer>
  );
};

export default Footer;
