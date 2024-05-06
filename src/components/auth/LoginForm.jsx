import { useRef, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { loginUser } from "../../actions/authActions";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const validateEmail = (_, value) => {
  const pattern = /^([^@]+)@([^@]+\.[^@]+)$/;
  if (!pattern.test(value)) {
    return Promise.reject(
      "Please enter a valid email (e.g. example@example.com)!"
    );
  }
  return Promise.resolve();
};

const LoginForm = () => {
  const navigate = useNavigate();
  const formRef = useRef();
  const dispatch = useDispatch();
  const [modal, contextHolder] = Modal.useModal();
  const [errorMessage, setErrorMessage] = useState("Error");

  const onFinish = async (values) => {
    const { email, password } = values.user;

    try {
      const userFromDb = await loginUser(email, password);

      if (userFromDb.role === "student") {
        navigate(`/student/${userFromDb.uid}`);
      } else if (userFromDb.role === "instructor") {
        navigate(`/instructor/${userFromDb.uid}`);
      } else if (userFromDb.role === "admin") {
        navigate(`/admin/${userFromDb.uid}`);
      } else {
        throw new Error("Hata fırlatıldı!");
      }
      formRef.current.resetFields();
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          errorModalModify("Şifre eşleşmedi");

          break;
        case "auth/user-disabled":
          errorModalModify("Kullanıcı devre dışı bırakıldı");

          break;
        case "auth/user-not-found":
          errorModalModify("Kullanıcı bulunamadı.");

          break;
        default:
          errorModalModify("Unexpected Error");

          break;
      }
    }
  };
  const errorModalModify = (message) => {
    modal.error({
      title: "Error!",
      content: (
        <>
          <p>{message}</p>
        </>
      ),

      okButtonProps: {
        className: "ant-btn-error",
        style: {
          color: "rgba(255, 255, 255, 1)",
          backgroundColor: "rgba(255, 0, 0, 0.88)",
        },
      },
    });
  };
  return (
    <div className="w-[300px] m-auto mt-6 h-dvh">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        validateMessages={validateMessages}
        ref={formRef}
      >
        <Form.Item
          name={["user", "email"]}
          rules={[
            {
              type: "email",
              required: true,
              validator: validateEmail,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <div className="flex justify-between">
          <Form.Item>
            <Form.Item
              name={["user", "remember"]}
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-full !hover:bg-sky-700 text-black bg-[#1677ff]"
          >
            Log in
          </Button>
          Or{" "}
          <Link to="/auth/register" relative="path">
            <span>register now!</span>
          </Link>
        </Form.Item>{" "}
        {contextHolder}
      </Form>
    </div>
  );
};
export default LoginForm;
