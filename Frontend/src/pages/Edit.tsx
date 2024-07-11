import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

type Props = {};

const Edit = (props: Props) => {
  const [formData, setFormData] = useState({
    exercise: "",
    weight: 1,
  });
  
  const { id } = useParams<{ id: string }>();

  const disabled = formData.exercise === "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;

    const newValue = type === "number" ? +value : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      fetch(`http://localhost:8080/gym/records/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          exercise: formData.exercise,
          weight: formData.weight,
        }),
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          }
          return null;
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      bgGradient="linear(to-b, black, gray)"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      w="100vw"
      minH="100vh"
    >
      <Container maxW="container.sm" mx="auto">
        <Flex
          justify="center"
          align="center"
          direction="column"
          minH="100vh"
          gap="4"
          backdropFilter="blur(3px)"
          textAlign="center"
        >
          <Heading fontFamily="DM Sans" color="#fff" mb="2">
            Create Exercises
          </Heading>

          <Flex direction="column" gap="6" color="#fff" fontFamily="DM Sans">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                autoComplete="off"
                type="text"
                id="exercise"
                placeholder="Enter Name"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Number</FormLabel>
              <Input
                autoComplete="off"
                type="number"
                id="weight"
                placeholder="Enter Number"
                onChange={handleChange}
                value={formData.weight}
              />
            </FormControl>

            <Button
              bg="#808080"
              type="submit"
              mt="2"
              isDisabled={disabled}
              onClick={handleSubmit}
            >
              Create
            </Button>

            <Link to={"/show"}>
              <Button colorScheme="blue" bg="#808080" w="100%">
                Show exercises
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Edit;
