require('dotenv').config();
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send WhatsApp Message
const sendWhatsAppMessage = async (to, contentVariables) => {
  try {
    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
      contentVariables: JSON.stringify(contentVariables),
      to: `whatsapp:${to}`,
    });
    console.log('WhatsApp Message Sent:', message.sid);
  } catch (error) {
    console.error('Error Sending WhatsApp Message:', error);
  }
};

// Send SMS
const sendSMS = async (to, body) => {
  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_SMS_FROM,
      to,
    });
    console.log('SMS Sent:', message.sid);
  } catch (error) {
    console.error('Error Sending SMS:', error);
  }
};

module.exports = { sendWhatsAppMessage, sendSMS };
