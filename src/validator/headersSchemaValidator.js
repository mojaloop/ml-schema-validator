/*****
License
--------------
Copyright © 2020-2025 Mojaloop Foundation
The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License")

Contributors
--------------
This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation
 - Name Surname <name.surname@gatesfoundation.com>

 * ModusBox
 - Rajiv Mothilal <rajiv.mothilal@modusbox.com>
*****/

'use strict'

const Joi = require('@hapi/joi')

const Elements = require('./elementValidator')

const postHeadersSchema = Joi.object({
  accept: Elements.Accept.required(),
  'content-type': Elements.ContentType.required(),
  'content-length': Elements.ContentLength.optional(),
  date: Elements.DateUTC.required(),
  'x-forwarded-for': Elements.XForwardedFor.optional(),
  'fspiop-source': Elements.FspiopSource.required(),
  'fspiop-destination': Elements.FspiopDestination.optional(),
  'fspiop-encryption': Elements.FspiopEncryption.optional(),
  'fspiop-signature': Elements.FspiopSignature.optional(),
  'fspiop-uri': Elements.FspiopUri.optional(),
  'fspiop-http-method': Elements.FspiopHttpPostMethod.optional()
})

const putHeadersSchema = Joi.object({
  'content-type': Elements.ContentType.required(),
  date: Elements.DateUTC.required(),
  'x-forwarded-for': Elements.XForwardedFor.optional(),
  'fspiop-source': Elements.FspiopSource.required(),
  'fspiop-destination': Elements.FspiopDestination.optional(),
  'fspiop-encryption': Elements.FspiopEncryption.optional(),
  'fspiop-signature': Elements.FspiopSignature.optional(),
  'fspiop-uri': Elements.FspiopUri.optional(),
  'fspiop-http-method': Elements.FspiopHttpPutMethod.optional()
})

const getHeadersSchema = Joi.object({
  accept: Elements.Accept.required(),
  'content-type': Elements.ContentType.required(),
  date: Elements.DateUTC.required(),
  'x-forwarded-for': Elements.XForwardedFor.optional(),
  'fspiop-source': Elements.FspiopSource.required(),
  'fspiop-destination': Elements.FspiopDestination.optional(),
  'fspiop-encryption': Elements.FspiopEncryption.optional(),
  'fspiop-signature': Elements.FspiopSignature.optional(),
  'fspiop-uri': Elements.FspiopUri.optional(),
  'fspiop-http-method': Elements.FspiopHttpGetMethod.optional()
})

const deleteHeadersSchema = Joi.object({
  accept: Elements.Accept.required(),
  'content-type': Elements.ContentType.required(),
  date: Elements.DateUTC.required(),
  'x-forwarded-for': Elements.XForwardedFor.optional(),
  'fspiop-source': Elements.FspiopSource.required(),
  'fspiop-destination': Elements.FspiopDestination.optional(),
  'fspiop-encryption': Elements.FspiopEncryption.optional(),
  'fspiop-signature': Elements.FspiopSignature.optional(),
  'fspiop-uri': Elements.FspiopUri.optional(),
  'fspiop-http-method': Elements.FspiopHttpDeleteMethod.optional()
})

module.exports = {
  postHeadersSchema,
  putHeadersSchema,
  getHeadersSchema,
  deleteHeadersSchema
}
