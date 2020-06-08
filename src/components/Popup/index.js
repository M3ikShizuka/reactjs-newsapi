import React from "react";
import "./Popup.scss";
import titileImage from "../../assets/img/Pop epic team listen fuck you.gif";
import Button from "../Button";

class Popup extends React.Component {
    constructor(props) {
        super(props)
    }

    handleButtonAccept = () => {
        this.props.handleAccept();
    }

    componentDidMount() {
        document.body.style.overflow = 'hidden';
    }

    render() {
        return (
            <div styleName="popup-background">
                <div styleName="popup_wrap">
                    <div styleName="popup">
                        <h1>DISCLAIMER</h1>
                        <img styleName="popup-img" src={titileImage}/>
                        <div styleName="popup-info">
                            <h2>Nothing is true</h2>
                            <p>This site contains materials from various news sources with links to them. The views, thoughts, and opinions expressed in the text belong solely to the article author, and not necessarily to the author's employer, organization, committee or other group or individual. The owner of this site isn't responsible for any critical damage to your worldview, mental state or any other injuries resulting from your perception of the materials posted on this site. The owner of this site kindly gives you the opportunity to search for any articles you are interested in around the world, and also nobly leaves you the freedom of choice to familiarize yourself with news materials of various quality.</p>
                            <p>In order to continue using this site, you must be grateful and confirm that you accept all responsibility that is assigned to you.</p>
                            <div styleName="popup-button">
                                <Button 
                                    name="Yes, my Master!"
                                    handleSearchButton={this.handleButtonAccept}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;