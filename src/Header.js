import React, {useState} from 'react'

import {
    Navbar,
    NavbarBrand,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    NavbarToggler
  
  } from 'reactstrap'

  import {Link} from 'react-router-dom'
  
  //Header
  const Header = () => {
    const [open, setOpen] = useState(false)
    const toggle = () => {
      setOpen(!open)
    }
    return (
      <Navbar color='light' light expand='nd'>
        <div className="container">
            <NavbarBrand tag={Link} to='/'>Minhas Series</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={open} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                <NavLink tag={Link} to='/series'>Séries</NavLink>
                </NavItem>
                <NavItem>
                <NavLink tag={Link} to='/generos'>Generos</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
        </div>  
        </Navbar>
    )
  }

export default  Header