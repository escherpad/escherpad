import React, {Component} from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";
import {GoX, GoSearch} from "react-icons/lib/go/index";

const Styled = styled('div')`
    color: #cfcfcf;
    input::-webkit-input-placeholder {  color: #cfcfcf;  }
    input::-moz-placeholder {  color: #cfcfcf; opacity: 1; }
    input:-ms-input-placeholder {  color: #cfcfcf;  }
    .search-icon {
        text-align: center;
        position: absolute !important;
        z-index: 1;
        left: calc(0.5vh + 0.08em); top: calc(0.5vh + 0.05em);
    }
    .clear-icon {
        text-align: center;
        position: absolute !important;
        z-index: 1;
        right: calc(0.5vh + 0.08em); top: calc(0.5vh + 0.05em);
    }
    input {
        color: #23aaff;
        &[value=""] {
            color: #cfcfcf;
        }
        width: 100%;
        box-sizing: border-box;
        transition: all 0.3s linear;
        border: 1px solid rgba(0, 0, 0, 0);
        &:hover {
            border: 1px solid #23aaff
        }
        &:focus {
            border: 1px solid #23aaff;
            outline: none;
        }
    }
`;
const value = "";
const placeholder = "type \"/\" to search...";
const height = 30;
const fontSize = "14";
const padding = "7";

class ListHeader extends Component {
    onClear() {
        this.props.dispatch({
            type: "SEARCH_CLEAR"
        });
        console.log('clear search bar')
    }

    render() {
        const {style, dispatch, ..._props} = this.props;
        const finalStyle = {
            ...style,
            height: height + "px",
            lineHeight: `${height - 2}px`,
            borderRadius: `${height / 2}px`,
            fontSize: `${fontSize}px`,
            padding: `0 ${padding}px`,
            paddingLeft: `${height - 4}px`,
            paddingRight: `${height - 4}px`
        };
        return (
            <div style={{margin: "10px", position: "relative"}}>
                <Styled>
                    <GoSearch className="search-icon"/>
                    <input style={finalStyle} value={value} placeholder={placeholder} {..._props}/>
                    <GoX className="clear-icon" onClick={this.onClear.bind(this)}/>
                </Styled>
            </div>

        );
    }
}

export default ListHeader;
