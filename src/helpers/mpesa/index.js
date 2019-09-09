import { Mpesa } from "mpesa-api";
import config from "../../config";

const credentials = {
  client_key: config.mpesa.client_key,
  client_secret: config.mpesa.client_secret,
  initiator_password: config.mpesa.initiator_password
};

const mpesa = new Mpesa(credentials, "sandbox");

export default mpesa;
