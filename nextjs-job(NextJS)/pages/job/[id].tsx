import client from '../../apollo-client';
import { Job } from '../../src/generated/graphql';
import { GET_ALL_JOB, GET_JOB_BY_ID } from '../../src/gqlApi/query';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_ALL_JOB,
  });

  const jobs = await data.getAllJobs;

  const paths = jobs.map((job: Job) => ({ params: { id: job.id.toString() } }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const id = params.id;

  const { data } = await client.query({
    query: GET_JOB_BY_ID,
    variables: { id: parseInt(id) },
  });

  return { props: { job: data.getJobById } };
}

export default function JobDetailPage({ job }: { job: Job }) {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {job.id}
        </Typography>
        <Typography variant="h5" component="div">
          {job.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {job.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">edit</Button>
      </CardActions>
    </Card>
  );
}
