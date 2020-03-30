'use strict'

const Validator = require('../../../src').Validators
const postQuoteObject = require('../../objects/postQuotes')

describe('quoteSchemaValidator', () => {
  it('postQuoteSchema passes validation when supplied with a valid object', () => {
    const result = Validator.QuoteValidator.postQuoteSchema.validate(postQuoteObject)
    expect(result.value).toEqual(postQuoteObject)
    expect(result.error).toBe(undefined)
  })
})
