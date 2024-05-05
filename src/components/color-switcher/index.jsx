import Image from "next/image";
import clsx from "clsx";
import { useTheme } from "next-themes";

import { IoSunnyOutline } from "react-icons/io5";
import { CiDark } from "react-icons/ci";

const ColorSwitcher = () => {
    const { setTheme } = useTheme();
    return (
        <div className="setColor">
            <button
                type="button"
                className={clsx("light switch-btn")}
                onClick={() => setTheme("light")}
            >
                <h4> <IoSunnyOutline className="mt-4" /> </h4>
            </button>
            <button
                type="button"
                className={clsx("dark switch-btn")}
                onClick={() => setTheme("dark")}
            >
                <h4> <CiDark className="mt-4" /> </h4>
            </button>
        </div>
    );
};

export default ColorSwitcher;
