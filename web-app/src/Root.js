import React from "react";
import {Route} from "react-router-dom";
import PageLayout from "./pages/layout/page-layout";

export default function Root() {
    return (
        <PageLayout>
            <Route exact path="/" component={() => <div>root page</div>}/>
        </PageLayout>
    );
}
