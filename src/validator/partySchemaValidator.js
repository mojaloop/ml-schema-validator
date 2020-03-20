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

const partyComplexNameSchema = Joi.object({
  firstName: Joi.string().optional().regex(regex.namePlaceAccentRegex),
  middleName: Joi.string().optional().regex(regex.namePlaceAccentRegex),
  lastName: Joi.string().optional().regex(regex.namePlaceAccentRegex)
})

const partyPersonalInfoSchema = Joi.object({
  complexName: partyComplexNameSchema.optional(),
  dateOfBirth: Joi.string().optional().regex(regex.dateRegex).description('Date of birth of party').label('A valid date of birth must be supplied.')
})

const partyIdInfoSchema = Joi.object({
  partyIdType: Joi.any().valid('MSISDN', 'EMAIL', 'PERSONAL_ID', 'BUSINESS', 'DEVICE', 'ACCOUNT_ID', 'IBAN', 'ALIAS'),
  partyIdentifier: Joi.string().min(1).max(128).required(),
  partySubIdOrType: Joi.string().min(1).max(128).optional(),
  fspId: Joi.string().optional().regex(regex.fspNameAccentRegex)
})

const partySchema = Joi.object({
  partyIdInfo: partyIdInfoSchema.required(),
  merchantClassificationCode: Joi.string().optional().regex(regex.merchantClassificationCodeRegex),
  name: Joi.string().optional().regex(regex.namePlaceAccentRegex),
  personalInfo: partyPersonalInfoSchema.optional()
})

module.exports = {
  partyComplexNameSchema,
  partyPersonalInfoSchema,
  partyIdInfoSchema,
  partySchema
}
