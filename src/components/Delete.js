import React, { Fragment } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/core";

const Delete = ({ noteId, history }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const onDelete = async (noteId) => {
    try {
      await axios.delete(`/notes/${noteId}`);
      history.push("/app/notes");
      toast({
        title: "Delete",
        description: "Your note has been removed",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Button
        variantColor="red"
        variant="solid"
        color="White"
        onClick={onOpen}
        className="btn-chakra"
        leftIcon="delete"
      >
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure , you want to delete this note ?
          </ModalHeader>
          <ModalFooter>
            <ModalCloseButton />
            <Button
              onClick={() => onDelete(noteId)}
              variantColor="red"
              variant="outline"
              className="btn-chakra"
              leftIcon="delete"
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default Delete;
