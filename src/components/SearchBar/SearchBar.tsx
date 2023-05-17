import {
  Group,
  TextInput,
  Collapse,
  Button,
  Container,
  Badge,
  Center,
  Tooltip,
} from "@mantine/core";
import { IconAdjustments, IconSearch, IconX } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
import { useStyles } from "./styles";
import { Filters } from "./Filters";
import type { SearchBarProps, SearchFilter } from "./types";
import React, { useState, type FC } from "react";
import { FILTER_TERMS } from "../../../public/config/constants";

export const SearchBar: FC<SearchBarProps> = (props: SearchBarProps) => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SearchFilter[]>([]);

  const {
    filtersLabel,
    inputValue,
    setInputValue,
    selectValue,
    setSelectValue,
    orderValue,
    setOrderValue,
    sortValue,
    setSortValue,
  } = props;

  const { classes } = useStyles();
  const isMobile: boolean = useMediaQuery("(max-width: 768px)");

  const applyFilter = (
    filterType: string,
    filterValue: string,
    filterLabel: string,
    filterTooltip: string
  ) => {
    setActiveFilters((prevFilters: SearchFilter[]) => [
      ...prevFilters.filter(
        (filter: SearchFilter) => filter.type !== filterType
      ),
      {
        type: filterType,
        value: filterValue,
        label: filterLabel,
        tooltip: filterTooltip,
      },
    ]);
  };

  const removeFilter = (filterType: string, clearFilterValue: () => void) => {
    setActiveFilters((prevFilters: SearchFilter[]) =>
      prevFilters.filter((filter: SearchFilter) => filter.type !== filterType)
    );
    clearFilterValue(); // Call the provided function to clear the state variable
  };

  return (
    <Container size={"md"}>
      <Group position="center" w="100%" noWrap>
        {props.showSearchInput && (
          <TextInput
            className={
              props.classes?.searchInput
                ? props.classes.searchInput
                : classes.searchInput
            }
            value={inputValue}
            icon={<IconSearch />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.currentTarget.value === "") {
                removeFilter("search", () => setInputValue(""));
              } else {
                setInputValue(e.currentTarget.value);
                applyFilter(
                  "search",
                  e.currentTarget.value,
                  e.currentTarget.value,
                  e.currentTarget.value
                );
              }
            }}
          />
        )}

        {isMobile ? (
          <Button
            className={props.classes?.button}
            onClick={() => setFiltersVisible(!filtersVisible)}
          >
            <IconAdjustments className={props.classes?.icon} />
          </Button>
        ) : (
          <Button
            className={props.classes?.button}
            onClick={() => setFiltersVisible(!filtersVisible)}
            rightIcon={<IconAdjustments className={props.classes?.icon} />}
          >
            {filtersLabel || "Filters"}
          </Button>
        )}
      </Group>
      <Collapse in={filtersVisible}>
        <Filters
          applyFilter={applyFilter}
          removeFilter={removeFilter}
          isMobile={isMobile}
          showSortSelect={props.showSortSelect || true}
          selectValue={selectValue}
          filterTerms={FILTER_TERMS}
          setSelectValue={setSelectValue}
          setOrderValue={setOrderValue}
          setSortValue={setSortValue}
        />
      </Collapse>
      <Group position="center" mt={20}>
        {activeFilters.map((filter: SearchFilter) => (
          <Tooltip label={filter.tooltip} key={filter.type}>
            <Badge
              key={filter.type}
              variant="filled"
              size="lg"
              rightSection={
                <Center>
                  <IconX size={18} />
                </Center>
              }
              onClick={() => {
                switch (filter.type) {
                  case "search":
                    removeFilter(filter.type, () => setInputValue(""));
                    break;
                  case "sort":
                    removeFilter(filter.type, () => {
                      setSelectValue("");
                      setOrderValue("createdAt");
                      setSortValue("asc");
                    });
                    break;
                }
              }}
            >
              {filter.label}
            </Badge>
          </Tooltip>
        ))}
      </Group>
    </Container>
  );
};
