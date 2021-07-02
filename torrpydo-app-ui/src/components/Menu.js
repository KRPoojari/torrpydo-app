import React from "react";
import { HStack, Heading, IconButton, SearchIcon } from "@chakra-ui/react";



export default function Menu(props) {
    return (
        <HStack direction="row" spacing={1600} backgroundColor="blackAlpha.900" shadow="md" >
            <Heading color="white" size="md"  ml="10" mt="5" p="2">
                TorrPydo
            </Heading>
            

        </HStack>
  );
}