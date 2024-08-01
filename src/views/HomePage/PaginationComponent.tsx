import { Pagination, Select } from "@mantine/core";
import classes from "../../components/FilterTableComponent/FilterTableComponent.module.css";

interface PaginationComponentProps {
  totalPages: number;
  activePage: number;
  handlePageChange: (newPage: number) => void;
  handleItemsPerpageChange: (value: string) => void;
}

export function PaginationComponent({
  totalPages,
  activePage,
  handlePageChange,
  handleItemsPerpageChange,
}: PaginationComponentProps) {
  return (
    <div className={classes.Pagination}>
      <div className={classes.PaginationWrapper}>
        <Pagination
          total={totalPages}
          value={activePage}
          onChange={handlePageChange}
          mt="sm"
        />
        <div className={classes.SelectDropDownWrapper}>
          <Select
            data={["5", "10", "15", "20"]}
            onChange={handleItemsPerpageChange}
          />
        </div>
      </div>
    </div>
  );
}
