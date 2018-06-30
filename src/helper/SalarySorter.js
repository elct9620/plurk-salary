const SalarySorter = {
  rid: {
    asc: (a, b) => a['rid'] - b['rid'],
    desc: (a, b) => b['rid'] - a['rid']
  },
  age: {
    asc: (a, b) => a['age'] - b['age'],
    desc: (a, b) => b['age'] - a['age']
  },
  year: {
    asc: (a, b) => a['year'] - b['year'],
    desc: (a, b) => b['year'] - a['year']
  },
  salary: {
    asc: (a, b) => {
      const aIsInvalid = a['salary'].length > 1;
      const bIsInvalid = b['salary'].length > 1;
      const aValue = parseInt(a['salary']);
      const bValue = parseInt(b['salary']);

      if (aIsInvalid && bIsInvalid) {
        return 0;
      }

      if (aIsInvalid) {
        return 1;
      }

      if (bIsInvalid) {
        return -1;
      }

      return aValue - bValue;
    },
    desc: (a, b) => {
      const aIsInvalid = a['salary'].length > 1;
      const bIsInvalid = b['salary'].length > 1;
      const aValue = parseInt(a['salary']);
      const bValue = parseInt(b['salary']);

      if (aIsInvalid && bIsInvalid) {
        return 0;
      }

      if (aIsInvalid) {
        return 1;
      }

      if (bIsInvalid) {
        return -1;
      }

      return bValue - aValue;
    }
  }
}

export default SalarySorter;
