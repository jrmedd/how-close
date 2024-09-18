class HowClose {
  string1: string;
  string2: string;
  percentage: number;
  contains: boolean;

  constructor(s1: string, s2: string) {
    this.string1 = s1;
    this.string2 = s2;
    this.percentage = 0;
    this.contains = false;
    this.similarity(s1, s2);
  }

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

export { HowClose };
