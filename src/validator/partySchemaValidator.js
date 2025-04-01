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

const Elements = require('./elementValidator')
const ComplexTypes = require('./complexTypesValidator')

const partyComplexNameSchema = Joi.object({
  firstName: ComplexTypes.firstNameSchema.optional().description('Party’s first name.'),
  middleName: ComplexTypes.middleNameSchema.optional().description('Party’s middle name.'),
  lastName: ComplexTypes.lastNameSchema.optional().description('Party ’s last name.')
})

const partyPersonalInfoSchema = Joi.object({
  complexName: partyComplexNameSchema.optional().description('First, middle and last name for the Party'),
  dateOfBirth: Elements.DateOfBirth.optional().description('Date of birth of party').label('A valid date of birth must be supplied.')
})

const partyIdInfoSchema = Joi.object({
  partyIdType: Elements.PartyIdType.required().description('Type of the identifier'),
  partyIdentifier: Elements.PartyIdentifier.required().description('An identifier for the Party.'),
  partySubIdOrType: Elements.PartySubIdOrType.optional().description('A sub-identifier or sub-type for the Party'),
  fspId: Elements.FspId.optional().description('FSP ID (if known)'),
  extensionList: ComplexTypes.extensionListSchema.optional()
})

const partySchema = Joi.object({
  partyIdInfo: partyIdInfoSchema.required().description('Party Id type, id, sub ID or type, and FSP Id.'),
  merchantClassificationCode: Elements.MerchantClassificationCode.optional().description('Used in the context of Payee Information, where the Payee happens to be a merchant accepting merchant payments.'),
  name: Elements.Name.optional().description('Display name of the Party, could be a real name or a nick name.'),
  personalInfo: partyPersonalInfoSchema.optional().description('Personal information used to verify identity of Party such as first, middle, last name and date of birth.')
})

const partyResultSchema = Joi.object({
  partyId: partyIdInfoSchema.required().description('Party Id type, id, sub ID or type, and FSP Id.'),
  errorInformation: ComplexTypes.errorInformationSchema.optional().description('If the Party failed to be added, error information should be provided. Otherwise, this parameter should be empty to indicate success.')
})

const putPartiesErrorSchema = ComplexTypes.errorInformationSchema.required().description('Error code, category description.')

module.exports = {
  partyComplexNameSchema,
  partyPersonalInfoSchema,
  partyIdInfoSchema,
  partySchema,
  partyResultSchema,
  putPartiesErrorSchema
}
