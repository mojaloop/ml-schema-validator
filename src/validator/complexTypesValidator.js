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

const extensionSchema = Joi.array().items(Joi.object().keys({
  key: Elements.ExtensionKey.required().description('Extension key.').label('Supplied key fails to match the required format.'),
  value: Elements.ExtensionValue.required().description('Extension value.').label('Supplied key value fails to match the required format.')
}))

const extensionListSchema = Joi.object({
  extension: extensionSchema.required().min(1).max(16).description('Number of Extension elements.')
})

const errorObjectSchema = Joi.object({
  errorCode: Elements.ErrorCode.required().description('Specific error number.'),
  errorDescription: Elements.ErrorDescription.required().description('Error description string.'),
  extensionList: extensionListSchema.optional().description('Optional list of extensions, specific to deployment.')
})

const errorInformationSchema = Joi.object({
  errorInformation: errorObjectSchema.required()
})

const firstNameSchema = Elements.Name.description('First name of the Party.')

const geoCodeSchema = Joi.object({
  latitude: Elements.Latitude.required().description('Latitude of the Party.'),
  longitude: Elements.Longitude.required().description('Longitude of the Party.')
})

const lastNameSchema = Elements.Name.description('Last name of the Party.')

const middleNameSchema = Elements.Name.description('Middle name of the Party.')

const moneySchema = Joi.object({
  currency: Elements.Currency.required().description('Currency of the amount.').label('Currency needs to be a valid ISO 4217 currency code.'),
  amount: Elements.Amount.required().description('Amount of money.')
})

const refundSchema = Joi.object({
  originalTransactionId: Elements.CorrelationId.required().description('Reference to the original transaction ID that is requested to be refunded.').label('Original Transaction Id must be in a valid GUID format.'),
  refundReason: Elements.RefundReason.optional().description('Free text indicating the reason for the refund.')
})

module.exports = {
  errorInformationSchema,
  errorObjectSchema,
  extensionSchema,
  extensionListSchema,
  firstNameSchema,
  geoCodeSchema,
  middleNameSchema,
  moneySchema,
  lastNameSchema,
  refundSchema
}
