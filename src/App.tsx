import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Heading, Box, Text } from "@chakra-ui/react";
import { Sectors } from "./components/Sectors";
import { Policies } from "./components/Policies";
import { parseCSV } from "./utilities/parseCSV";
import { getSectors } from "./utilities/getSectors";

// This top-level component is using the react 'Container' pattern
// The logic, state and data fetching is being handled here, which means our components can stay dumb and not worry about business logic
function App() {
  const { sector } = useParams();

  // Configure our underlying data
  // For performance useMemo ensures we aren't doing these expensive calculations everytime the component renders
  const dataSet = useMemo(() => parseCSV(), []);
  const sectors = useMemo(() => getSectors(dataSet.data), [dataSet]);

  return (
    <Box maxW="1200px" mx="auto" my={"10"} px={"5"}>
      <Box mb={"5"}>
        <Heading as="h1" size={"2xl"} mb={"2"}>
          Climate Policy Search App
        </Heading>
        <Text fontSize="md">
          Welcome to the Climate Policy search app. Select a sector below to see
          all the policies within that sector.
        </Text>
      </Box>
      <main>
        <Sectors sectors={sectors} />
        <Policies policies={dataSet.data} />
      </main>
    </Box>
  );
}

export default App;
