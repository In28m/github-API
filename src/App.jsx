import React, { useState, useEffect } from 'react'
import './App.css'

const API_URL = "https://api.github.com/users/dkoncius"
const DEFAULT_AVATAR = "nuotraukos/standartinis_paveikslėlis.png"
const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1532275948649-7d97f309ef16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"

const App = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Nepavyko gauti duomenų iš API")
        }
        return response.json()
      })
      .then((data) => {
        setUserData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: "50% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
      }}
    >
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div
          className="card"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            padding: "60px",
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: "1",
            width: "20%",
          }}
        >
          <img
            className="avatar"
            src={userData?.avatar_url || DEFAULT_AVATAR}
            alt="Vartotojo paveikslėlis"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              objectFit: "cover",
              display: "block",
              margin: "0 auto",
            }}
          />
          <h2
            className="username"
            style={{
              paddingTop: "15px",
            }}
          >
            {userData?.login || "Vartotojo vardas nerastas"}
          </h2>
          <p>Web Developer - Web Designer</p>
          <p
            className="bio"
            style={{
              paddingTop: "15px",
              color: "gray",
              textAlign: "justify",
              textJustify: "inter-word",
            }}
          >
            {userData?.bio || "Nėra biografijos"}
          </p>
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-square-twitter"></i>
          <i className="fa-brands fa-square-google-plus"></i>
        </div>
      )}
    </div>
  )
}

export default App


