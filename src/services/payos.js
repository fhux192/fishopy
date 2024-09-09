import express from "express";
import cors from "cors";
import PayOS from "@payos/node";
import dotenv from "dotenv";
dotenv.config();

const cliID = process.env.Client_ID;
const apiID = process.env.Api_Key;
const checksumKey = process.env.Checksum_Key;
const app = express();

const payOS = new PayOS(cliID, apiID, checksumKey);

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/create-payment-link", async (req, res) => {
  console.log("API /create-payment-link được gọi");
  const YOUR_DOMAIN = `http://localhost:5173`;
  const order = {
    orderCode: Number(String(Date.now()).slice(-6)),
    amount: 2000,
    description: "Thanh toan don hang",
    items: [
      {
        name: "cá Guppy",
        quantity: 1,
        price: 20000,
      },
    ],
    returnUrl: `/`,
    cancelUrl: `/`,
  };

  try {
    const paymentLinkResponse = await payOS.createPaymentLink(order);

    res.redirect(paymentLinkResponse.checkoutUrl);
  } catch (error) {
    console.error("Error occurred: ", error.message);
    res.status(500).send("Something went wrong. Please try again later.");
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
