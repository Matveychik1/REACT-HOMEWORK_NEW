import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
const { Dragger } = Upload;

const TestPage: React.FC = () => (
    <Dragger name={'file'}
             multiple={false}
             beforeUpload = { (file) => {
                 console.log('Selected file:', file);
                 return false;
             }}
             onChange = {(info) => {
                 console.log("info", info);
             }}
    >
        <p className="ant-upload-drag-icon">
            <UserOutlined />
        </p>
        <p className="ant-upload-text">
            Натисніть або перетягніть файл у цю область, щоб завантажити
        </p>
        <p className="ant-upload-hint">
            Оберіть один файл для вашого фото
        </p>
    </Dragger>
);

export default TestPage;