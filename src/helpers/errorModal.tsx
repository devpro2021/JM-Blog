import { Modal } from 'antd';

export const errorModal = (message: string) => {
  return Modal.error({
    title: `${message}`,
  });
};
