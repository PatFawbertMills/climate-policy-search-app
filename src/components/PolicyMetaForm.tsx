import { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useToast,
  Flex,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";

import { addMetaData, containsKey } from "../utilities/handleMetaData";

type TProps = {
  policyId: number;
  visible: boolean;
  onComplete: () => void;
};

// Component to manage the policy meta form
// Decided against using anything like react-hook-forms as it is overkill for something this simple
export const PolicyMetaForm = ({ policyId, visible, onComplete }: TProps) => {
  const toast = useToast();
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [formErrors, setFormErrors] = useState<string | null>(null);

  // When the drawer is opened or close reset our form, we don't want data persisting between drawer sessions
  useEffect(() => {
    resetForm();
  }, [visible]);

  const resetForm = () => {
    setFormErrors(null);
    setKey("");
    setValue("");
  };

  // Do any data validation and storage handling, then call the parent's onComplete
  const handleFormSubmission = () => {
    setFormErrors(null);
    // Validate user has entered something
    if (!key.length || !value.length)
      return setFormErrors("Please supply a key and a value");
    // Check whether we already have this key
    if (containsKey(policyId, key))
      return setFormErrors("This key already exists, please try another");
    addMetaData(policyId, { key: key, value: value });
    resetForm();
    onComplete();
    toast({
      title: "Metadata added",
      description: "The metadata has been added to the policy.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <FormControl isInvalid={!!formErrors}>
      <FormHelperText mb={"5"}>
        Add additional meta data to the policy. Existing metadata is displayed
        below
      </FormHelperText>
      <Flex gap={5}>
        <Box flex={1}>
          <FormLabel htmlFor="key" fontSize={"sm"}>
            Key
          </FormLabel>
          <Input
            id="key"
            type="text"
            placeholder="Enter the key"
            value={key}
            required
            onChange={(e) => setKey(e.target.value)}
            mb={"5"}
            size={"sm"}
          />
        </Box>
        <Box flex={1}>
          <FormLabel htmlFor="value" fontSize={"sm"}>
            Value
          </FormLabel>
          <Input
            id="value"
            type="text"
            placeholder="Enter the value"
            value={value}
            required
            onChange={(e) => setValue(e.target.value)}
            mb={"5"}
            size={"sm"}
          />
        </Box>
      </Flex>
      {formErrors !== null && (
        <Text color={"red"} mb={"5"}>
          {formErrors}
        </Text>
      )}
      <Button colorScheme={"blue"} onClick={handleFormSubmission}>
        Add new metadata
      </Button>
    </FormControl>
  );
};
