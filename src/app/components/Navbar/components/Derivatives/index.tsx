import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { NavDropdown } from 'react-bootstrap';
import {
  StyledNavDropdown,
  DropdownItemGroup,
  DropdownItemTitle,
} from './style';
import { data } from './data';
const DerivativesNav = () => {
  const [show, setShow] = useState(false);
  const showDropdown = e => {
    setShow(!show);
  };
  const hideDropdown = e => {
    setShow(false);
  };
  return (
    <StyledNavDropdown
      title="Derivatives"
      id="collasible-nav-dropdown"
      show={show}
      onMouseEnter={showDropdown}
      onMouseLeave={hideDropdown}
    >
      <DropdownItemGroup>
        {data.map((item, index) => {
          return (
            <NavDropdown.Item href="#action/3.1" key={index}>
              <item.icon
                style={{
                  fontSize: '24px',
                  color: '#f0b90b',
                  marginRight: '16px',
                }}
              />
              <DropdownItemTitle>
                <span>{item.name}</span>
                <br></br>
                <div className="title_description">{item.description}</div>
              </DropdownItemTitle>
              <FaArrowRight className="arrow-right" />
              <br />
            </NavDropdown.Item>
          );
        })}
      </DropdownItemGroup>
    </StyledNavDropdown>
  );
};
export default DerivativesNav;