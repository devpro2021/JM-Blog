import { FC } from 'react';
import 'antd/dist/antd.css';
import { Alert } from 'antd';

const Error: FC<{ message: string }> = ({ message }) => {
  return <Alert message={message} type="error" />;
};

export { Error };
