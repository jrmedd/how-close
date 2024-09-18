/**
 * Compares the similarity between two strings. It returns a value between 0 and 1, indicating how similar the shorter string is to the longer string.
 *
 * @remarks
 * This class is optimized for usability over speed. The similarity is calculated based on the Levenshtein distance between the two strings.
 *
 * @param string1 - The first string to compare.
 * @param string2 - The second string to compare against the first string.
 * @param percentage - A number between 0 and 1 representing the similarity between the two strings, where 1 means identical and 0 means completely different.
 * @param contains - A boolean indicating whether the longer string contains the shorter string.
 *
 * @beta
 */
class HowClose {
  /** The first string to compare. */
  string1: string;
  /** The second string to compare against. */
  string2: string;
  /** The similarity percentage between the two strings. */
  percentage: number;
  /** Whether the longer string contains the shorter string. */
  contains: boolean;

  /**
   * Creates an instance of HowClose.
   *
   * @param s1 - The first string to set {@link HowClose.string1 | string1}.
   * @param s2 - The second string to set {@link HowClose.string2 | string2}.
   */
  constructor(s1: string, s2: string) {
    this.string1 = s1;
    this.string2 = s2;
    this.percentage = 0;
    this.contains = false;
    this.similarity(s1, s2);
  }

  /**
   * Calculates the similarity between two strings.
   *
   * @param s1 - The first string to compare.
   * @param s2 - The second string to compare.
   * @returns The similarity percentage, a number between 0 and 1, where 1 means the strings are identical and 0 means they are completely different.
   */
  similarity(s1: string, s2: string): number {
    let longer: string = s1;
    let shorter: string = s2;
    this.string1 = s1;
    this.string2 = s2;

    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    const longerLength: number = longer.length;
    if (longerLength === 0) {
      this.percentage = 1.0;
      this.contains = false;
    } else {
      this.percentage =
        (longerLength - this.editDistance(longer, shorter)) / longerLength;
      this.contains = s2.length === 0 ? false : s1.includes(s2);
    }
    return this.percentage;
  }

  /**
   * Calculates the Levenshtein distance between two strings.
   *
   * @param s1 - The first string.
   * @param s2 - The second string.
   * @returns The edit distance between the two strings, which is the number of single-character edits (insertions, deletions, or substitutions) required to change one string into the other.
   */
  editDistance(s1: string, s2: string): number {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    const costs: number[] = [];
    for (let i: number = 0; i <= s1.length; i++) {
      let lastValue: number = i;
      for (let j: number = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else {
          if (j > 0) {
            let newValue: number = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
              newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
            }
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0) {
        costs[s2.length] = lastValue;
      }
    }
    return costs[s2.length];
  }
}

export default HowClose;
