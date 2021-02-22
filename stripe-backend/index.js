const cors = require("cors");
const express = require("express");
const stripe = require("stripe")(
  "sk_test_51IMui2D1ZAAT2oHxbTzJsidcFpjDUqYhm2fGpF5dYItdmvlqBxBD4BILztWHiU2u8tC62ZzXBFudCP5su9vwTEES00Z9qCwa7Q"
);

const { v4: uuidv4 } = require("uuid"); //A universally unique identifier. This is used to prevent re-transactions for same user, by assigning a uuid to each transactions
const app = express();

//middlewares

app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/payment", (req, res) => {
  console.log(req);
  if (req.body.length == 0) return;
  const { token, product } = req.body;
  console.log("token:" + token);
  const idempontencyKey = uuidv4();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "INR",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).send(result))
    .catch((err) => console.log(err));
});

//Listener
app.listen(3005, () => console.log("Listening at port 3005"));
