import {
  Container,
  Heading,
  SimpleGrid,
  Box,
  Image,
  Text,
  Button,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const products = useProductStore((state) => state.products);
  const getProducts = useProductStore((state) => state.getProducts);
  const updateProduct = useProductStore((state) => state.updateProducts);
  const deleteProduct = useProductStore((state) => state.deleteProducts);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setPrice(product.price);
    setImage(product.image);
    onOpen();
  };

  const handleSave = async () => {
    const updatedProduct = {
      ...selectedProduct,
      name,
      price: Number(price),
      image,
    };

    await updateProduct(updatedProduct);

    onClose();
  };

  const handleDelete = async (product) => {
    await deleteProduct(product);
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Heading textAlign="center" mb={8}>
        Products
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {products.map((product) => (
          <Box
            key={product._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}>
            <Image
              src={product.image}
              alt={product.name}
              w="100%"
              h="250px"
              objectFit="cover"
            />

            <Text fontSize="xl" fontWeight="bold" mt={4}>
              {product.name}
            </Text>

            <Text fontSize="lg" mt={2}>
              ${product.price}
            </Text>

            <HStack mt={4} spacing={3}>
              <Button onClick={() => handleUpdate(product)}>Update</Button>

              <Button onClick={() => handleDelete(product)}>Delete</Button>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>

          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input value={image} onChange={(e) => setImage(e.target.value)} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>

            <Button onClick={handleSave}>Update Product</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default HomePage;
