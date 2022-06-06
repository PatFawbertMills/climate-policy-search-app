import { useParams } from "react-router-dom";
import { Heading, Box, Text } from "@chakra-ui/react";
import { PolicyList } from "./PolicyList";
import { Search } from "./Search";
import { TPolicy } from "../types";

type TProps = {
  policies: TPolicy[];
};

export const Policies = ({ policies }: TProps) => {
  const { sector } = useParams();

  return !sector ? null : (
    <Box mb={"10"}>
      <Box mb={"5"}>
        <Heading as="h2" size={"xl"} mb={"2"}>
          Policies for: {sector}
        </Heading>
        <Text fontSize="md">
          All the policies for the sector {sector} are listed below. Use the
          search box to find a particular policy document. By clicking on the
          'metadata' button you can view more information on the policy and add
          some custom metadata.
        </Text>
      </Box>
      <Search />
      <PolicyList policies={policies} />
    </Box>
  );
};
