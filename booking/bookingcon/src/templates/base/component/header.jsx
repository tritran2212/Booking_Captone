import { Globe } from 'lucide-react';
import { AlignJustify } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { use, useState } from 'react';
import { useNavigate } from 'react-router';
import { managerStorage } from '../../../common/utils/localstorage';
import { KEY_ACCESS_TOKEN } from '../../../common/constants';
import{useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { User } from 'lucide-react';
import { useEffect } from 'react';
import { setUser } from '../../../store/user.slice';
function LogoIcon (){

    return  (
        <>
            <img src="/Airbnb_Logo.png" alt="Airbnb Logo" width={100} height={100} className="text-pink-500"/>
        </>

    )
}
export   function Header() {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const user = useSelector((store)=>{
         return  store.userReducer.user;
    });
    useEffect (()=>{
        if(!user){
            let  useLocal = managerStorage.get("user");
            if(typeof useLocal === "string"){
                 useLocal = JSON.parse(useLocal);
                
            }
            if(useLocal){
                dispath(setUser(useLocal));
            }
        }
    },[dispath,user])
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleIconClick = () => setIsMenuOpen(!isMenuOpen);

    const handleLogin = () => { 
        navigate('/login'); 
        setIsMenuOpen(false); };

    const handleRegister = () => { 
        navigate('/register'); 
        setIsMenuOpen(false); };
        
    const handleLogout = () => {
        managerStorage.remove(KEY_ACCESS_TOKEN);
        navigate('/login');
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="sticky top-0 z-50 grid grid-cols-3 bg-black shadow-md p-5 md:px-10">
                {/* Left */}
                <div className="relative flex items-center h-10 cursor-pointer my-auto">
                    <LogoIcon />
                </div>
                {/* Middle */}
                <div className="hidden md:flex items-center justify-center space-x-6 text-sm text-white py-2 bg-black">
                    <p className="cursor-pointer border-b-2 border-transparent hover:border-gray-400 pb-1 transition duration-100 ease-out">Nơi ở</p>
                    <p className="cursor-pointer border-b-2 border-transparent hover:border-gray-400 pb-1 transition duration-100 ease-out">Trải nghiệm</p>
                    <p className="cursor-pointer border-b-2 border-transparent hover:border-gray-400 pb-1 transition duration-100 ease-out">Trải nghiệm trực tuyến</p>
                </div>
                {/* Right */}
                <div className="flex items-center space-x-4 justify-end text-white">
                    <p className="hidden md:inline cursor-pointer text-sm">Đón tiếp khách</p>
                    {user !== null ? (
                        <>
                            <User className="h-6 w-6 cursor-pointer" />
                            <div
                                className="relative flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer bg-white text-gray-500"
                                onClick={handleIconClick}
                            >
                                <AlignJustify className="h-6 w-6" />
                                <LogIn className="h-6 w-6" />
                                <span className="absolute top-1 right-1 z-10 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span>
                                {isMenuOpen && (
                                    <div className="absolute top-12 right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 text-gray-800">
                                        <button onClick={handleLogin} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Đăng nhập</button>
                                        <button onClick={handleRegister} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Đăng ký</button>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t border-gray-200">Đăng xuất</button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <Globe className="h-6 w-6 cursor-pointer" />
                            <div
                                className="relative flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer bg-white text-gray-500"
                                onClick={handleIconClick}
                            >
                                <AlignJustify className="h-6 w-6" />
                                <LogIn className="h-6 w-6" />
                                <span className="absolute top-1 right-1 z-10 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">2</span>
                                {isMenuOpen && (
                                    <div className="absolute top-12 right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20 text-gray-800">
                                        <button onClick={handleLogin} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Đăng nhập</button>
                                        <button onClick={handleRegister} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Đăng ký</button>
                                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 border-t border-gray-200">Đăng xuất</button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}