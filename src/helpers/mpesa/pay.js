import config from "../../config";

const mpesaPaymentMethod = (amount, phoneNumber, id) => {
    return {
        BusinessShortCode: 174379,
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: config.mpesa.party_b,
        PhoneNumber: phoneNumber,
        CallBackURL: `${config.urls.api_url}/api/v1/confirm/${id}`,
        AccountReference: "account",
        passKey: config.mpesa.pass_key,
        TransactionType: "CustomerPayBillOnline",
        TransactionDesc: "Transaction Description"
    }
}

export default mpesaPaymentMethod;
