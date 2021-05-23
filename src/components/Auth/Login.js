import React, { useState } from "react";
import { Button, Form, Segment, Message, Icon } from "semantic-ui-react";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LoginPrueba(props) {
  const { setLogin } = props;
  const [loading, setLoading] = useState(false);

  require("firebase/auth");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);

      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          toast.error("Email o contraseña incorrectos");
          setLoading(false);
        });

      setLoading(false);
    },
  });

  return (
    <div className="login">
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment>
          <Form.Input
            fluid
            name="email"
            icon="user"
            iconPosition="left"
            placeholder="Ingresar email"
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Form.Input
            fluid
            name="password"
            icon="lock"
            iconPosition="left"
            placeholder="Ingresar password"
            type="password"
            onChange={formik.handleChange}
            error={formik.errors.password}
          />

          <Button
            animated
            color="blue"
            fluid
            size="large"
            type="submit"
            loading={loading}
          >
            <Button.Content visible>Ingresar</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Segment>
      </Form>
      <Message>
        Eres nuevo?{" "}
        <a href="#" onClick={() => setLogin(false)}>
          Regístrate
        </a>
      </Message>
    </div>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
  };
}
