import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const Email = () => {
  const form = useRef();
  const mail = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    console.log(process.env.REACT_APP_EMAIL_SERVICEID, process.env.REACT_APP_EMAIL_TEMPLATEID, form.current, process.env.REACT_APP_EMAIL_PUBLICKEY);

    emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICEID, process.env.REACT_APP_EMAIL_TEMPLATEID, form.current, process.env.REACT_APP_EMAIL_PUBLICKEY)
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

  };



  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Email</label>
      <input type="email" name="user_email" />
      <input type="submit" value="Send" />
    </form>
  );
};