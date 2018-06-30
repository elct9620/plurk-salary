// Filter
export const ValidSalary = (item) => item['salary'].length == 1

// Converter
export const SalaryToNumber = (item) => {
  return Object.assign({}, item, {
    salary: parseInt(item['salary']) * 1000
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
