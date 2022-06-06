import { useMemo } from "react";
import { Heading, Box, Text } from "@chakra-ui/react";
import { Sectors } from "./components/Sectors";
import { Policies } from "./components/Policies";
import { parseCSV } from "./utilities/parseCSV";
import { getSectors } from "./utilities/getSectors";

// Top level app container handles the data fetching and passes the dataset into the components
function App() {

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
