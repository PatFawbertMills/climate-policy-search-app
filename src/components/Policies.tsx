import { useParams } from "react-router-dom";
import { Heading, Box, Text, useBreakpointValue } from "@chakra-ui/react";
import { PolicyList } from "./PolicyList";
import { Search } from "./Search";
import { TPolicy } from "../types";

type TProps = {
  policies: TPolicy[];
};

export const Policies = ({ policies }: TProps) => {
  const { sector } = useParams();
  const variant = useBreakpointValue({ md: true });

  return !sector ? null : (
    <Box mb={"10"}>
      <Box mb={"5"}>
        <Heading as="h2" size={"xl"} mb={"2"}>
          Policies for: {sector}
        </Heading>
        <Text fontSize="md">
          All the policies for the sector {sector} are listed below. Use the
          search box to find a particular policy document. By clicking on the
          {variant ? " 'Edit' " : " '🖉' "} button you can view more information on the
          policy and add some custom metadata.
        </Text>
      </Box>
      <Search />
      <PolicyList policies={policies} />
    </Box>
  );
};
