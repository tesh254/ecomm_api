import process from "process";
import dotenv from "dotenv";

let env = process.env.ENV;

dotenv.config();

const configuration = {
  mongo: {
    uri: process.env.DATABASE_URI
  },
  secretkey: process.env.SECRET_KEY,
  mail: {
    email: process.env.ZOHO_EMAIL,
    password: process.env.ZOHO_PASSWORD
  },
  protocol: process.env.PROTOCOL,
  ui: process.env.FRONTEND_URL,
  mpesa: {
    client_key: process.env.CONSUMER_KEY,
    client_secret: process.env.CONSUMER_SECRET,
    initiator_password: process.env.PASS,
    phone_number: process.env.PHONE_NUMBER,
    pass_key: process.env.PASS_KEY,
    party_b: process.env.PARTY_B
  },
  urls: {
    api_url: process.env.API_URL
  }
};

export default configuration;
