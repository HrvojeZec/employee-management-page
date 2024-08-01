import { TextInput, rem, Select } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import classes from "../../components/FilterTableComponent/FilterTableComponent.module.css";
import { ChangeEvent } from "react";

interface FilterTableComponentProps {
  search: string;
  selectedJobTitle: string;
  uniqueJobTitles: string[];
  handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleJobTitleChange: (value: string | null) => void;
}

export function FilterTableComponent({
  search,
  selectedJobTitle,
  uniqueJobTitles,
  handleSearchChange,
  handleJobTitleChange,
}: FilterTableComponentProps) {
  return (
    <div className={classes.filterWrapper}>
      <TextInput
        placeholder="Pretraži po bilo kojem polju"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Select
        placeholder="Odaberi zanimanje"
        clearable
        data={uniqueJobTitles}
        maxDropdownHeight={200}
        value={selectedJobTitle}
        onChange={handleJobTitleChange}
      />
    </div>
  );
}
