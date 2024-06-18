import Typewriter from "typewriter-effect";
import { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css"; // 新增 CSS 文件导入

function App() {
  const messages = [
    "Build GPTs in Minutes, No Coding Required",
    "Create your own AI tools effortlessly",
    "Unlock the power of AI for everyone",
  ];
  const [typingDone, setTypingDone] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (typingDone) {
      setTimeout(() => {
        setShowTypewriter(false);
        setTimeout(() => {
          setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
          setShowTypewriter(true);
          setTypingDone(false);
        }, 500);
      }, 500);
    }
  }, [typingDone, messages.length]);

  return (
    <div className="flex w-full h-screen bg-black">
      <div className="bg-purple-900 relative hidden flex-1 flex-col justify-center px-5 pt-8 text-[#FE7600] dark:text-[#D292FF] md:flex md:px-6 md:py-[22px] lg:px-8">
        <CSSTransition
          in={showTypewriter}
          timeout={500}
          classNames="slide"
          unmountOnExit
          nodeRef={nodeRef}
        >
          <div
            ref={nodeRef}
            className="flex flex-col text-[32px] leading-[1.2] md:text-[40px]"
          >
              <Typewriter
                key={messageIndex}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(messages[messageIndex])
                    .pauseFor(1500)
                    .callFunction(() => {
                      setTypingDone(true);
                    })
                    .start();
                }}
                options={{
                  wrapperClassName: "text-[white]",
                  cursor: "​●",
                  loop: false,
                  delay: 50,
                  deleteSpeed: Infinity,
                  cursorClassName: "text-[white] ml-2 mt-1 text-[40px]",
                }}
              />
          </div>
        </CSSTransition>
      </div>
      <div className="relative flex grow flex-col items-center justify-between bg-white px-5 py-8 text-black dark:bg-black dark:text-white sm:rounded-t-[30px] md:rounded-none md:px-6"></div>
    </div>
  );
}

export default App;
