import { useState, useEffect } from "react";
import { Combobox, TextInput, useCombobox, Flex } from "@mantine/core";
import dayjs from "dayjs";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: 100 },
  (_, k) => new Date().getFullYear() - 99 + k,
);

export function DateOfBirthPicker({ value, onChange }) {
  const [valueDay, setValueDay] = useState(value?.day || "");
  const [valueMonth, setValueMonth] = useState(value?.month || "");
  const [valueYear, setValueYear] = useState(value?.year || "");

  const comboboxMonth = useCombobox({
    onDropdownClose: () => comboboxMonth.resetSelectedOption(),
  });

  const comboboxDay = useCombobox({
    onDropdownClose: () => comboboxDay.resetSelectedOption(),
  });

  const comboboxYear = useCombobox({
    onDropdownClose: () => comboboxYear.resetSelectedOption(),
  });

  const filteredOptionsMonth = months.filter((item) =>
    item.toLowerCase().includes(valueMonth.toLowerCase().trim()),
  );

  const optionsMonth = filteredOptionsMonth.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  useEffect(() => {
    comboboxMonth.selectFirstOption();
  }, [filteredOptionsMonth]);

  const filteredOptionsYear = years.filter((item) => {
    const yearStr = item.toString();
    return yearStr.includes(valueYear.toString().trim());
  });

  const optionsYear = filteredOptionsYear.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  useEffect(() => {
    comboboxYear.selectFirstOption();
  }, [filteredOptionsYear]);

  useEffect(() => {
    if (valueYear && valueMonth) {
      const monthIndex = months.indexOf(valueMonth);
      const daysInMonth = dayjs(
        new Date(parseInt(valueYear), monthIndex),
      ).daysInMonth();
      const days = Array.from({ length: daysInMonth }, (_, i) =>
        (i + 1).toString(),
      );

      setDaysOptions(days);
    } else {
      setDaysOptions([]);
    }
  }, [valueYear, valueMonth]);

  const [daysOptions, setDaysOptions] = useState<string[]>([]);
  const filteredOptionsDay = daysOptions.filter((item) =>
    item.includes(valueDay.trim()),
  );

  const optionsDay = filteredOptionsDay.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  useEffect(() => {
    comboboxDay.selectFirstOption();
  }, [filteredOptionsDay]);

  useEffect(() => {
    if (
      valueDay !== value?.day ||
      valueMonth !== value?.month ||
      valueYear !== value?.year
    ) {
      onChange({
        day: valueDay,
        month: valueMonth,
        year: valueYear,
      });
    }
  }, [valueDay, valueMonth, valueYear, value, onChange]);

  return (
    <Flex
      direction={{ base: "column", sm: "row" }}
      gap={{ base: "sm", sm: "lg" }}
      justify={{ sm: "center" }}
    >
      <Combobox
        onOptionSubmit={(optionValue) => {
          setValueYear(optionValue);
          comboboxYear.closeDropdown();
        }}
        store={comboboxYear}
      >
        <Combobox.Target>
          <TextInput
            label="Godina"
            placeholder="Godina rođenja"
            value={valueYear}
            onChange={(event) => {
              setValueYear(event.currentTarget.value);
              comboboxYear.openDropdown();
            }}
            onClick={() => comboboxYear.openDropdown()}
            onFocus={() => comboboxYear.openDropdown()}
            onBlur={() => comboboxYear.closeDropdown()}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
            {optionsYear.length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              optionsYear
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Combobox
        onOptionSubmit={(optionValue) => {
          setValueMonth(optionValue);
          comboboxMonth.closeDropdown();
        }}
        store={comboboxMonth}
        disabled={!valueYear}
      >
        <Combobox.Target>
          <TextInput
            label="Mjesec"
            placeholder="Mjesec rođenja"
            value={valueMonth}
            onChange={(event) => {
              setValueMonth(event.currentTarget.value);
              comboboxMonth.openDropdown();
            }}
            onClick={() => comboboxMonth.openDropdown()}
            onFocus={() => comboboxMonth.openDropdown()}
            onBlur={() => comboboxMonth.closeDropdown()}
            disabled={!valueYear}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
            {optionsMonth.length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              optionsMonth
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      <Combobox
        onOptionSubmit={(optionValue) => {
          setValueDay(optionValue);
          comboboxDay.closeDropdown();
        }}
        store={comboboxDay}
        disabled={!valueMonth}
      >
        <Combobox.Target>
          <TextInput
            label="Dan"
            placeholder="Dan rođenja"
            value={valueDay}
            onChange={(event) => {
              setValueDay(event.currentTarget.value);
              comboboxDay.openDropdown();
            }}
            onClick={() => comboboxDay.openDropdown()}
            onFocus={() => comboboxDay.openDropdown()}
            onBlur={() => comboboxDay.closeDropdown()}
            disabled={!valueMonth}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options mah={200} style={{ overflowY: "auto" }}>
            {optionsDay.length === 0 ? (
              <Combobox.Empty>Nothing found</Combobox.Empty>
            ) : (
              optionsDay
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Flex>
  );
}
