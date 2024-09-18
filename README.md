![build](https://github.com/jrmedd/how-close/actions/workflows/main.yaml/badge.svg)

# HowClose

A JavaScript module to compare the similarity between two strings. It returns a value between 0 and 1 indicating how similar the shorter string is to the larger string.

## Installation

Install via npm:

```bash
npm install how-close
```

## Usage

```javascript
const HowClose = require("how-close");

const comparison = new HowClose("kitten", "sitting");
console.log(comparison.percentage); // Similarity score
console.log(comparison.contains); // Whether the first string contains the second string
```

## API

`HowClose(s1, s2)` Creates a new instance of the HowClose class.

- `s1`: First string.
- `s2`: Second string.

### Properties

- `percentage`: A value between 0 and 1 indicating the similarity between the two strings.
- `contains`: A boolean indicating whether the first string contains the second string.
  Example
- `similarity(s1, s2)`: A function to reinitialise the object with a new percentage.

```javascript
const HowClose = require("how-close");

const comparison1 = new HowClose("hello world", "hello");
console.log(comparison1.percentage); // 0.5
console.log(comparison1.contains); // true

const comparison2 = new HowClose("large string example", "large");
console.log(comparison2.percentage); // 0.25
console.log(comparison2.contains); // true

const comparison3 = new HowClose("large", "large string example");
console.log(comparison3.percentage); // 0.25
console.log(comparison3.contains); // false
```
