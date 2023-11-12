import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { Col, Row, Button } from 'react-bootstrap';
import './SideBar.css'
import { useState } from 'react'

const countGenreOccurrences = (movies, genres) => {
  const genreCounts = new Map();

  movies.forEach(movie => {
    movie.genre_ids.forEach(genreId => {
      const genre = genres.find(g => g.id === genreId);
      if (genre) {
        genreCounts.set(genre.name, (genreCounts.get(genre.name) || 0) + 1);
      }
    });
  });

  return genreCounts;
};


const SideBar = ({ moviesOnDiscovering: movies, genreMovie: genres, onFilter }) => {
  const [isFiltered, setIsFiltered] = useState(false);

  const filterGenre = (genreId) => {
    const filtered = movies.filter(movie => movie.genre_ids.includes(genreId));
    onFilter(filtered);
    setIsFiltered(true);
  };
  const genreCounts = countGenreOccurrences(movies, genres);

  const genreItems = Array.from(genreCounts).map(([genreName, count]) => {
    const genreId = genres.find(g => g.name === genreName).id;
    return (
      <Row>
        <Col>
          <CDBSidebarMenuItem>
            <Button variant="secondary" size="lg" onClick={() => { filterGenre(genreId) }}>
              {`${genreName}: ${count}`}
            </Button>
          </CDBSidebarMenuItem>
        </Col>
      </Row>

    )
  });


  return (
    <CDBSidebar textColor="#333" backgroundColor="#fff" className="styleSideBar">
      <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
        Contrast Light Mode
      </CDBSidebarHeader>
      <CDBSidebarContent>
        <CDBSidebarMenu>
          <CDBSidebarMenuItem icon="th-large">Dashboard</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="sticky-note">Components</CDBSidebarMenuItem>
          <CDBSidebarMenuItem icon="chart-line" iconType="solid">
            Metrics
          </CDBSidebarMenuItem>
          <CDBSidebarMenuItem>
            {!isFiltered ?
              <h1>Total: {movies.length}</h1> :
              <Button variant="primary" onClick={() => { onFilter([], true); setIsFiltered(false); }}>Show All Movies</Button>
            }
          </CDBSidebarMenuItem>
          {genreItems}
        </CDBSidebarMenu>
      </CDBSidebarContent>
      <CDBSidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{ padding: '20px 5px' }}
        >
          Sidebar Footer
        </div>
      </CDBSidebarFooter>
    </CDBSidebar>

  );
};

export default SideBar;