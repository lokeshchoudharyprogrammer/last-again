import React from "react";
import { useEffect, useReducer } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  useColorModeValue,
  useDisclosure,
  Center,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";

const nameInitialState = {
  loading: false,
  error: null,
  products: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return {
        loading: false,
        error: null,
        products: action.payload,
      };

    case "FETCH_Err":
      return {
        loading: false,
        error: null,
        products: [],
      };
    default:
      return state;
  }
};

const Single = () => {

  const [count, setcount] = React.useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [state, dispatch] = useReducer(reducer, nameInitialState);
  const { id } = useParams();

  function Fetchdata() {
    return axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        dispatch({ type: "FETCH_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_Err", payload: err });
      });
  }

  useEffect(() => {
    Fetchdata();
  }, []);



  let data = state.products;
  return (
    <Container key={data.id} maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Center>
          <Flex>
            <Image
              rounded={"md"}
              alt={"product image"}
              src={data.image}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={{ base: "50%", sm: "400px", lg: "500px" }}
            />
          </Flex>
        </Center>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Center>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {data.title}
              </Heading>
            </Center>
            <Center>
              <Text
                color={useColorModeValue("gray.900", "gray.400")}
                fontWeight={300}
                fontSize={"2xl"}
              >
                {data.price}
              </Text>
            </Center>
            <Text>{data.description}</Text>
          </Box>

          <Button
            onClick={onOpen}
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to cart
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt="23px">
              <ModalHeader>{data.title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Image
                  rounded={"md"}
                  alt={"product image"}
                  src={data.image}
                  fit={"cover"}
                  align={"center"}
                  w={"100%"}
                  h={{ base: "50%", sm: "40%", lg: "50%" }}
                />
                <Text>Price : {data.price}</Text>
              </ModalBody>
              <Flex style={{justifyContent:"space-around"}}>
                <Center>
                  <button style={{border:"2px solid black",padding:"12px"}} disabled={count===1} onClick={() => setcount(count - 1)}>-</button>
                  <Text>Total Price :{parseInt(data.price * count)}</Text>
                  <button  style={{border:"2px solid black",padding:"12px"}}  onClick={() => setcount(count + 1)}>+</button>
                </Center>
              </Flex>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
               
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};

export default Single;
