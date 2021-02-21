import React, { memo, useCallback, useEffect } from "react";
import { Form, Button, Input, notification } from "antd";
import { useDispatch } from "react-redux";
import useAsyncFn from "../../hooks/useAsyncFn";
import { ACTIONS } from "./../../redux/thunk/reducers/log";
import { QqOutlined, WechatOutlined, GithubOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { loginByPhone } from "../../apis/auth";
import ROUTES from "../../constants/routes";
import "./index.less";

interface ILogin {
  username: string;
  password: string;
}

const loginMode: Array<{ key: string; icon: React.ReactElement }> = [
  {
    key: "QQ",
    icon: <QqOutlined />,
  },
  {
    key: "微信",
    icon: <WechatOutlined />,
  },
  {
    key: "Github",
    icon: <GithubOutlined />,
  },
];

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginState, loginFn] = useAsyncFn(loginByPhone);
  const { loading, error } = loginState;

  const handleLogin = useCallback(
    async (values: ILogin) => {
      const { username, password } = values;

      if (!username) {
        notification.warn({
          message: "验证失败",
          description: "请填写用户名!",
        });
        return;
      }

      if (!password) {
        notification.warn({
          message: "验证失败",
          description: "请填写密码!",
        });
        return;
      }

      const result = await loginFn({
        phone: username,
        password: password,
      });

      if (result!.code !== 200) {
        notification.warn({
          message: "验证失败",
          description: result?.msg!,
        });
        
        return;
      }

      dispatch({
        type: ACTIONS.LOGIN,
        payload: {
          user: {
            ...result,
            userId: result?.profile?.userId,
          },
        },
      });
      history.push(ROUTES.DISCOVERY);
    },
    [dispatch, history, loginFn]
  );

  useEffect(
    () =>
      notification.info({
        message: "提示",
        description: "目前只支持使用您在网易云音乐平台的手机号进行登录..",
      }),
    []
  );

  return (
    <div className="login">
      {error &&
        notification.error({
          message: error.message,
        })}
      <div className="main-form">
        <h2>
          <a href="http://dllnacy.cn/" target="_blank" rel="noreferrer">
            dllnacy
          </a>
        </h2>
        <Form className="main-form-box" onFinish={handleLogin}>
          <Form.Item name="username">
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item name="password">
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="main-form-box_button"
              htmlType="submit"
              loading={loading}
            >
              登录
            </Button>
          </Form.Item>
        </Form>

        <div className="main-form-box_other">
          <p>其他登录方式</p>
          <div className="any">
            {loginMode.map((item) => (
              <span
                key={item.key}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  notification.info({ message: "暂且只支持手机号登录哦!" })
                }
              >
                {item.icon}
                <span style={{ marginLeft: "5px" }}>{item.key}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Login);
