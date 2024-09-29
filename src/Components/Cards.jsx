import { getDownloadURL, ref } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { storage } from '../firebase';
import 'bootstrap/dist/css/bootstrap.css';
import { MdDelete } from "react-icons/md";

function Cards({ name, genre, des, stars, year, pic }) {
    const [uurl, setuurl] = useState(null);

    const getImageUrl = (imagePath) => {
        const imageRef = ref(storage, imagePath);
        return getDownloadURL(imageRef);
    };

    useEffect(() => {
        if (pic) { 
            getImageUrl(pic).then(urrl => setuurl(urrl)).catch(error => {
                console.error("Error fetching image URL: ", error);
            });
        }
    }, [pic]);

    return (
        <div
            className="card"
            style={{
                width: '12rem',
                height: '320px',
                margin: '18px 20px 20px 0px',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#131418',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '10px',
            }}
        >
            <img
                className="card-img-top"
                src={uurl}
                alt="Card image cap"
                style={{
                    width: '100%',
                    height: '140px',
                    objectFit: 'contain',
                    borderRadius: '15px', 
                }}
            />
            <div className="card-body">
                <h5 className="card-title" style={{ textAlign: 'center', fontWeight: '800' ,fontSize:"15px"}}>{name}</h5>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <p style={{ margin: 0, fontWeight: '600',fontSize:"13px" }}>{year}</p>
                    <p style={{ margin: 0, color: 'gold' ,fontSize:"13px"}}>{'\u2605'.repeat(stars)}</p>
                </div>

                
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(255, 215, 0, 0.8)', 
                        borderRadius: '12px',
                        padding: '3px 12px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        color: 'black',
                        fontSize: '0.85rem',
                        letterSpacing: '1px',
                        fontSize:"12px"
                    }}>
                        {genre.toUpperCase()}
                    </span>
                </div>

                <a 
                    href="#" 
                    className="btn" 
                    style={{
                        backgroundColor: "#ccaa62",
                        borderColor: "#ccaa62",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "20px",
                        textDecoration: "none",
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        fontWeight: "800",
                        display: 'block',
                        textAlign: 'center',
                        marginTop: '15px',
                        fontSize:"13px"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.4)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    Watch Now
                </a>
            </div>
        </div>
    );
}

export default Cards;
