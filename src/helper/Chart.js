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

export const SummaryToAgeSalary = (items) => {
  const summary = (items) => {
    const summary = {};
    items.forEach(item => {
      if (summary[item['age']] == undefined) {
        summary[item['age']] = {};
      }

      if (summary[item['age']][item['salary']] == undefined) {
        summary[item['age']][item['salary']] = 0;
      }

      summary[item['age']][item['salary']] += 1;
    });

    return summary;
  }

  const toArray = (summary) => {
    const summaryArray = [];

    for(let age in summary) {
      for(let salary in summary[age]) {
        summaryArray.push({
          x: age,
          y: salary,
          r: summary[age][salary],
        })
      }
    }

    return summaryArray;
  }

  return toArray(summary(items));
}
