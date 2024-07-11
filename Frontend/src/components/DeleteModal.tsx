import React from "react";
import {
  Button,
  Flex,
  Spacer,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tooltip,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type Props = {
  handleDelete: (id: number) => void;
  _id: number;
};

const DeleteModal: React.FC<Props> = ({ handleDelete, _id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onDelete = () => {
    handleDelete(_id); // Call handleDelete function with _id
    onClose(); // Close the modal after deletion
  };

  return (
    <>
      <Tooltip label="Delete Listing" placement="top" hasArrow>
        <DeleteIcon color="red" cursor="pointer" onClick={onOpen} />
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay
          backdropFilter="blur(10px) hue-rotate(90deg)"
          bg="blackAlpha.300"
        />
        <ModalContent
          bg="black"
          width={{ xl: "570px", md: "400px", base: "300px" }}
        >
          <ModalHeader color="white">Delete Exercise</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <Text color="white">Are you sure that you want to delete?</Text>
          </ModalBody>

          <ModalFooter>
            <Flex direction="row" w="100%">
              <Button colorScheme="green" mr={3} onClick={onClose}>
                No
              </Button>
              <Spacer />
              <Button
                leftIcon={<DeleteIcon />}
                colorScheme="red"
                onClick={onDelete} // Pass onDelete function to onClick
              >
                Yes
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
