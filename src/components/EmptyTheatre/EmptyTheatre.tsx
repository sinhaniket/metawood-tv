import * as React from 'react';
import { DropdownProps } from 'semantic-ui-react';
import classes from './EmptyTheatre.module.css';
import ChatVideoCard from '../Playlist/ChatVideoCard';
import playlistIcon from '../../assets/icons/playlist.svg';
import playIcon from '../../assets/icons/play.svg';
import yt from '../../assets/icons/yt.svg';
import tgIcon from '../../assets/icons/telegram.svg';
import uploadIcon from '../../assets/upload/upload.svg';
import clipboardIcon from '../../assets/icons/clipboard-paste.svg';
import searchIcon from '../../assets/icons/search.svg';
import CoffeIcon from '../../assets/icons/coffee.svg';
import { AppState } from '../App/App';
import GetOpacity from '../../hook/getOpacity';
import arrowLeft from '../../assets/playlist/arrowLeft.svg';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles

// import "swiper/css/pagination";
// import required modules
import SwiperCore, { FreeMode, Navigation, Pagination } from 'swiper';
import ReactPlayer from 'react-player';
import MetaButton from '../../atoms/MetaButton';
import fullScreenIcon from '../../../src/assets/icons/full-screen.svg';
import quiteFScreenIcon from '../../../src/assets/icons/quit-full-screen.svg';
export interface IEmptyTheatreProps {
  toggleIsUploadPress: Function;
  setMedia: (e: any, data: DropdownProps) => void;
  playlistAdd: (e: any, data: DropdownProps) => void;
  playlistMove: (index: number, toIndex: number) => void;
  playlistDelete: (index: number) => void;
  currentMedia: string;
  getMediaDisplayName: Function;
  launchMultiSelect: Function;
  mediaPath: string | undefined;
  streamPath: string | undefined;
  disabled?: boolean;
  playlist: PlaylistVideo[];
  toggleHome: Function;
  setState: Function;
  setLoadingFalse: Function;
  state: AppState;
  gotoYTScreen: Function;
  showPlaylist: Function;
}

