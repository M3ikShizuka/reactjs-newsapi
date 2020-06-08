import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Header from './Header.js';
// import Main from './Main.js';
import NewsHeadlines from './NewsHeadlines.js';
import NotFound from './NotFound.js';
import Popup from "./Popup";
import './main.scss';

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            disclaimerAccepted: localStorage.getItem("disclaimerAccepted") === "true" ? true : false
        }
    }

    handleDisclaimerAccept = () => {
        localStorage.setItem("disclaimerAccepted", "true");
        this.setState({disclaimerAccepted: true});
    }

    render() {
        const pageHeadlines = "headlines",
        pageEverything = "everything",
        pageNotFound = "404",
        pages = [
            pageHeadlines,
            pageEverything
        ];

        return (
            <Router>
                <Header pages={pages}/>
                <main>
                    <Switch>
                        <Route exact path={`/${pageHeadlines}`}>
                            <NewsHeadlines/>
                        </Route>
                        <Route exact path={`/${pageEverything}`}>
                            <NewsHeadlines/>
                        </Route>
                        <Route exact path={`/${pageNotFound}`}>
                            <NotFound/>
                        </Route>
                        <Route exact path={`/`}>
                            <Redirect to={`/${pageHeadlines}`}/>
                        </Route>
                        <Route path="*">
                            <Redirect to={`/${pageNotFound}`}/>
                        </Route>
                    </Switch>
                </main>
            {
            /*
                <Footer/>
            */
            }
            {
                this.state.disclaimerAccepted ? null : <Popup handleAccept={this.handleDisclaimerAccept} />
            }
            </Router>
        );
    }
}

export default App