/** Created by ge on 4/18/16. */
import React from "react";
import SmallBlueBadge from "../badge/SmallBlueBadge";
import {Flex, FlexItem} from "layout-components";
import Placeholder from "../Placeholder";
import moment from "moment";
import {BreadCrumBadges} from "./BreadCrumBadges";
import {styled} from "styled-components";

const {string, any, number, func} = React.PropTypes;

const topPadding = "15px";
const sidePadding = "6px";
const unitLength = "40px";
const Styled = styled('div')`
    text-align: right;
    // standard
    position: relative;
    padding: ${topPadding} ${sidePadding};
    box-sizing: border-box;
    cursor: pointer;
    height: 90px;
    background-color: white;
    border-bottom: 1px solid #fafafa; //#e6e6e6
    margin-bottom: 5px;
    color: #303030;
    &:hover, &:active {
        color: white;
        background-color: #23aaff;
        .control-group {
            z-index: 1;
        }
    }
    &:not(:hover):not(:active) .placeholder {
        color: #e6e6e6;
    }
    .control-group {
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        button {
            padding: 0;
            cursor: pointer;
            width: ${unitLength};
            height: ${unitLength};
            line-height: ${unitLength};
            font-size: 24px;
            // styles
            color: white;
            background-color: rgba(black, 0);
            border: none;
        }
        i.material-icons {
            line-height: ${unitLength};
        }
    }
    .modified-at {
        line-height: 18px;
        color: #aaa;
        font-size: 13px;
    }
    &:hover, &:active {
        .modified-at {
            color: rgba(white, 0);
        }
    }
}
`;

class NoteItem extends React.Component {
    static propTypes = {
        searchQuery: string,
        listParentFolder: string,
        id: string,
        title: string,
        source: any,
        presence: any,
        createdAt: number,
        modifiedAt: number,
        dispatch: func.isRequired
    };

    static defaultProps = {
        parentFolder: "",
        listParentFolder: ""
    };

    render() {
        const {
            searchQuery,
            listParentFolder,
            id,
            title,
            source,
            presence,
            parentFolder,
            accountKey,
            createdAt,
            modifiedAt,
            dispatch,
        } = this.props;

        let timeStamp;
        if (modifiedAt) timeStamp = moment(modifiedAt).fromNow();
        else if (createdAt) timeStamp = moment(createdAt).fromNow();
        else timeStamp = '';

        let searchQueryRegex = new RegExp(searchQuery, 'ig');
        let highlightedTitle = (searchQuery && title && title.match(searchQueryRegex)) ?
            title.replace(searchQueryRegex, "<mark>$&</mark>") : title;

        // notice: add console.log here.
        let displayPath =
            (parentFolder && parentFolder.toLowerCase().match("^" + listParentFolder.toLowerCase())) ?
                '.' + (parentFolder.slice(listParentFolder.length) || '/')
                : parentFolder;

        return <Styled className="post-list-item"
                       onTouchStart={this.selectPost.bind(this)}
                       onMouseDown={this.selectPost.bind(this)}>
            <div className="control-group">
                <button onClick={this.deletePost}>
                    <i className="material-icons delete-post">close</i>
                </button>
            </div>
            <Placeholder className="post-title"
                         style={{lineHeight: "22px", fontSize: "18px", fontWeight: "700"}}
                         isEmpty={(!title || title.replace(/(&nbsp;|<br>|<br\/>|<br><\/br>)/g, " ").trim() === "")}
                         placeholder={<em className="placeholder">Untitled</em>}>
                <div dangerouslySetInnerHTML={{__html: highlightedTitle}}/>
            </Placeholder>
            <Flex row style={{justifyContent: "right"}} className="modified-at">
                <FlexItem fluid style={{overflowX: "hidden"}}>
                    {accountKey ?
                        <BreadCrumBadges accountKey={accountKey}
                                         currentFolder={listParentFolder}
                                         displayPath={displayPath}
                                         dispatch={dispatch}/> :
                        <SmallBlueBadge style={{backgroundColor: "#aaa"}}>LocalStorage</SmallBlueBadge>
                    }
                </FlexItem>
                <FlexItem fixed width="5px"/>
                <FlexItem fixed>{timeStamp}</FlexItem>
            </Flex>
        </Styled>
    }

    selectPost() {
        this.props.dispatch({
            type: "SELECT_POST",
            postId: this.props.id
        })
    }

    deletePost() {
        // todo: show a popup to confirm delete
        this.props.dispatch({
            type: "DELETE_POST",
            id: this.props.id
        })
    }

}

export default NoteItem
