import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import {StyledTimeline} from "../src/components/Timeline.js";
import { videoService } from "../src/services/videoService";


function HomePage(){

    const homePageStyle = {};
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});     // config.playlists

    React.useEffect(() => {
        console.log("useEffect");
        service
            .getAllVideos()
            .then((dados) => {
                console.log(dados.data);
                // Forma imutavel
                const novasPlaylists = {};
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist] = [
                        video,
                        ...novasPlaylists[video.playlist],
                    ];
                });

                setPlaylists(novasPlaylists);
            });
    }, []);


    return (
        <> 
            <div style={homePageStyle}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header></Header>
                <TimeLine searchValue={valorDoFiltro} playlist={playlists}>

                </TimeLine>
            </div>        
        </>
    )
}

export default HomePage

const StyleFavorites = styled.div`
    img{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    }
`

const StyleHeader = styled.div`
    div{
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .banner{
        position: absolute;
        width: 100%;
        object-fit: cover;
    }

    .user-info{
        display: flex;
        align-items: center;
        width: 100%;
        padding:16px 32px;
        gap: 16px;
    }

    .name-job{
        text-align: left;
    }

    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    p, h1{
        font-family: 'Helvetica';
    }
`
    const Banner = styled.div `
        height: 230px;
        background-image: url(${config.banner}.jpg);
        background-repeat: no-repeat;
        background-size: cover;
    `

function Header(){
    return (
        <StyleHeader>
            <Banner/>
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

function TimeLine({searchValue, ...props}){
    const playlistNames = Object.keys(props.playlist);
    
    return(
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlist[playlistName];
                
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video)=> {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return titleNormalized.includes(searchValueNormalized)
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb}/>
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                        })}
                        </div>
                    </section>

                )
            })}
        </StyledTimeline>
    )
}

