const { AuthServiceClient } = require('../../proto/generated/sso/sso_grpc_web_pb.js');
const { RegisterRequest, LoginRequest,  RefreshTokenRequest, LogoutAllRequest,
    AuthorizeRequest, TokenRequest, AuthorizationCodeGrant, RefreshTokenGrant} = require('../../proto/generated/sso/sso_pb.js');

//const protocol = window.location.protocol;
//const host = window.location.hostname;
//const ref = `${protocol}//${host}`;

// Auth client to communicate with sso auth service
export const authClient = new AuthServiceClient('https://id.umaiden.ru/sso', null, {withCredentials: true});

// Creates an authorize request
export const authorizeRequest = (clientID, responseType, scope, redirectUri, state, codeChallenge, codeChallengeMethod) => {
    const request = new AuthorizeRequest();
    request.setClientId(clientID)
    request.setResponseType(responseType)
    request.setScope(scope);
    request.setRedirectUri(redirectUri);
    request.setState(state)
    request.setCodeChallenge(codeChallenge)
    request.setCodeChallengeMethod(codeChallengeMethod)
}

// Creates a token request [Authorization Code Grant]
export const tokenAuthorizationCodeGrant = (authCode, redirectUri, codeVerifier, clientID) => {
    const request = new TokenRequest();
    const authCodeGrant = new AuthorizationCodeGrant()
    authCodeGrant.setClientId(clientID)
    authCodeGrant.setRedirectUri(redirectUri)
    authCodeGrant.setCodeVerifier(codeVerifier)
    authCodeGrant.setAuthCode(authCode)
    request.setAuthorizationCode(authCode)
    return request;
}

// Creates a token request [Refresh Token Grant]
export const tokenRefreshTokenGrant = (refreshToken, clientID, clientSecret) => {
    const request = new TokenRequest();
    const refreshTokenGrant = new RefreshTokenGrant()
    refreshTokenGrant.setClientId(clientID)
    refreshTokenGrant.setClientSecret(clientSecret)
    refreshTokenGrant.setRefreshToken(refreshToken)
    request.setRefreshToken(refreshTokenGrant)
    return request;
}

export const Authorize = (clientID, responseType, scope, redirectUri, state, codeChallenge, codeChallengeMethod) => {
    return new Promise((resolve, reject) => {
        const request = new authorizeRequest(clientID, responseType, scope, redirectUri, state, codeChallenge, codeChallengeMethod)
        const metadata = { 'Content-Type': 'application/x-www-form-urlencoded'};
        authClient.authorize(request, metadata, (err, response) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else {
                console.log('Authorize authorized successfully.');
                resolve(response);
            }
        })
    })

}

// Creates a register request
export const registerRequest = (email, password, callbackUrl) => {
    const request = new RegisterRequest();
    request.setEmail(email);
    request.setPassword(password);
    request.setCallbackurl(callbackUrl)
    return request;
}

// Register request method for sso api
export const Register = (email, password, callbackUrl) => {
    return new Promise((resolve, reject) => {
        const request = registerRequest(email, password, callbackUrl);
        const metadata = { 'Content-Type': 'application/grpc-web'};
        authClient.register(request, metadata, (err, response) => {
            if (err) {
                console.error("Register error: ", err);
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

// Creates a login request
const loginRequest = (email, password, appId) => {
    const request = new LoginRequest();
    request.setEmail(email);
    request.setPassword(password);
    request.setAppId(appId);
    return request;
}

export const Login = (email, password) => {
    return new Promise((resolve, reject) => {
        const request = loginRequest(email, password);
        // todo как то прокидывать куки в grpc web
        const metadata = { 'Content-Type': 'application/grpc-web' };
        authClient.login(request, metadata, (err, response) => {
            if (err) {
                console.error("Login error: "+ err);
                reject(err);
            }
            else {
                if (response) {
                    console.log(response.toObject());
                    resolve(response);
                }
                else {
                    reject(new Error("No response received"))
                }
            }
        })
    });
}


export const logoutRequest = (userId, refresh = null) => {
    const request = new LogoutAllRequest();
    request.setUserId(userId);
    request.setRefreshToken(refresh);
    return request;
}

export const refreshTokenRequest = (appId, refresh) => {
    const request = new RefreshTokenRequest();
    request.setAppId(appId);
    request.setRefreshToken(refresh);
    return request;
}
