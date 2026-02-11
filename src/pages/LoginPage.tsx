import { Button, Form, Input, message } from "antd";


const LoginPage = () => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log("Логін дані:", values);

        // Приклад простої перевірки з localStorage (якщо ми там зберігали юзера)
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const user = JSON.parse(savedUser);
            if (user.email === values.email && user.password === values.password) {
                message.success(`Вітаємо, ${user.firstName}!`);
            } else {
                message.error("Невірний email або пароль");
            }
        } else {
            message.warning("Користувача не знайдено. Будь ласка, зареєструйтесь.");
        }
    };



    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                    Вхід на сайт
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {/* ПОЛЕ EMAIL */}
                    <Form.Item
                        label="Email address"
                        name="email"
                        rules={[
                            { required: true, message: "Будь ласка, введіть пошту!" },
                            { type: "email", message: "Некоректний формат email!" }
                        ]}
                    >
                        <Input
                            size="large"
                            className="rounded-md"
                            placeholder="example@mail.com"
                        />
                    </Form.Item>

                    {/* ПОЛЕ ПАРОЛЬ */}
                    <Form.Item
                        label={
                            <div className="flex justify-between w-full">
                                <span>Password</span>
                                <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                        }
                        name="password"
                        rules={[{ required: true, message: "Будь ласка, введіть пароль!" }]}
                    >
                        <Input.Password
                            size="large"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-500 h-10 text-sm font-semibold rounded-md"
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Register now
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;