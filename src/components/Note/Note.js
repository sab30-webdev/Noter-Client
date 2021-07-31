import React, { useState, useEffect } from "react";
import Delete from "../Delete";
import axios from "axios";
import {
  Input,
  Textarea,
  Button,
  Flex,
  FormControl,
  FormLabel,
  useToast,
  Spinner,
} from "@chakra-ui/core";
import { motion } from "framer-motion";
import "./Note.css";
import { setAuthToken } from "../../utils/setAuthToken";
import { BackendUrl } from "../../BackendUrl";

const Note = ({ match, history }) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const [note, setNote] = useState(null);
  const noteId = match.params.id;
  const toast = useToast();

  // Get note
  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await axios.get(`${BackendUrl}/notes/${noteId}`);
        setNote(data.note);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [noteId]);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // Edit node
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${BackendUrl}/notes/${match.params.id}`, note);
      if (!data.success) {
        toast({
          title: "Error",
          description: "Title and the note can't be empty",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setNote(data.note);
        history.push("/app/notes");
        toast({
          title: "Update",
          description: "Your note has been updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      {note === null ? (
        <div className="spinner-container">
          <Spinner
            className="spinner"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FormControl isRequired>
            <FormLabel htmlFor="text" color="White">Title</FormLabel>
            <Input
              id="text"
              className="text"
              type="text"
              placeholder="Title"
              name="title"
              value={note === null ? "" : note.title}
              onChange={onChange}
              spellCheck="false"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="textarea" color="White">Your Note</FormLabel>
            <Textarea
              id="textarea"
              className="textarea"
              placeholder="Your note"
              name="description"
              value={note === null ? "" : note.description}
              onChange={onChange}
              spellCheck="false"
            />
            <Flex className="btn-div" align="center" justify="space-between">
              <Button
                className="btn-chakra"
                onClick={onSubmit}
                variantColor="green"
                type="submit"
                leftIcon="check"
              >
                Update
              </Button>

              <Delete noteId={noteId} history={history} />
            </Flex>
          </FormControl>
        </motion.div>
      )}
    </div>
  );
};

export default Note;
