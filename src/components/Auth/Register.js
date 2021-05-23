import React, { useState } from "react";
import { Button, Form, Segment, Message, Icon } from "semantic-ui-react";
import { toast } from "react-toastify";
import firebase from "firebase/app";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function LoginPrueba(props) {
  const { setLogin } = props;
  const [loading, setLoading] = useState(false);

  require("firebase/auth");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData.password.length);
      if (formData.password.length >= 6) {
        setLoading(true);
        firebase
          .auth()
          .createUserWithEmailAndPassword(formData.email, formData.password)
          .then(() => {
            let user = firebase.auth().currentUser;
            if (user) {
              user.updateProfile({
                displayName: formData.name,
              });
            }
            setLoading(false);
            toast.success("El usuario se ha registrado correctamente");
            //navigation.navigate("account");
          })
          .catch((err) => {
            console.log(err);
            toast.error("El email ya esta en uso");
            setLoading(false);
          });
      } else {
        toast.error("El email debe tener 6 o más caracteres");
      }

      setLoading(false);
    },
  });

  return (
    <div>
      <Form size="large" onSubmit={formik.handleSubmit}>
        <Segment>
          <Form.Input
            fluid
            name="name"
            icon="user"
            iconPosition="left"
            placeholder="Ingresar nombre"
            onChange={formik.handleChange}
            error={formik.errors.name}
          />
          <Form.Input
            fluid
            name="lastname"
            icon="user"
            iconPosition="left"
            placeholder="Ingresar apellido"
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
          <Form.Input
            fluid
            name="email"
            icon="mail"
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
          <Form.Input
            fluid
            name="repeatPassword"
            icon="lock"
            iconPosition="left"
            placeholder="Repetir password"
            type="password"
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
          />

          <Button
            animated
            color="blue"
            fluid
            size="large"
            type="submit"
            loading={loading}
          >
            <Button.Content visible>Registrarse</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Segment>
      </Form>
      <Message>
        Ya tienes cuenta?{" "}
        <a href="#" onClick={() => setLogin(true)}>
          Loguéate
        </a>
      </Message>
    </div>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    email: Yup.string().email(true).required(true),
    password: Yup.string().required(true),
    repeatPassword: Yup.string().required(true),
  };
}
