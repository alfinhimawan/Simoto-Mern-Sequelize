// import library yang dibutuhkan
import { useDisclosure, IconButton } from "@chakra-ui/react";
import { FaCheckSquare } from "react-icons/fa";
import ModalAcc from "../ModalAcc";

// buat komponen Delete
export default function Acc({ payload, reload }) {
  // buat state untuk menampilkan modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {/* set payload dan onClose ke komponen ModalDelete */}
      <ModalAcc
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
        icon={<FaCheckSquare />}
        colorScheme="green"
      />
    </>
  );
}
