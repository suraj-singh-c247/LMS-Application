// tableOptions.js
export function getTableOptions({
  filter,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  setSortOrder,
  search = true,
  searchText,
  setSearchText,
  setEachCourseId,
  count,
} = {}) {
  return {
    filter: filter,
    print: false,
    selectableRows: false,
    count,
    search,
    searchText,
    page,
    rowsPerPage, // NOTE: Correct key is rowsPerPage, not rowPerPage
    rowsPerPageOptions: [5, 10, 25, 50, 100],
    responsive: "standard",
    searchPlaceholder: "Search By Name, Title, and Description...",
    pagination: true,
    sort: true,
    rowHover: true,
    fixedHeader: true,
    serverSide: true,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "search":
          setSearchText(tableState?.searchText || "");
          setPage(0);
          break;
        case "changePage":
          setPage(tableState?.page);
          break;
        case "changeRowsPerPage":
          setRowsPerPage(tableState?.rowsPerPage);
          setPage(0);
          break;
        case "sort":
          setSortOrder(tableState?.sortOrder);
          break;
        default:
          break;
      }
    },
    onFilterChange: (changedColumn, filterList, type) => {
      if (type === "reset") {
        setEachCourseId(null); // Reset your state as needed
      }
    },
  };
}
