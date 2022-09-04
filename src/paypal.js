import React, {useRef} from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import emailjs from '@emailjs/browser';

export default function PaypalContainer() {
  const PAYMENT_CURRENCY = "USD";
  const amount = {
    currency_code: PAYMENT_CURRENCY,
    value: "10"
  };

  const form = useRef();

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

  function createOrder(data, actions) {
    // throw new Error("force the createOrder callback to fail");
    return actions.order.create({
      purchase_units: [
        {
          amount,
          shipping: {
            // name: "Hello Brother",
            // method: "United States Postal Service",
            name: {
              full_name: "John"
            },
            type: "SHIPPING",
            address: {
              address_line_1: "test",
              address_line_2: "test",
              admin_area_2: "asd",
              admin_area_1: "CA",
              postal_code: "95131",
              country_code: "US"
            }
          }
        }
      ]
      // application_context: {
      //   shipping_preference: "NO_SHIPPING"
      // }
    });
  }

  function oninit(data, actions) {
    // actions.disable();
    // return actions.disable();
    console.log("inside init");
  }
  function onClick(data, actions) {
    // actions.disable();
    console.log("inside click");
    // return actions.resolve();
  }
  function onApprove(data, actions) {
    console.log("data", data);
    // return actions.order.authorize().then((details) => {
    //   console.log(details);
    //   console.log(details.purchase_units[0].payments.authorizations[0].id);
    // });
    form.current.onSubmit();
  }
  function onError(err) {
    console.error("error from the onError callback", err);
  }
  return (
    <>
        <form ref={form} onSubmit={sendEmail}>
            <label>Email</label>
            <input type="email" name="user_email" />
        </form>
      <PayPalScriptProvider
        options={{
          "client-id": process.env.REACT_APP_PAYPALID,
          components: "buttons",
          intent: "authorize",
        //   commit: false,
        //   "disable-funding": "credit,card"
        }}
      >
        <PayPalButtons
          style={{ color: "white", label: "checkout" }}
          createOrder={createOrder}
          onClick={onClick}
          onApprove={onApprove}
          onError={onError}
          onInit={oninit}
        />
      </PayPalScriptProvider>
 
    </>
  );
}
