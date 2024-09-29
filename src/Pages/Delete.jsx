import React, { useEffect, useState } from 'react';
import NavBar from '../Components/Navbar';
import DCards from '../Components/DCards';

function Delete() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [searchedData, setSD] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
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
            } catch (error) {
                console.error('Error fetching movies:', error);
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

    async function deleteMovie(id) {
        try {
            await fetch(`https://r-task-95497-default-rtdb.firebaseio.com/movies/${id}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            setData(data.filter(movie => movie.id !== id));
            setSD(searchedData.filter(movie => movie.id !== id));
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    }

    const displayData = search ? searchedData : data;

    return (
        <>
            <NavBar />
            <h4 style={{fontWeight:"800",color: "#ccaa62", marginTop:"20px",
                borderColor: "#ccaa62" , textAlign:"center"}}>Click On Delete Button To Remove A Movie</h4>
            <div style={{ margin: '20px' }}>
                
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                    <input
                        type='text'
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or genre"
                        style={{
                            width: "460px", 
                            height: "35px", 
                            borderRadius: "20px",
                            border: "1px solid #ccc",
                            padding: "0 15px",
                            fontWeight: "700",
                        }}
                    />
                    <button onClick={handleSearch} style={{fontWeight:900, marginLeft:"15px",padding: "5px 15px", fontSize:"12px",backgroundColor: "#ccaa62", borderRadius: "30px", color: "white", border: "none" }}
                    >Search</button>
                </div>
            </div>

            

            <div className='row' style={{ marginLeft: '90px', marginTop: "20px", gap: '20px' }}>
                {displayData.length > 0 ? (
                    displayData.map(movie => (
                        <DCards
                            key={movie.id}
                            name={movie.name}
                            genre={movie.Genre}
                            des={movie.des}
                            stars={movie.stars}
                            year={movie.year}
                            pic={movie.imgurl}
                            onDelete={() => deleteMovie(movie.id)} 
                        />
                    ))
                ) : (
                    <p>No Movies Available</p>
                )}
            </div>
        </>
    );
}

export default Delete;
