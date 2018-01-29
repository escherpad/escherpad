import React, {Component} from "react";
import {Flex, FlexItem, FlexSpacer} from 'layout-components';
import styled from "styled-components";
import {GoX, GoSearch} from "react-icons/lib/go/index";
import {connect} from "../../lib/luna-react";
import * as googleScholar from "../../store/google-scholar";

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
    onCompositionEnd(e) {
        console.log(e);
        const text = e.target.value;
        this.props.onInput(text);
    }

    onClear() {
        this.props.onClear();
    }

    onSearch(e) {
        const text = e.target.value;
        this.props.onSearch(text);
    }

    render() {
        const {style, dispatch, onInput, ..._props} = this.props;
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
                    <input style={finalStyle} value={value} placeholder={placeholder}
                           onInput={this.onCompositionEnd.bind(this)} {..._props}/>
                    <GoX className="clear-icon" onClick={this.onClear.bind(this)}/>
                </Styled>
            </div>

        );
    }
}

export default connect(
    ({search}) => search,
    {onInput: googleScholar.creators.input}
)(ListHeader);
