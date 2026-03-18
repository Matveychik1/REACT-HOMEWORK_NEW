import type { ICarItem } from "../../types/ICarItem.ts";
import { useState } from "react";
import { Select } from "antd";
import ItemCar from "./ItemCar.tsx";
import CreateCarItem from "./CreateCarItem.tsx";
import type { ICreateCar } from "../../types/ICreateCar.ts";

const emptyCar: ICarItem = {
    id: 0,
    mark: "",
    model: "",
    description: "",
    image: "",
    price: 0,
    color: "",
    year: 0
}

const HomePage = () => {
    const [cars, setCars] = useState<ICarItem[]>([
        {
            id: 1,
            mark: "Mercedes",
            model: "Citan",
            description: "Машина пригнана з Німеччини",
            image: "https://cdn1.riastatic.com/photosnew/auto/photo/mercedes-benz_citan__623549116fx.webp",
            price: 15550,
            color: "Сірий",
            year: 2022
        },
        {
            id: 2,
            mark: "Volkswagen",
            model: "Multivan",
            description: "Машина пригнана з Швеції",
            image: "https://automarketrivne.com.ua/wp-content/uploads/2026/02/photo_5224236410716492682_y-1-1024x768.jpg",
            price: 47900,
            color: "Сірий",
            year: 2020
        },
        {
            id: 3,
            mark: "Mercedes",
            model: "Sprinter",
            description: "Машина пригнана з Франції",
            image: "https://automarketrivne.com.ua/wp-content/uploads/2026/02/5206452845224332277-1024x768.jpg",
            price: 32800,
            color: "Білий",
            year: 2022
        },
    ]);

    const [selectedCar, setSelectedCar] = useState<ICarItem>(emptyCar);

    // Універсальна функція сортування
    const handleSort = (value: string) => {
        const sortedCars = [...cars];

        switch (value) {
            case "price-asc":
                sortedCars.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                sortedCars.sort((a, b) => b.price - a.price);
                break;
            case "year-new":
                sortedCars.sort((a, b) => b.year - a.year); // Від нових до старих
                break;
            case "year-old":
                sortedCars.sort((a, b) => a.year - b.year); // Від старих до нових
                break;
            default:
                sortedCars.sort((a, b) => a.id - b.id);
                break;
        }

        setCars(sortedCars);
    }

    const addCarHandler = (car: ICreateCar) => {
        const id = cars.length > 0 ? Math.max(...cars.map(car => car.id)) + 1 : 1;
        setCars(prev => [...prev, { ...car, id: id }]);
    }

    const editCarHandler = (car: ICarItem) => {
        setSelectedCar(emptyCar);
        setCars(prev =>
            prev.map(c =>
                c.id === car.id ? { ...c, ...car } : c
            )
        );
    }

    const deleteCarHandler = (id: number) => {
        setCars(cars.filter(car => car.id !== id));
    }

    return (
        <>
            <h1 className={"text-4xl font-bold text-center md-4"}>Головна сторінка</h1>

            <div className="flex mb-4">
                {/* Оновлений Select з новими опціями */}
                <Select
                    defaultValue={"default"}
                    style={{ width: 250 }} // Збільшив ширину, щоб текст влізав
                    onChange={(value: string) => handleSort(value)}
                    options={[
                        { value: "default", label: "За замовчуванням" },
                        { value: "price-asc", label: "Ціна: від дешевшої до дорожчої" },
                        { value: "price-desc", label: "Ціна: від дорожчої до дешевшої" },
                        { value: "year-new", label: "Рік: спочатку новіші" },
                        { value: "year-old", label: "Рік: спочатку старіші" }
                    ]}
                />
            </div>

            <CreateCarItem
                onCreate={addCarHandler}
                editCar={selectedCar}
                onEdit={editCarHandler}
            />

            {cars.map(car =>
                <ItemCar
                    key={car.id}
                    car={car}
                    deleteCar={deleteCarHandler}
                    setSelectedCar={setSelectedCar}
                />
            )}
        </>
    );
}

export default HomePage;