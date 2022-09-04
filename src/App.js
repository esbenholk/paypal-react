import './App.css';
import {useRef} from "react";


import PaypalContainer from "./paypal.js"
import { Email } from "./email.js"

function App() {

  const startContent = useRef();
  const payContent = useRef();



  function changeContent(){
    console.log("click",  payContent.current);
    payContent.current.style.display = "block";
    startContent.current.style.display = "none"; 

  }
  return (
    <div className="App">

      <video autoPlay loop muted id="video">
          <source src={process.env.PUBLIC_URL + "/assets/aimix.mp4"} type="video/mp4"></source>
      </video>
      <header className="App-header">

        <div className='popup'>
          <div className='header'><p>X</p></div>
          <div ref={startContent} className='content'>
            <h1 className='blink'>CONGRATULATIONS</h1>
            <h1>U'VE GOT THE CHANCE TO</h1>
            <button className="button" onClick={changeContent}>PURCHASE CONTENT</button>
          </div>
          <div ref={payContent} className='content paycontent'>
            <Email/>
            <PaypalContainer/>
          </div>

        </div>
     
   
      </header>
    </div>
  );
}

export default App;
