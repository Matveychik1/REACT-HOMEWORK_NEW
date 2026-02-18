import type {ICarItem} from "../types/ICarItem.ts";
import {useState} from "react";
import {Select} from "antd";

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
            {cars.map(car =>
                <div key={car.id} className="max-w-sm mb-4 w-full lg:max-w-full lg:flex">
                    <div
                        className="h-48 lg:h-auto lg:w-48 flex-none  bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden "
                        style={{backgroundImage: `url('${car.image}')`}} title="Woman holding a mug">
                    </div>
                    <div
                        className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                        <div className="mb-8">
                            <p className="text-sm text-gray-600 flex items-center">
                                <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 20 20">
                                    <path
                                        d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"/>
                                </svg>
                                Members only
                            </p>
                            <div className="text-gray-900 font-bold text-xl mb-2">{car.mark} {car.model} ({car.year})
                            </div>
                            <p className="text-gray-700 text-base">{car.description}</p>

                        </div>
                        <div className="flex items-center">
                            <p className={'font-bold text-lg text-gray-900'}>{car.price}$</p>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default HomePage;