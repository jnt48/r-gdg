import React, { useEffect, useState } from 'react';
import NavBar from '../Components/Navbar';
import Cards from '../Components/Cards';
import '../App.css';

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedData, setSD] = useState([]);

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
        } else {
          console.error('Failed to fetch movies');
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

  const displayData = search ? searchedData : data;

  const topPicks = displayData.slice(0, 5);
  const spiritualMovies = displayData.filter(movie => movie.Genre.toLowerCase() === 'spiritual');
  const actionMovies = displayData.filter(movie => movie.Genre.toLowerCase() === 'action');

  return (
    <div className="wapper-about">
      <center>
        <NavBar />
        <div>
          <div style={{marginTop:"40px"}}></div>
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
                fontWeight:"700",
                marginRight: "20px"
              }} 
            />
            <button onClick={handleSearch} style={{fontWeight:900, padding: "5px 15px", fontSize:"12px",backgroundColor: "#ccaa62", borderRadius: "30px", color: "white", border: "none" }}>Search</button>
          </div>
        </div>

        <h2 style={{ color: "white", fontWeight: "700", textAlign: 'left', marginLeft: '25px', marginTop: '15px' }}>
          {search ? 'Results' : 'Top Picks'}
        </h2>

        <div className='row' style={{ marginLeft: '75px', marginTop: "30px", gap: '20px' }}>
          {topPicks.length > 0 ? (
            topPicks.map((movie) => (
              <Cards 
                key={movie.id}
                name={movie.name}
                genre={movie.Genre}
                des={movie.des}
                stars={movie.stars}
                year={movie.year}
                pic={movie.imgurl}
              />
            ))
          ) : (
            <p>No Movies Available</p>
          )}
        </div>

        <h2 style={{ color: "white", fontWeight: "700", textAlign: 'left', marginLeft: '25px', marginTop: '40px' }}>
          Spiritual
        </h2>   

        <div className='row' style={{ marginLeft: '75px', marginTop: "30px", gap: '20px' }}>
          {spiritualMovies.length > 0 ? (
            spiritualMovies.map((movie) => (
              <Cards 
                key={movie.id}
                name={movie.name}
                genre={movie.Genre}
                des={movie.des}
                stars={movie.stars}
                year={movie.year}
                pic={movie.imgurl}
              />
            ))
          ) : (
            <p>No Movies Available</p>
          )}
        </div>

        <h2 style={{ color: "white", fontWeight: "700", textAlign: 'left', marginLeft: '25px', marginTop: '40px' }}>
          Action
        </h2> 

        <div className='row' style={{ marginLeft: '75px', marginTop: "30px", gap: '20px' }}>
          {actionMovies.length > 0 ? (
            actionMovies.map((movie) => (
              <Cards 
                key={movie.id}
                name={movie.name}
                genre={movie.Genre}
                des={movie.des}
                stars={movie.stars}
                year={movie.year}
                pic={movie.imgurl}
              />
            ))
          ) : (
            <p>No Movies Available</p>
          )}
        </div>
        <h2 style={{ color: "white", fontWeight: "900", textAlign: 'Center', marginLeft: '25px', marginTop: '40px' }}>
          Explore More Movies Through Search Bar
        </h2> 
      </center>
    </div>
  );
}

export default Home;
