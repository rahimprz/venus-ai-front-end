import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Typography, Input, Button, Form, message } from "antd";
import {
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  GithubOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import { Provider } from "@supabase/supabase-js";
import { AppContext } from "../../../appContext";
import { supabase } from "../../../config";

const { Title } = Typography;

interface FormValues {
  email: string;
  password: string;
}

const RegisterFormContainer = styled.div`
  max-width: 440px;
  text-align: center;
  margin: 0 auto;
  padding: 1rem;
`;

export const Register = () => {
  const { setSession } = useContext(AppContext);
  const navigate = useNavigate();

  const [form] = Form.useForm<FormValues>();

  const onSubmit = async ({ email, password }: FormValues) => {
    const result = await supabase.auth.signUp({
      email,
      password,
    });

    if (result.error) {
      console.error(result.error);
    } else {
      const { user } = result.data; // Session is null, but can request lol
      if (user) {
        const sessionData = await supabase.auth.getSession();
        if (sessionData.data.session) {
          setSession(sessionData.data.session);
        }

        message.success("Account created successfully. Please set your username.");
        navigate("/profile");
      }
    }
  };

  const registerWithProvider = (provider: Provider) => {
    return supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/profile`,
      },
    });
  };

  return (
    <RegisterFormContainer>
      {/* <button>Create test users (Create a lot of test user with password 123456)</button> */}

      <Form form={form} onFinish={onSubmit}>
        <Title>Register</Title>

        <Form.Item name="email" rules={[{ required: true, message: "Please enter your email." }]}>
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password." }]}
        >
          <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>

      <div>
        <p>
          We recommend register using third party. Our email sending might not working properly lol
          so you can't reset password.
        </p>

        <Button icon={<GoogleOutlined />} onClick={() => registerWithProvider("google")} block>
          Register with Google
        </Button>

        <Button icon={<DisconnectOutlined />} onClick={() => registerWithProvider("discord")} block>
          Register with Discord
        </Button>

        <Button icon={<GithubOutlined />} onClick={() => registerWithProvider("github")} block>
          Register with Github
        </Button>
      </div>
    </RegisterFormContainer>
  );
};