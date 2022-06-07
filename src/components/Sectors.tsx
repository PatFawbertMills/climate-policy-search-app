import { SectorList } from "./SectorList";
import { Heading, Box } from "@chakra-ui/react";
import { TSector } from "../types";

type TProps = {
  sectors: TSector[];
};

export const Sectors = ({ sectors }: TProps) => {
  return (
    <Box mb={"5"}>
      <Heading as="h2" size={"xl"} mb={"2"}>
        Sectors
      </Heading>
      <SectorList sectors={sectors} />
    </Box>
  );
};
