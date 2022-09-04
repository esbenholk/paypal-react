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
  const custumerEmail = useRef();
  const paypalContainer = useRef();
  const successContainer = useRef();
  const failContainer = useRef();

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

            name: {
              full_name: "John"
            },
            type: "SHIPPING",
            address: {
              address_line_1: custumerEmail.current.value
            }
          }
        }
      ]
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
    paypalContainer.current.style.display = "none";
    successContainer.current.style.display = "block"; 
  }
  function onError(err) {
    console.error("error from the onError callback", err);
    paypalContainer.current.style.display = "none";
    failContainer.current.style.display = "block"; 
  }
  return (
    <>
    <div ref={paypalContainer}>
        <form ref={form} onSubmit={sendEmail}>
            <input type="email" className="email" name="user_email" />
        </form>
        <p>and pay me 10 [default valuta]</p>
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
 
    </div>
    <div className="hidden" ref={successContainer}>
        <h1>THANK U. CHECK UR MAIL. U'VE GOT PRODUCT</h1>
    </div>

    <div className="hidden" ref={failContainer}>
        <h1 className="blinking">failed</h1>
        <h1>we all fail sometimes</h1>
    </div>
    </>
  );
}
