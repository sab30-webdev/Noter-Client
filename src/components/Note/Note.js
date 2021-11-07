import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  Switch,
} from "@chakra-ui/core";
import { motion } from "framer-motion";
import { BackendUrl } from "../../BackendUrl";
import "./Note.css";

const Note = () => {
  const history = useHistory();
  const params = useParams();
  const [note, setNote] = useState(null);
  const noteId = params.id;
  const toast = useToast();
  const [checked, setChecked] = useState(false);

  // Get note
  useEffect(() => {
    try {
      async function fetchData() {
        const { data } = await axios.get(`${BackendUrl}/notes/${noteId}`);
        setNote(data.note);
        setChecked(data.note.completed);
      }
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [noteId]);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    let n = note;
    n.completed = e.target.checked;
    setChecked(e.target.checked);
    setNote(n);
  };

  // Edit node
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${BackendUrl}/notes/${params.id}`,
        note
      );
      if (!data.success) {
        toast({
          title: "Error",
          description: "Title and the note can't be empty",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        setNote(data.note);
        history.push("/app/notes");
        toast({
          title: "Update",
          description: "Your note has been updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form">
      {!note ? (
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
            <FormLabel htmlFor="text" color="White">
              Title
            </FormLabel>
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
            <FormLabel htmlFor="textarea" color="White">
              Your Note
            </FormLabel>
            <Textarea
              id="textarea"
              className="textarea"
              placeholder="Your note"
              name="description"
              value={note === null ? "" : note.description}
              onChange={onChange}
              spellCheck="false"
            />
          </FormControl>
          <div className="switch-div">
            <span>Completed ?</span>
            <Switch isChecked={checked} onChange={handleCheck} color="red" />
          </div>
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
        </motion.div>
      )}
    </div>
  );
};

export default Note;
