// Filter
export const ValidSalary = (item) => item['salary'].length == 1
export const SelectAge = (min, max) => (item) => item['age'] >= min && item['age'] <= max

// Converter
export const SalaryToNumber = (item) => {
  return Object.assign({}, item, {
    salary: parseFloat(item['salary'], 10) * 1000
  });
}

export const SalaryToChart = (items) => {
  return items
    .filter(ValidSalary)
    .map(SalaryToNumber)
}

export const SummaryToBubble = (items, xName, yName) => {
  const summary = (items) => {
    const summary = {};
    items.forEach(item => {
      if (summary[item[xName]] == undefined) {
        summary[item[xName]] = {};
      }

      if (summary[item[xName]][item[yName]] == undefined) {
        summary[item[xName]][item[yName]] = 0;
      }

      summary[item[xName]][item[yName]] += 1;
    });

    return summary;
  }

  const toArray = (summary) => {
    const summaryArray = [];

    for(let x in summary) {
      for(let y in summary[x]) {
        summaryArray.push({
          x: x,
          y: y,
          r: summary[x][y],
        })
      }
    }

    return summaryArray;
  }

  return toArray(summary(items));
}

// Column Helper
export const PickUp = (column) => items => items.map(item => item[column])
export const GroupBy = (column) => items => {
  return items.reduce((group, item) => {
    (group[item[column]] = group[item[column]] || []).push(item)
    return group;
  }, {});
}

// Math Helper
export const Median = (items) => {
  if (items.length == 1) {
    return items[0];
  }

  const half = Math.floor(items.length / 2);

  if (items.length % 2 == 0) {
    return (items[half] + items[half -1]) / 2;
  }

  return items[half + 1];
}

export const Average = (items) => {
  const sum = items.reduce((x, y) => x + y);
  return Math.round(sum / items.length * 100) / 100;
}

export const Max = (items) => {
  return items[items.length - 1];
}

export const Min = (items) => {
  return items[0];
}
