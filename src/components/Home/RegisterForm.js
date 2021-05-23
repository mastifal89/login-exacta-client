import React, { useState, useEffect } from "react";
import { Container, Header, Form, Button, Icon } from "semantic-ui-react";

import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { toast } from "react-toastify";
import loginApi from "../../api/login";

export default function RegisterForm(props) {
  require("firebase/auth");

  const { setFinish } = props;

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(moment().format("DD-MM-YYYY hh:mm:ss"));

  useEffect(() => {
    setDate(moment().format("DD-MM-YYYY hh:mm:ss"));
  }, []);

  function initialValues() {
    return {
      name: "",
      sessionId: "",
      date: moment().format("DD-MM-YYYY hh:mm:ss"),
    };
  }

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      console.log(formData);
      setLoading(true);
      loginApi
        .save(formData)
        .then(setLoading(false))
        .then((resp) => {
          if (resp.status === 201) {
            toast.success("Se regitró el login correctamente");
            setFinish(true);
          } else {
            toast.error("Error al cargar registro");
          }
        });
      console.log(formData);

      setLoading(false);
    },
  });

  return (
    <div>
      <Container text style={{ marginTop: "3em" }}>
        <Header as="h1">Exacta Education</Header>
        <p>Por favor completar el formulario a continuación.</p>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Field>
            <label>Nombre</label>
            <Form.Input
              fluid
              name="name"
              icon="user"
              iconPosition="left"
              onChange={formik.handleChange}
              error={formik.errors.name}
            />
          </Form.Field>
          <Form.Field>
            <label>Ingresar id sesión</label>
            <Form.Input
              fluid
              name="sessionId"
              icon="key"
              iconPosition="left"
              onChange={formik.handleChange}
              error={formik.errors.sessionId}
            />
          </Form.Field>
          <Form.Field>
            <label>Fecha de registro</label>
            <Form.Input
              fluid
              value={date}
              name="date"
              readOnly
              icon="calendar"
              iconPosition="left"
              onChange={formik.handleChange}
              error={formik.errors.date}
            />
          </Form.Field>
          <Button
            animated
            color="blue"
            fluid
            size="large"
            type="submit"
            loading={loading}
          >
            <Button.Content visible>Confirmar</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Form>
      </Container>
    </div>
  );
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    sessionId: Yup.string().required(true),
  };
}
