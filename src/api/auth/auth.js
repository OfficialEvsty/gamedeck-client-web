const { AuthServiceClient } = require('../../proto/sso_grpc_web_pb.js');
const { RegisterRequest, LoginRequest,  RefreshTokenRequest, LogoutAllRequest, IsAdminRequest} = require('../../proto/sso_pb.js');

// Auth client to communicate with sso auth service
export const authClient = new AuthServiceClient('http://localhost:' + process.env.ENVOY_PORT, null, null);

// Creates a register request
export const registerRequest = (email, password) => {
    const request = new RegisterRequest();
    request.setEmail(email);
    request.setPassword(password);
    return request;
}

// Creates a login request
export const loginRequest = (email, password, appId) => {
    const request = new LoginRequest();
    request.setEmail(email);
    request.setPassword(password);
    request.setAppId(appId);
    return request;
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

export const isAdminRequest = (userId) => {
    const request = new IsAdminRequest();
    request.setUserId(userId);
    return request;
}