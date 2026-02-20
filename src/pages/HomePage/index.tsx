import type {ICarItem} from "../../types/ICarItem.ts";
import {useState} from "react";
import {Select} from "antd";
import ItemCar from "./ItemCar.tsx";
import CreateCarItem from "./CreateCarItem.tsx";

const HomePage = () =>
{
    //useState - спеціальний хук, який призначений для зберігання інформації
    // cars - це масив, який зберігає інформацію типи ICarItem
    // setCars - це функція, яка вміє змінювати масив cars
    // Якщо записуємо дані у setCars - тоді відбувається render компонента
    // render - це оновлення вмісту компонента
    const [cars, setCars] = useState<ICarItem[]>([
        {
            id: 1,
            mark: "Mercedes",
            model: "Citan",
            description:"Машина пригнана з Німеччини",
            image: "https://cdn1.riastatic.com/photosnew/auto/photo/mercedes-benz_citan__623549116fx.webp",
            price: 15550,
            color: "Сірий",
            year: 2022
        },
        {
            id: 2,
            mark: "Volkswagen",
            model: "Multivan",
            description:"Машина пригнана з Швеції",
            image: "https://automarketrivne.com.ua/wp-content/uploads/2026/02/photo_5224236410716492682_y-1-1024x768.jpg",
            price: 47900,
            color: "Сірий",
            year: 2020
        },
        {
            id: 3,
            mark: "Mercedes",
            model: "Sprinter",
            description:"Машина пригнана з Франції",
            image: "https://automarketrivne.com.ua/wp-content/uploads/2026/02/5206452845224332277-1024x768.jpg",
            price: 32800,
            color: "Білий",
            year: 2022
        },
    ]);


    const sortByPrice = (value: string) => {
        // sort - функція списків, що сортує та змінює список за заданими значеннями
        // ... - деструктуризація
        if (value === "asc") {
            setCars([...cars].sort((a, b) => a.price - b.price));
        } else if (value === "desc") {
            setCars([...cars].sort((a, b) => b.price - a.price));
        } else {
            setCars([...cars].sort((a, b) => a.id - b.id));
        }
    }

    const deleteCarHandler = (id: number) => {
        // console.log("Delete item ", id);
        const result = confirm("Ви дійсно бажаєте видалити")
        if (result === true)
        setCars(cars.filter(car => car.id !== id));
    }
    return (
        <>
            <h1 className={"text-4xl font-bold text-center md-4"}>Головна сторінка</h1>

            <div className="flex mb-4">
                <Select defaultValue={"default"} style={{width: 100}}
                        onChange={(value:string)=>sortByPrice(value)}
                        options={[
                            {
                                value: "default",
                                label: "За замовчуванням"
                            },
                            {
                                value: "asc",
                                label: "Ціна: від меншої до більшої "
                            },
                            {

                                value: "desc",
                                label: "Ціна: від більшої до меншої "
                            }
                        ]} />
            </div>
            <CreateCarItem/>
            {cars.map(car =>
                  <ItemCar key ={car.id} car = {car}
                  deleteCar={deleteCarHandler}/>
            )}

        </>
    );
}

export default HomePage;