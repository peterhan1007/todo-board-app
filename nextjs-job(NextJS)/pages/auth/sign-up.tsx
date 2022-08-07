import { Form, Formik, Field, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { Button, FormLabel } from "@mui/joy";
import { useRouter } from "next/router";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

import { REGISTER } from "../../src/gqlApi/mutation";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters plus 1 alphabet, 1 special character and 1 number"
    )
    .required("Required"),
  role: Yup.string().required("Required"),
  title: Yup.string()
    .max(100, "Must be 100 characters or less")
    .required("Required"),
  description: Yup.string()
    .max(250, "Must be 250 characters or less")
    .required("Required"),
  rate: Yup.number().required("Required"),
});

function signUp() {
  const router = useRouter();
  const [register, { data, loading, error }] = useMutation(REGISTER);

  if (loading) return "Submitting...";
  if (error) return `Submitting error! ${error.message}`;

  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          maxWidth: 400,
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body2">Sign in to continue</Typography>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            email: "",
            password: "",
            role: "",
            title: "",
            description: "",
            rate: 0,
          }}
          validationSchema={RegisterSchema}
          onSubmit={(value) => {
            register({
              variables: {
                userInfo: value,
              },
            }).then((res) => {
              localStorage.setItem("token", res.data.register.token);
              router.push("/job");
            });
          }}
        >
          <Form>
            <FormLabel>Name</FormLabel>
            <Field
              style={{
                borderWidth: "thin",
                borderRadius: "5px",
                padding: "8px",
              }}
              type="text"
              name="name"
              placeholder="Donaldo James"
            />
            <ErrorMessage name="name" />
            <FormLabel>Email address</FormLabel>
            <Field
              style={{
                borderWidth: "thin",
                borderRadius: "5px",
                padding: "8px",
              }}
              name="email"
              type="email"
              placeholder="donaldo@email.io"
            />
            <ErrorMessage name="email" />
            <FormLabel>Password</FormLabel>
            <Field
              style={{
                borderWidth: "thin",
                borderRadius: "5px",
                width: "100%",
                padding: "8px",
              }}
              name="password"
              type="password"
            />
            <ErrorMessage name="password" />
            <FormLabel>Role</FormLabel>
            <Field
              style={{
                borderWidth: "thin",
                borderRadius: "5px",
                padding: "8px",
              }}
              name="role"
              as="select"
              placeholder="Client or Freelancer?"
            >
              <option value="client">Client</option>
              <option value="freelancer">Freelancer</option>
            </Field>
            <ErrorMessage name="role" />
            <FormLabel>Title</FormLabel>
            <Field
              style={{
                borderWidth: "thin",
                borderRadius: "5px",
                padding: "8px",
              }}
              name="title"
              type="text"
            />
            <ErrorMessage name="title" />
            <FormLabel>Description</FormLabel>
            <Field
              style={{
                borderWidth: "thin",
                borderRadius: "5px",
                padding: "8px",
              }}
              as="textarea"
              name="description"
              placeholder="Here is your description"
            />
            <ErrorMessage name="description" />
            <FormLabel>Rate</FormLabel>
            <Field
              style={{
                borderWidth: "thin",
                borderRadius: "5px",
                padding: "8px",
              }}
              type="number"
              name="rate"
            />
            <ErrorMessage name="rate" />
            <div>
              <Button sx={{ mt: 1, mr: 1 }} type="submit">
                Sign up
              </Button>
              <Button
                sx={{ alignSelf: "center" }}
                onClick={() => router.push("sign-in")}
              >
                Sign in
              </Button>
            </div>
          </Form>
        </Formik>
      </Sheet>
    </CssVarsProvider>
  );
}

export default signUp;
