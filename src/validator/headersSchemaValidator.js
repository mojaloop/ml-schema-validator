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

const RootJoi = require('@hapi/joi')
const DateExtension = require('@hapi/joi-date')

const regex = require('../regex/regex')

const Joi = RootJoi.extend(DateExtension)

const postHeadersSchema = Joi.object({
  accept: Joi.string().optional().regex(regex.acceptRegex),
  'content-type': Joi.string().required().regex(regex.contentTypeRegex),
  'content-length': Joi.number().max(5242880).optional(),
  date: Joi.date().format('ddd, D MMM YYYY H:mm:ss [GMT]').required(),
  'x-forwarded-for': Joi.string().optional(),
  'fspiop-source': Joi.string().required().regex(regex.fspNameAccentRegex),
  'fspiop-destination': Joi.string().optional().regex(regex.fspNameAccentRegex),
  'fspiop-encryption': Joi.string().optional(),
  'fspiop-signature': Joi.string().optional(),
  'fspiop-uri': Joi.string().optional().regex(regex.fspiopUriRegex),
  'fspiop-http-method': Joi.any().valid('GET', 'POST', 'PUT', 'DELETE')
})

const putHeadersSchema = Joi.object({
  'content-type': Joi.string().required().regex(regex.contentTypeRegex),
  date: Joi.date().format('ddd, D MMM YYYY H:mm:ss [GMT]').required(),
  'x-forwarded-for': Joi.string().optional(),
  'fspiop-source': Joi.string().required().regex(regex.fspNameAccentRegex),
  'fspiop-destination': Joi.string().optional().regex(regex.fspNameAccentRegex),
  'fspiop-encryption': Joi.string().optional(),
  'fspiop-signature': Joi.string().optional(),
  'fspiop-uri': Joi.string().optional(),
  'fspiop-http-method': Joi.string().optional()
})

const getHeadersSchema = Joi.object({
  accept: Joi.string().optional().regex(regex.acceptRegex),
  'content-type': Joi.string().required().regex(regex.contentTypeRegex),
  date: Joi.date().format('ddd, D MMM YYYY H:mm:ss [GMT]').required(),
  'x-forwarded-for': Joi.string().optional(),
  'fspiop-source': Joi.string().required().regex(regex.fspNameAccentRegex),
  'fspiop-destination': Joi.string().optional().regex(regex.fspNameAccentRegex),
  'fspiop-encryption': Joi.string().optional(),
  'fspiop-signature': Joi.string().optional(),
  'fspiop-uri': Joi.string().optional(),
  'fspiop-http-method': Joi.string().optional()
})

module.exports = {
  postHeadersSchema,
  putHeadersSchema,
  getHeadersSchema
}
