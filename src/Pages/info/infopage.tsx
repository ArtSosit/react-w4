import { Link, useParams } from "react-router-dom";
import { MovieService } from "../../services/MovieService";
import { MovieGetIdResponse } from "../../models/MovieGetResponse";
import { useEffect, useState } from "react";
import "./info.css";
import { AppBar, Toolbar, Typography } from "@mui/material";

function InfoPage() {
  const params = useParams();
  const movieservice = new MovieService();
  const [data, setData] = useState<MovieGetIdResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // เพิ่ม state เพื่อระบุว่ากำลังโหลดหรือไม่

  useEffect(() => {
    toDetail();
  });

  async function toDetail() {
    const res = await movieservice.getMovieById(`${params.id}`);
    setData(res);
    setLoading(false); // เมื่อโหลดเสร็จแล้วให้กำหนด loading เป็น false
  }

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
          <Link to={"/"}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontSize: "24px", color: "gold" }}
            >
              OMDb
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data && (
          <div className="center-container">
            <div>
              <div className="center-content">
                <div>
                  <img src={data.Poster} alt="" />
                </div>

                <div style={{ color: "white", padding: "10px" }}>
                  <h1>{data.Title}</h1>
                  <p>{data.imdbRating}</p>
                  <br />
                  <p>Actors: {data.Actors}</p>
                  <p>Director: {data.Director}</p>
                  <p>Writer: {data.Writer}</p>
                  <br />
                  <p>Genre: {data.Genre}</p>
                  <p>Released: {data.Released}</p>
                  <p>Runtime: {data.Runtime}</p>
                  <br />
                  <p>&nbsp; {data.Plot}</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default InfoPage;
