import React, { useState } from "react";
import DeviceFormModal from "./components/DeviceFormModal";
import { Button } from "flowbite-react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  function handleModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Открыть форму</Button>
      <DeviceFormModal show={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
