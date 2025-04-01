/*****
License
--------------
Copyright © 2020-2025 Mojaloop Foundation
The Mojaloop files are made available by the Mojaloop Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

Contributors
--------------
This is the official list of the Mojaloop project contributors for this file.
Names of the original copyright holders (individuals or organizations)
should be listed with a '*' in the first column. People who have
contributed from an organization can be listed under the organization
that actually holds the copyright for their contributions (see the
Mojaloop Foundation for an example). Those individuals should have
their names indented and be marked with a '-'. Email address can be added
optionally within square brackets <email>.

* Mojaloop Foundation
- Name Surname <name.surname@mojaloop.io>

* ModusBox
- Rajiv Mothilal <rajiv.mothilal@modusbox.com>
*****/

'use strict'

const Joi = require('@hapi/joi')

const partyValidator = require('./partySchemaValidator')
const transactionTypeValidator = require('./transactionSchemaValidator')
const Elements = require('./elementValidator')
const ComplexTypes = require('./complexTypesValidator')

const postQuoteSchema = Joi.object({
  quoteId: Elements.CorrelationId.required().description('Common ID between the FSPs for the quote object, decided by the Payer FSP. The ID should be reused for resends of the same quote for a transaction. A new ID should be generated for each new quote for a transaction.').label('Quote Id must be in a valid GUID format.'),
  transactionId: Elements.CorrelationId.required().description('Common ID (decided by the Payer FSP) between the FSPs for the future transaction object. The actual transaction will be created as part of a successful transfer process. The ID should be reused for resends of the same quote for a transaction. A new ID should be generated for each new quote for a transaction.').label('Transaction Id must be in a valid GUID format.'),
  transactionRequestId: Elements.CorrelationId.optional().description('Identifies an optional previously-sent transaction request.').label('Transaction Request Id must be in a valid GUID format.'),
  payee: partyValidator.partySchema.required().description('Information about the Payee in the proposed financial transaction.'),
  payer: partyValidator.partySchema.required().description('Information about the Payer in the proposed financial transaction.'),
  amountType: Elements.AmountType.description('SEND for send amount, RECEIVE for receive amount.'),
  amount: ComplexTypes.moneySchema.required().description('Depending on amountType: If SEND: The amount the Payer would like to send; that is, the amount that should be withdrawn from the Payer account including any fees. The amount is updated by each participating entity in the transaction. If RECEIVE: The amount the Payee should receive; that is, the amount that should be sent to the receiver exclusive any fees. The amount is not updated by any of the participating entities.'),
  fees: ComplexTypes.moneySchema.optional().description('Fees in the transaction. The fees element should be empty if fees should be non-disclosed. The fees element should be non-empty if fees should be disclosed.'),
  transactionType: transactionTypeValidator.transactionTypeSchema.required().description('Type of transaction for which the quote is requested.'),
  geoCode: ComplexTypes.geoCodeSchema.optional().description('Longitude and Latitude of the initiating Party. Can be used to detect fraud.'),
  note: Elements.Note.optional().description('A memo that will be attached to the transaction.'),
  expiration: Elements.DateTime.optional().description('Expiration is optional. It can be set to get a quick failure in case the peer FSP takes too long to respond. Also, it may be beneficial for Consumer, Agent, and Merchant to know that their request has a time limit.'),
  extensionList: ComplexTypes.extensionListSchema.optional().description('Optional extension, specific to deployment.')
})

const putQuoteSchema = Joi.object({
  transferAmount: ComplexTypes.moneySchema.required().description('The amount of Money that the Payer FSP should transfer to the Payee FSP.'),
  payeeReceiveAmount: ComplexTypes.moneySchema.optional().description('The amount of Money that the Payee should receive in the end-to-end transaction. Optional as the Payee FSP might not want to disclose any optional Payee fees.'),
  payeeFspFee: ComplexTypes.moneySchema.optional().description('Payee FSP’s part of the transaction fee.'),
  payeeFspCommission: ComplexTypes.moneySchema.optional().description('Transaction commission from the Payee FSP.'),
  expiration: Elements.DateTime.required().description('Date and time until when the quotation is valid and can be honored when used in the subsequent transaction.'),
  geoCode: ComplexTypes.geoCodeSchema.optional().description('Longitude and Latitude of the Payee. Can be used to detect fraud.'),
  ilpPacket: Elements.IlpPacket.required().description('The ILP Packet that must be attached to the transfer by the Payer.'),
  condition: Elements.IlpCondition.required().description('The condition that must be attached to the transfer by the Payer.'),
  extensionList: ComplexTypes.extensionListSchema.optional().description('Optional extension, specific to deployment')
})

