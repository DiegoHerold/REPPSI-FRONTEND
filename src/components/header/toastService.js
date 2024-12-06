// toastService.js
import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

export function showToast(title, description, status = 'success') {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 3000,
    isClosable: true,
  });
}
