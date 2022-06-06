import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Tag, Flex } from "@chakra-ui/react";
import { TSector } from "../types";

type TProps = {
  sectors: TSector[];
};

// Accepts an object collection of sectors and renders them out in a list
// Considered 'dumb' as the click handler is handled upstream, this means our components are never coupled to their use-case
export const SectorList = ({ sectors }: TProps) => {
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const { sector } = useParams();

  // When a sector is selected/deselected also clear the search box as that is considered bad UX because the results would be filtered by a previous search
  const handleClick = (selectedSector: string) => {
    setSearchParams({ q: "" });
    const target = selectedSector === sector ? "/" : "/" + selectedSector;
    navigate(target);
  };

  return (
    <Flex justify={"center"} wrap={"wrap"}>
      {sectors.map((item) => (
        <Tag
          key={item.name}
          onClick={() => handleClick(item.name)}
          cursor={"pointer"}
          colorScheme={item.name === sector ? "blue" : "gray"}
          m={1}
        >
          {item.name} ({item.no_of_policies})
        </Tag>
      ))}
    </Flex>
  );
};
