import { AppBar, Button, TextField, Toolbar, Typography } from "@mui/material";
import "./Homepage.css";
import { MovieService } from "../../services/MovieService";
import { useRef, useState } from "react";
import { MovieGetResponse } from "../../models/MovieGetResponse";
import logo from "../../assets/imdb.png";
import { Link } from "react-router-dom";

function HomePage() {
  const movieservice = new MovieService();
  const inputName = useRef<HTMLInputElement>();
  const [data, setData] = useState<MovieGetResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          mr: 2,
          backgroundColor: "#292929",
          height: "70px",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontSize: "24px", color: "gold" }}
          >
            OMDb
          </Typography>
          <div className="c1">
            <TextField
              className="search"
              inputRef={inputName}
              size="small"
              onKeyDown={(e) => {
                if (e.key === "Enter" && inputName.current) {
                  btnClick(inputName.current.value, currentPage);
                }
              }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={async () => {
                if (inputName.current) {
                  btnClick(inputName.current.value, currentPage);
                }
              }}
            >
              Find Name
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="body">
        {data.length === 0 ? (
          <div className="center">
            <img src={logo} className="no-interaction" />
          </div>
        ) : (
          <div className="c2">
            {data.map((item, i) => (
              <div className="movieC">
                <Link to={`/info/${item.imdbID}`}>
                  <div className="grid-item">
                    <img className="img" src={item.Poster} alt="" />
                    <p className="title">
                      {i + 1}. {item.Title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            marginTop: "20px",
            // backgroundColor: "red",
          }}
        >
          <Button
            size="large"
            variant="contained"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </Button>
          <TextField
            id="filled-basic"
            label="Filled"
            variant="filled"
            className="page-input"
            color="warning"
            value={currentPage}
            onChange={(e) => {
              const newValue =
                e.target.value.trim() == "" && parseInt(e.target.value) == 0
                  ? parseInt(e.target.value)
                  : currentPage;
              handlePageChange(newValue);
            }}
            style={{
              width: "70px",
              fontSize: "12px",
              backgroundColor: "white",
              borderRadius: "5px",
              marginLeft: "10px",
              marginRight: "10px",
            }}
          />

          <Button
            size="large"
            variant="contained"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );

  async function btnClick(inputname: string, page: number) {
    const res = await movieservice.getMovieByname(inputname, page);
    setData(res);
    setCurrentPage(page);
  }

  function handlePageChange(page: number) {
    btnClick(inputName.current.value, page);
    if (page <= 0) {
      btnClick(inputName.current.value, 1);
    }
    if (page === null || page === undefined) {
      btnClick(inputName.current.value, 1);
    }
  }
}

export default HomePage;
