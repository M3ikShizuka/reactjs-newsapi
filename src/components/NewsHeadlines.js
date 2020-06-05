import React from 'react';
import { SHA1 } from '../common/sha1.js';
import { getHeadlines } from './NewsAPI.js';
import FilterPanel from './FilterPanel.js';
import ArticleBlockItem from './ArticleBlockItem.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import countries from '../static/countries.json';
import ApngComponent from 'react-apng';
import './news.scss';
import imageLoading from '../static/img/rem-loading.png';
import imageNothing from '../static/img/shinjionchair.png';
import imageNoMore from '../static/img/kyouko-its-fucking-nothing.png';

class NewsHeadlines extends React.Component {
    constructor(props) {
        super(props)

        let optionsCountry = [];
        Object.entries(countries).forEach(([key, text]) => {
            optionsCountry.push({ key: key, value: key, text: text});
        });

        let defaultCountryValue = localStorage.getItem("filterCountry");
        if (!defaultCountryValue) {
            defaultCountryValue = "US";
        }

        let indexOfDefaultCountry = optionsCountry.findIndex((element, index) => {
            if (element.value === defaultCountryValue) {
                return index;
            }
        });

        this.filterConfig = {
            optionsCountry,
            indexOfDefaultCountry,
        }

        this.state = {
            filterCountry: optionsCountry[indexOfDefaultCountry].value,
            articles: []
        }

        this.currentPage = 1;
        this.canFetchMoreData = true;
        this.endMessage = null;

        // Bind functions or use arrow functions.
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleFilterCountryChange = this.handleFilterCountryChange.bind(this);
        this.fetchMoreData = this.fetchMoreData.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    responseCheck = (result) => {
        if (
            result &&
            result.status === "error"
            ) {
            alert(`[ERROR] getHeadlines(): ${result.message}`);
            return false;
        }

        this.endMessage = result.totalResults > 0 ? this.endMessageNoMoreItems() : this.endMessageNothingFound();

        if (result.articles.length === 0) {
            this.canFetchMoreData = false;
        }

        return true;
    }

    getData(page = 1, pageSize = 10) {
        getHeadlines(
            (request, result) => {
                if (!this.responseCheck(result))
                    return;

                let articles = result.articles.map( (article) => {
                    article.id = SHA1(article.author + article.title + article.publishedAt);
                })
                this.setState({articles: result.articles})
            },
            (request, error) => {
                alert("getHeadlines(): Request error!")
            },
            this.state.filterCountry
        )
    }

    handleSearchButton() {
        // Reset current page when change filters.
        this.currentPage = 1;
        this.canFetchMoreData = true;
        this.getData();
    }

    handleFilterCountryChange(event, { value }) {
        this.setState({filterCountry: value})
        localStorage.setItem("filterCountry", value);
    }
    
    fetchMoreData() {
        this.currentPage++;

        getHeadlines(
            (request, result) => {
                if (!this.responseCheck(result))
                    return;

                let articles = result.articles.map( (article) => {
                    article.id = SHA1(article.author + article.title + article.publishedAt);
                })

                // Append new articles.
                this.setState({articles: this.state.articles.concat(result.articles)});
            },
            (request, error) => {
                alert("getHeadlines(): Request error!")
            },
            this.state.filterCountry,
            this.currentPage
        )
    }

    refresh() {
        this.handleSearchButton();
    }

    loadMessage = () => {
        return (
            <div className="loading-block">
                <div className="loading-info">
                    <h4>Loading.</h4>
                    <p>ロード中。。。</p>
                </div>
                <img className="loading-img" src={imageLoading}/>
            </div>
        );
    }

    endMessageNothingFound = () => {
        return (
            <div className="loading-block">
                <div className="loading-info">
                    <h4>Nothing here.</h4>
                    <p>ここは終わり。</p>
                </div>
                <img className="loading-img" src={imageNothing}/>
            </div>
        );
    }

    endMessageNoMoreItems = () => {
        return (
            <div className="loading-block">
                <div className="loading-info">
                    <h4>That's All Folks!</h4>
                    <p>{"(ﾉ>_<)ﾉ"}</p>
                </div>
                <img className="loading-img" src={imageNoMore}/>
            </div>
        );
    }

    render() {
        return (
            <div className="news">
                <FilterPanel 
                    filterConfig={this.filterConfig}
                    handleFilterCountryChange={this.handleFilterCountryChange}
                    handleSearchButton={this.handleSearchButton}
                />
                <div className="article-list">
                    <InfiniteScroll
                        dataLength={this.state.articles.length} //This is important field to render the next data
                        next={this.fetchMoreData}
                        hasMore={this.canFetchMoreData}
                        loader={this.loadMessage()}
                        endMessage={this.endMessage}
                        
                        // // below props only if you need pull down functionality
                        // refreshFunction={this.refresh}
                        // pullDownToRefreshThreshold="10px"
                        // pullDownToRefresh
                        // pullDownToRefreshContent={
                        //     <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
                        // }
                        // releaseToRefreshContent={
                        //     <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
                        // }
                    >
                        {
                            this.state.articles.map( article => {
                                    return (
                                        <ArticleBlockItem key={article.id} article={article}/>
                                    );
                                }
                            )
                        }
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

export default NewsHeadlines;

/*
{
"status": "ok",
"totalResults": 38,
"articles": [
	{
"source": {
"id": "the-washington-post",
"name": "The Washington Post"
},
"author": "Dana Hedgpeth",
"title": "Live updates: D.C. protesters push back against Trump’s show of federal force; fifth day of protests mostly peaceful - The Washington Post",
"description": "See the latest on protests in Washington on the police-involved killing of George Floyd in Minneapolis.",
"url": "https://www.washingtonpost.com/dc-md-va/2020/06/03/dc-protest-george-floyd-white-house/",
"urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://d1i4t8bqe7zgj6.cloudfront.net/06-03-2020/t_9f1198c306164ff2a1737275866fe20f_name_Clip0057_MXF_16_05_09_25_Still001.jpg&w=1440",
"publishedAt": "2020-06-03T10:44:57Z",
"content": "When a protester lit a flag on fire at the White House long after curfew took effect, another protester beat out the flames with her hands. Ebony Chantelle Sherman became worried when other proteste… [+2488 chars]"
},
	{
"source": {
"id": null,
"name": "Teslarati"
},
"author": "https://www.facebook.com/13ericralph31",
"title": "SpaceX’s first astronaut-proven rocket returns to dry land - Teslarati",
"description": "Three days after becoming the first privately-developed rocket in history to launch humans into orbit, SpaceX’s first astronaut-proven Falcon 9 booster has safely returned to dry land. Although the sheer importance of SpaceX’s flawless astronaut launch debut …",
"url": "https://www.teslarati.com/spacex-first-astronaut-proven-rocket-recovery/",
"urlToImage": "https://www.teslarati.com/wp-content/uploads/2020/06/Crew-Dragon-Demo-2-Falcon-9-B1058-OCISLY-return-060220-Richard-Angle-15-c-1024x567.jpg",
"publishedAt": "2020-06-03T08:56:29Z",
"content": "Three days after becoming the first privately-developed rocket in history to launch humans into orbit, SpaceX’s first astronaut-proven Falcon 9 booster has safely returned to dry land. Although the … [+3822 chars]"
},
	{
"source": {
"id": "cnn",
"name": "CNN"
},
"author": "Helen Regan, Esha Mitra and Rishabh Madhavendra Pratap, CNN",
"title": "Cyclone Nisarga: Coronavirus patients evacuated ahead of worst storm to hit Mumbai in 70 years - CNN",
"description": "Coronavirus patients were among more than 100,000 people evacuated from low-lying coastal areas in India's western states as a cyclone advanced toward Mumbai in Maharashtra on Wednesday.",
"url": "https://www.cnn.com/2020/06/03/asia/cyclone-nisarga-mumbai-india-intl-hnk/index.html",
"urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/200603104554-cyclone-nisarga-field-hospital-super-tease.jpg",
"publishedAt": "2020-06-03T08:04:12Z",
"content": null
},
	{
"source": {
"id": "cnn",
"name": "CNN"
},
"author": "Madeline Holcombe, CNN",
"title": "Demonstrators defied curfews but there were fewer clashes and less chaos on a night of mostly peaceful protests - CNN",
"description": "Peaceful demonstrators defied curfews and remained on the streets of American cities for another night of protests over the death of an unarmed black man in police custody.",
"url": "https://www.cnn.com/2020/06/03/us/us-protests-wednesday-george-floyd/index.html",
"urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/200603012701-33-floyd-protests-0602-new-york-restricted-super-tease.jpg",
"publishedAt": "2020-06-03T07:44:46Z",
"content": "(CNN)Peaceful demonstrators defied curfews and remained on the streets of American cities for another night of protests over the death of an unarmed black man in police custody. The eighth night of … [+6338 chars]"
}
],
}
*/