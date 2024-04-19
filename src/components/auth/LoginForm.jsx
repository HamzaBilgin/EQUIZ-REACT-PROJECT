import { useRef } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import db, { auth } from "../../FireBasee/Myfirebase";
import { doc, getDoc } from "firebase/firestore";
import { authActions } from "../../store/slice/authSlice";
import { userInfoActions } from "../../store/slice/userInfoSlice";
import { useDispatch } from "react-redux";

const errorConfig = {
  title: "Error!",
  content: (
    <>
      <p>Message: Unsuccess</p>
    </>
  ),
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

  const onFinish = async (values) => {
    try {
      const userCredentials = await auth.signInWithEmailAndPassword(
        values.user.email,
        values.user.password
      );

      const user = userCredentials.user;
      const dbdata = await getUserFromDb(user.uid);

      dispatch(authActions.login());
      const isAuthenticated = JSON.stringify(true);
      localStorage.setItem("isAuthenticated", isAuthenticated);

      if (dbdata.role === "admin") {
        navigate(`/admin/${user.uid}`);
      } else if (dbdata.role === "instructor") {
        navigate(`/instructor/${user.uid}`);
      } else {
        navigate(`/student/${user.uid}`);
      }
      formRef.current.resetFields();
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
  };
  const getUserFromDb = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    dispatch(userInfoActions.setUserInfo(docSnap.data()));
    localStorage.setItem("userInfo", JSON.stringify(docSnap.data()));
    return docSnap.data();
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
