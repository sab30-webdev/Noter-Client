if (localStorage.getItem("token")) {
    const decodedToken = jwtDecode(localStorage.getItem("token"));
    if (decodedToken.exp * 1000 > Date.now()) {
      setAuthToken(localStorage.token);
    } else {
      console.log("Invalid/expired token");
    }
  }