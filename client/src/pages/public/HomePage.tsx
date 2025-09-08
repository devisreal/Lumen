import { Anchor, Button, Title } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="font-sans p-3">
      <h1 className="font-host font-semibold ">Lumen askdas Lumen Blog</h1>
      <Title order={1}>Lumen askdas Lumen Blog</Title>
      <p>Akinoso please pass me the food</p>
      <Button color="butter-yellow.3" variant="filled">
        Click
      </Button>
      <Anchor
        style={{
          marginLeft: "1rem",
          color: "blue",
        }}
        underline="hover"
        component={Link}
        to="/u/profile"
        className="ml-4"
      >
        Profile
      </Anchor>
      <Button variant="gradient" className="ml-4">
        Click
      </Button>
    </div>
  );
};

export default HomePage;
