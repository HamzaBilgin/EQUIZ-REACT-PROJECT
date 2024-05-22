import { Button, Form, Input, Space, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { quizInfoActions } from "../../../store/slice/quizInfoSlice";
import {
  getQuizByLiveQuizId,
  getQuizzesUsersByQuizAndStudentId,
} from "../../../actions/quizActions";
import { toast } from "react-toastify";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
    },
  },
  wrapperCol: {
    xs: {
      span: 12,
    },
    sm: {
      span: 14,
    },
  },
};
const LiveQuizModal = ({ handleCancel }) => {
  const userInfo = useSelector((state) => state.authReducer.user);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = ({ requestLiveQuizId }) => {
    findQuiz(requestLiveQuizId, userInfo)
      .then((data) => {
        const {
          category,
          createdAt,
          id,
          instructorId,
          liveQuizId,
          questions,
          quizDuration,
          quizName,
          startAt,
          statu,
        } = data;

        dispatch(
          quizInfoActions.setQuizInfo({
            uid: id,
            instructorId: instructorId.id,
            questions: questions,
            quizDuration: quizDuration,
            startAt: startAt,
          })
        );
        localStorage.setItem(
          "quizInfo",
          JSON.stringify({
            uid: id,
            instructorId: instructorId.id,
            questions: questions,
            quizDuration: quizDuration,
            startAt: startAt,
          })
        );

        toast("Giriş Başarılı. Ana Sayfaya Yönlendiriliyorsunuz!", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          type: "success",
        });
        setTimeout(() => {
          navigate(
            `/student/liveQuiz/${category}/${liveQuizId}/${questions.length}`
          );
        }, 2000);
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err,
        });
      });
  };
  const findQuiz = async (requestLiveQuizId, studentId) => {
    const data = await getQuizByLiveQuizId(requestLiveQuizId);
    const docsLenght = data.length;

    return new Promise((resolve, reject) => {
      if (docsLenght === 1) {
        findUserAttendQuiz(data[0]?.id, studentId)
          .then((isExisting) => {
            if (isExisting === true) {
              reject("Sınav sonucunuz mevcuttur");
            } else {
              const now = new Date();
              const startDate = new Date(data[0].startAt);
              if (now > startDate) {
                reject("Sınav süreniz geçmiştir");
              } else {
                resolve(data[0]);
              }
            }
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject("Quiz Bulunamadı");
      }
    });
  };
  const findUserAttendQuiz = async (quizId, studentId) => {
    let isExistQuizResult = false;
    const data = await getQuizzesUsersByQuizAndStudentId(quizId, studentId);
    if (data.empty === false) {
      isExistQuizResult = true;
    }
    return isExistQuizResult;
  };
  return (
    <div>
      <Form
        {...formItemLayout}
        variant="filled"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="requestLiveQuizId"
          label="Quiz Name"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 14,
            span: 4,
          }}
        >
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="default" htmlType="submit">
              Create Quiz
            </Button>
          </Space>
        </Form.Item>
        {contextHolder}
      </Form>
    </div>
  );
};

export default LiveQuizModal;
