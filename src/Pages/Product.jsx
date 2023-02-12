import { useEffect, useReducer } from "react";
import axios from "axios";
import { Link,NavLink } from "react-router-dom";

import {
  Flex,
  Center,
  Box,
  Spacer,
  Heading,
  Button,
  Text,
  Image,
  ButtonGroup,
  Input,
  InputGroup,
  Container,
  VStack,
  StackDivider,
  Badge,
} from "@chakra-ui/react";
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

export default function Product() {
  const [state, dispatch] = useReducer(reducer, nameInitialState);

  function Fetchdata() {
    return axios
      .get(`https://fakestoreapi.com/products`)
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

  // console.log(state.products);
  let data = state.products;
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          alignItems: "center",
          justifyContent: "center",
          margin: "auto",
        }}
      >
        {data.map((property) => {
          return (
            <div>
           
  

          <NavLink to={`/product/${property.id}`}>

          <Box
              // justifyContent:"center"
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              key={property.id}
            >
              <Center>
             



                <Image
                  src={property.image}
                  alt={property.imageAlt}
                  width="120px"
                />
              {/* </Link> */}
              </Center>
              

              <Box p="6">
                <Box display="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    New
                  </Badge>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    {property.beds} beds &bull; {property.baths} baths
                  </Box>
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  noOfLines={1}
                >
                  {property.title}
                </Box>

                <Box>
                  {property.formattedPrice}
                  <Box as="span" color="gray.600" fontSize="sm">
                    <Text>{property.description.substring(1, 104)}</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            </NavLink>
            </div>
            
          );
        })}
      </div>
    </>
  );
}
