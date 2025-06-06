/**
 * @fileoverview gRPC-Web generated client stub for mailer
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v3.12.4
// source: mailer.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.mailer = require('./mailer_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.mailer.MailServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.mailer.MailServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.mailer.SendMailRequest,
 *   !proto.mailer.SendMailResponse>}
 */
const methodDescriptor_MailService_SendMail = new grpc.web.MethodDescriptor(
  '/mailer.MailService/SendMail',
  grpc.web.MethodType.UNARY,
  proto.mailer.SendMailRequest,
  proto.mailer.SendMailResponse,
  /**
   * @param {!proto.mailer.SendMailRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.mailer.SendMailResponse.deserializeBinary
);


/**
 * @param {!proto.mailer.SendMailRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.mailer.SendMailResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.mailer.SendMailResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.mailer.MailServiceClient.prototype.sendMail =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/mailer.MailService/SendMail',
      request,
      metadata || {},
      methodDescriptor_MailService_SendMail,
      callback);
};


/**
 * @param {!proto.mailer.SendMailRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.mailer.SendMailResponse>}
 *     Promise that resolves to the response
 */
proto.mailer.MailServicePromiseClient.prototype.sendMail =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/mailer.MailService/SendMail',
      request,
      metadata || {},
      methodDescriptor_MailService_SendMail);
};


module.exports = proto.mailer;

