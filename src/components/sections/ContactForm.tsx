"use client";
import { Form, Image, Input, Textarea } from "@heroui/react";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";

const ContactForm = () => {
  return (
    <>
      <Image
        removeWrapper
        src="/wifi-bg.png"
        alt="iconos de wifi"
        className="absolute bottom-[30vh] z-0 !w-screen max-lg:hidden 2xl:bottom-[15vh]"
      />
      <Image
        removeWrapper
        src="/wifi-bg-small.png"
        alt="iconos de wifi"
        className="absolute bottom-[15%] z-0 !w-screen max-md:hidden md:bottom-[10%] lg:hidden"
      />
      <Image
        removeWrapper
        src="/wifi-bg-mobile.png"
        alt="iconos de wifi"
        className="absolute bottom-[10%] z-0 !w-screen md:hidden"
      />
      <section
        data-observe
        className="bg-primary/80 relative w-full rounded-2xl border border-white py-6 text-white md:rounded-4xl md:py-8 lg:py-10 xl:py-12"
      >
        <article className="relative z-10 mx-auto flex w-full flex-col items-center space-y-8 rounded-4xl p-6 md:p-10 xl:px-16 2xl:px-20">
          <header className="flex w-full flex-col items-center">
            <h4 className="title-2 text-center font-medium">¡Contactanos!</h4>
            <p className="mt-2 max-w-96 text-center">
              Contactáte con uno de nuestros vendedores y contratá tu plan
              ahora.
            </p>
          </header>
          <Form
            className="flex w-full flex-col gap-4 lg:w-3/4"
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.currentTarget));
              console.log(data);
            }}
          >
            <div className="flex w-full items-center gap-4 max-md:flex-col">
              <Input
                isRequired
                radius="lg"
                errorMessage="Por favor, ingrese su nombre completo"
                label="Nombre Completo"
                name="name"
                placeholder="Ingrese su nombre completo"
                type="text"
              />

              <Input
                isRequired
                radius="lg"
                errorMessage="Por favor, ingrese un correo electrónico válido"
                label="Correo Electrónico"
                name="email"
                placeholder="Ingrese su correo electrónico"
                type="email"
              />
            </div>
            <div className="flex w-full items-center gap-4 max-md:flex-col">
              <Input
                isRequired
                radius="lg"
                errorMessage="Por favor, ingrese un teléfono válido"
                label="Número de Teléfono"
                name="phone"
                placeholder="Ingrese su número de teléfono"
                type="tel"
              />

              <Input
                isRequired
                radius="lg"
                errorMessage="Por favor, ingrese su localidad"
                label="Localidad"
                name="location"
                placeholder="Ingrese su localidad"
                type="text"
              />
            </div>
            <Textarea
              isRequired
              radius="lg"
              errorMessage="Por favor, ingrese su consulta"
              label="Consulta"
              name="message"
              placeholder="Ingrese su consulta"
              type="text"
              className="w-full"
            />
            <PrimaryButton
              color="secondary"
              type="submit"
              className="text-primary"
            >
              Enviar
            </PrimaryButton>
          </Form>
        </article>
      </section>
    </>
  );
};

export default ContactForm;
