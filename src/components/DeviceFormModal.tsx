import React, { useEffect, useState } from "react";
import {
  Label,
  TextInput,
  Modal,
  Select,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  FileInput,
  Checkbox,
} from "flowbite-react";

interface DeviceFormModalProps {
  show: boolean;
  onClose: () => void;
}

interface DeviceType {
  id: number;
  name: string;
  subtype: number;
}

interface Brand {
  id: number;
  name: string;
  country?: string;
}

export default function DeviceFormModal({
  show,
  onClose,
}: DeviceFormModalProps) {
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetch("/src/json/device_type.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.device_type);
        setDeviceTypes(data.device_type);
      });
  }, []);

  useEffect(() => {
    fetch("/src/json/brands.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.brands);
        setBrands(data.brands);
      });
  }, []);

  return (
    <Modal show={show} onClose={() => onClose()}>
      <ModalHeader>Добавить новое устройство</ModalHeader>
      <ModalBody className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="model">Модель</Label>
          <TextInput id="model"></TextInput>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="price">Цена</Label>
          <TextInput id="price" type="number"></TextInput>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="model">Вариация</Label>
          <TextInput id="model"></TextInput>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="device_type">Тип Устройства</Label>
          <Select id="device_type">
            <option value="0">Выберите Тип Устройства</option>
            {deviceTypes.map((item: DeviceType) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="brand">Бренд</Label>
          <Select id="brand">
            <option value="0">Выберите Бренд</option>
            {brands.map((item: Brand) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="comment">Комментарий</Label>
          <Textarea id="comment"></Textarea>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="link">Ссылка</Label>
          <TextInput id="link"></TextInput>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Описание</Label>
          <Textarea id="description"></Textarea>
        </div>
        {/* TODO we can choose only one image. Only png jpg */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="file_input">Выберите изображение</Label>
          <FileInput id="file_input"></FileInput>
        </div>
        {/* TODO protocols multi-select */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="topic">Тема</Label>
          <TextInput id="topic"></TextInput>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="final_device"></Checkbox>
          <Label htmlFor="final_device">Финальное устройство</Label>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button onClick={() => onClose()}>Добавить новое устройство</Button>
        <Button color="gray" onClick={() => onClose()}>
          Отмена
        </Button>
      </ModalFooter>
    </Modal>
  );
}
