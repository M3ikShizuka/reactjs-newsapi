import React from 'react';
import { SHA1 } from '../common/sha1.js';
import { getEverything } from './NewsAPI.js';
import FilterPanelEverything from './FilterPanelEverything.js';
import ArticleBlockItem from './ArticleBlockItem.js';
import InfiniteScroll from 'react-infinite-scroll-component';
import MessagesBlocks from "./InfoMessagesBlocks";
import './ArticleBlockItem.scss';
import './NewsEverything.scss';

class NewsEverything extends React.Component {
    constructor(props) {
        super(props)

        this.storageItemfilter = "filterTextSearch";
        let defaultFilterTextSearchValue = localStorage.getItem(this.storageItemfilter);
        
        if (defaultFilterTextSearchValue == "undefined") {
            localStorage.removeItem(this.storageItemfilter);
            defaultFilterTextSearchValue = null;
        }
    
        if (!defaultFilterTextSearchValue) {
            defaultFilterTextSearchValue = "";
        }

        this.state = {
            filterTextInputSearch: defaultFilterTextSearchValue,
            articles: []
        }

        this.currentPage = 1;
        this.canFetchMoreData = true;
        this.endMessage = null;

        // Bind functions or use arrow functions.
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleInputTextSearchOnChange = this.handleInputTextSearchOnChange.bind(this);
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
                this.canFetchMoreData = false;
                this.endMessage = MessagesBlocks.messageEndNothingFound();

                let message = null;
                switch(result.code) {
                    case "parametersMissing": {
                        return true;
                        break;
                    }
                    default: {
                        message = `[ERROR] getEverything(): ${result.message}`;
                        break;
                    }
                }
           
                alert(message);
            return false;
        }

        this.endMessage = result.totalResults > 0 ? MessagesBlocks.messageEndNoMoreItems() : MessagesBlocks.messageEndNothingFound();

        if (result.articles.length === 0) {
            this.canFetchMoreData = false;
        }

        return true;
    }

    handleFetchedArticles = (result) => {
        // Handle fetched articles.
        let articles = [];

        if (result.articles != null) {
            articles = result.articles.slice();
            articles.map((article, key) => {
                article.id = SHA1(article.author + article.title + article.publishedAt);
            })
        }

        return articles;
    }

    getData(page = 1, pageSize = 10) {
        getEverything(
            (request, result) => {
                if (!this.responseCheck(result))
                    return;

                let articles = this.handleFetchedArticles(result);

                // Add new articles.
                this.setState({articles: articles});
            },
            (request, error) => {
                alert("getEverything(): Request error!")
            },
            this.state.filterTextInputSearch
        )
    }

    handleSearchButton() {
        // Reset current page when change filters.
        this.currentPage = 1;
        this.canFetchMoreData = true;
        this.getData();
    }

    handleInputTextSearchOnChange(event) {
        const value = event.target.value;
        this.setState({filterTextInputSearch: value})
        localStorage.setItem(this.storageItemfilter, value);
    }
    
    fetchMoreData() {
        this.currentPage++;

        getEverything(
            (request, result) => {
                if (!this.responseCheck(result))
                    return;

                let articles = this.handleFetchedArticles(result);

                // Concat old data with new data.
                let articlesNew = this.state.articles.concat(articles)

                // Append new articles.
                this.setState({
                    articles: articlesNew
                });
            },
            (request, error) => {
                alert("getEverything(): Request error!")
            },
            this.state.filterTextInputSearch,
            this.currentPage
        )
    }

    refresh() {
        this.handleSearchButton();
    }

    render() {
        return (
            <main>
                <div styleName="wrapper_news_everything">
                    <FilterPanelEverything 
                        defaultValue={this.state.filterTextInputSearch}
                        handleInputTextSearchOnChange={this.handleInputTextSearchOnChange}
                        handleSearchButton={this.handleSearchButton}
                    />
                    <div styleName="article-list">
                        <InfiniteScroll
                            dataLength={this.state.articles.length} //This is important field to render the next data
                            next={this.fetchMoreData}
                            hasMore={this.canFetchMoreData}
                            loader={MessagesBlocks.messageLoading()}
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
            </main>
        );
    }
}

export default NewsEverything;

/*
{
"status": "ok",
"totalResults": 3784452,
"articles": [
  {
"source": {
"id": null,
"name": "Lifehacker.com"
},
"author": "Nicole Dieker on Two Cents, shared by Nicole Dieker to Lifehacker",
"title": "How to Return a Deceased Relative's Stimulus Check",
"description": "If you received a stimulus check made out to a deceased relative, or a direct deposit into one of their accounts that you control or even if you and a deceased spouse received a joint stimulus payment, the IRS is requesting that you return the money (or half …",
"url": "https://twocents.lifehacker.com/how-to-return-a-deceased-relatives-stimulus-check-1843316653",
"urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/z8hy67japalfigr7nuls.jpg",
"publishedAt": "2020-05-07T17:00:00Z",
"content": "If you received a stimulus check made out to a deceased relative, or a direct deposit into one of their accounts that you control or even if you and a deceased spouse received a joint stimulus paymen… [+2405 chars]"
},
  {
"source": {
"id": null,
"name": "Lifehacker.com"
},
"author": "Rachel Fairbank on Skillet, shared by Rachel Fairbank to Lifehacker",
"title": "If You're Out of Baking Powder or Baking Soda, Try These Substitutes",
"description": "What do you do if a recipe calls for baking soda but you only have baking powder, or if you have baking soda but not baking powder? As it turns out, there are options. You can make that quick bread, biscuits or cookies after all. You could even make all of th…",
"url": "https://skillet.lifehacker.com/if-youre-out-of-baking-powder-or-baking-soda-try-these-1843314311",
"urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/xbkrjgg0wcys9rlxdwal.jpg",
"publishedAt": "2020-05-07T18:30:00Z",
"content": "What do you do if a recipe calls for baking soda but you only have baking powder, or if you have baking soda but not baking powder? As it turns out, there are options. You can make that quick bread, … [+1968 chars]"
},
  {
"source": {
"id": null,
"name": "Lifehacker.com"
},
"author": "Emily Price",
"title": "Everything You Need to Know About HBO Max",
"description": "HBO’s newest streaming service, HBO Max, officially launches in just a few weeks. When it arrives on May 27th it will join HBO Go and HBO Now in HBO’s lineup. Yes, that means you have three different streaming options to access HBO content.Read more...",
"url": "https://lifehacker.com/everything-you-need-to-know-about-hbo-max-1843322402",
"urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/e6lcsaeudow3p1achm4a.jpg",
"publishedAt": "2020-05-08T14:00:00Z",
"content": "HBOs newest streaming service, HBO Max, officially launches in just a few weeks. When it arrives on May 27th it will join HBO Go and HBO Now in HBOs lineup. Yes, that means you have three different s… [+3677 chars]"
},
  {
"source": {
"id": null,
"name": "Lifehacker.com"
},
"author": "Emily Price",
"title": "How to Create Multi-Image Panoramas for Instagram",
"description": "If you’ve ever tried to upload a panorama picture to Instagram—or if we’re being honest, any interesting horizontal picture—then you’ve likely run into issues.Read more...",
"url": "https://lifehacker.com/how-to-create-multi-image-panoramas-for-instagram-1843328162",
"urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/oju7onmwpjwjknv0ogk3.jpg",
"publishedAt": "2020-05-08T15:30:00Z",
"content": "If youve ever tried to upload a panorama picture to Instagramor if were being honest, any interesting horizontal picturethen youve likely run into issues. Yes, you can include the whole photo in a s… [+2649 chars]"
},
],
}
*/