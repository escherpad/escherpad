import React from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";
import NoteItem from "./NoteItem";

const Styled = styled(FlexItem)``;
export default function ListSections(props) {
    const listItems = [
        {title: "some note", path: "/escherpad files/notes-1", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-2", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-3", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-4", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-5", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-6", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-7", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-8", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-9", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-10", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-11", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-12", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
        {title: "some note", path: "/escherpad files/notes-13", dateModified: 123456, images: ['https://www.dropbox.com/s/h9f6mgvduo71dn9/Screenshot%202017-12-10%2013.30.37.png?dl=0']},
    ];
    return (
        <Styled component={Flex} fill column {...props}>
            {listItems.map(({dateModified, ...note}) => <FlexItem component={NoteItem} key={note.path} date={dateModified} {...note}/>)}
        </Styled>
    );
}
