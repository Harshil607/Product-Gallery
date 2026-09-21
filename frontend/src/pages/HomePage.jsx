import {
  Container,
  Heading,
  SimpleGrid,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useEffect } from "react";

const HomePage = () => {
  const { getProducts, products } = useProductStore();
  useEffect(() => {
    getProducts();
  }, []);
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
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
