import {useRef} from "react";
import {Modal} from "antd";
import {Cropper} from "react-cropper";

interface  Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void,
    image: string,
    onCrop: (image: string) => void,
}

const  ImageCropper = ({isOpen, setIsOpen, image, onCrop}: Props) => {
    const cropperRef = useRef<any>(null);

    const handleCrop = () => {
        if(cropperRef.current) {
            const cropper = cropperRef.current.cropper;

            const base64 = cropper.getCroppedCanvas().toDataURL();
        onCrop(base64);
        setIsOpen(false);
        }
    }


    return (
        <Modal
title={"Crop Image"}
            open={isOpen}
            onCancel={()=>setIsOpen(false)}
            onOk={handleCrop}
            okText={"Save"}
            cancelText={"Cancel"}

        >
            {image && image.length &&
            <Cropper
                src={image}
                style={{height: 400, width: "100%"}}
                aspectRatio={0}
                viewMode={1}
                ref={cropperRef}
                />
            }
        </Modal>
    )
}

export default ImageCropper;