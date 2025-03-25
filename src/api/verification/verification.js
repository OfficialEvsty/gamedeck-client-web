const { VerificationServiceClient } = require('../../proto/generated/sso/sso_grpc_web_pb.js');
const { SaveEmailTokenRequest, VerifyEmailRequest } = require('../../proto/generated/sso/sso_pb.js');

// const protocol = window.location.protocol;
// const host = window.location.hostname;
// const ref = `${protocol}//${host}`;

// Auth client to communicate with sso auth service
export const verificationClient = new VerificationServiceClient('https://teamspot.online/sso', null, null)
// Creates a register request
export const saveEmailTokenRequest = (email, token) => {
    const request = new SaveEmailTokenRequest();
    request.setEmail(email);
    request.setToken(token);
    return request;
}

// Register request method for sso api
export const SaveEmailToken = (email, token) => {
    return new Promise((resolve, reject) => {
        const request = saveEmailTokenRequest(email, token);
        const metadata = { 'Content-Type': 'application/grpc-web'};
        verificationClient.saveEmailToken(request, metadata, (err, response) => {
            if (err) {
                console.error("save email token error: ", err);
                reject(err);
                return;
            }
            if (response) {
                console.log(response.toObject());
                resolve(response);
                return;
            }
            console.log("No response received: ");
        })
    })
}

export const verifyEmailRequest = (token) => {
    const request = new VerifyEmailRequest(token);
    request.setToken(token);
    return request;
}

// verifies toke on server and valid or invalid it
export const VerifyEmail = (token) => {
    return new Promise((resolve, reject) => {
        const request = verifyEmailRequest(token);
        const metadata = { 'Content-Type': 'application/grpc-web'};
        verificationClient.verifyEmail(request, metadata, (err, response) => {
            if (err) {
                console.error("verification failed: ", err);
                reject(err);
                return;
            }
            if (response) {
                console.log(response.toObject());
                resolve(response);
                return;
            }
            console.log("no response received: ");
        })
    })

}
