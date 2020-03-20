'use strict'

const Validators = require('../../../src/index').Validators
const postQuoteObject = require('../../objects/postQuotes')

describe('quoteSchemaValidator', () => {
  it('postQuoteSchema passes validation when supplied with a valid object', () => {
    const result = Validators.QuoteValidator.postQuoteSchema.validate(postQuoteObject)
    expect(result.value).toEqual(postQuoteObject)
    expect(result.error).toBe(undefined)
  })
})
