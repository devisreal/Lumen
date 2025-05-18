import { Button, Title } from "@mantine/core";
import { Group, useMantineColorScheme } from "@mantine/core";

import "./styles/App.css";

function App() {
  return (
    <div className="font-sans p-3">
      <h1 className="font-roundo font-semibold dark:text-white">
        Lumen askdas Lumen Blog
      </h1>
      <Title order={1}>Lumen askdas Lumen Blog</Title>
      <p>Akinoso please pass me the food</p>
      <Button color="butter-yellow.3" variant="filled">
        Click
      </Button>
      <Button color="sky-blue.6" variant="filled" className="ml-4">
        Click
      </Button>
      <Button variant="gradient" className="ml-4">
        Click
      </Button>

      <Demo />
    </div>
  );
}

function Demo() {
  const { setColorScheme, clearColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });

  return (
    <Group className="mt-4">
      <Button onClick={() => setColorScheme("light")}>Light</Button>
      <Button onClick={() => setColorScheme("dark")}>Dark</Button>
      <Button onClick={() => setColorScheme("auto")}>Auto</Button>
      <Button onClick={clearColorScheme}>Clear</Button>
    </Group>
  );
}
export default App;
