import React from 'react';
import {PanelTopCloseIcon, SettingsIcon, SidebarClose, XIcon} from "lucide-react";

const Navigation = () => {
    return (
        <div className={"w-fit relative left-0 bg-[#151515] h-screen top-0 bottom-0 items-center justify-between flex flex-col gap-2 p-4 text-white"}>
            <a href={'/'}>
                <a href={"/"} className={"cursor-pointer hover:rotate-90 transition-all"}>
                    <img src={"./icon.png"} width={32} height={32} alt="Must Logo"/>
                </a>
            </a>
            <div className={"gap-6 items-center justify-center flex flex-col"}>
                <a href={"/settings"} className={"cursor-pointer hover:rotate-90 transition-all"}><SettingsIcon size={20}/></a>
                <a className={"cursor-pointer hover:rotate-90 transition-all"}><XIcon size={20}/></a>
            </div>

        </div>
    );
};

export default Navigation;