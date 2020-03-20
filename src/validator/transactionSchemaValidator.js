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

const regex = require('../regex/regex')

const refundSchema = Joi.object({
  originalTransactionId: Joi.string().guid().required().description('Reference to the original transaction ID that is requested to be refunded.').label('Original Transaction Id must be in a valid GUID format.'),
  refundReason: Joi.string().min(1).max(128).optional()
})

const transactionTypeSchema = Joi.object({
  scenario: Joi.any().valid('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT', 'REFUND').required(),
  subScenario: Joi.string().optional().regex(regex.undefinedEnumRegex),
  initiator: Joi.any().valid('PAYER', 'PAYEE').required(),
  initiatorType: Joi.any().valid('CONSUMER', 'AGENT', 'BUSINESS', 'DEVICE').required(),
  refundInfo: refundSchema.optional(),
  balanceOfPayments: Joi.string().regex(regex.bopCodeRegex).optional()
})

module.exports = {
  refundSchema,
  transactionTypeSchema
}
