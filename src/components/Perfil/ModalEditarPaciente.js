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
  Flex,
  Text,
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const ModalEditarPaciente = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleInputChange,
  handleAddTag,
  handleRemoveTag,
}) => {
  const fileInputRef = useRef(null);
  const toast = useToast();
  const [newImage, setNewImage] = useState(null); // Armazena a nova imagem para upload

  // Função chamada ao clicar em "Salvar"
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("authToken");
  
      // Clona o formData original para atualizar os campos do perfil
      let updatedProfile = { ...formData };
  
      // 1. Atualização dos outros campos
      const filteredData = {
        nome: updatedProfile.nome,
        perfil: {
          ...updatedProfile.perfil,
          bio: updatedProfile.perfil.bio || "",
          idade: updatedProfile.perfil.idade || null,
          localizacao: updatedProfile.perfil.localizacao || "",
          preferencias: updatedProfile.perfil.preferencias || [],
          foto: updatedProfile.perfil.foto, // Mantém a imagem existente inicialmente
        },
      };
  
      const responseUpdate = await fetch(`${BACKEND_URL}/atualizar?token=${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filteredData),
      });
  
      if (!responseUpdate.ok) throw new Error("Erro ao atualizar o perfil.");
  
      toast({
        title: "Perfil atualizado.",
        description: "Seus dados foram atualizados com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      // 2. Upload da imagem (se existir uma nova imagem)
      if (newImage) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", newImage);
  
        const responseUpload = await fetch(
          `${BACKEND_URL}/upload/profile/picture/${token}`,
          {
            method: "POST",
            body: formDataUpload,
          }
        );
  
        if (!responseUpload.ok) throw new Error("Erro ao fazer upload da imagem.");
  
        const uploadData = await responseUpload.json();
  
        toast({
          title: "Imagem de perfil atualizada.",
          description: "Sua imagem de perfil foi atualizada com sucesso.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
  
        // Atualiza a imagem no front (se necessário)
        // updatedProfile.perfil.foto = uploadData.perfil.foto;
      }
  
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
        `${BACKEND_URL}/file/delete?filename=${formData.perfil.foto}`,
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
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Perfil</ModalHeader>
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

            {/* Campo para o Nome */}
            <Input
              placeholder="Nome"
              name="nome"
              value={formData?.nome || ""}
              onChange={handleInputChange}
            />
            {/* Campo para a Idade */}
            <Input
              placeholder="Idade"
              name="idade"
              type="number"
              value={formData?.perfil?.idade || ""}
              onChange={handleInputChange}
            />
            {/* Campo para a Localização */}
            <Input
              placeholder="Localização"
              name="localizacao"
              value={formData?.perfil?.localizacao || ""}
              onChange={handleInputChange}
            />
            {/* Campo para a Biografia */}
            <Textarea
              placeholder="Biografia"
              name="bio"
              value={formData?.perfil?.bio || ""}
              onChange={handleInputChange}
            />
            {/* Título para as Especialidades */}
            <Text fontSize="lg" fontWeight="bold">
              Preferências de Especialidades
            </Text>
            {/* Tags de Especialidades Existentes */}
            <Flex wrap="wrap" gap={2}>
              {formData?.perfil?.preferencias?.interessesEspecialidade?.map((tag, index) => (
                <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveTag(tag)} />
                </Tag>
              ))}
            </Flex>
            {/* Botões para Adicionar Novas Especialidades */}
            <Flex wrap="wrap" gap={2}>
              {["Terapia Cognitivo-Comportamental", "Psicologia Infantil","Psicanálise","Terapia de Casal","Terapia Familiar"].map((spec, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => handleAddTag(spec)}
                  disabled={formData?.perfil?.preferencias?.interessesEspecialidade?.includes(spec)}
                >
                  {spec}
                </Button>
              ))}
            </Flex>
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

export default ModalEditarPaciente;






// import React from "react";
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
//   Flex,
//   Text,
//   Button,
//   Tag,
//   TagLabel,
//   TagCloseButton,
// } from "@chakra-ui/react";

// const ModalEditarPaciente = ({
//   isOpen,
//   onClose,
//   formData,
//   handleInputChange,
//   handleAddTag,
//   handleRemoveTag,
//   handleSubmit,
// }) => {
//   return (
//     <Modal isOpen={isOpen} onClose={onClose} size="lg">
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Editar Perfil </ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>
//           <Stack spacing={4}>
//             {/* Campo para o Nome */}
//             <Input
//               placeholder="Nome"
//               name="nome"
//               value={formData?.nome || ""}
//               onChange={handleInputChange}
//             />
//             {/* Campo para a Idade */}
//             <Input
//               placeholder="Idade"
//               name="idade"
//               type="number"
//               value={formData?.perfil?.idade || ""}
//               onChange={handleInputChange}
//             />
//             {/* Campo para a Localização */}
//             <Input
//               placeholder="Localização"
//               name="localizacao"
//               value={formData?.perfil?.localizacao || ""}
//               onChange={handleInputChange}
//             />
//             {/* Campo para a Biografia */}
//             <Textarea
//               placeholder="Biografia"
//               name="bio"
//               value={formData?.perfil?.bio || ""}
//               onChange={handleInputChange}
//             />
//             {/* Título para as Especialidades */}
//             <Text fontSize="lg" fontWeight="bold">
//               Preferências de Especialidades
//             </Text>
//             {/* Tags de Especialidades Existentes */}
//             <Flex wrap="wrap" gap={2}>
//               {formData?.perfil?.preferencias?.interessesEspecialidade?.map((tag, index) => (
//                 <Tag key={index} size="lg" colorScheme="teal" borderRadius="full">
//                   <TagLabel>{tag}</TagLabel>
//                   <TagCloseButton onClick={() => handleRemoveTag(tag)} />
//                 </Tag>
//               ))}
//             </Flex>
//             {/* Botões para Adicionar Novas Especialidades */}
//             <Flex wrap="wrap" gap={2}>
//               {["Terapia Cognitivo-Comportamental", "Psicologia Infantil"].map((spec, index) => (
//                 <Button
//                   key={index}
//                   size="sm"
//                   variant="outline"
//                   onClick={() => handleAddTag(spec)}
//                   disabled={formData?.perfil?.preferencias?.interessesEspecialidade?.includes(spec)}
//                 >
//                   {spec}
//                 </Button>
//               ))}
//             </Flex>
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

// export default ModalEditarPaciente;


