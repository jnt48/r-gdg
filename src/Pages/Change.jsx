import React, { useEffect, useState } from 'react';
import NavBar from '../Components/Navbar';
import Cards from '../Components/Cards';
import { FcApproval } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

function Change() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedData, setSD] = useState([]);
  const [name, setName] = useState("");
  const [stars, setStars] = useState("");
  const [genre, setGenre] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch('https://r-task-95497-default-rtdb.firebaseio.com/movies.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const fetchedData = await response.json();
        if (fetchedData) {
          const moviesArray = Object.keys(fetchedData).map((key) => ({
            id: key,
            Genre: fetchedData[key].Genre,
            des: fetchedData[key].des,
            name: fetchedData[key].name,
            stars: fetchedData[key].stars,
            year: fetchedData[key].year,
            imgurl: fetchedData[key].imgurl,
          }));
          setData(moviesArray);
        } else {
          setData([]);
        }
      } 
    }

    fetchMovies();
  }, []);

  function handleSearch() {
    const filteredMovies = data.filter(movie =>
      movie.name.toLowerCase().includes(search.toLowerCase()) ||
      movie.Genre.toLowerCase().includes(search.toLowerCase())
    );
    setSD(filteredMovies);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const movieToUpdate = searchedData[0]; 
    const updatedMovie = {
      name: name,
      Genre: genre,
      stars: stars,
    };

    const response = await fetch(`https://r-task-95497-default-rtdb.firebaseio.com/movies/${movieToUpdate.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovie),
    });

    if (response.ok) {
      setShowSuccess(true);
      setSD([ { ...movieToUpdate, ...updatedMovie } ]);
    } 
  }






  
  return (
    <>
      <NavBar />
      <div>
        <div style={{ marginTop: "40px" }}></div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
          <input
            type='text'
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or genre"
            style={{
              width: "460px",
              height: "35px",
              borderRadius: "30px",
              border: "1px solid #ccc",
              padding: "0 15px",
              fontWeight: "700",
              marginRight: "20px"
            }}
          />
          <button onClick={handleSearch} style={{
            fontWeight: 900,
            padding: "5px 15px",
            fontSize: "12px",
            backgroundColor: "#ccaa62",
            borderRadius: "30px",
            color: "white",
            border: "none"
          }}>
            Search
          </button>
        </div>
      </div>
      <div className='row' style={{ marginLeft: '350px', marginTop: "30px", gap: '20px' }}>
        {searchedData.length > 0 ? (
          searchedData.map((movie) => (
            <>
              <Cards
                key={movie.id}
                name={movie.name}
                genre={movie.Genre}
                des={movie.des}
                stars={movie.stars}
                year={movie.year}
                pic={movie.imgurl}
              />
              <div className="card text-center" style={{
                marginTop: "40px",
                width: '400px',
                height: '320px',
                margin: '15px 20px 20px 0px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#131418',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '5px',
                width: "330px"
              }}>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" style={{ fontWeight: "800", fontSize: "12px" }}>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        placeholder="Movie Name"
                        style={{ textAlign: "center", height: "27px", width: "100%", fontSize: "12px" }}
                        required
                        autoComplete="off"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ fontWeight: "800", fontSize: "12px" }}>Stars</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(event) => setStars(event.target.value)}
                        value={stars}
                        placeholder="Rating (Stars)"
                        style={{ textAlign: "center", height: "27px", fontSize: "12px" }}
                        required
                        autoComplete="off"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ fontWeight: "800", fontSize: "12px" }}>Genre</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(event) => setGenre(event.target.value)}
                        value={genre}
                        placeholder="Genre"
                        style={{ textAlign: "center", height: "27px", fontSize: "12px" }}
                        required
                        autoComplete="off"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#ccaa62", fontWeight: "900", fontSize: "12px", color: "white" }}>
                      List Movie
                    </button>
                  </form>
                </div>
              </div>
            </>
          ))
        ) : (
          <p>-</p>
        )}
      </div>

    </>
  );
}

export default Change;
