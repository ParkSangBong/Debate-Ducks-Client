import { useState } from "react";
import { useRouter } from "next/router";
import {
  IoMic,
  IoMicOff,
  IoVideocam,
  IoVideocamOff,
  IoPlay,
} from "react-icons/io5";
import { MdOutlineScreenShare, MdStop, MdDoubleArrow } from "react-icons/md";
import { TbArrowBarRight } from "react-icons/tb";

import { screenShare } from "../../../../utils/debates/debateroom/screenShare";
import {
  toggleMic,
  toggleReady,
  toggleVideo,
} from "../../../../utils/debates/debateroom/toggle";
import { offScreenShare } from "../../../../utils/debates/debateroom/screenShare";
import styles from "../Buttons.module.scss";

import ConfirmModal from "../../../common/modal/ConfirmModal";

import { IDebateroom } from "../../../../types";

export default function Buttons({
  peerRef,
  streamRef,
  videoRef,
  screenStreamRef,
  isMicOn,
  setIsMicOn,
  isVideoOn,
  setIsVideoOn,
  isScreenOn,
  setIsScreenOn,
  isReady,
  setIsReady,
  isStart,
  turn,
  recorderRef,
  curDebate,
  setCurDebate,
  handleReady,
}: Pick<
  IDebateroom,
  | "peerRef"
  | "streamRef"
  | "videoRef"
  | "screenStreamRef"
  | "isMicOn"
  | "setIsMicOn"
  | "isVideoOn"
  | "setIsVideoOn"
  | "isScreenOn"
  | "setIsScreenOn"
  | "isReady"
  | "setIsReady"
  | "isStart"
  | "turn"
  | "recorderRef"
  | "curDebate"
  | "setCurDebate"
  | "handleReady"
>) {
  const router = useRouter();
  const [isExitModalOn, setIsExitModalOn] = useState<boolean>(false);

  //# 오디오 비활성화 여부
  const checkAudioDisable = () => {
    if (turn === "notice") return true;
    return false;
  };

  //# 화면 공유 비활성화 여부
  const checkScreenShareDisable = () => {
    if (isScreenOn) return true;
    if (!isStart && isReady) return true;
    if (turn === "notice") return true;
    if (turn === "cons") return true;
    return false;
  };

  //# 나가기
  const handleExit = () => {
    if (recorderRef.current?.state === "recording") {
      recorderRef.current?.stop();
    }
    offScreenShare({
      peerRef,
      streamRef,
      videoRef,
      screenStreamRef,
      setIsScreenOn,
    });
    streamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });
    router.push(`/q&a`);
  };

  return (
    <>
      {isExitModalOn ? (
        <ConfirmModal
          title={"나가기"}
          content={"토론방을 나가시겠습니까?"}
          firstBtn={"머무르기"}
          firstFunc={() => {
            setIsExitModalOn(false);
          }}
          secondBtn={"나가기"}
          secondFunc={handleExit}
        />
      ) : null}
      <div className={styles.btn_box}>
        {checkAudioDisable() ? (
          <div className={styles.box}>
            <div className={`${styles.btn} ${styles.btn_disabled}`}>
              <IoMicOff />
            </div>
            <div className={styles.name}>음소거 해제</div>
          </div>
        ) : (
          <div
            onClick={() =>
              toggleMic({ streamRef, isMicOn: !isMicOn, setIsMicOn })
            }
          >
            {isMicOn ? (
              <div className={styles.box}>
                <div className={`${styles.btn} ${styles.btn_pros}`}>
                  <IoMic />
                </div>
                <div className={styles.name}>음소거</div>
              </div>
            ) : (
              <div className={styles.box}>
                <div className={`${styles.btn} ${styles.btn_cons}`}>
                  <IoMicOff />
                </div>
                <div className={styles.name}>음소거 해제</div>
              </div>
            )}
          </div>
        )}
        <div
          onClick={() =>
            toggleVideo({ streamRef, isVideoOn: !isVideoOn, setIsVideoOn })
          }
        >
          {isVideoOn ? (
            <div className={styles.box}>
              <div className={`${styles.btn} ${styles.btn_pros}`}>
                <IoVideocam />
              </div>
              <div className={styles.name}>비디오 중지</div>
            </div>
          ) : (
            <div className={styles.box}>
              <div className={`${styles.btn} ${styles.btn_cons}`}>
                <IoVideocamOff />
              </div>
              <div className={styles.name}>비디오 시작</div>
            </div>
          )}
        </div>
        {checkScreenShareDisable() ? (
          <div className={styles.box}>
            <div className={`${styles.btn} ${styles.btn_disabled}`}>
              <MdOutlineScreenShare />
            </div>
            <div className={styles.name}>화면공유</div>
          </div>
        ) : (
          <div className={styles.box}>
            <div
              className={`${styles.btn} ${styles.btn_pros}`}
              onClick={() =>
                screenShare({
                  peerRef,
                  streamRef,
                  videoRef,
                  screenStreamRef,
                  setIsScreenOn,
                })
              }
            >
              <MdOutlineScreenShare />
            </div>
            <div className={styles.name}>화면공유</div>
          </div>
        )}
        {isStart ? (
          <div className={styles.box}>
            <div
              className={`${styles.btn} ${styles.btn_pros}`}
              onClick={() => {
                if (curDebate.turn > 6) return;
                setCurDebate((prevState) => ({
                  ...prevState,
                  time: 1,
                }));
              }}
            >
              <MdDoubleArrow />
            </div>
            <div className={styles.name}>넘기기</div>
          </div>
        ) : (
          <div
            onClick={() => {
              toggleReady({ isReady: !isReady, setIsReady });
              handleReady();
            }}
          >
            {isReady ? (
              <div className={styles.box}>
                <div className={`${styles.btn} ${styles.btn_pros}`}>
                  <MdStop />
                </div>
                <div className={styles.name}>준비 취소</div>
              </div>
            ) : (
              <div className={styles.box}>
                <div className={`${styles.btn} ${styles.btn_cons}`}>
                  <IoPlay />
                </div>
                <div className={styles.name}>준비</div>
              </div>
            )}
          </div>
        )}
        <div className={styles.box} onClick={() => setIsExitModalOn(true)}>
          <div className={`${styles.btn} ${styles.btn_pros}`}>
            <TbArrowBarRight />
          </div>
          <div className={styles.name}>나가기</div>
        </div>
      </div>
    </>
  );
}
