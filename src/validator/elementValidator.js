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

const RootJoi = require('@hapi/joi')
const DateExtension = require('@hapi/joi-date')
const CurrencyCodeExtension = require('joi-currency-code')

const regex = require('../regex/regex')

const DateExtendedJoi = RootJoi.extend(DateExtension)
const Joi = DateExtendedJoi.extend(CurrencyCodeExtension)

const Accept = Joi.string().regex(regex.acceptRegex)
const Amount = Joi.string().regex(/^([0]|([1-9][0-9]{0,17}))([.][0-9]{0,3}[1-9])?$/)
const AmountType = Joi.any().valid('SEND', 'RECEIVE')
const AuthenticationType = Joi.any().valid('OTP', 'QRCODE')
// Need to complete AuthenticationValue to correctly work with AuthenticationType
const AuthenticationValue = Joi.string()
const AuthorizationResponse = Joi.any().valid('ENTERED', 'REJECTED', 'RESEND')
const BalanceOfPayments = Joi.string().regex(regex.bopCodeRegex)
const BulkTransferState = Joi.any().valid('RECEIVED', 'PENDING', 'ACCEPTED', 'PROCESSING', 'COMPLETED', 'REJECTED')
const Code = Joi.string().regex(regex.tokenCodeRegex)
const ContentLength = Joi.number().max(5242880)
const ContentType = Joi.string().regex(regex.contentTypeRegex)
const CorrelationId = Joi.string().guid()
const Currency = Joi.string().currency()
const DateUTC = Joi.date().format('ddd, D MMM YYYY H:mm:ss [GMT]')
const DateOfBirth = Joi.string().regex(regex.dateRegex)
const DateTime = Joi.string().regex(regex.dateTimeRegex)
const ErrorCode = Joi.string().regex(regex.errorCodeRegex)
const ErrorDescription = Joi.string().regex(regex.namePlaceAccentRegex)
const ExtensionKey = Joi.string().min(1).max(32)
const ExtensionValue = Joi.string().regex(regex.namePlaceAccentRegex)
const FspId = Joi.string().regex(regex.fspNameAccentRegex)
const FspiopDestination = Joi.string().regex(regex.fspNameAccentRegex)
const FspiopEncryption = Joi.string()
const FspiopHttpGetMethod = Joi.any().valid('GET')
const FspiopHttpPostMethod = Joi.any().valid('POST')
const FspiopHttpPutMethod = Joi.any().valid('PUT')
const FspiopHttpDeleteMethod = Joi.any().valid('DELETE')
const FspiopSignature = Joi.string()
const FspiopSource = Joi.string().regex(regex.fspNameAccentRegex)
const FspiopUri = Joi.string().regex(regex.fspiopUriRegex)
const IlpCondition = Joi.string().regex(regex.binaryString32Regex)
const IlpFulfilment = Joi.string().regex(regex.binaryString32Regex)
const IlpPacket = Joi.string().regex(regex.binaryStringRegex).min(1).max(32768)
const Latitude = Joi.string().regex(regex.latitudeRegex)
const Longitude = Joi.string().regex(regex.longitudeRegex)
const MerchantClassificationCode = Joi.string().regex(regex.merchantClassificationCodeRegex)
const Name = Joi.string().regex(regex.namePlaceAccentRegex)
const Note = Joi.string().min(1).max(128)
const PartyIdentifier = Joi.string().min(1).max(128)
const PartyIdType = Joi.any().valid('MSISDN', 'EMAIL', 'PERSONAL_ID', 'BUSINESS', 'DEVICE', 'ACCOUNT_ID', 'IBAN', 'ALIAS')
const PartyName = Joi.string().regex(regex.namePlaceAccentRegex)
const PartySubIdOrType = Joi.string().min(1).max(128)
const PersonalIdentifierType = Joi.any().valid('PASSPORT', 'NATIONAL_REGISTRATION', 'DRIVING_LICENSE', 'ALIEN_REGISTRATION', 'NATIONAL_ID_CARD', 'EMPLOYER_ID', 'TAX_ID_NUMBER', 'SENIOR_CITIZENS_CARD', 'MARRIAGE_CERTIFICATE', 'HEALTH_CARD', 'VOTERS_ID', 'UNITED_NATIONS', 'OTHER_ID')
const RefundReason = Joi.string().regex(regex.namePlaceAccentRegex)
const TransactionInitiator = Joi.any().valid('PAYER', 'PAYEE')
const TransactionInitiatorType = Joi.any().valid('CONSUMER', 'AGENT', 'BUSINESS', 'DEVICE')
const TransactionRequestState = Joi.any().valid('RECEIVED', 'PENDING', 'ACCEPTED', 'REJECTED')
const TransactionScenario = Joi.any().valid('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT', 'REFUND')
const TransactionState = Joi.any().valid('RECEIVED', 'PENDING', 'COMPLETED', 'REJECTED')
const TransactionSubScenario = Joi.string().regex(regex.undefinedEnumRegex)
const TransferState = Joi.any().valid('RECEIVED', 'RESERVED', 'COMMITTED', 'ABORTED')
const XForwardedFor = Joi.string()

module.exports = {
  Accept,
  Amount,
  AmountType,
  AuthenticationType,
  AuthenticationValue,
  AuthorizationResponse,
  BalanceOfPayments,
  BulkTransferState,
  Code,
  ContentLength,
  ContentType,
  CorrelationId,
  Currency,
  DateUTC,
  DateOfBirth,
  DateTime,
  ErrorCode,
  ErrorDescription,
  ExtensionKey,
  ExtensionValue,
  FspId,
  FspiopDestination,
  FspiopEncryption,
  FspiopHttpDeleteMethod,
  FspiopHttpGetMethod,
  FspiopHttpPostMethod,
  FspiopHttpPutMethod,
  FspiopSignature,
  FspiopSource,
  FspiopUri,
  IlpCondition,
  IlpFulfilment,
  IlpPacket,
  Latitude,
  Longitude,
  MerchantClassificationCode,
  Name,
  Note,
  PartyIdentifier,
  PartyIdType,
  PartyName,
  PartySubIdOrType,
  PersonalIdentifierType,
  RefundReason,
  TransactionInitiator,
  TransactionInitiatorType,
  TransactionRequestState,
  TransactionScenario,
  TransactionState,
  TransactionSubScenario,
  TransferState,
  XForwardedFor
}
