import React, { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Stack,
  Button,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const especialidadesDisponiveis = [
  "Terapia Cognitivo-Comportamental",
  "Terapia Familiar",
  "Terapia de Casal",
  "Psicologia Infantil",
  "Psicanálise",
];

const ModalEditarPsicologo = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleInputChange,
}) => {
  const fileInputRef = useRef(null);
  const toast = useToast();
  const [newImage, setNewImage] = useState(null);

  // Função para salvar as alterações
  const handleSubmit = async () => {
    const token = localStorage.getItem("authToken");

    try {
      // 1. Atualização dos outros campos
      await updateProfile(token);

      // 2. Upload da imagem (se existir uma nova imagem)
      if (newImage) {
        await uploadImage(token);
      }

      toast({
        title: "Perfil atualizado.",
        description: "As alterações foram salvas com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Recarregar a página para refletir as alterações
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar as alterações:", error);
      toast({
        title: "Erro ao salvar.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Requisição para atualizar o perfil
  const updateProfile = async (token) => {
    const updatedData = {
      nome: formData.nome,
      perfil: {
        bio: formData.perfil?.descricao || "",
        localizacao: formData.perfil?.localizacao || "",
        especialidades: formData.perfil?.especialidades || [],
        valorConsulta: formData.perfil?.valorConsulta || "",
      },
    };

    const response = await fetch(`${BACKEND_URL}/atualizar?token=${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o perfil.");
    }
  };

  // Requisição para fazer o upload da imagem
  const uploadImage = async (token) => {
    const formDataUpload = new FormData();
    formDataUpload.append("file", newImage);

    const response = await fetch(
      `${BACKEND_URL}/upload/profile/picture/${token}`,
      {
        method: "POST",
        body: formDataUpload,
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao fazer upload da imagem.");
    }

    const uploadData = await response.json();

    // Atualiza a imagem no estado local
    // setFormData((prev) => ({
    //   ...prev,
    //   perfil: {
    //     ...prev.perfil,
    //     foto: response.perfil.foto,
    //   },
    // }));
  };

  // Função para carregar a nova imagem ao selecionar um arquivo
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      toast({
        title: "Nova imagem selecionada.",
        description: `Arquivo: ${file.name}`,
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Função para apagar a imagem de perfil
  const handleDeleteImage = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${BACKEND_URL}/file/delete?filename=${formData.perfil?.foto}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Erro ao apagar a imagem.");

      // Atualiza o estado local para remover a foto
      setFormData((prev) => ({
        ...prev,
        perfil: { ...prev.perfil, foto: "" },
      }));

      toast({
        title: "Imagem de perfil apagada.",
        description: "Sua imagem de perfil foi removida com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Erro ao apagar imagem de perfil:", error);
      toast({
        title: "Erro ao apagar imagem.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Perfil do Psicólogo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            {/* Botões para Mudar e Apagar a Imagem */}
            <Flex justify="space-between" mb={4}>
              <Button
                leftIcon={<EditIcon />}
                colorScheme="blue"
                onClick={() => fileInputRef.current.click()}
              >
                Mudar Imagem
              </Button>
              <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={handleDeleteImage}>
                Apagar Imagem
              </Button>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Flex>

            {/* Nome */}
            <Input
              placeholder="Nome"
              name="nome"
              value={formData.nome || ""}
              onChange={handleInputChange}
            />

            {/* Localização */}
            <Input
              placeholder="Localização"
              name="localizacao"
              value={formData.perfil?.localizacao || ""}
              onChange={handleInputChange}
            />

            {/* Descrição */}
            <Textarea
              placeholder="Descrição do psicólogo"
              name="descricao"
              value={formData.perfil?.descricao || ""}
              onChange={handleInputChange}
            />

            {/* Especialidades */}
            <Text fontWeight="bold" fontSize="lg">
              Especialidades
            </Text>
            <Flex wrap="wrap" gap={2}>
              {especialidadesDisponiveis.map((especialidade, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleInputChange({
                      target: {
                        name: "especialidades",
                        value: [
                          ...formData.perfil?.especialidades || [],
                          especialidade,
                        ],
                      },
                    })
                  }
                  disabled={formData.perfil?.especialidades?.includes(especialidade)}
                >
                  {especialidade}
                </Button>
              ))}
            </Flex>
            <Flex wrap="wrap" gap={2} mt={2}>
              {(formData.perfil?.especialidades || []).map((especialidade, index) => (
                <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                  <TagLabel>{especialidade}</TagLabel>
                  <TagCloseButton
                    onClick={() =>
                      handleInputChange({
                        target: {
                          name: "especialidades",
                          value: formData.perfil?.especialidades?.filter(
                            (e) => e !== especialidade
                          ),
                        },
                      })
                    }
                  />
                </Tag>
              ))}
            </Flex>

            {/* Valor da Consulta */}
            <Text fontWeight="bold" fontSize="lg" mt={4}>
              Valor da Consulta (R$)
            </Text>
            <Input
              placeholder="Digite o valor da consulta"
              type="number"
              name="valorConsulta"
              value={formData.perfil?.valorConsulta || ""}
              onChange={handleInputChange}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Salvar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditarPsicologo;

// import React, { useState } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   Textarea,
//   Stack,
//   Button,
//   Box,
//   Text,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   Flex,
//   Select,
// } from "@chakra-ui/react";

// const especialidadesDisponiveis = [
//   "Terapia Cognitivo-Comportamental",
//   "Terapia Familiar",
//   "Terapia de Casal",
//   "Psicologia Infantil",
//   "Psicanálise",
// ];

// const ModalEditarPsicologo = ({
//   isOpen,
//   onClose,
//   formData,
//   handleInputChange,
//   handleSubmit,
// }) => {
//   const [selectedDate, setSelectedDate] = useState(""); // Data selecionada para exibir horários

//   // Alternar disponibilidade de horário
//   const toggleHourAvailability = (hour) => {
//     if (!selectedDate) return;
//     const updatedDates = (formData.horariosDisponiveis || []).map((item) => {
//       if (item.data === selectedDate) {
//         const updatedHours = item.horas.map((h) =>
//           h.hora === hour ? { ...h, disponivel: !h.disponivel } : h
//         );
//         return { ...item, horas: updatedHours };
//       }
//       return item;
//     });

//     handleInputChange({
//       target: {
//         name: "horariosDisponiveis",
//         value: updatedDates,
//       },
//     });
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="xl">
//       <ModalOverlay />
//       <ModalContent maxH="90vh" overflowY="auto">
//         <ModalHeader>Editar Perfil do Psicólogo</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Stack spacing={4}>
//             {/* Nome */}
//             <Input
//               placeholder="Nome"
//               name="nome"
//               value={formData.nome || ""}
//               onChange={handleInputChange}
//             />

//             {/* Localização */}
//             <Input
//               placeholder="Localização"
//               name="localizacao"
//               value={formData.perfil?.localizacao || ""}
//               onChange={handleInputChange}
//             />

//             {/* Descrição */}
//             <Textarea
//               placeholder="Descrição do psicólogo"
//               name="descricao"
//               value={formData.perfil?.descricao || ""}
//               onChange={handleInputChange}
//             />

//             {/* Especialidades */}
//             <Text fontWeight="bold" fontSize="lg">
//               Especialidades
//             </Text>
//             <Flex wrap="wrap" gap={2}>
//               {especialidadesDisponiveis.map((especialidade, index) => (
//                 <Button
//                   key={index}
//                   size="sm"
//                   variant="outline"
//                   onClick={() =>
//                     handleInputChange({
//                       target: {
//                         name: "especialidades",
//                         value: [
//                           ...formData.perfil?.especialidades || [],
//                           especialidade,
//                         ],
//                       },
//                     })
//                   }
//                   disabled={formData.perfil?.especialidades?.includes(especialidade)}
//                 >
//                   {especialidade}
//                 </Button>
//               ))}
//             </Flex>
//             <Flex wrap="wrap" gap={2} mt={2}>
//               {(formData.perfil?.especialidades || []).map((especialidade, index) => (
//                 <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
//                   <TagLabel>{especialidade}</TagLabel>
//                   <TagCloseButton
//                     onClick={() =>
//                       handleInputChange({
//                         target: {
//                           name: "especialidades",
//                           value: formData.perfil?.especialidades?.filter(
//                             (e) => e !== especialidade
//                           ),
//                         },
//                       })
//                     }
//                   />
//                 </Tag>
//               ))}
//             </Flex>

//             {/* Valor da Consulta */}
//             <Text fontWeight="bold" fontSize="lg" mt={4}>
//               Valor da Consulta (R$)
//             </Text>
//             <Input
//               placeholder="Digite o valor da consulta"
//               type="number"
//               name="valorConsulta"
//               value={formData.perfil?.valorConsulta || ""}
//               onChange={handleInputChange}
//             />

//             {/* Seleção de Datas */}

//             {/* Horários Disponíveis */}
            
//           </Stack>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
//             Salvar
//           </Button>
//           <Button variant="ghost" onClick={onClose}>
//             Cancelar
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default ModalEditarPsicologo;








// import React, { useState } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   Textarea,
//   Stack,
//   Button,
//   Box,
//   Text,
//   SimpleGrid,
//   Tag,
//   TagLabel,
//   TagCloseButton,
//   Flex,
//   useBreakpointValue,
//   Select,
// } from "@chakra-ui/react";

// const especialidadesDisponiveis = [
//   "Terapia Cognitivo-Comportamental",
//   "Terapia Familiar",
//   "Terapia de Casal",
//   "Psicologia Infantil",
//   "Psicanálise",
// ];

// const ModalEditarPsicologo = ({
//   isOpen,
//   onClose,
//   formData,
//   handleInputChange,
//   handleSubmit,
// }) => {
//   const [selectedDate, setSelectedDate] = useState(""); // Data selecionada para mostrar horários

//   const modalSize = useBreakpointValue({ base: "full", md: "lg" });

//   // Alternar disponibilidade de horário
//   const toggleHourAvailability = (hour) => {
//     const updatedDates = formData.horariosDisponiveis.map((item) => {
//       if (item.data === selectedDate) {
//         const updatedHours = item.horas.map((h) =>
//           h.hora === hour ? { ...h, disponivel: !h.disponivel } : h
//         );
//         return { ...item, horas: updatedHours };
//       }
//       return item;
//     });

//     handleInputChange({
//       target: {
//         name: "horariosDisponiveis",
//         value: updatedDates,
//       },
//     });
//   };

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
//       <ModalOverlay />
//       <ModalContent maxH="90vh" overflowY="auto">
//         <ModalHeader>Editar Perfil do Psicólogo</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Stack spacing={4}>
//             {/* Nome */}
//             <Input
//               placeholder="Nome"
//               name="nome"
//               value={formData.nome || ""}
//               onChange={handleInputChange}
//             />

//             {/* Localização */}
//             <Input
//               placeholder="Localização"
//               name="localizacao"
//               value={formData.perfil?.localizacao || ""}
//               onChange={handleInputChange}
//             />

//             {/* Descrição */}
//             <Textarea
//               placeholder="Descrição do psicólogo"
//               name="descricao"
//               value={formData.perfil?.descricao || ""}
//               onChange={handleInputChange}
//             />

//             {/* Especialidades */}
//             <Text fontWeight="bold" fontSize="lg">
//               Especialidades
//             </Text>
//             <Flex wrap="wrap" gap={2}>
//               {especialidadesDisponiveis.map((especialidade, index) => (
//                 <Button
//                   key={index}
//                   size="sm"
//                   variant="outline"
//                   onClick={() =>
//                     handleInputChange({
//                       target: {
//                         name: "especialidades",
//                         value: [
//                           ...formData.perfil.especialidades,
//                           especialidade,
//                         ],
//                       },
//                     })
//                   }
//                   disabled={formData.perfil.especialidades.includes(especialidade)}
//                 >
//                   {especialidade}
//                 </Button>
//               ))}
//             </Flex>
//             <Flex wrap="wrap" gap={2} mt={2}>
//               {formData.perfil.especialidades.map((especialidade, index) => (
//                 <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
//                   <TagLabel>{especialidade}</TagLabel>
//                   <TagCloseButton
//                     onClick={() =>
//                       handleInputChange({
//                         target: {
//                           name: "especialidades",
//                           value: formData.perfil.especialidades.filter(
//                             (e) => e !== especialidade
//                           ),
//                         },
//                       })
//                     }
//                   />
//                 </Tag>
//               ))}
//             </Flex>

//             {/* Valor da Consulta */}
//             <Text fontWeight="bold" fontSize="lg" mt={4}>
//               Valor da Consulta (R$)
//             </Text>
//             <Input
//               placeholder="Digite o valor da consulta"
//               type="number"
//               name="valorConsulta"
//               value={formData.perfil?.valorConsulta || ""}
//               onChange={handleInputChange}
//             />

//             {/* Escolha da Data */}
//             <Text fontWeight="bold" fontSize="lg" mt={4}>
//               Selecionar Data
//             </Text>
//             <Select
//               placeholder="Selecione uma data"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             >
//               {formData.horariosDisponiveis?.map((date) => (
//                 <option key={date.data} value={date.data}>
//                   {date.data}
//                 </option>
//               ))}
//             </Select>

//             {/* Horários Disponíveis para a Data Selecionada */}
//             {selectedDate && (
//               <>
//                 <Text fontWeight="bold" mt={4}>
//                   Horários para {selectedDate}
//                 </Text>
//                 <SimpleGrid columns={4} spacing={2}>
//                   {formData.horariosDisponiveis
//                     ?.find((item) => item.data === selectedDate)
//                     ?.horas.map((hora) => (
//                       <Button
//                         key={hora.hora}
//                         size="sm"
//                         bg={hora.disponivel ? "green.400" : "red.400"}
//                         color="white"
//                         onClick={() => toggleHourAvailability(hora.hora)}
//                         _hover={{
//                           bg: hora.disponivel ? "green.500" : "red.500",
//                         }}
//                       >
//                         {hora.hora}
//                       </Button>
//                     ))}
//                 </SimpleGrid>
//               </>
//             )}
//           </Stack>
//         </ModalBody>
//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
//             Salvar
//           </Button>
//           <Button variant="ghost" onClick={onClose}>
//             Cancelar
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

// export default ModalEditarPsicologo;
