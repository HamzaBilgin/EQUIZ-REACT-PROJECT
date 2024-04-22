import { Button, Form, Input, Modal } from "antd";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../FireBasee/Myfirebase";
import { changePassword, loginUser } from "../actions/authActions/authActions";
import { updateUser } from "../actions/crudActions/crudActions";

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
const errorConfig = {
  title: "Error!",
  content: (
    <>
      <p>Message: Unsuccess</p>
    </>
  ),
};

const ChangePassword = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const userInfo = useSelector((state) => state.userInfoReducer.userInfo);
  const onFinish = async (values) => {
    const { password, newPassword, confirm } = values;
    try {
      const user = auth.currentUser;

      const userFromDb = await loginUser(userInfo.email, password);
      changePassword(password, newPassword);
      updateUser(userInfo.uid, newPassword);
    } catch (error) {
      modal.error({
        ...errorConfig,
        okButtonProps: {
          className: "ant-btn-error",
          style: {
            color: "rgba(255, 255, 255, 1)",
            backgroundColor: "rgba(255, 0, 0, 0.88)",
          },
        },
      });
    }
    // user
    //   .reauthenticateWithCredential(credential)
    //   .then(() => {
    //     // Yeni şifreyle kullanıcının şifresini güncelle
    //     user
    //       .updatePassword(values.newPassword)
    //       .then(() => {
    //         console.log("Şifre başarıyla değiştirildi.");
    //       })
    //       .catch((error) => {
    //         console.error("Şifre değiştirme hatası:", error);
    //       });
    //   })
    //   .catch((error) => {
    //     console.error("Yeniden doğrulama hatası:", error);
    //   });
    // user
    //   .updatePassword(values.newPassword)
    //   .then(() => {
    //     console.log("Şifre başarıyla değiştirildi.");
    //   })
    //   .catch((error) => {
    //     console.error("Şifre değiştirme hatası:", error);
    //   });
  };

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
    <div className="mt-[170px] max-w-screen-xl m-auto w-full flex justify-center   h-dvh">
      <div className="w-[500px] ">
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
            name="newPassword"
            label="newPassword"
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
            label="Confirm newPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
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
              {/* <Form.Item>
                <Link
                  to="/auth/login"
                  relative="path"
                  className="text-gray-800  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-indigo-900/50 hover:text-white"
                >
                  <span className="inline-block">Or Login</span>
                </Link>
              </Form.Item> */}
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

export default ChangePassword;
