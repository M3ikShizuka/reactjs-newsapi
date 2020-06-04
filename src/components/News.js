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

class News extends React.Component {
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

export default News;

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
},
	{
"source": {
"id": "the-next-web",
"name": "The Next Web"
},
"author": "Ivan Mehta",
"title": "Zoom won't encrypt free calls because it wants to comply with law enforcement - The Next Web",
"description": "Zoom CEO Eric Yuan today said that the video conferencing app's upcoming end-to-end encryption feature will be available to only paid users. After announcing the company's financial ...",
"url": "https://thenextweb.com/?p=1295982",
"urlToImage": "https://img-cdn.tnwcdn.com/image/tnw?filter_last=1&fit=1280%2C640&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2019%2F07%2Fzoom-app-hed.png&signature=0d16d786976af25ef97d9dac48681f6c",
"publishedAt": "2020-06-03T07:39:57Z",
"content": "If youre a free Zoom user, and waiting for the company to roll out end-to-end encryption for better protection of your calls, youre out of luck. Free calls wont be encrypted, and law enforcement will… [+2536 chars]"
},
	{
"source": {
"id": null,
"name": "NPR"
},
"author": "Scott Neuman",
"title": "Canada's Trudeau At A Loss For Words On Trump's Handling Of Unrest In U.S. - NPR",
"description": "When a reporter asked the Canadian prime minister what he thought of President Trump's actions to quell protests across the U.S., Trudeau fell silent for 21 seconds before answering.",
"url": "https://www.npr.org/2020/06/03/868451036/canadas-trudeau-at-a-loss-for-words-on-trump-s-handling-of-unrest-in-u-s",
"urlToImage": "https://media.npr.org/assets/img/2020/06/03/gettyimages-1216501106_wide-2493128a2d2886df47af954668e12e9756646f7d.jpg?s=1400",
"publishedAt": "2020-06-03T06:20:43Z",
"content": "Protesters at a Black Lives Matter rally in Toronto on Saturday. NurPhoto/NurPhoto via Getty Images It's not often that Justin Trudeau is caught speechless. But when the Canadian prime minister wa… [+2656 chars]"
},
	{
"source": {
"id": "fox-news",
"name": "Fox News"
},
"author": "Victor Garcia",
"title": "Police union boss says 'NYPD is losing the city of New York,' begs Cuomo, Trump to send reinforcements - Fox News",
"description": "The head of a prominent New York City police union told "The Ingraham Angle" Tuesday that President Trump should consider sending federal personnel to prevent more rioting and looting in America's biggest city.",
"url": "https://www.foxnews.com/media/ed-mullins-nypd-losing-new-york-city",
"urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2020/06/image-4.jpg",
"publishedAt": "2020-06-03T05:06:22Z",
"content": "The head of a prominent New York City police union told "The Ingraham Angle" Tuesday that President Trump should consider sending federal personnel to prevent more rioting and looting in America's bi… [+2164 chars]"
},
	{
"source": {
"id": null,
"name": "Entertainment Tonight"
},
"author": "Zach Seemayer‍",
"title": "‘Tiger King’ Star Jeff Lowe Says He Will Leave Zoo a 'Complete Hell' for Carole Baskin (Exclusive) - Entertainment Tonight",
"description": "Lowe spoke with ET's Lauren Zima about Baskin's recent legal victory giving her control over GW Exotic Zoo.",
"url": "https://www.etonline.com/tiger-king-star-jeff-lowe-says-he-will-leave-zoo-a-complete-hell-for-carole-baskin-exclusive-147563",
"urlToImage": "https://www.etonline.com/sites/default/files/styles/max_1280x720/public/images/2020-06/jeff_lowe_gettyimages-632150018_1280.jpg?h=c673cd1c&itok=syORLqCr",
"publishedAt": "2020-06-03T04:59:45Z",
"content": "Carole Baskin may have been awarded Tiger King Park, but current owner Jeff Lowe says it's going to be a real mess when he gives it over. Lowe spoke with ET's Lauren Zima on Tuesday about the recent … [+3171 chars]"
},
	{
"source": {
"id": null,
"name": "Daily Mail"
},
"author": "By Dailymail.com Reporter",
"title": "Keke Palmer convinces members of the National Guard to take a knee - Daily Mail",
"description": "The Strahan, Sara and Keke TV host, 26, made her impassioned plea to the National Guard officers during a peaceful protest in Los Angeles.",
"url": "https://www.dailymail.co.uk/tvshowbiz/article-8382515/Keke-Palmer-convinces-members-National-Guard-knee.html",
"urlToImage": "https://i.dailymail.co.uk/1s/2020/06/03/03/29152762-0-image-a-31_1591150024345.jpg",
"publishedAt": "2020-06-03T04:40:14Z",
"content": "Keke Palmer implored members of the National Guard to march with Black Lives Matter protesters on Tuesday. The Strahan, Sara and Keke TV host, 26, made her impassioned plea to the National Guard off… [+3191 chars]"
},
	{
"source": {
"id": null,
"name": "New York Times"
},
"author": "Trip Gabriel",
"title": "Steve King, House Republican With a History of Racist Remarks, Loses Primary - The New York Times",
"description": "Mr. King, one of the nation’s most divisive elected officials, saw his power in Congress curtailed last year after he questioned why white supremacy was considered offensive.",
"url": "https://www.nytimes.com/2020/06/03/us/politics/steve-king-iowa-primary.html",
"urlToImage": "https://static01.nyt.com/images/2020/06/02/us/politics/02steveking-HFO/02steveking-HFO-facebookJumbo.jpg",
"publishedAt": "2020-06-03T04:33:13Z",
"content": "Even before facing Republican discipline in the House in January 2019 after the Times interview, Mr. King was in electoral trouble. He just barely won re-election in 2018 over Mr. Scholten, a former … [+1902 chars]"
},
	{
"source": {
"id": "cnn",
"name": "CNN"
},
"author": null,
"title": "Scientists say they have found the cleanest air on earth - MSN Money",
"description": "Scientists believe they have identified the world's cleanest air, free from particles caused by human activity, located over the Southern Ocean, which surrounds Antarctica.",
"url": "https://www.cnn.com/2020/06/02/world/cleanest-air-intl-scli-scn-climate/index.html",
"urlToImage": "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB14VvOh.img?h=315&w=600&m=6&q=60&o=t&l=f&f=jpg",
"publishedAt": "2020-06-03T04:30:00Z",
"content": "Scientists believe they have identified the world's cleanest air, free from particles caused by human activity, located over the Southern Ocean, which surrounds Antarctica. © Kathryn Moore/Colorado … [+3649 chars]"
},
	{
"source": {
"id": null,
"name": "YouTube"
},
"author": null,
"title": "Australia Economy Shrinks as Recession Looms - Bloomberg Markets and Finance",
"description": "Jun.02 -- Nicki Hutley, partner at Deloitte Access Economics, talks about the growth outlook for Australia. The economy contracted in the first three months ...",
"url": "https://www.youtube.com/watch?v=rbKsdMdgEF0",
"urlToImage": "https://i.ytimg.com/vi/rbKsdMdgEF0/hqdefault.jpg",
"publishedAt": "2020-06-03T03:57:30Z",
"content": null
},
	{
"source": {
"id": null,
"name": "MacRumors"
},
"author": "Juli Clover",
"title": "Next iPad Air Could Feature a USB-C Port Instead of a Lightning Port - MacRumors",
"description": "The fourth-generation iPad Air may be equipped with a USB-C port instead of a Lightning port, according to a new report from Japanese site Mac...",
"url": "https://www.macrumors.com/2020/06/02/ipad-air-usb-c-port/",
"urlToImage": "http://images.macrumors.com/article-new/2019/03/ipadairgold.jpg",
"publishedAt": "2020-06-03T03:31:39Z",
"content": "The fourth-generation iPad Air may be equipped with a USB-C port instead of a Lightning port, according to a new report from Japanese site Mac Otakara that says the information comes from a Chinese s… [+1122 chars]"
},
	{
"source": {
"id": null,
"name": "New York Post"
},
"author": "Associated Press",
"title": "Joe Biden sweeps all seven presidential primaries - New York Post ",
"description": "Joe Biden has scored a clean sweep of the seven states conducting Democratic presidential primaries on Tuesday, not at all a surprise given that the presumptive Democratic nominee has no active opp…",
"url": "https://nypost.com/2020/06/02/joe-biden-sweeps-all-seven-presidential-primaries/",
"urlToImage": "https://thenypost.files.wordpress.com/2020/06/ap20154537276858-e1591154298838.jpg?quality=90&strip=all&w=1200",
"publishedAt": "2020-06-03T03:28:46Z",
"content": "Joe Biden has scored a clean sweep of the seven states conducting Democratic presidential primaries on Tuesday, not at all a surprise given that the presumptive Democratic nominee has no active oppos… [+595 chars]"
},
	{
"source": {
"id": null,
"name": "BBC News"
},
"author": "https://www.facebook.com/bbcnews",
"title": "UK to change immigration rules for Hong Kong citizens if China passes law - BBC News",
"description": "Britain will change its immigration rules for Hong Kong citizens if China passes a new law, the PM says.",
"url": "https://www.bbc.com/news/uk-52900700",
"urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/21EB/production/_112638680_hi061745689.jpg",
"publishedAt": "2020-06-03T02:59:39Z",
"content": "Image copyrightReutersImage caption A Hong Kong protester demonstrating against China's new law raises his British National Overseas passport Britain will change its immigration rules and offer mi… [+3240 chars]"
},
	{
"source": {
"id": "business-insider",
"name": "Business Insider"
},
"author": "Áine Cain",
"title": "HelloFresh drops Lea Michele after allegations of bullying - Business Insider - Business Insider",
"description": ""HelloFresh does not condone racism nor discrimination of any kind," a HelloFresh spokesperson told Business Insider.",
"url": "https://www.businessinsider.com/hellofresh-lea-michele-allegations-racist-bullying-2020-6",
"urlToImage": "https://i.insider.com/5ed6de342618b93cdd151548?width=1200&format=jpeg",
"publishedAt": "2020-06-03T00:54:16Z",
"content": "HelloFresh has dropped its partnership with Lea Michele after former co-stars alleged that the "Glee" actor engaged bullying behavior on set. Actor and singer Samantha Marie Ware, who appeared on "G… [+1128 chars]"
},
	{
"source": {
"id": null,
"name": "MarketWatch"
},
"author": "Mike Murphy",
"title": "Google sued for $5 billion over alleged privacy violations: report - MarketWatch",
"description": "",
"url": "http://www.marketwatch.com/story/google-sued-for-5-billion-over-alleged-privacy-violations-report-2020-06-02",
"urlToImage": "https://s.wsj.net/public/resources/MWimages/MW-GP644_MicroS_ZG_20180906154215.jpg",
"publishedAt": "2020-06-03T00:52:00Z",
"content": "Alphabet Inc.'s GOOGL, +0.51% GOOG, +0.51% Google is facing a potential class-action lawsuit claiming illegal privacy infringements that seeks at least $5 billion, Reuters reported Tuesday.… [+495 chars]"
},
	{
"source": {
"id": "cnn",
"name": "CNN"
},
"author": "Konstantin Toropin, CNN",
"title": "Omaha bar owner who shot a black protester will not be charged - CNN",
"description": "The family of a black man killed by a white bar owner during protests in Omaha, Nebraska, believes a prosecutor rushed to judgment by declaring the shooting an act of self-defense.",
"url": "https://www.cnn.com/2020/06/02/us/omaha-bar-owner-black-protester-trnd/index.html",
"urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/200602192001-omaha-protester-shot-super-tease.jpg",
"publishedAt": "2020-06-03T00:34:50Z",
"content": "(CNN)The family of a black man killed by a white bar owner during protests in Omaha, Nebraska, believes a prosecutor rushed to judgment by declaring the shooting an act of self-defense. Douglas Coun… [+3372 chars]"
},
	{
"source": {
"id": "the-washington-post",
"name": "The Washington Post"
},
"author": "Ann Marimow",
"title": "D.C. Circuit sets oral argument date to review Judge Sullivan’s refusal to immediately close Michael Flynn’s case - The Washington Post",
"description": "The Justice Department and Flynn are asking the court to force Sullivan to dismiss the case.",
"url": "https://www.washingtonpost.com/local/legal-issues/dc-circuit-sets-oral-argument-date-to-review-judge-sullivans-refusal-to-immediately-close-michael-flynns-case/2020/06/02/1d1a6690-a522-11ea-b473-04905b1af82b_story.html",
"urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/YCQFBNADCAI6TEJCQLUY7EPON4.jpg&w=1440",
"publishedAt": "2020-06-03T00:09:15Z",
"content": null
},
	{
"source": {
"id": null,
"name": "OilPrice.com"
},
"author": "Julianne Geiger",
"title": "Surprise Crude Draw Sends Oil Prices Soaring - OilPrice.com",
"description": "The oil rally continued on Tuesday afternoon after the API reported a surprise crude draw",
"url": "https://oilprice.com/Latest-Energy-News/World-News/Surprise-Crude-Draw-Sends-Oil-Prices-Soaring.html",
"urlToImage": "https://d32r1sh890xpii.cloudfront.net/news/718x300/2020-06-02_wgbeyiakgm.jpg",
"publishedAt": "2020-06-03T00:07:25Z",
"content": "Turkey is moving away from… The outcome of the U.S.… By Julianne Geiger - Jun 02, 2020, 3:53 PM CDTThe American Petroleum Institute (API) estimated on Tuesday a small crude oil inventory draw of 48… [+1996 chars]"
}
],
}
*/