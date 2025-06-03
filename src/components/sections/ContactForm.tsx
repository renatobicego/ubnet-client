"use client";
import { addToast, Form, Image, Input, Link, Textarea } from "@heroui/react";
import React from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import { FaPhone, FaWhatsapp } from "react-icons/fa6";
import useWeb3Forms from "@web3forms/react";
import { useForm } from "react-hook-form";
const ContactForm = () => {
  const { handleSubmit, register } = useForm();
  const { submit: onSubmit } = useWeb3Forms({
    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
    settings: {
      from_name: "Ubnet Web",
      subject: "Nuevo mensaje de contacto",
    },
    onSuccess: () => {
      addToast({
        title: "Mensaje enviado",
        description:
          "Gracias por contactarnos, nos pondremos en contacto pronto.",
        color: "success",
      });
    },
    onError: () => {
      addToast({
        title: "Error al enviar el mensaje",
        description: "Por favor, intente nuevamente más tarde.",
        color: "danger",
      });
    },
  });

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
        id="contacto"
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
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex w-full items-center gap-4 max-md:flex-col">
              <Input
                isRequired
                radius="lg"
                errorMessage="Por favor, ingrese su nombre completo"
                label="Nombre Completo"
                placeholder="Ingrese su nombre completo"
                type="text"
                {...register("nombre", { required: true })}
              />

              <Input
                isRequired
                radius="lg"
                errorMessage="Por favor, ingrese un correo electrónico válido"
                label="Correo Electrónico"
                {...register("email", { required: true })}
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
                {...register("telefono", { required: true })}
                placeholder="Ingrese su número de teléfono"
                type="tel"
              />

              <Input
                isRequired
                radius="lg"
                errorMessage="Por favor, ingrese su localidad"
                label="Localidad"
                {...register("localidad", { required: true })}
                placeholder="Ingrese su localidad"
                type="text"
              />
            </div>
            <Textarea
              isRequired
              radius="lg"
              errorMessage="Por favor, ingrese su consulta"
              label="Consulta"
              {...register("mensaje", { required: true })}
              placeholder="Ingrese su consulta"
              type="text"
              className="w-full"
            />
            <div className="flex w-full flex-row items-start justify-between gap-4">
              <PrimaryButton
                color="secondary"
                type="submit"
                className="text-primary"
              >
                Enviar
              </PrimaryButton>
              <address className="flex flex-col items-start gap-2.5 text-white not-italic md:items-end">
                <div className="flex items-end gap-2 max-md:flex-col md:items-center">
                  <PrimaryButton
                    color="secondary"
                    className="pl-6 text-white"
                    variant="bordered"
                    as={Link}
                    target="_blank"
                    startContent={<FaPhone />}
                    href="tel:08103421001"
                  >
                    0810 342 1001
                  </PrimaryButton>
                  <PrimaryButton
                    color="secondary"
                    className="pl-6 text-white"
                    variant="bordered"
                    startContent={<FaWhatsapp className="size-5" />}
                    target="_blank"
                    as={Link}
                    href="https://wa.me/+5492974738886"
                  >
                    297 473 8886
                  </PrimaryButton>
                </div>
                <p className="text-xs md:text-sm xl:text-base">
                  Lunes a viernes de 9hs a 21hs
                </p>
              </address>
            </div>
          </Form>
        </article>
      </section>
    </>
  );
};

export default ContactForm;
