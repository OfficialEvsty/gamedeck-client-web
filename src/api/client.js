
const { AuthServiceClient } = require('../proto/sso_grpc_web_pb.js');
const { RegisterRequest } = require('../proto/sso_pb.js');

const client = new AuthServiceClient('http://localhost:8080', null, null);

export default function RegisterOnClick() {
    const registerRequest = new RegisterRequest();
    console.log("help");
    registerRequest.setEmail("mymail@hmail.com");
    registerRequest.setPassword("passwordToPass");
    const metadata = { 'Content-Type': 'application/grpc-web' };

    client.register(registerRequest, metadata, (err, response) => {
        if (err) {
            console.error("Register error: "+ err);
        } else {
            console.log("Register response: ", response.toObject());
        }
    });
}



