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
                <SideBarLink to="/allQuestions">Home</SideBarLink>
                </SideBarSection>
                {/* <SideBarLink to="/tags">Tags</SideBarLink> */}
                <SidebarTitle>Public</SidebarTitle>
                <SideBarSection>
                
                <SideBarLink to="/user">User</SideBarLink>
                <SideBarLink to="/tags">Tags</SideBarLink>
                </SideBarSection>

                <SidebarTitle>Admin</SidebarTitle>
                <SideBarSection>
                <SideBarLink to="/admin/analytics">Analytics</SideBarLink>
                <SideBarLink to="/admin/tags/add">Add a tag</SideBarLink>
                <SideBarLink to="/admin/questions/review">Review Questions</SideBarLink>
                </SideBarSection>

            </SideBarBlock>
        )
    }
}

export default Sidebar;
