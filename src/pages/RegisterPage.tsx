import { Button, Form, Input, Upload, message } from "antd";
import type { IRegisterForm } from "../types/IRegisterForm.ts";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";




const RegisterPage = () => {
    const [form] = Form.useForm<IRegisterForm>();

    const [myFileUpload, setMyFileUpload] = useState<File | null>(null);

    const onSubmitHandler = (values: IRegisterForm) => {
        // Якщо ми дійшли сюди, значить валідація успішна
        if (!myFileUpload) return;

        const fileReader = new FileReader();
        fileReader.readAsDataURL(myFileUpload);
        fileReader.onload = () => {
            const base64 = fileReader.result as string;
            const json = JSON.stringify({ ...values, image: base64 });
            console.log("JSON DATA", json);
            localStorage.setItem("user", json);


            message.success("Реєстрація успішна!");
            navigate("/profile")

            message.success("Реєстрація успішна!");

        };
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) return e;
        const fileList = e?.fileList || [];
        if (fileList.length < 1) {
            setMyFileUpload(null);
            return [];
        }
        // Беремо останній файл
        const lastFile = fileList[fileList.length - 1];
        setMyFileUpload(lastFile.originFileObj || null);
        return [lastFile];
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-2 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
                    Реєстрація
                </h2>
            </div>

            <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form form={form} onFinish={onSubmitHandler} layout="vertical">

                    {/* Прізвище, Ім'я, По батькові залишаємо як було */}
                    <Form.Item label="Прізвище" name="lastName" rules={[{ required: true, message: "Вкажіть прізвище" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Ім'я" name="firstName" rules={[{ required: true, message: "Вкажіть ім'я" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="По батькові" name="middleName" rules={[{ required: true, message: "Вкажіть по батькові" }]}>
                        <Input />
                    </Form.Item>

                    {/* --- ВАЛІДАЦІЯ ПОШТИ --- */}
                    <Form.Item
                        label="Електронна пошта"
                        name="email"
                        rules={[
                            { required: true, message: "Вкажіть пошту" },
                            { type: 'email', message: "Некоректний формат email" }
                        ]}
                    >
                        <Input placeholder="example@mail.com" />
                    </Form.Item>

                    <Form.Item label="Телефон" name="phone" rules={[{ required: true, message: "Вкажіть телефон" }]}>
                        <Input />
                    </Form.Item>

                    {/* --- ПАРОЛЬ --- */}
                    <Form.Item
                        label="Пароль"
                        name="password"
                        rules={[
                            { required: true, message: "Вкажіть пароль" },
                            { min: 6, message: "Пароль має бути не менше 6 символів" }
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* --- ПІДТВЕРДЖЕННЯ ПАРОЛЮ --- */}
                    <Form.Item
                        label="Підтвердження паролю"
                        name="confirmPassword"
                        dependencies={['password']} // Залежність від поля password
                        rules={[
                            { required: true, message: "Підтвердіть пароль" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Паролі не співпадають!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    {/* --- ВАЛІДАЦІЯ ФОТО --- */}
                    <Form.Item
                        label="Оберіть фото"
                        name="image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: "Будь ласка, завантажте фото" }]}
                    >
                        <Upload.Dragger
                            multiple={false}
                            listType="picture"
                            accept="image/*"
                            beforeUpload={() => false}
                            showUploadList={false}
                        >
                            <div className="flex flex-col items-center justify-center p-4">
                                {myFileUpload ? (
                                    <img src={URL.createObjectURL(myFileUpload)} alt="preview" style={{ width: '100px', borderRadius: '8px' }} />
                                ) : (
                                    <UserOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
                                )}
                                <p className="ant-upload-text mt-2 text-sm">Натисніть або перетягніть фото</p>
                            </div>
                        </Upload.Dragger>
                    </Form.Item>

                    <div className="pt-4 flex justify-center">
                        <Button type="primary" htmlType="submit" size="large" className="w-full">
                            Зареєструватися
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default RegisterPage;