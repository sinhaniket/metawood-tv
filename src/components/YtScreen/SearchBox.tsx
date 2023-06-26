import React from 'react';
import { DropdownProps } from 'semantic-ui-react';
import { debounce, getMediaPathResults, getYouTubeResults } from '../../utils';

import playIcon from '../../assets/icons/play.svg';
import playlistIcon from '../../assets/icons/playlist.svg';
import playIcon2 from '../../assets/icons/playIcon.svg';
import addPlaylistIcon from '../../assets/icons/playlist-add.svg';
import styles from './SearchBox.module.css';
import MetaButton from '../../atoms/MetaButton';
import clipboardIcon from '../../assets/icons/clipboard-paste.svg';
import searchIcon from '../../assets/icons/search.svg';
import BackIcon from '../../assets/icons/back.svg';
import ReactPlayer from 'react-player';
// import GetOpacity from '../../hook/getOpacity';
// import { log, timeLog } from 'console';
interface SearchBoxProps {
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
  toggleIsUploadPress: Function;
  isHome: boolean;
  toggleHome: Function;
  clipboard: string | undefined;
  loadYouTube: Function;
  isCollapsed: boolean;
  toggleCollapse: Function;
  isShowTheatreTopbar: boolean;
  toggleShowTopbar: Function;
  gotoHomeScreen: Function;
  setVideoItems: Function;
  showPlaylist: Function;
  currentMediaPaused: boolean;
}
interface ComboState {
  inputMedia: string | undefined;
  results: JSX.Element[] | undefined;
  loading: boolean;
  lastResultTimestamp: number;
  currentClipboard: string;
  opacity: number;
  intervalId: undefined | any;
}

export class SearchBox extends React.Component<SearchBoxProps> {
  private inputRef = React.createRef<HTMLInputElement>();

  state: ComboState = {
    inputMedia: undefined,
    results: undefined,
    loading: false,
    lastResultTimestamp: Number(new Date()),
    currentClipboard: '',
    opacity: 1,
    intervalId: undefined,
  };
  debounced: any = null;

