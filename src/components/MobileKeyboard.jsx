import { useEffect, useState, useRef } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "./MobileKeyboard.css";
import keySound from "../assets/key-press.wav";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= breakpoint,
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  return isMobile;
}

export default function MobileKeyboard({
  value = "",
  onChange,
  onKeyPress,
  breakpoint = 768,
  inputName = "mobileInput",
}) {
  const isMobile = useIsMobile(breakpoint);
  const [layoutName, setLayoutName] = useState("default");
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(keySound);
    audioRef.current.volume = 0.3;
  }, []);

  if (!isMobile) return null;

  function playSound() {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }

  function handleKeyPress(button) {
    playSound();

    if (button === "{shift}") {
      setLayoutName((prev) => (prev === "default" ? "shift" : "default"));
    } else if (button === "{numbers}") {
      setLayoutName("numbers");
    } else if (button === "{abc}") {
      setLayoutName("default");
    }

    onKeyPress?.(button);
  }

  return (
    <div className="mobile-keyboard-wrap">
      <Keyboard
        layoutName={layoutName}
        inputName={inputName}
        input={value}
        onChange={(val) => onChange?.(val)}
        onKeyPress={handleKeyPress}
        theme="hg-theme-default hg-layout-default mobile-keyboard"
        layout={{
          default: [
            "q w e r t y u i o p",
            "a s d f g h j k l",
            "{shift} z x c v b n m {bksp}",
          ],
          shift: [
            "Q W E R T Y U I O P",
            "A S D F G H J K L",
            "{shift} Z X C V B N M {bksp}",
          ],
        }}
        display={{
          "{bksp}": "⌫",
          "{enter}": "OK",
          "{space}": "espaço",
          "{shift}": "⇧",
          "{numbers}": "123",
          "{abc}": "ABC",
        }}
      />
    </div>
  );
}
