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

const authenticationInfoSchema = Joi.object({
  authentication: Elements.AuthenticationType.required().description('Type of authentication.'),
  authenticationValue: Elements.AuthenticationValue.required().description('Authentication value.')
})

const putAuthorizationsSchema = Joi.object({
  authenticationInfo: authenticationInfoSchema.optional().description('OTP or QR Code if entered, otherwise empty'),
  responseType: Elements.AuthorizationResponse.required().description('Enum containing response information; if the customer entered the authentication value, rejected the transaction, or requested a resend of the authentication value.')
})

const putAuthorizationsErrorSchema = ComplexTypes.errorInformationSchema.required().description('Error code, category description.')

module.exports = {
  authenticationInfoSchema,
  putAuthorizationsSchema,
  putAuthorizationsErrorSchema
}
