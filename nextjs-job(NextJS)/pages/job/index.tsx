import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import client from "../../apollo-client";
import { Link } from "@material-ui/core";

import { Job } from "../../src/generated/graphql";
import { GET_ALL_JOB } from "../../src/gqlApi/query";
import { useRouter } from "next/router";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export async function getStaticProps({ ctx }: { ctx: any }) {
  // const cookies = nookies.get(ctx);
  const { data } = await client.query({
    query: GET_ALL_JOB,
  });

  return {
    props: {
      jobs: data.getAllJobs,
    }, // will be passed to the page component as props
  };
}

export default function List({ jobs }: { jobs: [Job] }) {
  const router = useRouter();

  const goEditPage = (event: any, id: number) => {
    event.preventDefault();
    router.push(`job/${id}`);
  };

  const goCreatePage = (event: any) => {
    event.preventDefault();
    router.push(`job/create`);
  };

  return (
    <TableContainer component={Paper}>
      <Button
        onClick={(event) => goCreatePage(event)}
        style={{ float: "right" }}
        variant="contained"
      >
        Contained
      </Button>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Author</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job, index) => (
            <StyledTableRow key={job.id}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Link
                  component="button"
                  onClick={(event) => goEditPage(event, job.id)}
                >
                  {job.title}
                </Link>
              </StyledTableCell>
              <StyledTableCell align="right">{job.description}</StyledTableCell>
              <StyledTableCell align="right">
                {job.user && job.user.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {job.user && job.user.email}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
