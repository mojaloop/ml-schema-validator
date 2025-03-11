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
const ComplexTypes = require('./complexTypesValidator')
const PartyValidator = require('./partySchemaValidator')

const transactionTypeSchema = Joi.object({
  scenario: Elements.TransactionScenario.required().description('Deposit, withdrawal, refund, …'),
  subScenario: Elements.TransactionSubScenario.optional().description('Possible sub-scenario, defined locally within the scheme.'),
  initiator: Elements.TransactionInitiator.required().description('Who is initiating the transaction: Payer or Payee'),
  initiatorType: Elements.TransactionInitiatorType.required().description('Consumer, agent, business, …'),
  refundInfo: ComplexTypes.refundSchema.optional(),
  balanceOfPayments: Elements.BalanceOfPayments.optional()
})

const putTransactionsSchema = Joi.object({
  completedTimestamp: Elements.DateTime.optional().description('Time and date when the transaction was completed'),
  transactionState: Elements.TransactionState.required().description('State of the transaction'),
  code: Elements.Code.optional().description('Optional redemption information provided to Payer after transaction has been completed.'),
  extensionList: ComplexTypes.extensionListSchema.optional().description('Optional extension, specific to deployment.')
})

const postTransactionRequestsSchema = Joi.object({
  transactionRequestId: Elements.CorrelationId.required().description('Common ID between the FSPs for the transaction request object, decided by the Payee FSP. The ID should be reused for resends of the same transaction request. A new ID should be generated for each new transaction request.'),
  payee: PartyValidator.partySchema.required().description('Information about the Payee in the proposed financial transaction.'),
  payer: PartyValidator.partyIdInfoSchema.required().description('Information about the Payer type, id, sub-type/id, FSP Id in the proposed financial transaction.'),
  amount: ComplexTypes.moneySchema.required().description('Requested amount to be transferred from the Payer to Payee.'),
  transactionType: transactionTypeSchema.required().description('Type of transaction.'),
  note: Elements.Note.optional().description('Reason for the transaction request, intended to the Payer.'),
  geoCode: ComplexTypes.geoCodeSchema.optional().description('Longitude and Latitude of the initiating Party. Can be used to detect fraud.'),
  authenticationType: Elements.AuthenticationType.optional().description('OTP or QR Code, otherwise empty.'),
  expiration: Elements.DateTime.optional().description('Can be set to get a quick failure in case the peer FSP takes too long to respond. Also, it may be beneficial for Consumer, Agent, Merchant to know that their request has a time limit.'),
  extensionList: ComplexTypes.extensionListSchema.optional().description('Optional extension, specific to deployment.')
})

const putTransactionRequestsSchema = Joi.object({
  transactionRequestId: Elements.CorrelationId.optional().description('Identifies a related transaction (if a transaction has been created).'),
  transactionRequestState: Elements.TransactionRequestState.required().description('State of the transaction request.'),
  extensionList: ComplexTypes.extensionListSchema.optional().description('Optional extension, specific to deployment.')
})

const putTransactionRequestsErrorSchema = ComplexTypes.errorInformationSchema.required().description('Error code, category description.')

module.exports = {
  transactionTypeSchema,
  putTransactionsSchema,
  postTransactionRequestsSchema,
  putTransactionRequestsSchema,
  putTransactionRequestsErrorSchema
}
