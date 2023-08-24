// import library yang dibutuhkan
import React from "react";
import { Flex } from "@chakra-ui/react";
import Acc from "./action/Acc";
import GoHome from "./action/GoHome";

export default function ActionAccGo({ payload, reload }) {
  return (
    <Flex dir="row" gap={3}>
      <Acc payload={payload} reload={reload} />
      <GoHome payload={payload} reload={reload} />
    </Flex>
  );
}