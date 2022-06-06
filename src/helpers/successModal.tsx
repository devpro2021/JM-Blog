import { Modal } from 'antd';

export const successModal = (message: string) => {
  return Modal.success({
    content: `${message}`,
  });
};
