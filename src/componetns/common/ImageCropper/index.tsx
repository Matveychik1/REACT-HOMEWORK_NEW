import { useRef } from "react";
import { Modal, Button, Space } from "antd";
import { RotateLeftOutlined, RotateRightOutlined } from "@ant-design/icons";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css"; // Не забудьте імпортувати стилі

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    image: string;
    onCrop: (image: string) => void;
}

const ImageCropper = ({ isOpen, setIsOpen, image, onCrop }: Props) => {
    const cropperRef = useRef<Cropper | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);

    const initCropper = () => {
        if (!imgRef.current) return;

        cropperRef.current?.destroy();

        cropperRef.current = new Cropper(imgRef.current, {
            aspectRatio: 1,
            viewMode: 1,
            // Додаємо rotary через конфіг, якщо потрібно обмежити поведінку
            checkOrientation: true,
        });
    };

    const handleRotateLeft = () => {
        cropperRef.current?.rotate(-90);
    };

    const handleRotateRight = () => {
        cropperRef.current?.rotate(90);
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            const base64 = cropperRef.current.getCroppedCanvas().toDataURL();
            onCrop(base64);
            setIsOpen(false);
        }
    };

    return (
        <Modal
            title="Обрізати та повернути фото"
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            onOk={handleCrop}
            okText="Застосувати"
            cancelText="Скасувати"
            width={600}
        >
            <div className="flex flex-col items-center gap-4">
                {image && (
                    <div style={{ maxHeight: '400px', width: '100%', overflow: 'hidden' }}>
                        <img
                            src={image}
                            alt="To crop"
                            ref={imgRef}
                            onLoad={initCropper}
                            style={{ maxWidth: '100%', display: 'block' }}
                        />
                    </div>
                )}

                {/* Панель з кнопками керування */}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Space>
                        <Button
                            icon={<RotateLeftOutlined />}
                            onClick={handleRotateLeft}
                        >
                            Вліво
                        </Button>
                        <Button
                            icon={<RotateRightOutlined />}
                            onClick={handleRotateRight}
                        >
                            Вправо
                        </Button>
                    </Space>
                </div>
            </div>
        </Modal>
    );
};

export default ImageCropper;