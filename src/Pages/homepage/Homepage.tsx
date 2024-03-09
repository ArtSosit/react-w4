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
                  btnClick(inputName.current.value);
                }
              }}
            ></TextField>
            <Button
              variant="contained"
              onClick={async () => {
                if (inputName.current) {
                  btnClick(inputName.current.value);
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
      </div>
    </>
  );

  async function btnClick(inputname: string) {
    const res = await movieservice.getMovieByname(inputname);

    console.log(res);
    setData(res);

    // const res2 = await movieservice.getById(inputname);
    // setData(res2);
    // console.log("Out");
  }
}

export default HomePage;
