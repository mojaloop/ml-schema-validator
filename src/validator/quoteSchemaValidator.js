/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
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
 --------------
 ******/

'use strict'

const Joi = require('@hapi/joi')

const partyValidator = require('./partySchemaValidator')
const moneyValidator = require('./moneySchemaValidator')
const transactionTypeValidator = require('./transactionSchemaValidator')
const geoCodeValidator = require('./geoCodeSchemaValidator')
const extensionListValidator = require('./extensionListSchemaValidator')
const ilpValidator = require('./ilpSchemaValidator')
const errorInformationValidator = require('./errorInformationSchemaValidator')
const regex = require('../regex/regex')

const postQuoteSchema = Joi.object({
  quoteId: Joi.string().guid().required().description('Id of quote').label('Quote Id must be in a valid GUID format.'),
  transactionId: Joi.string().guid().required().description('Id of transfer').label('Transaction Id must be in a valid GUID format.'),
  transactionRequestId: Joi.string().guid().optional().description('Id of transaction request').label('Transaction Request Id must be in a valid GUID format.'),
  payee: partyValidator.partySchema.required(),
  payer: partyValidator.partySchema.required(),
  amountType: Joi.any().valid('SEND', 'RECEIVE').required(),
  amount: moneyValidator.moneySchema.required(),
  fees: moneyValidator.moneySchema.optional(),
  transactionType: transactionTypeValidator.transactionTypeSchema.required(),
  geoCode: geoCodeValidator.geoCodeSchema.optional(),
  note: Joi.string().min(1).max(128).optional(),
  expiration: Joi.string().regex(regex.dateTimeRegex).optional(),
  extensionList: extensionListValidator.extensionListSchema.optional()
})

const putQuoteSchema = Joi.object({
  transferAmount: moneyValidator.moneySchema.required(),
  payeeReceiveAmount: moneyValidator.moneySchema.optional(),
  payeeFspFee: moneyValidator.moneySchema.optional(),
  payeeFspCommission: moneyValidator.moneySchema.optional(),
  expiration: Joi.string().regex(regex.dateTimeRegex).required(),
  geoCode: geoCodeValidator.geoCodeSchema.optional(),
  ilpPacket: ilpValidator.ilpPacketSchema.required(),
  condition: ilpValidator.ilpConditionSchema.required(),
  extensionList: extensionListValidator.extensionListSchema.optional()
})

const putQuoteErrorSchema = errorInformationValidator.errorInformationSchema.required().description('Error information')

module.exports = {
  postQuoteSchema,
  putQuoteSchema,
  putQuoteErrorSchema
}
