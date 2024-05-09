import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Space, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const categories = [
  { label: "Türkçe", value: "turkce" },
  { label: "Matematik", value: "matematik" },
  { label: "Kimya", value: "kimya" },
  { labe: "Fizik", value: "Fizik" },
  { label: "Biyoloji", value: "biyoloji" },
];
const QuizConfigDetail = ({ quizInfo, setQuizInfo }) => {
  // const [switchControl, setSwitchControl] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    let startAtValue = dayjs(); // Şu anın zamanını al

    if (quizInfo.startAt) {
      startAtValue = dayjs(quizInfo.startAt); // Eğer quizInfo.startAt değeri varsa onu kullan
    }

    form.setFieldsValue({
      info: {
        category: quizInfo.category,
        // statu: quizInfo.statu,
        quizDuration: quizInfo.quizDuration,
      },
      startAt: startAtValue,
    });
  }, [quizInfo]);
  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  const onFinish = async ({ info, startAt }) => {
    console.log(startAt);
    const values3 = {
      ...info,
      startAt: startAt.format("YYYY-MM-DD HH:mm:ss"),
    };

    setQuizInfo({
      ...quizInfo,
      ...values3,
    });
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="Category"
        name={["info", "category"]}
        rules={[
          {
            required: true,
            message: "Kategori alanı boş geçilemez",
          },
        ]}
      >
        <Select placeholder="Kategori Seçiniz ">
          {categories.map((category) => (
            <Option key={category.value} value={category.value}>
              {category.label}
            </Option>
          ))}
        </Select>
      </Form.Item>
      {/* <Form.Item
        name={["info", "statu"]}
        label={`${switchControl ? "Active" : "Pasif"} `}
        valuePropName="checked"
      >
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          onChange={() => setSwitchControl(!switchControl)}
        />
      </Form.Item> */}

      <Form.Item
        name={["info", "quizDuration"]}
        label="Quiz Duration(dk)"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item name="startAt" label="Start Date" {...config}>
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default QuizConfigDetail;
