require("dotenv").config();
const formidable = require("formidable");
const https = require("https");
const { v4: uuidv4 } = require("uuid");

// import the PaytmChecksum to autheticate the payment requests
const PaytmChecksum = require("./PaytmChecksum");

exports.payment = (req, res) => {
  const { amount, email} = req.body;

  // prepare the request object
  let params = {};
  params["MID"] = "VldoBe87963153913375";
  params["WEBSITE"] = "WEBSTAGING";
  params["CHANNEL_ID"] = "WEB";
  params["INDUSTRY_TYPE_ID"] = "Retail";
  params["ORDER_ID"] = new Date().getTime();
  params["CUST_ID"] = email;
  params["TXN_AMOUNT"] = amount.toString();
  params["EMAIL"] = email;
  params["MOBILE_NO"] = 7777777777;
  params["CALLBACK_URL"] = "http://localhost:2021/paymentCallback";

  // use PaytmChecksum to generate a signature
  let paytmChecksum = PaytmChecksum.generateSignature(
    params,
	"ckrjUcTfi8KsYhET"
  );

  paytmChecksum
    .then((response) => {
      let paytmCheckSumResp = {
        ...params,
        CHECKSUMHASH: response,
      };
      res.json(paytmCheckSumResp);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error in Payment",
        error: error,
      });
    });
};

// checksum_lib.genchecksum(params, "ckrjUcTfi8KsYhET", function (err, checksum) {
// 	var param = {
// 		...params,
// 		CHECKSUMHASH: checksum
// 	}
// 	//console.log(param)
// 	res.json(param)
// });
// };
exports.paymentCallback = (req, res) => {
  // it is called by paytm system, Paytm server will send the trsaction details
  // we need to read this transaction details

  //   console.log(res);
  const form = new formidable.IncomingForm();

  form.parse(req, (error, fields, file) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error });
    }

    const checkSumHash = fields.CHECKSUMHASH;
    delete fields.CHECKSUMHASH;

    // verify the signature

    const isVerified = PaytmChecksum.verifySignature(
      fields,
	  "ckrjUcTfi8KsYhET" ,
      checkSumHash
    );

    if (isVerified) {
      // response is valid

      // get the transaction status from the paytm Server
      var params = {};
      params["MID"] = fields.MID;
      params["ORDER_ID"] = fields.ORDERID;

      PaytmChecksum.generateSignature(params,"ckrjUcTfi8KsYhET")
        .then((checksum) => {
          // go to the Paytm Server and get the payment status
          params["CHECKSUMHASH"] = checksum;
          const data = JSON.stringify(params);

          const options = {
            hostname: "securegw-stage.paytm.in",
            port: 443,
            path: "/order/status",
            method: "POST",
            header: {
              "Content-Type": "application/json",
              "Content-Length": data.length,
            },
            data: data,
          };
          var response = "";
          var request = https.request(options, (responseFromPaytmServer) => {
            responseFromPaytmServer.on("data", (chunk) => {
              response += chunk;
            });
            responseFromPaytmServer.on("end", () => {
              if (JSON.parse(response).STATUS === "TXN_SUCCESS") {
                // Success
                //res.send('Payment was SUCCESS');

                // (1) Save the order and payment details in MongoDB

                res.sendFile(__dirname + "/response.html");
              } else {
                // FAILURE
                //res.send('Payment was FAILURE');

                // (1) Save the order and payment details in MongoDB
                res.sendFile(__dirname + "/failure.html");
              }
            });
          });
          request.write(data);
          request.end();
        })
        .catch((error) => {
          res.status(500).json({
            message: "Error in Transaction",
            error: error,
          });
        });
    } else {
      // response is NOT Valid
      console.log("Checksum mismatch");
      res.status(500).json({ error: "It's a hacker !" });
    }
  });
};