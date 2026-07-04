import React, { useRef, useState } from "react";
import { ContactForm, Input, TextArea, StatusMessage } from "./ContactStyles";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/globalComponents";
import Button from "../../styles/globalComponents/Button";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ text: "", type: "" });

    try {
      const response = await emailjs.sendForm(
        "service_til6mtc",
        "template_irmcgod",
        form.current,
        "2ww_yCiN-d0Mh90vX",
      );

      if (response.status !== 200) {
        throw new Error("Failed to send email");
      }

      setStatus({ text: "Your message has been sent successfully.", type: "success" });
      e.target.reset();
    } catch (error) {
      console.error(error);
      if (
        error?.text?.includes("email") ||
        error?.message?.includes("email")
      ) {
        setStatus({ text: "Please enter a valid email address.", type: "error" });
      } else {
        setStatus({
          text: "Sorry, something went wrong while sending your message. Please try again.",
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <SectionTitle main>Contact Me</SectionTitle>
      <ContactForm ref={form} onSubmit={sendEmail}>
        <Input type="text" name="name" placeholder="Your Full Name" required />
        <Input
          type="email"
          name="email"
          placeholder="Your Email Address"
          required
        />
        <TextArea name="message" rows="7" placeholder="Your Message" required />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
        {status.text && (
          <StatusMessage $type={status.type} role="status" aria-live="polite">
            {status.text}
          </StatusMessage>
        )}
      </ContactForm>
      <SectionDivider />
    </Section>
  );
};

export default Contact;