// src/pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Input, FormLabel } from '@chakra-ui/react';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, you would verify credentials here.
    // For this example, any credentials are accepted.
    router.push('/add_movie');
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxW="md" mx="auto">
      <FormLabel>Username</FormLabel>
      <Input name="username" value={credentials.username} onChange={handleChange} />

      <FormLabel>Password</FormLabel>
      <Input name="password" type="password" value={credentials.password} onChange={handleChange} />

      <Button type="submit" mt={4} colorScheme="teal">
        Login
      </Button>
    </Box>
  );
};

export default Login;
