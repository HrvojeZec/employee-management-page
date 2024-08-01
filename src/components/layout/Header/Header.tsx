import { Button, Group, Text } from "@mantine/core";
import classes from "./HeaderSearch.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Businessplan } from "tabler-icons-react";

export function Header() {
  const navigate = useNavigate();
  const handleButton = () => {
    navigate("/FormPage");
  };

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <Link className={classes.links} to="/">
            <Group>
              <Businessplan size={30} strokeWidth={1.5} color={"black"} />{" "}
              <Text className={classes.logoName}>ZaposleniPanel</Text>
            </Group>
          </Link>
        </Group>
        <Group>
          <Button
            className={classes.links}
            visibleFrom="sm"
            onClick={handleButton}
          >
            Dodaj Zaposlenika
          </Button>
        </Group>
      </div>
    </header>
  );
}
