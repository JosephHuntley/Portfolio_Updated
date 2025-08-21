import React, { useRef } from "react";
import { ContactForm, Input, TextArea } from "./ContactStyles";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/globalComponents";
import Button from "../../styles/globalComponents/Button";
import emailjs from "@emailjs/browser";

const Contact = () => {
  /*Variables to change*/

  const phoneNumber = "1+ (810) 620-9271";

  /*Snippet to use EmailJS*/

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_til6mtc",
        "template_irmcgod",
        form.current,
        "2ww_yCiN-d0Mh90vX",
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        },
      );
    e.target.reset();
    alert(`Your message has sent`);
  };
  return (
    <Section>
      <SectionTitle main>Contact Me</SectionTitle>
      <ContactForm ref={form} onSubmit={sendEmail}>
        <Input type="text" name="name" placeholder="Your Full Name" required />
        <Input
          type="text"
          name="email"
          placeholder="Your Email Address"
          required
        />
        <TextArea
          name="message"
          rows="7"
          placeholder="Your Message"
          required
        ></TextArea>
        <Button type="submit">Send Message</Button>
      </ContactForm>

      <SectionDivider />
    </Section>
  );
};

export default Contact;
