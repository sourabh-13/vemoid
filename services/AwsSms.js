'use strict';
/**
 * TODO: Change name to the file to: AwsSms Service
 * TODO: Move sqs method to new file, and Update credentials with cerisupa02@gmail.com account.
 * */
let AWS = require('aws-sdk');
const REGION = "us-east-1";
AWS.config.update({ region: REGION });
const { CODE_AREA_DEFAULT, SENDER_ID_DEFAULT, MAX_PRICE, SMS_TYPE } = require("../configuration/constants");
var Mustache = require("mustache");

const accessKeyId = process.env.AWS_CREDENTIALS_KEY;
const secretAccessKey = process.env.AWS_CREDENTIALS_SECRET;

/**
 * Update credentials with other  AWS account
 */
AWS.config.update(
    {
        accessKeyId,
        secretAccessKey,
        REGION
    }
);

module.exports.sendSms = async (message, phone, params) => {

    var customTags = ['${', '}'];
    message = Mustache.render(message, params, {}, customTags);

    let attributes = {
        "AWS.SNS.SMS.SenderID": {
            StringValue: SENDER_ID_DEFAULT,
            DataType: "String"
        },
        "AWS.SNS.SMS.MaxPrice": {
            StringValue: MAX_PRICE,
            DataType: "Number"
        },
        "AWS.SNS.SMS.SMSType": {
            StringValue: SMS_TYPE,
            DataType: "String"
        }
    }
    let paramsSms = {
        Message: message, /* required */
        PhoneNumber: await processPhone(phone),
        MessageAttributes: attributes
    };
    return await new AWS.SNS({ apiVersion: '2010-03-31' }).publish(paramsSms).promise();
};

module.exports.deleteMessage = async(urlSqs,receipt)=>{
    let paramsSqsDelete = {
        QueueUrl:urlSqs,
        ReceiptHandle: receipt
    }

    return await new AWS.SQS({apiVersion: '2012-11-05'}).deleteMessage(paramsSqsDelete).promise();
};

async function processPhone(phone) {
    if (!phone.startsWith("+")) {
        phone = CODE_AREA_DEFAULT + phone;
    }
    return phone;
}