import {describe, it} from 'node:test'
import assert from 'node:assert/strict'

describe('default', () => {

  it('default', () => {
    assert.equal(true, true)
    assert.throws(() => {throw new Error('invalid')}, /invalid/)
    assert.throws(() => {throw new Error('invalid')})
  })
})
