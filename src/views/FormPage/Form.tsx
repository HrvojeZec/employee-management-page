import { useForm } from "@mantine/form";
import { TextInput, Button, Container, Stack } from "@mantine/core";
import { showSuccessNotification } from "../../components/shared/Notification/GlobalNotification";
import { DateOfBirthPicker } from "./DateOfBirthPicker";

export function Form() {
  const form = useForm({
    initialValues: {
      ime: "",
      prezime: "",
      dateOfBirth: {
        day: "",
        month: "",
        year: "",
      },
      jobTitle: "",
    },
    validate: {
      ime: (value) =>
        value.length < 2 ? "Ime mora sadržavati najmanje dva slova" : null,
      prezime: (value) =>
        value.length < 2 ? "Prezime mora sadržavati najmanje dva slova" : null,
      dateOfBirth: (value) =>
        !value.day || !value.month || !value.year
          ? "Datum rođenja je obavezan"
          : null,
      jobTitle: (value) =>
        value.length < 2
          ? "Zanimanje mora sadržavati najmanje dva slova"
          : null,
    },
  });

  const handleSubmit = (values) => {
    console.log(values);
    showSuccessNotification({ message: "Podaci su uspješno spremljeni" });
  };

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Ime"
            placeholder="Unesi ime"
            {...form.getInputProps("ime")}
          />
          <TextInput
            label="Prezime"
            placeholder="Unesi prezime"
            {...form.getInputProps("prezime")}
          />

          <DateOfBirthPicker
            value={form.values.dateOfBirth}
            onChange={(value) => form.setFieldValue("dateOfBirth", value)}
          />
          <TextInput
            mt="sm"
            label="Zanimanje"
            placeholder="Unesi zanimanje"
            {...form.getInputProps("jobTitle")}
          />
          <Button type="submit" mt="sm">
            POŠALJI
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
