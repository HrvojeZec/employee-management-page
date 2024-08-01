// src/utils/employeesUtils.ts

interface RowData {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
}

export function filterData(
  data: RowData[],
  search: string,
  selectedJobTitle: string,
) {
  const query = search.toLowerCase().trim();
  return data.filter((item) => {
    const matchesSearch = Object.keys(item).some((key) =>
      item[key as keyof RowData].toString().toLowerCase().includes(query),
    );
    const matchesJobTitle = selectedJobTitle
      ? item.jobTitle.toLowerCase() === selectedJobTitle.toLowerCase()
      : true;
    return matchesSearch && matchesJobTitle;
  });
}

export function sortData(
  data: RowData[],
  payload: {
    sortBy: keyof RowData | null;
    reversed: boolean;
    search: string;
    selectedJobTitle: string;
  },
) {
  const { sortBy, reversed, search, selectedJobTitle } = payload;

  if (!sortBy) {
    return filterData(data, search, selectedJobTitle);
  }

  const sortedData = [...data].sort((a, b) => {
    if (reversed) {
      return b[sortBy].localeCompare(a[sortBy]);
    }
    return a[sortBy].localeCompare(b[sortBy]);
  });

  return filterData(sortedData, search, selectedJobTitle);
}
