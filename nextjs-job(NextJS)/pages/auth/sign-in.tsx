import { Form, Formik, Field, ErrorMessage } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { Button, FormLabel } from "@mui/joy";
import { useRouter } from "next/router";
import { CssVarsProvider } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

import { LOGIN } from "../../src/gqlApi/mutation";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters plus 1 alphabet, 1 special character and 1 number"
    )
    .required("Required"),
});

function signIn() {
  const router = useRouter();
  const [login, { data, loading, error }] = useMutation(LOGIN);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

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
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={(value) => {
            login({
              variables: {
                userInfo: value,
              },
            }).then((res) => {
              localStorage.setItem("token", res.data.login.token);
              router.push("/job");
            });
          }}
        >
          <Form>
            <FormLabel>Email address</FormLabel>
            <Field
              style={{
                borderWidth: "thin",
                borderRadius: "5px",
                padding: "8px",
              }}
              type="email"
              name="email"
              placeholder="donaldo@email.io"
            />
            <ErrorMessage name="email" />
            <FormLabel>Password</FormLabel>
            <Field
              style={{
                borderWidth: "thin",
                borderRadius: "5px",
                padding: "8px",
              }}
              type="password"
              name="password"
            />
            <ErrorMessage name="password" />
            <div>
              <Button sx={{ mt: 1, mr: 1 }} type="submit">
                Sign in
              </Button>
              <Button
                sx={{ alignSelf: "center" }}
                onClick={() => router.push("sign-up")}
              >
                Sign up
              </Button>
            </div>
          </Form>
        </Formik>
      </Sheet>
    </CssVarsProvider>
  );
}

export default signIn;
