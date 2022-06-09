import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerFooter,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { TPolicy, TMeta } from "../types";
import { getMetaData, deleteMetaItem } from "../utilities/handleMetaData";
import { PolicyMeta } from "./PolicyMeta";
import { PolicyMetaForm } from "./PolicyMetaForm";

type TProps = {
  isOpen: boolean;
  onClose: () => void;
  policy: TPolicy | undefined;
};

// Renders any additional information about the policy
// Meta data form and list is managed in their respective components
export const PolicyDrawer = ({ isOpen, onClose, policy }: TProps) => {
  const toast = useToast();
  const [policyMeta, setPolicyMeta] = useState<TMeta[]>([]);

  // Get a list of meta on component load, only run again if the policy changes
  useEffect(() => {
    setPolicyMeta(getMetaData(policy?.policy_id));
  }, [policy]);

  // This is how we can keep business logic out of our form component
  // Triggers a refetching of the meta data after we have successfully added it
  const handleNewMeta = () => {
    setPolicyMeta(getMetaData(policy?.policy_id));
  };

  // Handle the deletion of the meta here where we have access to the policy context
  const deleteMetaData = (key: string) => {
    if (!policy?.policy_id) return;
    setPolicyMeta(deleteMetaItem(policy.policy_id, key));
    toast({
      title: "Metadata deleted",
      description: "The metadata has been removed from the policy.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  if (!policy) return null;
  return (
    <Drawer isOpen={isOpen} placement="right" size={"lg"} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{policy.policy_title}</DrawerHeader>
        <DrawerBody>
          <Text fontSize="sm" mb={"5"} color={"blue.600"} fontWeight="bold">
            Sectors: {policy.sectors.split(";").join(", ")}
          </Text>
          <Text fontSize="sm" mb={"5"}>
            {policy?.description_text}
          </Text>
          <PolicyMetaForm
            policyId={policy.policy_id}
            visible={isOpen}
            onComplete={handleNewMeta}
          />
          {policyMeta?.length > 0 && (
            <>
              <Text fontSize="sm" mb={"5"} mt={"5"}>
                Existing metadata
              </Text>
              <PolicyMeta
                policyMeta={policyMeta}
                handleDeleteMeta={deleteMetaData}
              />
            </>
          )}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
