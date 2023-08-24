// import library yang dibutuhkan
import { useDisclosure, IconButton } from "@chakra-ui/react";
import { FaCarSide } from "react-icons/fa6";
import ModalGoHome from "../ModalGoHome";

// buat komponen Delete
export default function GoHome({ payload, reload }) {
  // buat state untuk menampilkan modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* set payload dan onClose ke komponen ModalDelete */}
      <ModalGoHome
        isOpen={isOpen}
        onClose={onClose}
        payload={payload}
        reload={reload}
      />
      {/* set onOpen ke komponen IconButton */}

      <IconButton
        /* onClick={payload.status !== 'lunas' ? onOpen : null} */
        onClick={onOpen}
        aria-label="delete"
        icon={<FaCarSide />}
        colorScheme="orange"
      />
    </>
  );
}