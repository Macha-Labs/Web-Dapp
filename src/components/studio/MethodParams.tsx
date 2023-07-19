import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";

const MethodParams = (params: any) => {
  const [isOpen, setIsOpen] = useState<any>(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Box>
      <Box display="flex" alignItems="center">
        {params && (
          <IconButton
            icon={isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
            aria-label="Toggle"
            variant="ghost"
            size="sm"
            onClick={handleToggle}
          />
        )}
        <Text ml={2}>{params.name}</Text>
      </Box>
      {isOpen &&
        params?.map((child) => (
          <Box key={child.name} ml={4}>
            <MethodParams params={child} />
          </Box>
        ))}
    </Box>
  );
};

export default MethodParams;
