import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";

import { GymRecord } from "../utils/GymRecords";
import DeleteModal from "../components/DeleteModal";
import { Link } from "react-router-dom";
import { EditIcon } from "@chakra-ui/icons";

const Show = () => {
  const [records, setRecords] = useState<GymRecord[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchRecords = async () => {
      try {
        const response = await fetch("http://localhost:8080/gym/records", {
          method: "GET",
          signal: signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: GymRecord[] = await response.json();
        setRecords(data);
        console.log(records);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Fetch error: ", error);
          setError(error.message);
        }
      }
    };

    fetchRecords();

    return () => {
      controller.abort();
    };
  }, []);

  const handleEdit = (id: number) => {
    // Handle edit functionality here
    console.log(`Edit exercise with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    try {
      fetch(`http://localhost:8080/gym/records/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      })
        .then((response) => {
          if (response.status == 200) {
            return response.json();
          }
          return null;
        })
        .then((data) => {
          if (data !== null) {
            setRecords(records.filter((record) => record.id !== data.id));
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      minH="100vh"
      py="6"
      width="80%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      mx="auto"
      gap="10"
    >
      <Heading textAlign="center" fontFamily="DM Sans" color="#fff" mb="2">
        Show Exercises
      </Heading>
      <Flex
        gap="5"
        flexWrap="wrap"
        alignItems="center"
        flexDirection="row"
        w="100%"
        justifyContent="flex-start"
      >
        {records.map((exercise) => (
          <Box
            key={exercise.id}
            display="flex"
            justifyContent="start"
            alignItems="center"
            gap="4"
            p="3"
            borderWidth="2px"
            borderRadius="0.5rem"
            mx="auto"
          >
            {/* Left side: Exercise details */}
            <Flex align="center">
              <VStack align="start" spacing="1">
                <Text fontWeight="bold">{exercise.exercise}</Text>
                <Text>Weight: {exercise.weight} kg</Text>
                <Text>Id: {exercise.id}</Text>
              </VStack>
            </Flex>

            {/* Right side: Edit and Delete icons */}
            <Box display="flex" flexDirection="column" gap="4">
              <DeleteModal handleDelete={handleDelete} _id={exercise.id} />
              <Link to={`/edit/${exercise.id}`}>
                <Tooltip label="Edit Listing" hasArrow>
                  <EditIcon color="white" cursor="pointer" />
                </Tooltip>
              </Link>
            </Box>
          </Box>
        ))}
      </Flex>
      <Box my="auto">
        <Link to={"/"}>
          <Button colorScheme="blue" bg="#808080" w="100%">
            Create exercises
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Show;
