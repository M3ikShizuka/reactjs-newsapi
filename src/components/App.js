import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import Header from './Header.js';
// import Main from './Main.js';
import NewsHeadlines from './NewsHeadlines.js';
import NewsEverything from './NewsEverything.js';
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
        document.body.style.overflow = '';
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
                            <ScrollToTop/>
                            <NewsHeadlines/>
                        </Route>
                        <Route exact path={`/${pageEverything}`}>
                            <ScrollToTop/>
                            <NewsEverything/>
                        </Route>
                        <Route exact path={`/${pageNotFound}`}>
                            <ScrollToTop/>
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