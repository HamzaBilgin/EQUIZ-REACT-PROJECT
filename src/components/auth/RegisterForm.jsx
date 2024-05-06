import { useRef, useState } from "react";

import { Button, Form, Input, Radio, Modal } from "antd";

import { Link, useNavigate } from "react-router-dom";
import { createUserIntoDb } from "../../actions/authActions";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

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
const validatePhoneNumber = (_, value) => {
  const pattern = /^0[0-9]{3}[0-9]{3}[0-9]{4}$/;
  if (!pattern.test(value)) {
    return Promise.reject(
      "Please enter a valid phone number (e.g. 05551234567)!"
    );
  }
  return Promise.resolve();
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

const RegisterForm = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const onFinish = async ({ password, user }) => {
    formRef.current.resetFields();
    createUserIntoDb(user, password, handleRegistrationError);
    setTimeout(() => {
      setConfirmLoading(false);
      navigate(`/auth/login`);
      setOpen(false);
    }, 2000);
  };

  //Hatalı durularda modal text i revize eder
  function handleRegistrationError(error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        errorModalModify("Email already in use");

        break;
      case "auth/weak-password":
        errorModalModify("Weak Password");

        break;
      case "auth/invalid-email":
        errorModalModify("Invalid Email");

        break;
      default:
        errorModalModify("Unexpected Error");

        break;
    }
  }
  const handleSubmit = () => {
    formRef.current.submit();
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
  const showModal = () => {
    formRef.current
      .validateFields()
      .then(() => {
        setModalText("Do you confirm the transaction?");
        setOpen(true);
      })
      .catch((err) => {
        console.error("Form validation failed:", err);
      });
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    handleSubmit();
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);

      setOpen(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="w-[500px] mr-40">
        <Form
          initialValues={{
            user: {
              Role: "student",
            },
          }}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
          ref={formRef}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "surname"]}
            label="Surname"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[
              {
                type: "email",
                required: true,
                validator: validateEmail,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "phoneNumber"]}
            label="Phone Number"
            rules={[
              {
                type: "text",
                required: true,
                validator: validatePhoneNumber,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={["user", "role"]} label="Radio">
            <Radio.Group>
              <Radio value="student"> Student </Radio>
              <Radio value="instructor"> Instructor </Radio>
              <Radio value="admin"> admin </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="flex w-full items-center  justify-end ">
            <div className="w-2/3 flex justify-between">
              <Form.Item>
                <Link
                  to="/auth/login"
                  relative="path"
                  className="text-gray-800  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-indigo-900/50 hover:text-white"
                >
                  <span className="inline-block">Or Login</span>
                </Link>
              </Form.Item>
              <Form.Item>
                <Button type="default" onClick={showModal}>
                  Submit
                </Button>

                <Modal
                  title="Register : "
                  open={open}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  okButtonProps={{
                    className: "ant-btn-default",
                    style: {
                      color: "rgba(0, 0, 0, 0.88)",
                    },
                    children: "Custom Ok Text",
                  }}
                >
                  <p>{modalText}</p>
                </Modal>
              </Form.Item>
            </div>
          </div>
        </Form>
        {contextHolder}
      </div>
    </div>
  );
};

export default RegisterForm;
