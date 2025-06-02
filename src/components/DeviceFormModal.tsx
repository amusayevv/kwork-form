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
import { colors } from "flowbite-react/plugin/tailwindcss/colors";

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
  const [protocolsData, setProtocolsData] = useState([]);
  const [protocols2device, setprotocols2device] = useState([]);
  const [toastActive, setToastActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [model, setModel] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [variation, setVariation] = useState<string>("");
  const [deviceType, setDeviceType] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [finalDevice, setFinalDevice] = useState<boolean>(false);

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

  useEffect(() => {
    fetch("/src/json/protocols.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Protocols", data.protocols);
        setProtocolsData(data.protocols);
      });
  }, []);

  useEffect(() => {
    fetch("/src/json/inprotocol2device.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Protocols to device", data.inprotocol2device);
        setprotocols2device(data.inprotocol2device);
      });
  }, []);

  return (
    <div>
      <Modal
        theme={{
          content: {
            base: "relative h-full w-full p-4 md:h-auto",
            inner:
              "relative flex max-h-[90vh] flex-col rounded-none bg-[#333333] shadow dark:bg-[#333333]",
          },
        }}
        show={show}
        onClose={() => onClose()}
      >
        <ModalHeader>Добавить новое устройство</ModalHeader>
        <ModalBody className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="model">Модель</Label>
            <TextInput
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="[&_input]:rounded-[4px] [&_input]:border [&_input]:border-[#999999] [&_input]:!bg-[#333333]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="price">Цена</Label>
            <TextInput
              id="price"
              type="number"
              value={price}
              onChange={(e) => {
                const priceToSet: number = parseInt(e.target.value);
                if (priceToSet >= 0) setPrice(priceToSet);
              }}
              className="[&_input]:rounded-[4px] [&_input]:border [&_input]:border-[#999999] [&_input]:!bg-[#333333]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="model">Вариация</Label>
            <TextInput
              id="model"
              value={variation}
              onChange={(e) => setVariation(e.target.value)}
              className="[&_input]:rounded-[4px] [&_input]:border [&_input]:border-[#999999] [&_input]:!bg-[#333333]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="device_type">Тип Устройства</Label>
            <Select
              id="device_type"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="[&_select]:rounded-[4px] [&_select]:border [&_select]:border-[#999999] [&_select]:!bg-[#333333]"
            >
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
            <Select
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="[&_select]:rounded-[4px] [&_select]:border [&_select]:border-[#999999] [&_select]:!bg-[#333333]"
            >
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
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-[4px] border border-[#999999] !bg-[#333333]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="link">Ссылка</Label>
            <TextInput
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="[&_input]:rounded-[4px] [&_input]:border [&_input]:border-[#999999] [&_input]:!bg-[#333333]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-[4px] border border-[#999999] !bg-[#333333]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="photo">Выберите изображение</Label>
            <FileInput
              className="rounded-[4px] border border-[#999999] !bg-[#333333]"
              id="photo"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (
                  file != null &&
                  (file.type === "image/jpeg" || file.type === "image/png")
                ) {
                  setPhoto(e.target.files?.[0] ?? null);
                  setToastActive(false);
                  const url = URL.createObjectURL(file);
                  setPreviewUrl(url);
                } else {
                  e.target.value = "";
                  setToastActive(true);
                  setPhoto(null);
                  setPreviewUrl(null);
                }
              }}
            ></FileInput>
            {toastActive ? (
              <p className="text-red-500">
                Изображение должна быть формата PNG или JPEG
              </p>
            ) : null}
          </div>
          {previewUrl && (
            <div className="mt-2">
              <img
                src={previewUrl}
                alt="Preview"
                className="max-w-xs shadow-md"
              />
            </div>
          )}
          {/* TODO protocols multi-select */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="topic">Тема</Label>
            <TextInput
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="[&_input]:rounded-[4px] [&_input]:border [&_input]:border-[#999999] [&_input]:!bg-[#333333]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="final_device"
              checked={finalDevice}
              onChange={(e) => setFinalDevice(e.target.checked)}
            ></Checkbox>
            <Label htmlFor="final_device">Финальное устройство</Label>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            className="rounded-[4px] !bg-[#FFF200] font-bold text-[#333333]"
            onClick={() => onClose()}
          >
            Добавить новое устройство
          </Button>
          <Button
            className="!bg-[rgba(255, 255, 255, 0.1)] rounded-[4px] font-bold text-[#FFF200]"
            color="gray"
            onClick={() => onClose()}
          >
            Отмена
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
