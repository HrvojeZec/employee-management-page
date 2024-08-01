import Home from "./Home";
import { DataProvider } from "../../stores/DataProvider";
import Layout from "../../components/layout/Layout";

export function HomePage() {
  return (
    <DataProvider>
      <Layout>
        <Home />
      </Layout>
    </DataProvider>
  );
}
