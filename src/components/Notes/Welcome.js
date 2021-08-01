import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useToast } from "@chakra-ui/core";

const Welcome = () => {
  const toast = useToast();
  const { username, setUsername } = useContext(UserContext);

  useEffect(() => {
    username &&
      toast({
        description: `Welcome ${username}`,
        position: "top",
        duration: 5000,
      });
    setUsername(null);
  }, [username, toast, setUsername]);
};

export default Welcome;
