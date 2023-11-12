import React from 'react'
import { Container, Col, Row, Card, Button, Carousel, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SideBar from '../components/SideBar';

import './Homepage.css'
const API_KEY = process.env.REACT_APP_IMDB_API_KEY;

export default function HomePage() {
  const [moviesOnTrending, setMoviesOnTrending] = useState([]);
  const [moviesOnDiscovering, setmoviesOnDiscovering] = useState([])
  const [moviesForFilter, setMoviesForFilter] = useState([])
  const [genreMovie, setGenreMovie] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const fetchMovieOnTrending = async () => {
    const resp = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
    const jsondata = await resp.json();
    console.log({ IMDB: jsondata });
    setMoviesOnTrending(jsondata.results);
  };
  const onLoadMoreMovies = async () => {
    const newPageNumber = pageNumber + 1;

    const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${newPageNumber}`);
    const data = await resp.json()
    console.log({ newPage: data })
    setmoviesOnDiscovering(prevMovies => [...prevMovies, ...data.results]);
    setMoviesForFilter(prevMovies => [...prevMovies, ...data.results])
    setPageNumber(newPageNumber)
  }
  const fetchMovieOnDiscovering = async () => {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    const data = await resp.json();
    console.log({ onPopular: data })
    setmoviesOnDiscovering(data.results);
    setMoviesForFilter(data.results)
    
  
  }

  const fetchGenre = async () => {
    const resp = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    const data = await resp.json()
    console.log({ genreForMovie: data })
    setGenreMovie(data.genres)
  }
  const handleFilteredMovies = (filteredMovies, reset = false) => {
    setmoviesOnDiscovering(reset ? moviesForFilter : filteredMovies);
  };
  
  useEffect(() => {
    fetchMovieOnTrending();
    fetchMovieOnDiscovering();
    fetchGenre()
  }, []);
  return (
    <div className='body'>
      <Container className=' mt-3 checkBackground'>
        <Row className='row-flex adjust-padding'>
          <Col sm={8} className=' flex-child'>
            <Carousel>
              {moviesOnTrending.map((movie, index) => {
                return (
                  <Carousel.Item interval={index === 0 ? 1500 : 500}>
                    <img
                      className="d-block w-100"
                      src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
                    />
                    <Carousel.Caption>
                      <h3 style={{}}>{`${movie.original_title} ${index + 1}`}</h3>
                      <p>{`Sample Text for Image ${index + 1}`}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>

          <Col md={4} className="sidebar scrolling-wrapper flex-child">
            <div>Up Comming</div>
            <div className="video-list">
              {moviesOnTrending.map((movie) => (
                <div key={movie.id} className="video-item d-flex align-items-center mb-2">
                  <div className="video-thumbnail">
                    <img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`} alt={movie.title} />
                  </div>
                  <div className="video-info ml-2">
                    <div className="video-title">{movie.title}</div>
                    <div className="video-duration">{/* Duration goes here */}</div>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Container className='mt-3'>
        <Row>
          <Col sm={9} className=''>
            <Row>
              {moviesOnDiscovering.map((movie) => (
                <Col md={6} lg={4}>
                  <Card className='mt-3 style-Card' > {/* Set width to 100% to fill the column */}
                    <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`} />
                    <Card.Body>
                      <Card.Title>{movie.title}</Card.Title>
                      <div>
                        {movie.genre_ids.map(genreId => {
                          const genre = genreMovie.find(g => g.id === genreId);
                          return genre ? <Badge className='addingMargin' pill bg="primary" key={genreId}> {genre.name}</Badge> : null;
                        })}
                      </div>
                      <Card.Text className='scrolling-wrapper-card'>
                        {movie.overview}
                      </Card.Text>
                      <Card.Text className='border-top'>
                        <h5><b> Ratings: {movie.vote_average}</b>  </h5> from {movie.vote_count} votes
                      </Card.Text>
                      <Card.Text className='border-top'>
                        <h5><b> Popularity: </b>  </h5>  {movie.popularity}
                      </Card.Text>
                      <Card.Text className='border-top'>
                        <h5><b> Release Date: </b>  </h5>  {movie.release_date}
                      </Card.Text>
                      <Button as={Link} to={"/videos/" + movie.id} variant="primary">See Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col sm={3}>
            <SideBar moviesOnDiscovering = {moviesOnDiscovering} genreMovie = {genreMovie} onFilter = {handleFilteredMovies}/>
          </Col>
        </Row>
      </Container>

      <Container>
        <div className="d-grid gap-2 m-3">
          <Button variant="primary" size="lg" onClick={onLoadMoreMovies} >
            Load More
          </Button>
        </div>
      </Container>




    </div>
  )
}
