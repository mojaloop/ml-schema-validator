'use strict'

const Validator = require('../../../src/').Validators
const getHeadersObject = require('../../objects/getHeaders')

describe('headersSchemaValidator', () => {
  it('getHeaders passes validation when supplied with a valid object', () => {
    const result = Validator.HeadersValidator.getHeadersSchema.validate(getHeadersObject)
    if (result.value && result.value.date) {
      delete result.value.date
      const originalDate = getHeadersObject.date
      delete getHeadersObject.date
      expect(result.value).toEqual(getHeadersObject)
      getHeadersObject.date = originalDate
    } else {
      expect(result.value).toEqual(getHeadersObject)
    }
    expect(result.error).toBe(undefined)
  })
})
