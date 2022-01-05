import styled from 'styled-components';
import { Nav, Navbar } from 'react-bootstrap';

export const StyledNavBar = styled(Navbar)`
  background-color: ${({ theme }) => theme.body} !important;
  padding: 0px !important;
`;
export const StyledNavLink = styled(Nav.Link)`
  margin: 0 4px;
`;
export const AuthGroup = styled.div`
  margin: 0 16px;
  display: flex;
`;
export const StyledNavBrand = styled(Navbar.Brand)`
  display: flex;
  margin-right: 4px;
  width: 120px;
  height: 24px;
  padding: 0;
  svg {
    color: ${({ theme }) => theme.secondary};
  }
`;
export const Tag = styled.span`
  box-sizing: border-box;
  display: inline-block;
  margin: 0px 0px 0px 8px;
  min-width: 0px;
  /* display: flex; */
  position: relative;
  border-radius: 4px;
  padding-left: 4px;
  padding-right: 4px;
  font-size: 12px;
  line-height: 16px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.background};
  &::before {
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    left: -3px;
    top: 2px;
    border-width: 6px 6px 6px 0px;
    border-left-style: initial;
    border-left-color: initial;
    border-top-style: solid;
    border-top-color: transparent;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    border-right-style: solid;
    border-right-color: ${({ theme }) => theme.secondary};
  }
`;
export const RegisterButton = styled(Nav.Link)`
  margin: 0px;
  appearance: none;
  user-select: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  box-sizing: border-box;
  font-family: inherit;
  text-align: center;
  text-decoration: none;
  outline: none;
  padding: 6px 12px !important;
  min-width: 52px;
  font-size: 14px;
  line-height: 20px;
  word-break: keep-all;
  color: ${({ theme }) => theme.background} !important;
  border-radius: 4px;
  min-height: 24px;
  border: none;
  background-image: linear-gradient(
    rgb(248, 209, 47) 0%,
    ${({ theme }) => theme.secondary} 100%
  );
  font-weight: 400;
  margin-left: 12px;
  &:hover {
    box-shadow: none;
    background-image: linear-gradient(
      rgb(255, 226, 81) 0%,
      rgb(237, 196, 35) 100%
    );
  }
`;
export const StyledNav = styled(Nav)`
  flex-direction: row;
  align-items: center;
  .border {
    box-sizing: border-box;
    margin: 0px 8px;
    min-width: 0px;
    width: 1px;
    height: 13px;
    background-color: ${({ theme }) => theme.darkGrayColor};
  }
`;
export const NavbarToggle = styled(Navbar.Toggle)`
  font-size: 12px;
  border: none;
`;
export const NavbarOffcanvas = styled(Navbar.Offcanvas)`
  background-color: ${({ theme }) => theme.background};
`;