export function EmptyTheatre(props: IEmptyTheatreProps) {
  const {
    toggleIsUploadPress,
    toggleHome,
    // setState,
    state,
    // setMedia,
    // playlistAdd,
    currentMedia,
    showPlaylist,
    setLoadingFalse,
    gotoYTScreen,
  } = props;
  // const { opacity: op } = GetOpacity(!state.currentMediaPaused);
  const [isFullScreen, setIsFullScreen] = React.useState<boolean>(true);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [activeSlideIndex, setActiveSlideIndex] = React.useState(0);

  const swiperRef = React.useRef<SwiperCore | null>(null);

  // const handleNextSlide = (type: string) => {
  //   if (swiperRef.current && type === 'prev') {
  //     swiperRef.current.slidePrev();
  //     setActiveSlideIndex(activeSlideIndex - 1);
  //   }
  //   if (swiperRef.current && type === 'next') {
  //     swiperRef.current.slideNext();
  //     setActiveSlideIndex(activeSlideIndex + 1);
  //   }
  // };
  React.useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth <= 868; // Adjust the threshold as needed
      setIsMobile(isMobileScreen);
    };

    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const toggleFScreen = (): void => {
    setIsFullScreen(!isFullScreen);
  };
  React.useEffect(() => {
    // ((state as AppState).clipboard && (state as AppState).currentMedia) && setLoadingFalse();
    setLoadingFalse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentMediaPaused]);

  return (
    <main className={classes.content}>
      <nav className={classes.tolbar}>
        <div className={classes.header}>
          <img src="logo192.png" className="relative h-16 lg:h-24" alt="" />
        </div>

        <div className={classes.inputContainer}>
          <span className="absolute left-3 top-3">
            <img src={searchIcon} alt="s" className="h-6 lg:h-12 lg:mt-2" />
            {/* <button className='btn bg-white/70 disabled hover:bg-white/70 border-none rounded-xl '></button> */}
          </span>
          <div>
            <input
              type="search"
              onKeyPress={(e: any) => {
                if (e.key === 'Enter') {
                  toggleHome(e.target.value);
                }
              }}
              placeholder="Enter or paste your video URL"
              className={`${classes.inputStyle} input w-full px-14 py-4 lg:px-20 lg:py-10  placeholder:text-[#49454F] rounded-xl text-gray border-none focus:outline-0 focus:border-none focus:ring-0 lg:text-[28px]`}
            />
          </div>
          <span className="absolute right-0 top-0 cursor-pointer ">
            <button
              className=" bg-white   m-1 p-2 lg:mt-2  active:bg-white/50 border-none rounded-xl"
              onClick={async () => {
                // const permission = await navigator.permissions.query({ name:  });
                navigator.clipboard
                  .readText()
                  .then((text) => {
                    console.log('Clipboard text: ', { text });
                    toggleHome(text);
                  })
                  .catch((err) => {
                    console.error('Failed to read clipboard text: ', err);
                  });
              }}
            >
              <img src={clipboardIcon} alt="s" className="h-6 lg:h-12 " />
            </button>
          </span>
        </div>
      </nav>

      {/* <div className={classes.btn_area}>
				{currentMedia && (
					<div className="relative">
						<button
							onClick={() => toggleHome()}
							className={`btn btn-md font-bold text-[14px] bg-[#EFFF33] hover:bg-[#EFFF33] text-black/80 rounded-xl border-none capitalize opacity-${op * 100
								}`}
						>
							<span>
								<img src={playIcon} alt="" className="h-8 mr-1 opacity-70" />
							</span>{' '}
							Now Playing
						</button>
					</div>
				)}

				<div className="dropdown dropdown-end w-[250px]">
					<label
						tabIndex={1}
						className="btn btn-md font-semibold text-xl mx-1 hover:bg-white bg-white text-black/80 rounded-xl outline-0 border-0 active:outline-0 focus:outline-0 capitalize w-full"
					>
						<span>
							<img src={playlistIcon} alt="" className="h-8 mr-2" />
						</span>
						Playlist ({props.playlist.length})
					</label>

					<div
						tabIndex={1}
						className={`dropdown-content w-[50vw] bg-[#3A3A3A] p-2 rounded-md max-h-[98vh] min-h-[10vh] overflow-y-auto ${props.playlist.length > 0 && classes.playlist_content
							}`}
					>
						<section className=" w-full ">
							{props.playlist.map((item: PlaylistVideo, index: number) => {
								return (
									<div
										key={index}
										// tabIndex={index}
										className={` card-compact w-full p-2 shadow bg-primary text-primary-content ${classes.PlaylistItem}`}
									>
										<div style={{ width: '100%', position: 'relative' }}>
											<ChatVideoCard
												toggleHome={props.toggleHome}
												video={item}
												index={index}
												controls
												fromHome
												onPlay={(index) => {
													props.setMedia(null, {
														value: props.playlist[index]?.url,
													});
													props.playlistDelete(index);
												}}
												onPlayNext={(index) => {
													props.playlistMove(index, 0);
												}}
												onRemove={(index) => {
													props.playlistDelete(index);
												}}
												disabled={props.disabled}
												isYoutube={Boolean(item.img)}
											/>
										</div>
									</div>
								);
							})}
						</section>

						{props.playlist.length === 0 && (
							<div
								className="w-full  shadow bg-transparent text-primary-content"
							>
								<div className="">
									<h3 className=" text-center">Playlist Empty!</h3>
								</div>
							</div>
						)}
					</div>
				</div>
				
			</div> */}

      {/* swipper */}
      {/* <button
        className="bg-inherit absolute z-30 top-[80%] translate-y-[-20%] left-[40%]"
        onClick={() => handleNextSlide('prev')}
      >
        <img src={arrowLeft} alt="" className="h-16" />
      </button>
      <button
        className="bg-inherit absolute z-30 top-[80%] translate-y-[-20%] left-[50%]"
        onClick={() => handleNextSlide('next')}
      >
        <img src={arrowLeft} alt="" className="h-16 rotate-180" />
      </button> */}
      <div className="w-4/5 h-full z-10 mt-10 lg:mt-20">
        <div
          className={`bg-transparent rounded-lg ${classes.scrollbarContainer} space-x-3 lg:space-x-8 flex overflow-x-scroll scrollable-content whitespace-nowrap p-2`}
        >
          <div
            className={`bg-gradient-to-r w-[27%] min-w-[27%] h-[20vw] from-white to-[#ABABAB] ${
              classes.btnBoxShadow
            } ${
              !currentMedia && 'opacity-70'
            } btn border-0 capitalize   rounded-xl  relative`}
          >
            <div className="flex flex-col">
              <div className="flex justify-center items-center font-[800] rounded-xl lg:mt-6  lg:mb-2  lg:text-[1.5vw]  text-[#49454f]">
                <span>
                  <img
                    src={playIcon}
                    alt=""
                    className="h-8 lg:h-[1.5vw] mr-1 opacity-70"
                  />
                </span>{' '}
                Now Playing
              </div>
              <span
                onClick={() => currentMedia && toggleHome()}
                className="absolute left-0 top-0 h-full z-50 w-full"
              ></span>
              <div className="flex justify-center items-center h-2/3 lg:mt-6">
                {currentMedia && !state.currentMediaPaused ? (
                  <ReactPlayer
                    className="z-10 rounded-xl overflow-hidden"
                    url={currentMedia}
                    playing={false}
                    controls={false}
                    muted
                    height="100%"
                    width="80%"
                    light
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center lg:text-[1.8vw] mt-2 lg:leading-10 text-[#49454f] capitalize">
                    <img src={CoffeIcon} alt="" className="lg:h-36 mb-1" />
                    Coffee break {!isMobile && <br />} at the moment
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            onClick={() => props.playlist.length && showPlaylist()}
            className={`bg-gradient-to-r w-[27%] min-w-[27%] h-[20vw] btn border-0  from-white to-[#ABABAB] ${classes.btnBoxShadow} flex capitalize justify-center items-center rounded-xl`}
          >
            <div className="flex font-[800] justify-center items-center rounded-xl h-full lg:text-[1.8vw] text-[#49454f]">
              <span>
                <img src={playlistIcon} alt="" className="h-16 lg:h-28 mr-2" />
              </span>
              Playlist ({props.playlist.length})
            </div>
          </div>
          <div
            className={`${classes.btnBoxShadow} bg-[#d20001] rounded-xl  flex justify-center w-[27%] min-w-[27%] h-[20vw] items-center btn border-0 hover:bg-[#d20001]`}
          >
            <div
              onClick={() => {
                gotoYTScreen();
              }}
              className="flex justify-center items-center rounded-xl h-full"
            >
              <img className="mx-auto h-32 lg:h-52" src={yt} alt="" />
            </div>
          </div>
          <div
            className={`${classes.uploadBtnBg} ${classes.btnBoxShadow} flex justify-center w-[27%] min-w-[27%] h-[20vw] items-center rounded-xl  btn border-0 capitalize`}
          >
            <div
              className="flex justify-center items-center rounded-xl h-full"
              onClick={() => toggleIsUploadPress()}
            >
              <span className="text-white font-semibold text-[28px] lg:text-[48px]">
                Upload
              </span>
              <img
                className="pl-3 h-10 lg:h-20"
                src={uploadIcon}
                alt=" uploadIcon"
              />
            </div>
          </div>
          <div
            className={` bg-[#27a2dd] hover:bg-[#27a2dd] ${classes.btnBoxShadow} flex justify-center w-[27%] min-w-[27%] h-[20vw] items-center rounded-xl btn border-0 capitalize`}
          >
            <div className="flex justify-center items-center rounded-xl h-full">
              <span className="text-white font-semibold text-[28px] lg:text-[48px]">
                Telegram
              </span>
              <img
                src={tgIcon}
                className="ml-3 h-15 lg:h-24"
                alt="uploadIcon"
              />
            </div>
          </div>

          {/* <SwiperSlide
            className={`justify-center items-center rounded-xl hidden`}
          ></SwiperSlide>
          <SwiperSlide
            className={`justify-center items-center rounded-xl hidden`}
          ></SwiperSlide> */}
        </div>
      </div>

      {/* <section className="flex flex-col w-[75%] h-screen items-center gap-1 justify-start mt-10 lg:mt-0 lg:justify-center">

				<div className="grid relative w-full grid-cols-3 gap-3">
					<button
						onClick={() => {
							gotoYTScreen();
						}}
						className={`${classes.btnBoxShadow} bg-[#d20001] rounded-xl`}
					>
						<img className="mx-auto" src={yt} alt="" />
					</button>
					<button
						onClick={() => toggleIsUploadPress()}
						className={`${classes.uploadBtnBg} ${classes.btnBoxShadow} flex justify-center items-center rounded-xl`}
					>
						<span className="text-white font-semibold text-[18px] lg:text-[1vw]">Upload</span>
						<img className="pl-3" src={uploadIcon} alt="uploadIcon" />
					</button>
					<button
						onClick={() => { }}
						className={`bg-[#27a2dd] ${classes.btnBoxShadow} flex justify-center items-center rounded-xl`}
					>
						<span className="text-white font-semibold text-[18px] lg:text-[1vw]">
							Telegram
						</span>
						<img src={tgIcon} className="ml-1" alt="uploadIcon" />
					</button>
				</div>
			</section> */}

      <div className="absolute lg:bottom-10 bottom-5 lg:left-12 left-5">
        <MetaButton
          onClick={() => toggleFScreen()}
          img={isFullScreen ? quiteFScreenIcon : fullScreenIcon}
          className="bg-transparent"
          imgClass="h-16 lg:h-24"
        ></MetaButton>
      </div>
    </main>
  );
}
