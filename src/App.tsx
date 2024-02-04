import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Spin, message } from 'antd';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import './App.css';

type FieldType = {
  username?: string;
  password?: string;
};

function App() {
  
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return  <div className="container" style={{ position: 'fixed', top: '50%', left: '85%', transform: 'translate(-50%, -50%)' }}>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 42 }} spin allowFullScreen />} />
    </div>;
  }

  const onFinish = async (values: any) => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: values.username,
        password: values.password,
      });

      const data = response.data;

      if (data.success) {
        form.resetFields()
        message.success('Muvaffaqiyatli kirdingiz!');
      } else {
        message.error('Foydalanuvchi topilmadi yoki muvaffaqiyatsiz kirdi');
      }
    } catch (error) {
      console.error('Xatolik:', error);
      message.error('Xatolik yuz berdi');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div>
      <div className='grid grid-cols-12 min-h-full max-sm:p-3'>
        <div className='col-span-6 max-sm:col-span-12 bg-[#D9AE76] h-[100vh] pt-[276px] max-sm:hidden'>
          <div className='w-[445px] max-sm:w-full mx-auto max-sm:p-4 max-md:p-[20px] max-md:w-full max-lg:p-6 max-lg:w-full'>
            <h2 className='font-medium text-[40px] text-white'>Xush kelibsiz</h2>
            <h1 className='font-medium text-[64px] text-white max-md:text-[42px] max-lg:text-[48px]'>OPMS203.UZ</h1>
            <p className='text-white text-base mt-2'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste aliquid architecto repudiandae expedita sapiente vel, aut laboriosam, quasi soluta enim laborum voluptatem tempora. Id eaque cum voluptatibus aperiam enim numquam.
            </p>
          </div>
        </div>
        <div className='col-span-6 max-sm:col-span-12 pt-[195px] max-sm:pt-[20px] max-lg:px-2'>
          <div className='w-[430px] mx-auto max-sm:w-full max-sm:p-4 max-md:w-full max-md:p-6 max-lg:p-6 max-lg:w-full'>
            <div className='mb-[52px] max-sm:mb-6 flex items-center w-[80%] mx-auto max-sm:w-full max-sm:flex-col'>
              <img src={require("./assets/images/logo.png")} alt="logo" />
              <h3 className='text-[32px] max-sm:text-[24px] max-sm:ml-0 font-medium text-[#1E1E1E] ml-6 max-sm:text-center max-sm:mt-2 max-[321px]:text-[20px] max-md:text-[20px] max-lg:text-[26px]'>O'zbekiston Temir yo'llari</h3>
            </div>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout='vertical'
            >
              <Form.Item<FieldType>
                label="Login"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input className='py-[15px] rounded border bordder-[#D9AE76]'/>
              </Form.Item>

              <Form.Item<FieldType>
                label="Parol"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password className='py-[15px] rounded border bordder-[#D9AE76]'/>
              </Form.Item>

              <Form.Item>
                <Button className='bg-[#D09A54] w-full py-[13px] text-xl font-medium text-white h-auto mt-7' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
            <p className='text-center mt-[80px] max-sm:mt-2 text-[#30303066] mb-[20px]'>
              © 2015 - 2023 АО O'zbekiston Temir Yo'llari Versiyasi
            </p>
        </div>
      </div>
    </div>
  );
}

export default App;
