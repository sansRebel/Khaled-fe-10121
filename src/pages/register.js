// src/pages/register.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Input, FormLabel, Alert, AlertIcon } from '@chakra-ui/react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      router.push('/login');
    }, 2000);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxW="md" mx="auto">
      <FormLabel>Name</FormLabel>
      <Input name="name" value={formData.name} onChange={handleChange} />

      <FormLabel>Email</FormLabel>
      <Input name="email" type="email" value={formData.email} onChange={handleChange} />

      <FormLabel>Password</FormLabel>
      <Input name="password" type="password" value={formData.password} onChange={handleChange} />

      <Button type="submit" mt={4} colorScheme="teal">
        Register
      </Button>

      {success && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          Registration successful! Redirecting to login page...
        </Alert>
      )}
    </Box>
  );
};

export default Register;
