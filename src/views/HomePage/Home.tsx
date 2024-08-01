import { useEmployeesData } from "../../stores/GetAllEmployess";
import cx from "clsx";
import {
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
  Avatar,
  Badge,
} from "@mantine/core";
import classes from "../../components/FilterTableComponent/FilterTableComponent.module.css";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { FilterTableComponent } from "./FilterTableComponent";
import { PaginationComponent } from "./PaginationComponent";
import { sortData } from "../../utils/employeesUtils";
import { ChangeEvent } from "react";

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}
interface RowData {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  jobTitle: string;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

function Home() {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>("");
  const { data } = useEmployeesData();
  const employees: RowData[] = data ?? [];

  const allJobTitles = employees.map((employee: RowData) => employee.jobTitle);
  const uniqueJobTitles = Array.from(new Set(allJobTitles));

  useEffect(() => {
    setSortedData(
      sortData(employees, {
        sortBy,
        reversed: reverseSortDirection,
        search,
        selectedJobTitle,
      }),
    );
    setActivePage(1);
  }, [search, selectedJobTitle, sortBy, reverseSortDirection, employees]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setActivePage(newPage);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format("DD/MM/YYYY");
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const handleJobTitleChange = (value: string | null) => {
    setSelectedJobTitle(value ?? "");
  };

  const handleItemsPerpageChange = (value: string) => {
    console.log(value);

    const newItemsPerPage = Number(value);
    setItemsPerPage(newItemsPerPage);
    setActivePage(1);
  };

  const setSorting = (field: keyof RowData) => {
    const reversed = sortBy === field ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(employees, {
        sortBy: field,
        reversed,
        search,
        selectedJobTitle,
      }),
    );
  };

  const rows = sortedData
    .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
    .map((row) => (
      <Table.Tr key={row.id}>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={30} radius={30} />
            <Text fz="sm" fw={500}>
              {row.firstName + " " + row.lastName}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{formatDate(row.dateOfBirth)}</Table.Td>
        <Table.Td>
          <Badge variant="light">{row.jobTitle}</Badge>
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <div className={classes.tableWrapper}>
      <div className={classes.table}>
        <FilterTableComponent
          search={search}
          selectedJobTitle={selectedJobTitle}
          uniqueJobTitles={uniqueJobTitles}
          handleSearchChange={handleSearchChange}
          handleJobTitleChange={handleJobTitleChange}
        />
        <Table miw={700}>
          <Table.Thead className={cx(classes.header)}>
            <Table.Tr>
              <Th
                sorted={sortBy === "firstName"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("firstName")}
              >
                Ime i prezime
              </Th>
              <Th
                sorted={sortBy === "dateOfBirth"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("dateOfBirth")}
              >
                Datum rođenja
              </Th>
              <Th
                sorted={sortBy === "jobTitle"}
                reversed={reverseSortDirection}
                onSort={() => setSorting("jobTitle")}
              >
                Naziv posla
              </Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <PaginationComponent
          totalPages={totalPages}
          activePage={activePage}
          handlePageChange={handlePageChange}
          handleItemsPerpageChange={handleItemsPerpageChange}
        />
      </div>
    </div>
  );
}

export default Home;
