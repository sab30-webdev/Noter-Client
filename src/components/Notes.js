import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FormControl,
  Input,
  Textarea,
  Button,
  useToast,
  Text,
  Spinner,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
} from "@chakra-ui/core";
import "./Notes.css";
import { motion } from "framer-motion";
import { setAuthToken } from "./../utils/setAuthToken";

const Notes = ({ history }) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [render, setRender] = useState(null);
  const inputRef = useRef();
  const toast = useToast();

  const handleClick = () => {
    localStorage.removeItem("token");
    history.push("/");
    toast({
      title: "Logged out",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  // Get all notes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://still-wave-36292.herokuapp.com/notes");
        setNotes(data.notes);
        setRender(false);
      } catch (err) {
        const res = err.response.data.errors;
        if (res === undefined) {
          setNotes([]);
        }
      }
    };

    inputRef.current.focus();

    fetchData();
  }, [render]);

  const onChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete("/notes");
      if (response) {
        toast({
          title: "Account Deleted",
          description: "Your account has been removed",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      }
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Create a Note
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newNote.title === "" || newNote.description === "") {
        toast({
          title: "Error",
          description: "Please add the title and the note",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        await axios.post("/notes", newNote);
        setNewNote({ ...newNote, title: "", description: "" });
        setRender(true);
        toast({
          title: "New Note",
          description:
            "Your note has been added to the list , scroll down to see!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { title, description } = newNote;

  return (
    <div>
      <Button
        className="logout-btn"
        bg="cyan.500"
        variantColor="cyan."
        _hover={{ bg: "cyan.600" }}
        onClick={handleClick}
        rightIcon="arrow-right"
      >
        Logout
      </Button>

      <div className="form">
        <FormControl>
          {/* <FormLabel htmlFor="text">Title</FormLabel> */}
          <Input
            id="text"
            className="text"
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={onChange}
            spellCheck="false"
            ref={inputRef}
          />

          {/* <FormLabel htmlFor="textarea">Your Note</FormLabel> */}
          <Textarea
            id="textarea"
            className="newtextarea"
            placeholder="Your note"
            name="description"
            value={description}
            onChange={onChange}
            spellCheck="false"
          />
        </FormControl>

        <Button
          className="btn-chakra"
          my="10px"
          onClick={onSubmit}
          leftIcon="add"
          bg="cyan.400"
          variantColor="cyan."
          _hover={{ bg: "cyan.600" }}
        >
          Add note
        </Button>
      </div>

      <div className="notes">
        <Text fontSize="5xl" textAlign="center" color="cyan.300">
          Your Notes
        </Text>
        {notes === null ? (
          <div className="main-spin">
            <Spinner
              mt="10px"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </div>
        ) : (
          <div>
            {notes &&
              notes.map((note) => (
                <motion.div
                  layout
                  transition={{ duration: 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={note._id}
                  className="note-container"
                >
                  <Text className="newTitle" fontSize="3xl" py="4">
                    {note.title}
                  </Text>
                  <Text className="newNote" fontSize="1xl">
                    {note.description}
                  </Text>
                  <Link to={`/app/notes/${note._id}`}>
                    <Button
                      className="btn-chakra"
                      leftIcon="edit"
                      pt="1"
                      mt="3"
                      color="white"
                      bg="gray.600"
                      _hover={{ bg: "gray.500" }}
                    >
                      Edit
                    </Button>
                  </Link>
                </motion.div>
              ))}
            <div className="delete-account">
              <Popover>
                <PopoverTrigger>
                  <Button
                    my="10px"
                    mt="30px"
                    variantColor="red"
                    variant="solid"
                    color="White"
                  >
                    Delete Account
                  </Button>
                </PopoverTrigger>
                <PopoverContent zIndex={4}>
                  <PopoverCloseButton />
                  <PopoverHeader>Confirmation!</PopoverHeader>
                  <PopoverBody>
                    Are you sure you want to remove your account? Your notes
                    will be lost if you perform this action !
                  </PopoverBody>
                  <PopoverFooter>
                    <Button
                      onClick={deleteAccount}
                      className="btn-chakra"
                      bg="red.400"
                      variantColor="red"
                      _hover={{ bg: "red.500" }}
                      rightIcon="small-close"
                    >
                      Remove
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
