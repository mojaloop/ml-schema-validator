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

const Elements = require('./elementValidator')
const ComplexTypes = require('./complexTypesValidator')

const individualTransferSchema = Joi.object({
  transferId: Elements.CorrelationId.required().description('Identifies messages related to the same /transfers sequence.'),
  transferAmount: ComplexTypes.moneySchema.required().description('Transaction amount to be sent.'),
  ilpPacket: Elements.IlpPacket.required().description('ILP Packet containing the amount delivered to the Payee and the ILP Address of the Payee and any other end-to-end data.'),
  condition: Elements.IlpCondition.required().description('Condition that must be fulfilled to commit the transfer.'),
  extensionList: ComplexTypes.extensionListSchema.optional().description('Optional extension, specific to deployment.')
})

const individualTransferResultSchema = Joi.object({
  transferId: Elements.CorrelationId.required().description('Identifies messages related to the same /transfers sequence.'),
  fulfilment: Elements.IlpFulfilment.optional().description('Fulfilment of the condition specified with the transaction. Note: Either fulfilment or errorInformation should be set, not both.'),
  errorInformation: ComplexTypes.errorInformationSchema.optional().description('If transfer is REJECTED, error information may be provided. Note: Either fulfilment or errorInformation should be set, not both.'),
  extensionList: ComplexTypes.extensionListSchema.optional().description('Optional extension, specific to deployment.')
})

module.exports = {
  individualTransferSchema,
  individualTransferResultSchema
}
