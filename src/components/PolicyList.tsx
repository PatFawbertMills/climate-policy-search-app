import { useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  useDisclosure,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { TPolicy } from "../types";
import { PolicyDrawer } from "./PolicyDrawer";
import { filterPolicies } from "../utilities/filterPolicies";

type TProps = {
  policies: TPolicy[];
};

// Basic table-view component to list all the policies for a given sector
// Carries out additional filtering, via a utility method, on the collection based on sector and search params
// The Drawer component is rendered within this view as it needs access to the selectedPolicy
export const PolicyList = ({ policies }: TProps) => {
  const variant = useBreakpointValue({ base: "base", md: "md" });
  const navigate = useNavigate();
  const { sector, policyId } = useParams();
  const [searchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchTerm = searchParams.get("q");

  // Take the URL if we have one and get the selected policy
  const selectedPolicy = useMemo(() => {
    return policies.find((policy) => policy.policy_id.toString() === policyId);
  }, [policyId]);

  const filteredPolicies = useMemo(() => {
    return filterPolicies(policies, sector, searchTerm || "");
  }, [policies, sector, searchTerm]);

  // Important to retain the search conditions when opening and closing the drawer
  const handleMetadataClick = (policy: TPolicy) => {
    navigate(
      `/${sector}/${policy.policy_id}${searchTerm ? `?q=${searchTerm}` : ""}`
    );
    onOpen();
  };

  const onDrawerClose = () => {
    navigate(`/${sector}${searchTerm ? `?q=${searchTerm}` : ""}`);
    onClose();
  };

  return (
    <>
      <TableContainer>
        <Table size="sm" variant={"striped"} whiteSpace={"normal"}>
          <TableCaption placement={"top"}>
            {`${filteredPolicies.length} results found`}
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Sectors</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPolicies.length === 0 ? (
              <Tr>
                <Td colSpan={3}>Sorry, no results found</Td>
              </Tr>
            ) : (
              filteredPolicies.map((policy) => (
                <Tr key={policy.policy_id}>
                  <Td>{policy.policy_title}</Td>
                  <Td>{policy.sectors.split(";").join(", ")}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => handleMetadataClick(policy)}
                    >
                      {variant === "base" ? "🖉" : "Edit"}
                    </Button>
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Title</Th>
              <Th>Sectors</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <PolicyDrawer
        policy={selectedPolicy}
        isOpen={isOpen || !!selectedPolicy}
        onClose={onDrawerClose}
      />
    </>
  );
};
