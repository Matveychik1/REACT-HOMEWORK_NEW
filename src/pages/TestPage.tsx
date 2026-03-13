import den from '../assets/den.webp';// Relative path to the image file
import {useEffect, useRef, useState} from "react";
import Cropper from "cropperjs";

const TestPage = () => {
    //Посилання на фото, яке буде працювати у Cropper
    const imgRef = useRef<HTMLImageElement | null>(null);
    const cropperRef = useRef<Cropper | null>(null);
    const [image, setImage] = useState<string | null>(null);



    useEffect(() => {
        // const Cropper = window.Cropper;
        if (imgRef.current) {
            cropperRef.current = new Cropper(imgRef.current, {
                aspectRatio: 1,
                viewMode: 1
            });
        }

        return () => {
            cropperRef.current?.destroy();
        };
    },[]);

    const handleCrop = () => {
        if(!cropperRef.current) return;
        const cropper = cropperRef.current;
        const base64 = cropper?.getCroppedCanvas().toDataURL();
        setImage(base64);
    }

    return (
        <div>
            <img src={den}
                 alt="Фото для редагування кота"
                 ref={imgRef}
            />
            <button onClick={handleCrop} className={'my-4 bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer'}>
                Обрізати зображення
            </button>
            {image && <img src={image}  alt={"Обрізане фото"} className={'w-64'}/> }
        </div>
    )
}

export default TestPage;