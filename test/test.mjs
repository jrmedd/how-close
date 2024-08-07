import { assert } from 'chai'
import HowClose from '../lib/HowClose.js'


describe('HowClose', function () {
  it('should return 1.0 for two identical strings', function () {
    const comparison = new HowClose('test', 'test')
    assert.strictEqual(comparison.percentage, 1.0)
    assert.strictEqual(comparison.contains, true)
  })

  it('should return 0.0 for two completely different strings', function () {
    const comparison = new HowClose('abc', 'xyz')
    assert.strictEqual(comparison.percentage, 0.0)
    assert.strictEqual(comparison.contains, false)
  })

  it('should correctly calculate similarity for similar strings', function () {
    const comparison = new HowClose('kitten', 'sitting')
    assert.closeTo(comparison.percentage, 0.5714, 0.0001) // Levenshtein distance similarity
    assert.strictEqual(comparison.contains, false)
  })

  it('should handle empty strings correctly', function () {
    const comparison1 = new HowClose('', '')
    assert.strictEqual(comparison1.percentage, 1.0)

    const comparison2 = new HowClose('nonempty', '')
    assert.strictEqual(comparison2.percentage, 0.0)
    assert.strictEqual(comparison2.contains, false)
  })

  it('should detect if one string contains another', function () {
    const comparison = new HowClose('hello world', 'hello')
    assert.strictEqual(comparison.contains, true)
  })

  it('should work with case insensitive strings', function () {
    const comparison = new HowClose('Hello', 'hello')
    assert.strictEqual(comparison.percentage, 1.0)
    assert.strictEqual(comparison.contains, false)
  })

  it('should correctly identify similarity in strings of different lengths', function () {
    const comparison = new HowClose('abcdef', 'abc')
    assert.closeTo(comparison.percentage, 0.5, 0.0001)
    assert.strictEqual(comparison.contains, true)
  })

  it('should handle larger string being the first argument', function () {
    const comparison = new HowClose('large string example', 'large')
    assert.closeTo(comparison.percentage, 0.25, 0.0001)
    assert.strictEqual(comparison.contains, true)
  })

  it('should handle larger string being the second argument', function () {
    const comparison = new HowClose('large', 'large string example')
    assert.closeTo(comparison.percentage, 0.25, 0.0001)
    assert.strictEqual(comparison.contains, false)
  })
})
