export type SearchFilter = {
  type: string;
  value: string;
  label: string;
  tooltip: string;
};

export type SearchBarProps = {
  filtersLabel: string;
  inputValue: string;
  selectValue: string;
  orderValue: "price" | "createdAt";
  sortValue: "asc" | "desc";
  setInputValue: (value: string) => void;
  setSelectValue: (value: string) => void;
  setOrderValue: (value: "price" | "createdAt") => void;
  setSortValue: (value: "asc" | "desc") => void;
  showSearchInput?: boolean;
  showSortSelect?: boolean;
  classes?: {
    selectInput?: string;
    searchInput?: string;
    icon?: string;
    button?: string;
  };
};

export type FiltersProps = {
  applyFilter: (
    filterType: string,
    filterValue: string,
    filterLabel: string,
    filterTooltip: string
  ) => void;
  removeFilter: (filterType: string, clearFilterValue: () => void) => void;
  isMobile: boolean;
  showSortSelect: boolean;
  selectValue: string;
  filterTerms: Array<{ value: string; label: string }>;
  setSelectValue: (value: string) => void;
  setOrderValue: (value: "price" | "createdAt") => void;
  setSortValue: (value: "asc" | "desc") => void;
};
