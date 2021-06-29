import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
export default function Menu() {
  return (


<Navbar bg="light" expand="lg">
  <Container>
    <Navbar.Brand href="/">Canlı Oylama</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
      <Nav.Link href="/">Anasayfa</Nav.Link>
          {/* <Nav.Link href="/createquestion">Oylama Oluştur</Nav.Link> */}
          <Nav.Link href="https://github.com/enginyenice" target="_blank">GitHub</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


  )
}
