// import React, { useState } from 'react';
import trendingRed from '../../assets/icons/trending-r.png';
import trendingWhite from '../../assets/icons/trending-w.png';
// import liveRed from '../../assets/icons/live-r.svg';
// import liveWhite from '../../assets/icons/live-w.svg';
// import movieR from '../../assets/icons/movie-r.svg';
// import movieW from '../../assets/icons/movie-w.svg';
// import gamingR from '../../assets/icons/gaming-r.svg';
import playIcon2 from '../../assets/icons/playIcon.svg';
import addPlaylistIcon from '../../assets/icons/playlist-add.svg';
// import VideoListCard from './VideoListCard';
import classes from './YtBox.module.css';
import { TabsType } from '../Modal/YtScreen';
import ReactPlayer from 'react-player';
import React from 'react';
// import { ComboBox } from '../ComboBox/ComboBox';
interface IYtBoxProps {
  videoItems: [];
  setTab: Function;
  tab: TabsType;
  playlistAdd: Function;
  setMedia: Function;
  toggleHome: Function;
}
const YtBox = (props: IYtBoxProps) => {
  const { tab, setTab, playlistAdd, setMedia, toggleHome } = props;

  const handlePlayClick = React.useCallback(
    (url: string) => {
      setMedia(null, { value: url });
      toggleHome();
    },
    [setMedia, toggleHome]
  );
  return (
    <div className="bg-[#1E1E1E] m-0 p-0 w-full h-screen relative pl-[3%] lg:pl-[3vw]">
      <main className="mt-0">
        <div className="flex flex-col  justify-end lg:justify-center pb-[1rem]">
          <div className="flex space-x-6">
            <div
              className="relative flex items-end min-h-[10vh]" /* className={`${selectBtn ===1 && "scale-0"}`} */
            >
              <button
                onClick={() => setTab('trending')}
                className={` ${
                  tab === 'trending'
                    ? `bg-[#DC0606] py-2 lg:py-[0.3vw] ${classes.boxShadowCustom}`
                    : `py-3 bg-[#fff]`
                } rounded-lg px-6 flex space-x-2 duration-500 justify-center items-center`}
              >
                <img
                  src={tab === 'trending' ? trendingWhite : trendingRed}
                  alt=""
                  className="h-8 lg:h-[1.5vw]"
                />
                <span
                  className={`${
                    tab === 'trending' ? 'text-white' : 'text-[#DC0606]'
                  } text-[18px] lg:text-[1vw] font-bold`}
                >
                  Trending On Youtube
                </span>
              </button>
              {tab === 'trending' && (
                <div className="absolute top-[100%] w-full left-0 h-[5px] lg:h-[0.3vw] duration-500 rounded-lg mt-3 lg:mt-[0.5vw] bg-[#3a3a3a]"></div>
              )}
            </div>
            {/* <div
              className="relative flex items-end " 
            >
              <button
                onClick={() => setTab('live')}
                className={` ${
                  tab === 'live'
                    ? `bg-[#DC0606] py-5 ${classes.boxShadowCustom}`
                    : `py-3 bg-[#fff]`
                } rounded-lg px-6 flex space-x-2 justify-center duration-500  items-center`}
              >
                <img
                  width={20}
                  src={tab === 'live' ? liveWhite : liveRed}
                  alt=""
                />
                <span
                  className={`${
                    tab === 'live' ? 'text-white' : 'text-[#DC0606]'
                  } text-[18px] lg:text-[1vw] font-bold`}
                >
                  Live
                </span>
              </button>
              {tab === 'live' && (
                <div className="absolute top-[100%] w-full left-0 h-[5px] lg:h-[0.3vw] duration-500 rounded-lg mt-3 lg:mt-[0.5vw] bg-[#3a3a3a]"></div>
              )}
            </div>
            <div
              className="relative flex items-end " 
            >
              <button
                onClick={() => setTab('movie')}
                className={` ${
                  tab === 'movie'
                    ? `bg-[#DC0606] py-5 ${classes.boxShadowCustom}`
                    : `py-3 bg-[#fff]`
                } rounded-lg px-6 flex space-x-2 justify-center duration-500  items-center`}
              >
                <img
                  width={18}
                  src={tab === 'movie' ? movieW : movieR}
                  alt=""
                />
                <span
                  className={`${
                    tab === 'movie' ? 'text-white' : 'text-[#DC0606]'
                  } text-[18px] lg:text-[1vw] font-bold`}
                >
                  Movie
                </span>
              </button>
              {tab === 'movie' && (
                <div className="absolute top-[100%] w-full left-0 h-[5px] lg:h-[0.3vw] duration-500 rounded-lg mt-3 lg:mt-[0.5vw] bg-[#3a3a3a]"></div>
              )}
            </div>
            <div
              className="relative flex items-end "
            >
              <button
                onClick={() => setTab('game')}
                className={` ${
                  tab === 'game'
                    ? `bg-[#DC0606] py-5 ${classes.boxShadowCustom}`
                    : `py-3 bg-[#fff]`
                } rounded-lg px-6 flex space-x-2 justify-center duration-500  items-center`}
              >
                <img width={22} src={gamingR} alt="" />
                <span
                  className={`${
                    tab === 'game' ? 'text-white' : 'text-[#DC0606]'
                  } text-[18px] lg:text-[1vw] font-bold`}
                >
                  Game
                </span>
              </button>
              {tab === 'game' && (
                <div className="absolute top-[100%] w-full left-0 h-[5px] lg:h-[0.3vw] duration-500 rounded-lg mt-3 lg:mt-[0.5vw] bg-[#3a3a3a]"></div>
              )}
            </div> */}
          </div>

          <div
            className={`bg-[#3A3A3A] rounded-lg ${classes.scrollbarContainer} space-x-3 flex overflow-x-scroll scrollable-content whitespace-nowrap lg:mt-[4vw] mt-6 p-2`}
          >
            {props.videoItems?.length > 0 ? (
              props.videoItems?.map((item: SearchResult, key) => {
                return (
                  <div
                    key={item.url}
                    className="w-[30%] lg:w-[20%] lg:min-w-[20%] min-w-[30%]"
                  >
                    <div className="p-4 lg:p-[0.75vw]  bg-[#333] rounded-lg">
                      <div className="flex overflow-hidden space-y-2 flex-col">
                        <div className="w-full animate-marquee whitespace-nowrap">
                          <h4 className=" m-0 text-md lg:text-[0.9vw] font-bold text-white">
                            {item.name}
                          </h4>
                        </div>
                        <div className="relative h-[13vw] lg:h-[12vw] w-full">
                          {/* <img
												className="w-full lg:h-full h-[132px]  min-w-[180px] lg:min-h-[140px] rounded-md"
												src={item.img}
												alt="thumbnail"
											/> */}
                          <ReactPlayer
                            className="z-10 rounded-xl overflow-hidden"
                            url={item.url}
                            playing={false}
                            controls={false}
                            muted
                            height="100%"
                            width="100%"
                            light
                          />
                          <span
                            onClick={() => handlePlayClick(item.url)}
                            className="absolute left-0 top-0 h-full z-50 w-full"
                          ></span>
                          <div
                            onClick={() => {
                              handlePlayClick(item.url);
                            }}
                            className="absolute top-[50%] cursor-pointer left-[50%] translate-x-[-50%] translate-y-[-50%]"
                          >
                            <img
                              src={playIcon2}
                              className="z-10 w-full lg:w-[2vw]"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="">
                          <div className="flex space-x-2 justify-between">
                            <button
                              onClick={() => {
                                handlePlayClick(item.url);
                              }}
                              className="btn capitalize bg-white hover:bg-white  h-auto lg:h-[2.1vw] flex-1 text-sm lg:text-[0.9vw] text-black/80 "
                            >
                              Play Now
                            </button>
                            <button
                              onClick={() => {
                                playlistAdd(null, { value: item.url });
                              }}
                              className="btn h-full bg-white hover:bg-white"
                            >
                              <img
                                className="cursor-pointer w-auto lg:w-[1.3vw] h-auto lg:h-[2vw] rotate-180"
                                src={addPlaylistIcon}
                                alt=""
                                style={{
                                  fill: '#FF0000', // Replace '#FF0000' with your default color
                                }}
                                onMouseOver={(e) =>
                                  (e.currentTarget.style.fill = '#00FF00')
                                } // Replace '#00FF00' with your hover color
                                onMouseOut={(e) =>
                                  (e.currentTarget.style.fill = '#FF0000')
                                } // Reset to the default color on mouse out
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <VideoListCard
											toggleHome={toggleHome}
											onSetMedia={setMedia}
											playlistAdd={playlistAdd}
											key={key}
											item={item}
										/> */}
                  </div>
                );
              })
            ) : (
              <div className="flex h-[20vh] w-full items-center justify-center">
                <p className="text-white/70 text-[20px] text-center font-extrabold ">
                  Can't Get Youtube Videos, Please Try Again
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default YtBox;
