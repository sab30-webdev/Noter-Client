import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  Text,
} from "@chakra-ui/core";
import { BackendUrl } from "../../BackendUrl";
import { UserContext } from "../../App";
import { useHistory } from "react-router";

const Register = () => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const toast = useToast();
  const history = useHistory();

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const { setUsername } = useContext(UserContext);

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        data: { token },
      } = await axios.post(`${BackendUrl}/register`, data);
      setUsername(data.name);
      if (token) {
        localStorage.setItem("token", token);
        toast({
          title: "Registered",
          description: "Signed up successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        history.push("/app/notes");
      }
    } catch (err) {
      if (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach((err) =>
            toast({
              description: `${err.msg}`,
              status: "error",
              duration: 3000,
              isClosable: true,
            })
          );
        }
      }
    }
  };

  return (
    <div className="form">
      <FormControl>
        <FormLabel htmlFor="name" color="White">
          Name
        </FormLabel>
        <Input
          id="name"
          type="text"
          required
          name="name"
          onChange={onChange}
          value={data.name}
          spellCheck="false"
        />
        <FormLabel htmlFor="email" color="White">
          Email
        </FormLabel>
        <Input
          id="email"
          type="email"
          required
          name="email"
          onChange={onChange}
          value={data.email}
          spellCheck="false"
        />
        <FormLabel htmlFor="password" color="White">
          Password
        </FormLabel>
        <Input
          id="password"
          type="password"
          required
          name="password"
          onChange={onChange}
          value={data.password}
          spellCheck="false"
        />
        <Button
          className="btn-chakra"
          my="10px"
          onClick={onSubmit}
          leftIcon="arrow-forward"
          bg="cyan.300"
          _hover={{ bg: "cyan.500" }}
        >
          Sign up
        </Button>
        <Text fontSize="1xl" color="White">
          Already have an account ?{" "}
        </Text>
        <Link to="/app/auth">
          {" "}
          <Text
            fontSize="1xl"
            fontWeight="500"
            color="cyan.200"
            style={{ display: "inline-block" }}
          >
            Sign In
          </Text>
        </Link>
      </FormControl>
    </div>
  );
};

export default Register;
