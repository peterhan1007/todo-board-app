import { useMutation } from '@apollo/client';
import { Sheet } from '@mui/joy';
import { Button, CssVarsProvider, FormLabel, Typography } from '@mui/joy';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { CREATEJOB } from '../../src/gqlApi/mutation';

// export async function getStaticProps() {}

const JobSchema = Yup.object().shape({
  title: Yup.string()
    .max(100, 'Must be 100 characters or less')
    .required('Required'),
  description: Yup.string()
    .max(250, 'Must be 250 characters or less')
    .required('Required'),
  rate: Yup.number().required('Required'),
});

export default function JobCreatePage() {
  const router = useRouter();
  const [createJob, { data, loading, error }] = useMutation(CREATEJOB);

  if (loading) return 'Submitting...';
  if (error) return `Submitting error! ${error.message}`;

  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          maxWidth: 400,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body2">create in to continue</Typography>
        </div>
        <Formik
          enableReinitialize
          initialValues={{ title: '', description: '', rate: 0 }}
          validationSchema={JobSchema}
          onSubmit={(value) => {
            console.error('value', value);
            createJob({
              variables: {
                jobInfo: value,
              },
            }).then((res) => {
              console.log('res', res);
              router.push('/job');
            });
          }}
        >
          <Form>
            <FormLabel>Title</FormLabel>
            <Field
              style={{
                borderWidth: 'thin',
                borderRadius: '5px',
                padding: '8px',
              }}
              type="text"
              name="title"
              placeholder="Find a senior frontend engineer"
            />
            <ErrorMessage name="title" />
            <FormLabel>description</FormLabel>
            <Field
              style={{
                borderWidth: 'thin',
                borderRadius: '5px',
                padding: '8px',
              }}
              as="textarea"
              name="description"
              placeholder="Here is your description"
            />
            <ErrorMessage name="description" />
            <FormLabel>Rate</FormLabel>
            <Field
              style={{
                borderWidth: 'thin',
                borderRadius: '5px',
                padding: '8px',
              }}
              type="number"
              name="rate"
            />
            <ErrorMessage name="rate" />
            <div>
              <Button sx={{ mt: 1, mr: 1 }} type="submit">
                Create
              </Button>
              <Button
                sx={{ alignSelf: 'center' }}
                onClick={() => router.push('/job')}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Formik>
      </Sheet>
    </CssVarsProvider>
  );
}
