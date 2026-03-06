import type {ICreateCar} from "../../types/ICreateCar.ts";
import {Button, Form, type FormProps, Input} from "antd";
import type {ICarItem} from "../../types/ICarItem.ts";
import {useEffect} from "react";

interface Props{
    onCreate: (car: ICreateCar) => void;
    editCar?: ICarItem;
    onEdit: (car: ICarItem) => void;

}


const CreateCarItem = ({onCreate, editCar, onEdit}: Props) => {


    const [form] = Form.useForm<ICreateCar>();

    useEffect(() => {
            if(editCar)
            {
                if(editCar.id!=0) {
                    form.setFieldsValue({
                        mark: editCar.mark,
                        model: editCar.model,
                        color: editCar.color,
                        year: editCar.year,
                        price: editCar.price,
                        description: editCar.description,
                        image: editCar.image,
                    });
                }
            }
        },
        [editCar]);

    console.log("editCar", editCar);

    const onHandlerSubmit = (values: ICreateCar) => {
        console.log("Submit form", values);
        if(editCar) {
            if(editCar.id!=0)
                onEdit({...editCar, ...values});
            else
                // викликаємо callback функцію з дочірнього компонента
                onCreate(values);
        }
        // очищаэмо форму
        form.resetFields();
    }

    const formItemLayout: FormProps = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    return (
        <>
            <h2 className={"text-green-500 text-center text-3xl "}>Створення авто</h2>
            <div className="mt-4">
                <Form form={form}
                      {...formItemLayout}
                      onFinish={onHandlerSubmit}
                      layout={"horizontal"}
                >
                    <div className="grid grid-cols-3 gap-2">
                        <Form.Item<ICreateCar>
                            label={"Марка"}
                            name={"mark"}
                            rules={[{required: true, message: "Вкажіть марку авто"}]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item<ICreateCar>
                            label={"Модель"}
                            name={"model"}
                            rules={[{required: true, message: "Вкажіть модель авто"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<ICreateCar>
                            label={"Колір"}
                            name={"color"}
                            rules={[{required: true, message: "Вкажіть колір авто"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<ICreateCar>
                            label={"Рік"}
                            name={"year"}
                            rules={[{required: true, message: "Вкажіть рік авто"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<ICreateCar>
                            label={"Ціна"}
                            name={"price"}
                            rules={[{required: true, message: "Вкажіть ціну авто"}]}
                        >
                            <Input/>
                        </Form.Item>


                        <Form.Item<ICreateCar>
                            label={"Опис"}
                            name={"description"}
                            rules={[{required: true, message: "Вкажіть опис авто"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item<ICreateCar>
                            label={"Фото"}
                            name={"image"}
                            rules={[{required: true, message: "Додайте фото авто"}]}
                        >
                            <Input/>
                        </Form.Item>

                        <div className={"flex justify-center"}>
                            <Form.Item label = {null}>
                                <Button type={"primary"} htmlType={"submit"}>
                                    Створити авто
                                </Button>
                            </Form.Item>
                        </div>
                    </div>

                </Form>
            </div>
        </>
    )
}

export default CreateCarItem;