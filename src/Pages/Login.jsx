import React from "react";
import { AppContext } from "../Components/Context";
import { useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Button,
  Input,
  Text,
  InputGroup,
  Container,
  VStack,
  StackDivider,
} from "@chakra-ui/react";

const initialState = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: action.payload,
      };
    case "password":
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
};
export default function Login() {
  const { login, Auth } = useContext(AppContext);

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleSubmit = () => {
    axios
      .post(`https://reqres.in/api/login`, {
        email: state.email,
        password: state.password,
      })
      .then((res) => {
        if (res.data.token) {
          login(res.data.token);
        }
      });
  };

  if (Auth) {
    return <Navigate to="/product"></Navigate>;
  }

  return (
    <>
      <Container mt="73px">
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          <Input
            placeholder="Email"
            onChange={(e) =>
              dispatch({
                type: "email",
                payload: e.target.value,
              })
            }
          />
          <Text>Login With This Gmail : eve.holt@reqres.in</Text>
          <Text>Login With This Password : cityslicka</Text>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type="text"
              onChange={(e) =>
                dispatch({
                  type: "password",
                  payload: e.target.value,
                })
              }
              placeholder="Enter password"
            />
          </InputGroup>
          <Button onClick={handleSubmit} colorScheme="blue">
            Button
          </Button>
        </VStack>
      </Container>
    </>
  );
}
