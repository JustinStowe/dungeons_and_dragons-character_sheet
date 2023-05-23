import React, { useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import {} from "../../utils/userService";
import { useNavigate } from "react-router-dom";
import { signup } from "../../utilities/userService";

export function SignupPage(props) {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [selectedFile, setSelectedFile] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", selectedFile);

    for (let key in state) {
      formData.append(key, state[key]);
    }
    console.log("(formData)this should show nothing:", formData);
    console.log(
      "formData items",
      formData.forEach((item) => console.log(item))
    );

    try {
      await signup(formData);
      props.handleSignUpOrLogin();
      navigate("/");
    } catch (error) {
      console.log("error @ signup page:", error);
      setError(error.message);
    }
  }

  function handleFileInput(e) {
    console.log("the file input:", e.target.files);
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxwidth: 450 }}>
        <Header as="h2" color="black" textAlign="center">
          <Image src="https://img.icons8.com/color/48/000000/dungeons-and-dragons.png" />
          Sign up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="email"
              type="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConfirm"
              type="password"
              placeholder="confirm password"
              value={state.passwordConfirm}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
