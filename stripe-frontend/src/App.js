import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";
const axios = require("axios");
function App() {
  ///asf
  const onToken = async (token) => {
    var data = JSON.stringify({
      token: token,
      product: { name: "Game from epic games", price: 100 },
    });

    var config = {
      method: "post",
      url: "localhost:3005/payment",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const result = await axios(config);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          token={onToken}
          name="Buy Game"
          amount={199 * 100} //amount * 100
        />
      </header>
    </div>
  );
}

export default App;
