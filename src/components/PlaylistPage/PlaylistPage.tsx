import React from 'react';
import BackIcon from '../../assets/icons/back.svg';
import playIcon from '../../assets/icons/play.svg';
import playIcon2 from '../../assets/icons/playIcon.svg';
// import playlistIcon from '../../assets/icons/playlist.svg';
// import thumbnail from '../../assets/playlist/playListThumb.png';
import playOnIcon from '../../assets/playlist/Play.svg';
import deleteIcon from '../../assets/playlist/delete.svg';
import nextIcon from '../../assets/playlist/next.svg';
import arrowLeft from '../../assets/playlist/arrowLeft.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Scrollbar } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import './playlist.css';
import MetaButton from '../../atoms/MetaButton';
import fullScreenIcon from '../../../src/assets/icons/full-screen.svg';
import quiteFScreenIcon from '../../../src/assets/icons/quit-full-screen.svg';
import GetOpacity from '../../hook/getOpacity';
import ReactPlayer from 'react-player';

type PropsType = {
  gotoHomeScreen: Function;
  currentMedia: string | undefined;
  toggleHome: Function;
  currentMediaPaused: boolean;
  playlist: PlaylistVideo[];
  setMedia: Function;
  playlistMove: Function;
  playlistDelete: Function;
};

const PlaylistPage = (props: PropsType) => {
  const {
    gotoHomeScreen,
    currentMedia,
    toggleHome,
    currentMediaPaused,
    playlist,
    setMedia,
    playlistDelete,
    playlistMove,
  } = props;
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(true);
  const { opacity } = GetOpacity(!currentMediaPaused);
  const toggleFScreen = (): void => {
    setIsFullScreen(!isFullScreen);
  };

  const swiperRef = React.useRef<SwiperCore | null>(null);

  const handleNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
      setActiveSlideIndex(activeSlideIndex - 1);
    }
  };

  const handlePlayClick = React.useCallback(
    (index) => {
      setMedia(null, {
        value: playlist[index]?.url,
      });
      playlistDelete(index);

      toggleHome && toggleHome();
    },
    [toggleHome, playlist, playlistDelete, setMedia]
  );

  const handlePlayNextClick = React.useCallback(
    (index) => {
      playlistMove(index, 0);
    },
    [playlistMove]
  );

  const handleRemoveClick = React.useCallback(
    (index) => {
      playlistDelete(index);
    },
    [playlistDelete]
  );
  return (
    <div className="pl-[1%] md:pl-[2%] lg:pl-[3%] lg:pl-[3vw]  bg-[#1E1E1E] py-4 w-full relative h-screen overflow-hidden">
      <div className="pl-[8%] md:pl-[5%]">
        <div className="pr-[3%] flex justify-between">
          <MetaButton
            backShadow
            onClick={() => gotoHomeScreen()}
            className="p-0 border-none"
            img={BackIcon}
            imgClass="rounded-full h-16 lg:h-[3vw]"
          ></MetaButton>
          {currentMedia && (
            <div className="relative">
              <button
                onClick={() => toggleHome()}
                className={`btn btn-md font-bold text-[14px] bg-[#EFFF33] hover:bg-[#EFFF33] text-black/80 rounded-xl border-none capitalize opacity-${
                  opacity * 100
                }`}
              >
                <span>
                  <img src={playIcon} alt="" className="h-8 mr-1 opacity-70" />
                </span>{' '}
                Now Playing
              </button>
            </div>
          )}
        </div>
        {/* <button className="btn mt-[2%] lg:mt-[3%] w-fit btn-md font-semibold text-xl mx-1 hover:bg-white bg-white text-black/80 rounded-xl outline-0 border-0 active:outline-0 focus:outline-0 capitalize ">
					<span>
						<img src={playlistIcon} alt="" className="h-8 mr-2" />
					</span>
					Playlist
				</button> */}
        <div className="mt-[2%] lg:ml-40 relative">
          <button
            className="bg-inherit absolute z-30 top-[50%] translate-y-[-50%] left-[-5%]"
            onClick={handleNextSlide}
          >
            <img src={arrowLeft} alt="" className="h-16" />
          </button>
          <Swiper
            scrollbar={{
              hide: false,
            }}
            onSlideChange={(swiper) => setActiveSlideIndex(swiper.activeIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            freeMode
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 7,
                spaceBetween: 40,
              },
            }}
            modules={[Scrollbar]}
            className="mySwiper "
            style={{ paddingBottom: '2%' }}
          >
            {playlist.map((item: PlaylistVideo, index) => (
              <SwiperSlide>
                <div className="p-4 lg:p-[0.75vw] bg-[#333] rounded-lg">
                  <div className="flex overflow-hidden space-y-2 flex-col">
                    <div className="w-full animate-marquee whitespace-nowrap">
                      <h4 className=" m-0 text-md lg:text-[0.7vw] font-bold text-white">
                        {item.name}
                      </h4>
                    </div>
                    <div className="relative h-[100px]">
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
                        onClick={() => handlePlayClick(index)}
                        className="absolute left-0 top-0 h-full z-50 w-full"
                      ></span>
                      <div
                        // onClick={() => {
                        //   onSetMedia(null, { value: item.url });
                        //   toggleHome();
                        // }}
                        className="absolute top-[50%] cursor-pointer left-[50%] translate-x-[-50%] translate-y-[-50%]"
                      >
                        <img
                          src={playIcon2}
                          className="z-10"
                          alt=""
                          width="100%"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="flex space-x-2 justify-between">
                        <img
                          className="cursor-pointer"
                          src={playOnIcon}
                          alt=""
                          onClick={() => handlePlayClick(index)}
                        />
                        <img
                          className="cursor-pointer rotate-180"
                          src={nextIcon}
                          alt=""
                          onClick={() => handlePlayNextClick(index)}
                        />
                        <img
                          onClick={() => handleRemoveClick(index)}
                          className="cursor-pointer"
                          src={deleteIcon}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <SwiperSlide
              className={`justify-center items-center rounded-xl hidden`}
            ></SwiperSlide>
            <SwiperSlide
              className={`justify-center items-center rounded-xl hidden`}
            ></SwiperSlide>
            <SwiperSlide
              className={`justify-center items-center rounded-xl hidden`}
            ></SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="absolute lg:bottom-10 bottom-3 lg:left-[3%] left-3">
        <MetaButton
          onClick={() => toggleFScreen()}
          img={isFullScreen ? quiteFScreenIcon : fullScreenIcon}
          className="bg-transparent"
          imgClass="h-12 lg:h-20"
        ></MetaButton>
      </div>
    </div>
  );
};

export default PlaylistPage;
