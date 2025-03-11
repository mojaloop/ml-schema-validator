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
const PartyValidator = require('./partySchemaValidator')
const Elements = require('./elementValidator')
const ComplexTypes = require('./complexTypesValidator')

const postBulkParticipantSchema = Joi.object({
  requestId: Elements.CorrelationId.required().description('The ID of the request, decided by the client. Used for identification of the callback from the server.').label('Request Id must be in a valid GUID format.'),
  partyList: Joi.array().items(PartyValidator.partyIdInfoSchema).min(1).max(10000).required().description('List of PartyIdInfo elements that the client would like to update or create FSP information about.'),
  currency: Elements.Currency.optional().description('Indicate that the provided Currency is supported by each PartyIdInfo in the list.').label('Currency needs to be a valid ISO 4217 currency code.')
})

const postParticipantSchema = Joi.object({
  fspId: Elements.FspId.required().description('FSP Identifier that the Party belongs to.'),
  currency: Elements.Currency.optional().description('Indicate that the provided Currency is supported by the Party.')
})

const putParticipantTypeIdSchema = Joi.object({
  fspId: Elements.FspId.optional().description('FSP Identifier that the Party belongs to.')
})

const putBulkParticipantIdSchema = Joi.object({
  partyList: Joi.array().items(PartyValidator.partyIdInfoSchema).min(1).max(10000).required().description('List of PartyIdInfo elements that the client would like to update or create FSP information about.'),
  currency: Elements.Currency.optional().description('Indicate that the provided Currency is supported by each PartyIdInfo in the list.').label('Currency needs to be a valid ISO 4217 currency code.')
})

const putParticipantsErrorSchema = ComplexTypes.errorInformationSchema.required().description('Error code, category description.')

module.exports = {
  postBulkParticipantSchema,
  postParticipantSchema,
  putParticipantTypeIdSchema,
  putBulkParticipantIdSchema,
  putParticipantsErrorSchema
}
