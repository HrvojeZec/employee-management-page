import Layout from "../../components/layout/Layout";
import { DataProvider } from "../../stores/DataProvider";
import { Form } from "./Form";

export function FormPage() {
  return (
    <DataProvider>
      <Layout>
        <Form />
      </Layout>
    </DataProvider>
  );
}
