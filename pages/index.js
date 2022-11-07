import config from "../config.json";
import styled from "styled-components";
import {CSSReset} from "../src/components/CSSReset.js";
import Menu from "../src/components/Menu";
import {StyledTimeline} from "../src/components/Timeline.js";

function HomePage(){
    const homePageStyle = {};
    return (
        <> 
            <CSSReset/> 
            <div style={homePageStyle}>
                <Menu/>
                <Header></Header>
                <TimeLine playlist={config.playlist}></TimeLine>
            </div>        
        </>
    )
}

export default HomePage

const StyleHeader = styled.div`
    div{
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding:16px 32px;
        gap: 16px;
        margin-top: 50px;
    }

    .name-job{
        text-align: left;
    }

    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    h1{
        font-family: 'Helvetica';
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #000000;
    }

    p{
        font-family: 'Helvetica';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
        color: #666666;
    }
`
function Header(){
    return (
        <StyleHeader>
            {/* <img src={}></img> */}

            <section className="user-info">
                <img src={config.github}/>
                <div className="name-job">
                    <h1>{config.name}</h1>
                    <p>{config.job}</p>
                </div>
            </section>
        </StyleHeader>
    )
}

function TimeLine(props){
    console.log("Dentro da playlist", props);
    const playlistNames = Object.keys(props.playlist);
    return(
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlist[playlistName];
                // console.log(videos);
                // console.log(playlistName);
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
                                        <img src={video.thumb}/>
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                            )
                })};
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

