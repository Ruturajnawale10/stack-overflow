import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';

export const SideBarBlock = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position:fixed;
    // height: calc(100vh-100px);
    width: 10vw;
    background: white;
    padding: 20px;
    border-right: 1px solid grey;
    height: 100%;
    top: 60px;
    // z-index: 10;
`

export const SideBarLink = styled(Link)`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 15px;
  width: 100%;
  padding: 0 1rem;
//   padding: 0 1rem;
//   height: 100%;
  cursor: pointer;
  &.active {
    color: black;
    font-weight: 900;
    background-color: #ebebeb;
    padding: 0 1rem;
    width: 100%;
  }
`;

export const SideBarSection = styled.div`
//   padding: 1rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
`;

export const SidebarTitle = styled.div`
  font-weight: 100;
  
`;