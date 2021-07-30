import React, { useState } from "react";
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

const Register = ({ history }) => {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const toast = useToast();

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        data: { token },
      } = await axios.post("https://still-wave-36292.herokuapp.com/register", data);
      if (token) {
        localStorage.setItem("token", token);
        toast({
          title: "Registered",
          description: "Signed up successfully",
          status: "success",
          duration: 5000,
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
              duration: 5000,
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
        <FormLabel htmlFor="name" color="White">Name</FormLabel>
        <Input
          id="name"
          type="text"
          required
          name="name"
          onChange={onChange}
          value={data.name}
          spellCheck="false"
        />
        <FormLabel htmlFor="email" color="White">Email</FormLabel>
        <Input
          id="email"
          type="email"
          required
          name="email"
          onChange={onChange}
          value={data.email}
          spellCheck="false"
        />
        <FormLabel htmlFor="password" color="White">Password</FormLabel>
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
          bg="cyan.400"
          variantColor="cyan."
          _hover={{ bg: "cyan.600" }}
        >
          Sign up
        </Button>
        <Text fontSize="1xl" color="White">
          Already have an account ?{" "}
          <Link to="/app/auth">
            {" "}
            <Text
              fontSize="1xl"
              fontWeight="500"
              color="cyan.300"
              style={{ display: "inline-block" }}
            >
              Sign In
            </Text>
          </Link>
        </Text>
      </FormControl>
    </div>
  );
};

export default Register;
