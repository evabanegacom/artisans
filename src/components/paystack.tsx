import React, { forwardRef, useImperativeHandle } from 'react';
import { Button } from './ui/button';
interface PaystackPayButtonProps {
  email: string;
  amount: number;
  publicKey: string;
  productId: string;
  phone: string;
  soldBy: string;
  picture: string;
  productNumber: string;
  productName: string;
  userId: string;
  name: string;
  onSuccess: (reference: any) => void;
  onClose: () => void;
  buttonTrigger: () => void;
  text: string;
  className?: string;
}

const PaystackPayButton = forwardRef((props: PaystackPayButtonProps, ref) => {
  const {
    email,
    amount,
    publicKey,
    productId,
    phone,
    name,
    soldBy,
    picture,
    productNumber,
    productName,
    userId,
    onSuccess,
    onClose,
    buttonTrigger,
    text,
    className,
  } = props;

  useImperativeHandle(ref, () => ({
    triggerPayment: () => {
      const handler = (window as any).PaystackPop.setup({
        key: publicKey,
        email: email,
        amount: amount,
        metadata: {
          custom_fields: [
            {
              display_name: 'Product Name',
              variable_name: 'product_name',
              value: productName,
            },
            {
              display_name: 'Product Number',
              variable_name: 'product_number',
              value: productNumber,
            },
            {
              display_name: 'Sold By',
              variable_name: 'sold_by',
              value: soldBy,
            },
            {
              display_name: 'Product ID',
              variable_name: 'product_id',
              value: productId,
            },
            {
              display_name: 'User ID',
              variable_name: 'user_id',
              value: userId,
            },
            {
              display_name: 'Product Picture',
              variable_name: 'product_picture',
              value: picture,
            },

            {
              display_name: 'Phone',
              variable_name: 'phone',
              value: phone,
            },

            {
              display_name: 'Name',
              variable_name: 'name',
              value: name,
            },
          ],
        },

        currency: 'NGN',
        ref: `REF_${Math.floor(Math.random() * 1000000000 + 1)}`, // Unique reference number
        onClose: onClose,
        callback: (response: any) => {
          onSuccess(response);
        },
      });
      handler.openIframe();
    },
  }));

  return (
    <Button
      className={className}
      onClick={buttonTrigger} // Call the buttonTrigger function when the button is clicked
    >
      {text}
    </Button>
  );
});

export default PaystackPayButton;
