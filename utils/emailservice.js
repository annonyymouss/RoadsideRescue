const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const SendEmailFunction = async (from, to, subject, text) => {
  try {
    const mg = mailgun.client({
      username: "api",
      key: process.env.MAILGUN_API_KEY,
    });

    mg.messages.create("sandboxb41e0afe906849e9946c1f2b66241c9d.mailgun.org", {
      from: from,
      to: to,
      subject: subject,
      text: text,
    });
  } catch (e) {
    return e;
  }
};

module.exports = SendEmailFunction;
