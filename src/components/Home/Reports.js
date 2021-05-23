import React, { useState, useEffect } from "react";
import _ from "lodash";
import faker from "faker";
import {
  Container,
  Header,
  Icon,
  Label,
  Menu,
  Table,
  Input,
  Grid,
  Segment,
} from "semantic-ui-react";
import loginApi from "../../api/login";

export default function Reports() {
  const [loginList, setLoginList] = useState(null);
  const [filteredList, setFilteredList] = useState([]);

  const timeoutRef = React.useRef();

  const handleSearchChange = React.useCallback((e, data) => {
    const re = new RegExp(_.escapeRegExp(data.value), "i");
    const isMatch = (result) => re.test(result.name);
    setFilteredList(_.filter(loginList, isMatch));
  });

  useEffect(() => {
    if (loginList === null) {
      loginApi
        .getAll()
        .then()
        .then((resp) => {
          if (resp.status === 200) {
            setLoginList(resp.data);
            setFilteredList(resp.data);
          } else {
          }
        });
    }
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div>
      <Container style={{ marginTop: "3em" }}>
        <Grid>
          <Grid.Column left width={6}>
            <Header style={{ marginTop: "10px" }}>Registro Logins</Header>
          </Grid.Column>
          <Grid.Column floated="right" width={6}>
            <Input
              fluid
              icon="search"
              iconPosition="left"
              placeholder="Buscar..."
              onChange={handleSearchChange}
            />
          </Grid.Column>
        </Grid>
        <Table striped celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nombre y Apellido</Table.HeaderCell>
              <Table.HeaderCell>Id de sesión</Table.HeaderCell>
              <Table.HeaderCell>Fecha y hora</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredList &&
              filteredList.map(function (index) {
                return (
                  <Table.Row key={index._id}>
                    <Table.Cell>{index.name}</Table.Cell>
                    <Table.Cell>{index.sessionId}</Table.Cell>
                    <Table.Cell>{index.date}</Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="3">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Container>
    </div>
  );
}
