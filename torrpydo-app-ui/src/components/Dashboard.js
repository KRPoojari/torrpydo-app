import React, { useState, useEffect } from 'react'
import {
    Flex, Box, Spacer, Heading, Progress, Stack, ButtonGroup, Button, Input, VStack, HStack, InputGroup,
    Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
    useDisclosure, FormControl, StackDivider
} from "@chakra-ui/react"
import Menu from './Menu'
import { BiPlay, BiPause, BiStop, BiTrash, BiPlus } from "react-icons/bi"
import axios from 'axios'

function Dashboard() {
    const [state, setState] = useState()
    const [files, setFiles] = useState({
        selectedFile: null
    })

    useEffect(() => {
        setInterval(() => {
            getData()
        }, 2500);
    }, [])

    const onFileChange = (e) => {
        setFiles({ selectedFile: e.target.files[0] })
    }

    const getData = async () => {
        const response = await fetch("http://localhost:5000/status")
        const data = await response.json()
        setState(data.resp)
        console.log(data)
    }

    const pauseTask = async () => {
        const response = await fetch("http://localhost:5000/pause")
        const data = await response.json()
        setState(data.resp)
        console.log(data)
    }

    const resumeTask = async () => {
        const response = await fetch("http://localhost:5000/resume")
        const data = await response.json()
        setState(data.resp)
        console.log(data)
    }

    const removeTask = async () => {
        const response = await fetch("http://localhost:5000/remove")
        const data = await response.json()
        setState(data.resp)
        console.log(data)
    }

    const onFileUpload = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append(
            "file",
            files.selectedFile,
            files.selectedFile.name
        );

        axios.post("http://localhost:5000/add", formData);
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Menu />
            <Flex bg="blackAlpha.800">
                <Flex w="35vw" bg="blackAlpha.400" ml="12" mt="12" mb="12" rounded="3xl" >
                    <Heading color="white" align="center" size="xs" m="10"> STATISTICS </Heading>
                    <VStack divider={<StackDivider borderColor="gray.200" />}
                        spacing={4}
                        align="stretch">
                        <Box h="10" w="25" bg="white"></Box>
                        <Box h="10" bg="white">2</Box>
                        <Box h="10" bg="white">3</Box>
                    </VStack>
                </Flex>

                <Flex direction="column">
                    <Flex rounded="3xl" w="65vw" h="50vh" bg="white" m="12" mb="5">
                        <VStack>
                            <Stack height="42vh" direction="row">
                                <Flex m="7" w="50vw">
                                    {
                                        state &&
                                        state.map(x => (
                                            <Flex h="220" w="600" direction="column">

                                                <Box backgroundColor="white"
                                                    color="black"
                                                    fontWeight="semibold"
                                                    letterSpacing="wide"
                                                    fontSize="lg"
                                                    textTransform="uppercase">
                                                    <p> {x["name"]} </p>
                                                </Box>
                                                <HStack spacing="10">
                                                    <Box backgroundColor="white"
                                                        color="gray.500"
                                                        fontWeight="thin"
                                                        letterSpacing="wide"
                                                        fontSize="7xl"
                                                        textTransform="uppercase">
                                                        <p> {x["speed"]} </p>
                                                    </Box>

                                                    <Box backgroundColor="white"
                                                        color="gray.500"
                                                        fontWeight="thin"
                                                        letterSpacing="wide"
                                                        fontSize="5xl"
                                                        textTransform="uppercase">
                                                        <p> {x["uplo"]} </p>
                                                    </Box>
                                                </HStack>
                                                <HStack>
                                                    <Box backgroundColor="white"
                                                        color="gray.500"
                                                        fontWeight="thin"
                                                        letterSpacing="wide"
                                                        fontSize="3xl"
                                                        textTransform="uppercase">
                                                        <p> {x["seeds"]} </p>
                                                    </Box>
                                                    <Box backgroundColor="white"
                                                        color="gray.500"
                                                        fontWeight="thin"
                                                        letterSpacing="wide"
                                                        fontSize="3xl"
                                                        textTransform="uppercase">
                                                        <p> {x["eta"]} </p>
                                                    </Box>
                                                    <Box backgroundColor="white"
                                                        color="gray.500"
                                                        fontWeight="thin"
                                                        letterSpacing="wide"
                                                        fontSize="3xl"
                                                        textTransform="uppercase">
                                                        <Progress size="xs" colorScheme="pink" value={"x[progress"} />
                                                    </Box>
                                                </HStack>
                                            </Flex>
                                        ))
                                    }


                                </Flex>
                                <Spacer />
                                <Stack>
                                    <ButtonGroup m="5">
                                        <Button onClick={resumeTask}>
                                            <BiPlay />
                                        </Button>
                                        <Button onClick={pauseTask}>
                                            <BiPause />
                                        </Button>
                                        <Button>
                                            <BiStop />
                                        </Button>
                                    </ButtonGroup>
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing="98vh" m="10">
                                <Button onClick={onOpen} variant="solid" colorScheme="green" p="5" size="sm" leftIcon={<BiPlus />}>ADD TORRENT</Button>
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Add Torrent</ModalHeader>
                                        <ModalCloseButton size="sm" />
                                        <ModalBody>
                                            <h2> Choose the .torrent file to add to Download </h2>
                                        </ModalBody>

                                        <ModalFooter>
                                            <form>
                                                <input type="file" name="file" onChange={onFileChange}></input>
                                                <input type="submit" onClick={onFileUpload}></input>
                                            </form>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                                <Button onClick={removeTask} textAlign="center" variant="solid" colorScheme="red" p="5" size="sm" leftIcon={<BiTrash />}>REMOVE</Button>
                            </Stack>
                        </VStack>
                    </Flex>
                    <Flex rounded="3xl" direction="column" w="65vw" h="80vh" bg="blackAlpha.600" ml="12" mb="12">
                        <Flex w="55vw">
                            <Heading color="white" m="12" size="xs">
                                TASK MANAGER
                            </Heading>
                        </Flex>
                        <Flex>
                            <Table variant="simple" size="md" mt="5" m="10">
                                <Thead>

                                    <Tr>
                                        <Th color="white">NAME</Th>
                                        <Th color="white">PROGRESS</Th>
                                        <Th color="white">STATUS</Th>
                                    </Tr>

                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td color="white">
                                            Fedora-Workstation-Live-x86_64
                                        </Td>
                                        <Td color="white">
                                            75%
                                        </Td>
                                        <Td>
                                            <Button size="xs" bgColor="violet" color="black">PAUSED</Button>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default Dashboard
