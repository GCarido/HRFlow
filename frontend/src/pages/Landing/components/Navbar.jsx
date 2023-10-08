import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import HRFlowLogo_Dark from "@Assets/svg/HRFlowLogo_Dark.svg";

const Navbar = ( props ) => {
    const navigate = useNavigate();
    const { sectionRefs } = props;
    const [toggleMenu, setToggleMenu] = useState(false);

    const toggleMenuHandler = () => {
        setToggleMenu(!toggleMenu);
    };

    const menuItemClickHandler = (refName) => {
        sectionRefs[refName].current.scrollIntoView({ behavior: "smooth" });
        toggleMenuHandler();
    };
    
    const onClickRoute = () => navigate("/auth/login");

        return (
            <nav className="fixed top-0 w-full bg-white z-50">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="flex mx-auto justify-between items-center w-full px-4">
                        {/* Primary menu and logo */}
                        <div className="flex items-center my-6">
                            {/* logo */}
                            <div>
                                <Link to="/"
                                    onClick={() => menuItemClickHandler("homeRef")}
                                    className="flex gap-1 font-bold text-gray-700 items-center"
                                >
                                    <img
                                        src={HRFlowLogo_Dark}
                                        alt="HR Flow Logo"
                                        className="h-16"
                                    />
                                </Link>
                            </div>
                        </div>
                        {/* secondary */}
                        <div className="flex gap-6">
                            <div className="hidden xs:flex items-center gap-10 text-jetblack">
                                <div className="hidden lg:flex items-center gap-8 2xl:gap-10 font-semibold text-lg 2xl:text-xl transition-all ease-in">
                                    <p
                                        onClick={() => menuItemClickHandler("homeRef")} 
                                        className="hover:text-primary-dark hover:cursor-pointer"
                                    >
                                        Home
                                    </p>
                                    <p onClick={() => menuItemClickHandler("servicesRef")} className="hover:text-primary-dark hover:cursor-pointer">
                                        Services
                                    </p>
                                    <p onClick={() => menuItemClickHandler("aboutRef")} className="hover:text-primary-dark hover:cursor-pointer">
                                        About
                                    </p>
                                    <p onClick={() => menuItemClickHandler("contactRef")} className="hover:text-primary-dark hover:cursor-pointer">
                                        Contact Us
                                    </p>
                                    <button onClick={onClickRoute}  className="bg-primary-light px-8 py-1.5 2xl:px-10 2xl:py-2 rounded-full text-white hover:bg-primary-dark">
                                        Sign In
                                    </button>
                                </div>

                            </div>
                            {/* Mobile navigation toggle */}
                            <div className="lg:hidden flex items-center">
                                <button
                                    className="p-2 rounded-md hover:bg-gray-0"
                                    onClick={() => setToggleMenu(!toggleMenu)}>
                                    {
                                        toggleMenu
                                            ? <MdOutlineClose size={38} className="text-zinc-600 " />
                                            : <FiMenu size={38} className="text-zinc-600 " />
                                    }
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                {/* mobile navigation */}
                <div
                    className={`fixed z-40 w-5/6 bg-primary-pastel shadow-lg text-jetblack font-semibold rounded-3xl overflow-hidden flex flex-col px-6 lg:hidden gap-12 origin-top duration-1200 ${!toggleMenu ? "h-0" : "h-auto"
                        } left-1/2 transform -translate-x-1/2 mt-2`}
                >
                    <div className="py-8">
                        <div className="text-gray-700 flex flex-col gap-8 w-full tracking-wide text-xl">
                            <p 
                                onClick={() => menuItemClickHandler("homeRef")} 
                                className="hover:text-jetblack">
                                Home
                            </p>
                            <p onClick={() => menuItemClickHandler("servicesRef")} className="hover:text-jetblack">
                                Services
                            </p>
                            <p onClick={() => menuItemClickHandler("aboutRef")} className="hover:text-jetblack">
                                About
                            </p>
                            <p onClick={() => menuItemClickHandler("contactRef")} className="hover:text-jetblack">
                                Contact Us
                            </p>
                            <button className="w-full bg-primary-light rounded-full text-white py-3 hover:bg-primary-dark">
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>
            {/* mobile navigation */}
            <div
                className={`fixed z-40 w-5/6 bg-primary-pastel shadow-lg text-jetblack font-semibold rounded-3xl overflow-hidden flex flex-col px-6 lg:hidden gap-12 origin-top duration-1200 ${!toggleMenu ? "h-0" : "h-auto"
                    } left-1/2 transform -translate-x-1/2 mt-2`}
            >
                <div className="py-8">
                    <div className="text-gray-700 flex flex-col gap-8 w-full tracking-wider">
                        <p 
                            onClick={() => menuItemClickHandler("homeRef")} 
                            className="hover:text-jetblack">
                            Home
                        </p>
                        <p onClick={() => menuItemClickHandler("servicesRef")} className="hover:text-jetblack">
                            Services
                        </p>
                        <p onClick={() => menuItemClickHandler("aboutRef")} className="hover:text-jetblack">
                            About
                        </p>
                        <p onClick={() => menuItemClickHandler("contactRef")} className="hover:text-jetblack">
                            Contact Us
                        </p>
                        <button onClick={onClickRoute} className="w-full bg-primary-light rounded-xl text-white py-2">
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;