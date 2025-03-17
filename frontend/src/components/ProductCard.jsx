import {
  Heading,
  HStack,
  IconButton,
  Image,
  Box,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { LuPencil, LuTrash } from "react-icons/lu";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.700");

  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (productId) => {
    const { success, messsage } = await deleteProduct(productId);
    if (success) {
      toaster.create({
        title: "Product created",
        description: messsage,
        type: "success",
      });
    } else {
      toaster.create({
        title: "Error",
        description: messsage,
        type: "error",
      });
    }
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="lg"
      rounded="lg"
      transition="all 0.25s"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      bg={bgColor}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit={"cover"}
      ></Image>

      <Box p="6">
        <Heading size="md">{product.name}</Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor}>
          ${product.price}
        </Text>

        <HStack gap={4} mt={4}>
          <IconButton colorPalette="blue">
            <LuPencil />
          </IconButton>
          <IconButton
            colorPalette="red"
            onClick={() => {
              handleDeleteProduct(product._id);
            }}
          >
            <LuTrash />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
