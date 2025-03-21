const { MailServiceClient } = require('../../proto/generated/mailer/mailer_grpc_web_pb.js');
const { SendMailRequest } = require('../../proto/generated/mailer/mailer_pb');

const protocol = window.location.protocol;
const host = window.location.hostname;
const ref = `${protocol}//${host}`;


// mailer client to communicate with mailer api service
export const mailerClient = new MailServiceClient(ref+"/mailer", null, null);

// Creates a sendmail request
export const sendMailRequest = (email, password, to, subject, text, html) => {
    const request = new SendMailRequest();
    request.setEmail(email)
    request.setPass(password);
    request.setHtml(html);
    request.setSubject(subject);
    request.setTo(to);
    request.setText(text);
    return request;
}

// Register request method for sso api
export const SendMail = (email, to, subject, text, html) => {
    const password = process.env.GMAIL_EXTERNAL_PASSWORD; //пароль на стороне бэкэнда
    return new Promise((resolve, reject) => {
        const request = sendMailRequest(email, password, to, subject, text, html);
        const metadata = { 'Content-Type': 'application/grpc-web'};
        mailerClient.sendMail(request, metadata, (err, response) => {
            if (err) {
                console.error("Send mail error: ", err);
                reject(err);
            }
            else {
                if (response) {
                    console.log(response.toObject());
                    resolve(response);
                }
                else {
                    console.log("No response received: ");
                }
            }
        })
    })
}
