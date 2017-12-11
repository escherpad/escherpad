import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";

const Styled = styled(Flex)``;
export default function ListSections(props) {
    const listItems = [
        {title: "some note", path: "/escherpad files/notes-1", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-2", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-3", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-4", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-5", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
    ];
    return (
        <Styled fill row {...props}>
            {listItems.map(({dateModified, ...note})=><NoteItem date={dateModified} {...note}/>)}
        </Styled>
    );
}
