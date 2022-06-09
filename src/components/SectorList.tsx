import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  Collapse,
  useBreakpointValue,
} from "@chakra-ui/react";
import { TSector } from "../types";

type TProps = {
  sectors: TSector[];
};

// Accepts an object collection of sectors and renders them out in a list
export const SectorList = ({ sectors }: TProps) => {
  const variant = useBreakpointValue({ md: true });
  const navigate = useNavigate();
  const [_, setSearchParams] = useSearchParams();
  const { sector } = useParams();

  // When a sector is selected/deselected also clear the search as it would be considered bad UX to persist when the results would be filtered by a previous search
  const handleClick = (selectedSector: string) => {
    setSearchParams({ q: "" });
    const target = selectedSector === sector ? "/" : "/" + selectedSector;
    navigate(target);
  };

  return (
    <Flex justify={"flex-start"} wrap={"wrap"}>
      {sectors.map((item) => {
        const selected = item.name === sector;
        return (
          <Collapse in={variant || !sector || selected} key={item.name}>
            <Tag
              key={item.name}
              onClick={() => handleClick(item.name)}
              cursor={"pointer"}
              colorScheme={selected ? "blue" : "gray"}
              m={1}
            >
              <TagLabel>
                {item.name} ({item.no_of_policies})
              </TagLabel>
              {selected && <TagCloseButton />}
            </Tag>
          </Collapse>
        );
      })}
    </Flex>
  );
};
