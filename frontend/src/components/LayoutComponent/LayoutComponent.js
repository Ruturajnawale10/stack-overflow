import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styled from 'styled-components';

const Main = styled.div`
    margin-left: 10vw;
`;

const Layout = (props) => {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <Main>{props.children}</Main>
        </div>
    )
}

export default Layout;