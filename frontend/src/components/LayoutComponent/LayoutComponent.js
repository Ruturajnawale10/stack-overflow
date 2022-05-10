import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styled from 'styled-components';
import Footer from "../Footer/Footer";
const Main = styled.div`
    margin-left: 10vw;
`;

const Layout = (props) => {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <div style={{padding: "50px"}}></div>
            <Main>{props.children}</Main>
            <Footer/>
        </div>
    )
}

export default Layout;