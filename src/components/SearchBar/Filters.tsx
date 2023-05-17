import React, { type FC } from "react";
import { Group, Select } from "@mantine/core";
import { type FiltersProps } from "./types";
import { useStyles } from "./styles";

export const Filters: FC<FiltersProps> = (props: FiltersProps) => {
  const { classes } = useStyles();
  const {
    applyFilter,
    removeFilter,
    isMobile,
    showSortSelect,
    selectValue,
    filterTerms,
    setSelectValue,
    setOrderValue,
    setSortValue,
  } = props;
  return (
    <Group position="center" noWrap={!isMobile}>
      {showSortSelect && (
        <Select
          className={classes.selectInput}
          value={selectValue}
          data={filterTerms}
          placeholder="Select Sort"
          searchable
          allowDeselect
          clearable
          onChange={(e: string | null) => {
            if (e === null || e === "") {
              removeFilter("sort", () => setSelectValue(""));
            } else {
              setSelectValue(e);
              switch (e) {
                case "low":
                  setOrderValue("price");
                  setSortValue("asc");
                  break;
                case "high":
                  setOrderValue("price");
                  setSortValue("desc");
                  break;
                case "new":
                  setOrderValue("createdAt");
                  setSortValue("desc");
                  break;
                case "old":
                default:
                  setOrderValue("createdAt");
                  setSortValue("asc");
                  break;
              }
              const sortLabel =
                filterTerms.find((term) => term.value === e)?.label || "";
              applyFilter("sort", e, e, sortLabel);
            }
          }}
        />
      )}
    </Group>
  );
};
