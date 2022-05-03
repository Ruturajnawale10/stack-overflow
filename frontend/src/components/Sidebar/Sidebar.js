import React, {Component, useEffect} from 'react';
import {SideBarBlock,
        SideBarLink,
        SideBarSection,
        SidebarTitle,

} from './SideBarElements';

class Sidebar extends Component {
    render(){
        return (
            <SideBarBlock>
                <SideBarSection>
                <SideBarLink to="/home">Home</SideBarLink>
                </SideBarSection>
                {/* <SideBarLink to="/tags">Tags</SideBarLink> */}
                <SidebarTitle>Public</SidebarTitle>
                <SideBarSection>
                
                <SideBarLink to="/user">User</SideBarLink>
                <SideBarLink to="/tags">Tags</SideBarLink>
                </SideBarSection>
            </SideBarBlock>
        )
    }
}

export default Sidebar;