const putQuoteErrorSchema = ComplexTypes.errorInformationSchema.required().description('Error information')

const individualQuoteSchema = Joi.object({
  quoteId: Elements.CorrelationId.required().description('Identifies quote message.').label('Quote Id must be in a valid GUID format.'),
  transactionId: Elements.CorrelationId.required().description('Identifies transaction message.').label('Transaction Id must be in a valid GUID format.'),
  payee: partyValidator.partySchema.required().description('Information about the Payee in the proposed financial transaction.'),
  amountType: Elements.AmountType.required().description('SEND for sendAmount, RECEIVE for receiveAmount.'),
  amount: ComplexTypes.moneySchema.required().description('Depending on amountType: If SEND: The amount the Payer would like to send; that is, the amount that should be withdrawn from the Payer account including any fees. The amount is updated by each participating entity in the transaction. If RECEIVE: The amount the Payee should receive; that is, the amount that should be sent to the receiver exclusive any fees. The amount is not updated by any of the participating entities.'),
  fees: ComplexTypes.moneySchema.optional().description('Fees in the transaction. The fees element should be empty if fees should be non-disclosed. The fees element should be non-empty if fees should be disclosed.'),
  transactionType: transactionTypeValidator.transactionTypeSchema.required().description('Type of transaction that the quote is requested for.'),
  note: Elements.Note.optional().description('Memo that will be attached to the transaction.'),
  extensionList: ComplexTypes.extensionListSchema.optional().description('Optional extension, specific to deployment.')
})

const individualQuoteResultSchema = Joi.object({
  quoteId: Elements.CorrelationId.required().description('Identifies the quote message.').label('Quote Id must be in a valid GUID format.'),
  payee: partyValidator.partySchema.optional().description('Information about the Payee in the proposed financial transaction.'),
  transferAmount: ComplexTypes.moneySchema.optional().description('The amount of Money that the Payer FSP should transfer to the Payee FSP.'),
  payeeReceiveAmount: ComplexTypes.moneySchema.optional().description('Amount that the Payee should receive in the end-to-end transaction. Optional as the Payee FSP might not want to disclose any optional Payee fees.'),
  payeeFspFee: ComplexTypes.moneySchema.optional().description('Payee FSP’s part of the transaction fee.'),
  payeeFspCommission: ComplexTypes.moneySchema.optional().description('Transaction commission from the Payee FSP.'),
  ilpPacket: Elements.IlpPacket.optional().description('ILP Packet that must be attached to the transfer by the Payer.'),
  condition: Elements.IlpCondition.optional().description('Condition that must be attached to the transfer by the Payer.'),
  errorInformation: ComplexTypes.errorObjectSchema.optional().description('Error code, category description. Note: payee, transferAmount, payeeReceiveAmount, payeeFspFee, payeeFspCommission, ilpPacket, and condition should not be set if errorInformation is set.'),
  extensionList: ComplexTypes.extensionListSchema.optional().description('Optional extension, specific to deployment')
})

const postBulkQuoteSchema = Joi.object({
  bulkQuoteId: Elements.CorrelationId.required().description('Common ID between the FSPs for the bulk quote object, decided by the Payer FSP. The ID should be reused for resends of the same bulk quote. A new ID should be generated for each new bulk quote.').label('Bulk Quote Id must be in a valid GUID format.'),
  payer: partyValidator.partySchema.required().description('Information about the Payer in the proposed financial transaction.'),
  geoCode: ComplexTypes.geoCodeSchema.optional().description('Longitude and Latitude of the initiating Party. Can be used to detect fraud.'),
  expiration: Elements.DateTime.optional().description('Expiration is optional to let the Payee FSP know when a quote no longer needs to be returned.'),
  individualQuotes: Joi.array().items(individualQuoteSchema).min(1).max(1000).required().description('List of quotes elements.'),
  extensionList: ComplexTypes.extensionListSchema.optional()
})

const putBulkQuoteSchema = Joi.object({
  individualQuoteResults: Joi.array().items(individualQuoteResultSchema).max(1000).optional().description('Fees for each individual transaction, if any of them are charged per transaction.'),
  expiration: Elements.DateTime.required().description('Date and time until when the quotation is valid and can be honored when used in the subsequent transaction request.'),
  extensionList: ComplexTypes.extensionListSchema.optional()
})

module.exports = {
  postQuoteSchema,
  putQuoteSchema,
  putQuoteErrorSchema,
  individualQuoteSchema,
  postBulkQuoteSchema,
  individualQuoteResultSchema,
  putBulkQuoteSchema
}
