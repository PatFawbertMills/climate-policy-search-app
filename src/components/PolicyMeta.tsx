import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { TMeta } from "../types";

type TProps = {
  policyMeta: TMeta[];
  handleDeleteMeta?: (key: string) => void;
};

// Render out the list of policy metadata
// If we don't pass in a deletion handler, the meta will not have the option to be deleted
export const PolicyMeta = ({ policyMeta, handleDeleteMeta }: TProps) => {
  return (
    <TableContainer>
      <Table size="sm" variant={"striped"} whiteSpace={"normal"}>
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
            {!!handleDeleteMeta && <Th></Th>}
          </Tr>
        </Thead>
        <Tbody>
          {policyMeta.map((meta, index) => (
            <Tr key={meta.key + index}>
              <Td>{meta.key}</Td>
              <Td>{meta.value}</Td>
              {!!handleDeleteMeta && (
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteMeta(meta.key)}
                  >
                    Delete
                  </Button>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
