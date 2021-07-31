import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/core";
import { Link } from "react-router-dom";
import {BackendUrl} from "../../BackendUrl"

const Login = ({ history }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const toast = useToast();

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const {
        data: { token },
      } = await axios.post(`${BackendUrl}/auth`, data);
      localStorage.setItem("token", token);
      toast({
        title: "Logged In",
        description: "Login success",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      history.push("/app/notes");
    } catch (err) {
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
      console.log(err);
    }
  };

  return (
    <div className="form">
      <FormControl>
        <FormLabel htmlFor="password" color="White">Email</FormLabel>
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
          Login
        </Button>
        <Text fontSize="1xl" color="White">
          Don't have an account ?{" "}
          <Link to="/app">
            <Text
              fontSize="1xl"
              fontWeight="500"
              color="cyan.300"
              style={{ display: "inline-block" }}
            >
              Sign Up
            </Text>
          </Link>
        </Text>
      </FormControl>
    </div>
  );
};

export default Login;
