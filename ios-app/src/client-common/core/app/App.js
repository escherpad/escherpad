import React from "react";
import PropTypes from 'prop-types';
import {Flex, FlexItem} from 'layout-components';

/* import "normalize.css";*/

import TeamSidebar from './team-sidebar';
import ChannelView from './channel-view';
import MainContainer from './main-container';

/* import "./app-layout.css";*/
const {any} = PropTypes;
export default class App extends React.Component {
    static propTypes = {
        store$: any,
        dispatch: any, // dispatch: func.isRequired,
        raViews: any, // list of views from module.
    };

    shouldComponentUpdate(newProps, newState) {
        // if only props.view changes, do NOT update the app
        return false
    }

    render() {
        const {raViews} = this.props;
        return <Flex row className="app-layout-container">
            <FlexItem fixed component={TeamSidebar} raViews={raViews}/>
            <FlexItem fixed component={ChannelView} raViews={raViews}/>
            <FlexItem fixed component={raViews.ContextView} raViews={raViews}/>
            <FlexItem fluid component={MainContainer} raViews={raViews}/>
        </Flex>
    }
}
