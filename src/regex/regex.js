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

exports.acceptRegex = new RegExp(/application\/vnd.interoperability[.]/)
exports.binaryStringRegex = new RegExp(/^[A-Za-z0-9-_]+[=]{0,2}$/u)
exports.binaryString32Regex = new RegExp(/^[A-Za-z0-9-_]{43}$/u)
exports.bopCodeRegex = new RegExp(/^[1-9]\d{2}$/u)
exports.contentTypeRegex = new RegExp(/application\/vnd.interoperability[.]/)
exports.dateTimeRegex = new RegExp(/^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:(\.\d{3}))(?:Z|[+-][01]\d:[0-5]\d)$/u)
exports.dateRegex = new RegExp(/^(?:[1-9]\d{3}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1\d|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[1-9]\d(?:0[48]|[2468][048]|[13579][26])|(?:[2468][048]|[13579][26])00)-02-29)$/u)
exports.errorCodeRegex = new RegExp(/^[1-9]\d{3}$/u)
exports.fspiopUriRegex = new RegExp(/(?:^.*)(\/(participants|parties|quotes|transfers)(\/.*)*)$/)
exports.fspNameAccentRegex = new RegExp(/^(?!\s*$)[\p{L}\p{Nd} .,'-]{1,32}$/u)
exports.latitudeRegex = new RegExp(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/u)
exports.longitudeRegex = new RegExp(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/u)
exports.merchantClassificationCodeRegex = new RegExp(/^[\d]{1,4}$/u)
exports.namePlaceAccentRegex = new RegExp(/^(?!\s*$)[\p{L}\p{Nd} .,'-]{1,128}$/u)
exports.tokenCodeRegex = new RegExp(/^[0-9a-zA-Z]{4,32}$/u)
exports.undefinedEnumRegex = new RegExp(/^[A-Z_]{1,32}$/u)