  // componentDidMount() {
  //     // if (this.inputRef.current) {
  //     //     if (this.props.clipboard || !this.props.currentMedia) {
  //     //         this.inputRef?.current.focus();
  //     //         // this.setState({ currentClipboard: this.props.clipboard })
  //     //     }
  //     //     // if (this.props.clipboard || this.props.currentMedia)
  //     //     //     this.props.loadYouTube();
  //     // }
  // }
  doSearch = async (e: any) => {
    e.persist();
    this.setState({ inputMedia: e.target.value }, () => {
      if (!this.debounced) {
        this.debounced = debounce(async () => {
          this.setState({ loading: true });
          const query: string = this.state.inputMedia || '';
          let timestamp = Number(new Date());
          let results: JSX.Element[] | undefined = undefined;
          if (query.startsWith('http')) {
            let items: any = [];
            if (!this.state.inputMedia && this.props.mediaPath) {
              items = await getMediaPathResults(this.props.mediaPath, '');
            }
            if (query) {
              items = [
                {
                  name: query,
                  type: 'file',
                  url: query,
                  duration: 0,
                },
              ];
            }
            results =
              items?.length > 0
                ? items?.map((item: SearchResult, index: number) => (
                    <div key={item.url} className="">
                      <div className="p-4 w-[25vw] lg:w-[15vw] bg-[#333] rounded-lg">
                        <div className="flex overflow-hidden space-y-2 flex-col">
                          <div className="w-full animate-marquee whitespace-nowrap">
                            <h4 className=" m-0 text-md font-bold text-white">
                              {item.name}
                            </h4>
                          </div>
                          <div className="relative h-[80px] lg:h-[160px] w-[100%]">
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
                              // onClick={() => handlePlayClick(index)}
                              className="absolute left-0 top-0 h-full z-50 w-full"
                            ></span>
                            <div
                              onClick={() => {
                                // handlePlayClick(item.url);
                                this.setMediaAndClose(e, { value: item.url });
                              }}
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
                          <div className="">
                            <div className="flex space-x-2 justify-between">
                              <button
                                onClick={() => {
                                  // handlePlayClick(item.url);
                                  this.setMediaAndClose(e, { value: item.url });
                                }}
                                className="btn capitalize bg-white flex-1 text-black/80 hover:bg-white"
                              >
                                Play Now
                              </button>
                              <button
                                onClick={() => {
                                  this.props.playlistAdd(null, {
                                    value: item.url,
                                  });
                                }}
                                className="btn bg-white hover:bg-white"
                              >
                                <img
                                  className="cursor-pointer rotate-180"
                                  src={addPlaylistIcon}
                                  alt=""
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : undefined;
          } else if (query !== '') {
            const data = await getYouTubeResults(query);

            // this.props.setVideoItems(data);
            results =
              data?.length > 0
                ? data?.map((item: SearchResult, index: number) => (
                    <>
                      <div key={item.url} className="">
                        <div className="p-4 w-[25vw] lg:w-[15vw] bg-[#333] rounded-lg">
                          <div className="flex overflow-hidden space-y-2 flex-col">
                            <div className="w-full animate-marquee whitespace-nowrap">
                              <h4 className=" m-0 text-md font-bold text-white">
                                {item.name}
                              </h4>
                            </div>
                            <div className="relative h-[80px] lg:h-[160px] w-[100%]">
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
                                onClick={() => {
                                  this.setMediaAndClose(e, { value: item.url });
                                  this.props.toggleHome();
                                }}
                                className="absolute left-0 top-0 h-full z-50 w-full"
                              ></span>
                              <div
                                onClick={() => {
                                  // handlePlayClick(item.url);
                                  this.setMediaAndClose(e, { value: item.url });
                                }}
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
                            <div className="">
                              <div className="flex space-x-2 justify-between">
                                <button
                                  onClick={() => {
                                    // handlePlayClick(item.url);
                                    this.setMediaAndClose(e, {
                                      value: item.url,
                                    });
                                  }}
                                  className="btn capitalize bg-white hover:bg-white flex-1 text-black/80 "
                                >
                                  Play Now
                                </button>
                                <button
                                  onClick={() => {
                                    this.props.playlistAdd(null, {
                                      value: item.url,
                                    });
                                  }}
                                  className="btn bg-white hover:bg-white"
                                >
                                  <img
                                    className="cursor-pointer rotate-180"
                                    src={addPlaylistIcon}
                                    alt=""
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <Grid.Column
										key={result.url}
										onClick={(e: any) => {
											this.setMediaAndClose(e, { value: result.url });
										}}
										stretched
									>
										<ChatVideoCard
											video={result}
											index={index}
											onPlaylistAdd={this.props.playlistAdd}
											isYoutube
										/>
									</Grid.Column> */}
                    </>
                  ))
                : undefined;
          }

          if (timestamp > this.state.lastResultTimestamp) {
            this.setState({
              loading: false,
              results,
              lastResultTimestamp: timestamp,
            });
          }
        }, 500);
      }

      this.debounced();
    });
  };
  // componentDidUpdate(prevProps: ComboBoxProps, prevState: ComboState) {
  //   console.log({ prevCLip: prevProps.clipboard, currentCLip: this.props.clipboard, boxClip: this.state.currentClipboard, boxPrevCLip: prevState.currentClipboard });
  //   if (this.props.clipboard !== prevProps.clipboard) {
  //     this.setState({ currentClipboard: this.props.clipboard })
  //   }
  // }
  copyFromClipboard = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log('Clipboard text: ', { text });
        if (this.inputRef.current) {
          this.inputRef?.current.focus();
          this.inputRef.current.value = text;
          // this.setState({ currentClipboard: text })
        }
      })
      .catch((err) => {
        if (this.inputRef.current) {
          this.inputRef?.current.focus();
          // this.setState({ currentClipboard: this.props.clipboard })
        }
      });
  };
  setMediaAndClose = (e: any, data: DropdownProps) => {
    window.setTimeout(
      () => this.setState({ inputMedia: undefined, results: undefined }),
      200
    );
    this.props.setMedia(e, data);
    // this.props.toggleHome();
    // this.setState({ isHome: false });
  };
  // backToHome = () => {
  //   this.setState({ isHome: true });
  // }
  componentDidMount() {
    this.updateOpacity(!this.props.currentMediaPaused);
  }

  componentDidUpdate(prevProps: SearchBoxProps) {
    if (prevProps?.currentMediaPaused !== this.props?.currentMediaPaused) {
      this.updateOpacity(!this.props.currentMediaPaused);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  updateOpacity(isPlaying: boolean) {
    if (isPlaying) {
      const interval = setInterval(() => {
        this.setState((prevState: ComboState) => ({
          opacity: prevState.opacity === 1 ? 0.5 : 1,
        }));
      }, 1000);
      this.setState({ intervalId: interval });
    } else {
      clearInterval(this.state.intervalId);
      this.setState({ opacity: 1, intervalId: undefined });
    }
  }

  render() {
    const { currentMedia, getMediaDisplayName, clipboard, toggleHome } =
      this.props;
    const { results } = this.state;

    return (
      <div style={{ position: 'relative' }} className="bg-[#1E1E1E]">
        {/* ====================== SEARCH CONTAINER ====================== */}

        <div
          style={{
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            margin: '0 10px',
          }}
        >
          <MetaButton
            backShadow
            onClick={() => this.props.gotoHomeScreen()}
            className="p-0 border-none"
            img={BackIcon}
            imgClass="rounded-full h-16"
          ></MetaButton>

          <div className={`${styles.inputContainer} flex-1`}>
            <span className="absolute left-3 top-3">
              <img src={searchIcon} alt="s" className="h-6" />
            </span>
            <div>
              <input
                ref={this.inputRef}
                // disabled={this.props.disabled}
                onChange={this.doSearch}
                onFocus={(e: any) => {
                  e.persist();
                  this.setState(
                    {
                      inputMedia:
                        clipboard ?? getMediaDisplayName(currentMedia),
                      isHome: false,
                    },
                    () => {
                      if (
                        !this.state.inputMedia ||
                        this.state.inputMedia ||
                        this.state.inputMedia.startsWith('http')
                      ) {
                        console.log('Searching for', this.state.inputMedia);
                        this.doSearch(e);
                      }
                    }
                  );
                  setTimeout(() => e.target.select(), 100);
                }}
                type="search"
                // onBlur={() => {
                // 	setTimeout(
                // 		() =>
                // 			this.setState({
                // 				inputMedia: undefined,
                // 				results: undefined,
                // 			}),
                // 		200
                // 	);
                // }}
                // onKeyPress={(e: any) => {
                //     if (e.key === 'Enter') {
                //         this.setMediaAndClose(e, {
                //             value: this.state.inputMedia,
                //         });
                //         toggleHome(null, false);
                //     }
                // }}
                defaultValue={
                  this.state.inputMedia !== undefined
                    ? this.state.inputMedia
                    : clipboard
                    ? clipboard
                    : ''
                }
                placeholder="Enter or paste your video URL"
                className="input w-full px-14 py-6 text-lg rounded-xl text-gray bg-white/90 border-none focus:outline-0 focus:border-none focus:ring-0"
              />
            </div>
            <span className="absolute right-0 top-0 cursor-pointer ">
              <button
                className=" bg-white/80  m-1 p-2  active:bg-white/50 border-none rounded-xl"
                onClick={() => this.copyFromClipboard()}
              >
                <img src={clipboardIcon} alt="s" className="h-6" />
              </button>
            </span>
          </div>

          {currentMedia && (
            <div className="relative">
              <button
                onClick={() => toggleHome()}
                className={`btn btn-md font-bold text-[14px] bg-[#EFFF33] hover:bg-[#EFFF33] text-black/80  rounded-xl border-none capitalize opacity-${
                  this.state.opacity * 100
                }`}
              >
                <span className="flex justify-between items-center">
                  <img src={playIcon} alt="" className="h-8 mr-1 opacity-70" />
                  Now Playing
                </span>{' '}
              </button>
            </div>
          )}
          {/* ====================== PLAYLIST content ====================== */}

          {this.props.playlist.length > 0 && (
            <button
              onClick={() => this.props.showPlaylist()}
              className="btn btn-md font-semibold text-xl mx-1 hover:bg-white bg-white text-black/80 rounded-xl outline-0 border-0 active:outline-0 focus:outline-0 capitalize max-w-[12%] flex flex-row gap-2"
            >
              <img src={playlistIcon} alt="" className="h-12 mr-2" />
              {this.props.playlist.length}
            </button>
          )}

          {/* ====================== END PLAYLIST content ====================== */}
        </div>

        {/* ====================== SEARCH CONTAINER END====================== */}

        {/* ====================== Search list result ====================== */}
        {Boolean(results) && (
          <div className={styles.wrapper}>
            <div
              className={`bg-[#3A3A3A] rounded-lg ${styles['list-container']} space-x-3 flex overflow-x-scroll whitespace-nowrap -mt-2  p-2`}
            >
              {results}
            </div>
          </div>
        )}
        {/* ====================== Search list end ====================== */}
      </div>
    );
  }
}
