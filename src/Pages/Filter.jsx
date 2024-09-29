import React, { useState, useEffect } from 'react';
import NavBar from '../Components/Navbar';
import Cards from '../Components/Cards';

function Filter() {
    const [search, setSearch] = useState("");
    const [year, setYear] = useState(""); 
    const [genre, setGenre] = useState(""); 
    const [data, setData] = useState([]);
    const [searchedData, setSD] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch('https://r-task-95497-default-rtdb.firebaseio.com/movies.json', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
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
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }

        fetchMovies();
    }, []);

    
    function handleSearch() {
        const filteredMovies = data.filter(movie => 
            (movie.name.toLowerCase().includes(search.toLowerCase()) || 
            movie.Genre.toLowerCase().includes(search.toLowerCase())) &&
            (year === "" || movie.year === year) && 
            (genre === "" || movie.Genre.toLowerCase().includes(genre.toLowerCase())) 
        );
        setSD(filteredMovies);
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
                        placeholder="Search by name or genre (Optional)"
                        style={{
                            width: "350px", 
                            height: "50px", 
                            borderRadius: "30px", 
                            border: "1px solid #ccc", 
                            padding: "0 15px",
                            fontWeight:"700",
                            marginRight: "20px"
                        }} 
                    />
                    <input 
                        type='text' 
                        value={year} 
                        onChange={e => setYear(e.target.value)}  
                        placeholder="Year (Optional)"
                        style={{
                            width: "150px", 
                            height: "50px", 
                            borderRadius: "30px", 
                            border: "1px solid #ccc", 
                            padding: "0 15px",
                            fontWeight:"700",
                            marginRight: "20px"
                        }} 
                    />
                    <input 
                        type='text' 
                        value={genre} 
                        onChange={e => setGenre(e.target.value)}  
                        placeholder="Genre (Optional)"
                        style={{
                            width: "160px", 
                            height: "50px", 
                            borderRadius: "30px", 
                            border: "1px solid #ccc", 
                            padding: "0 15px",
                            fontWeight:"700",
                            marginRight: "20px"
                        }} 
                    />
                    <button onClick={handleSearch} style={{ fontWeight: 900, padding: "10px 20px", backgroundColor: "#ccaa62", borderRadius: "30px", color: "white", border: "none" }}>Search</button>
                </div>
            </div>

          <div className='row'>
            
            {searchedData && (<div className='row' style={{marginLeft:"95px"}}>
                <h1 style={{ color: "white", fontWeight: "700", textAlign: 'left', marginLeft: '25px', marginTop: '40px' }}>
          Results
        </h1>
            {searchedData.map((movie) => (
              <Cards 
                key={movie.id}
                name={movie.name}
                genre={movie.Genre}
                des={movie.des}
                stars={movie.stars}
                year={movie.year}
                pic={movie.imgurl}
              />
            ))}
         </div> )}
          </div>
        </>
    );
}

export default Filter;