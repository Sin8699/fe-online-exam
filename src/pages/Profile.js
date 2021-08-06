// material
import { Container } from "@material-ui/core";
// components
import Page from "../components/Page";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import plusFill from "@iconify/icons-eva/plus-fill";
// ----------------------------------------------------------------------

export default function Profile() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Dashboard | Online Exam-UI">
      <Container maxWidth="xl">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon tabs example"
        >
          <Tab icon={<Icon icon={plusFill} />} aria-label="phone" />
          <Tab icon={<Icon icon={plusFill} />} aria-label="favorite" />
          <Tab icon={<Icon icon={plusFill} />} aria-label="person" />
        </Tabs>
      </Container>
    </Page>
  );
}
