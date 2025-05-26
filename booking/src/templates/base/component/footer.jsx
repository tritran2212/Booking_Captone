import { Facebook } from 'lucide-react';
import { Twitter } from 'lucide-react';
import { Camera } from 'lucide-react';
import { Globe } from 'lucide-react';

export  function Footer(){

    return (

        <>
           <footer className="bg-gray-100 text-gray-600 py-10">
               <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-8">
                  
                   <div>
                       <h5 className="font-bold text-gray-800 mb-4">GIỚI THIỆU</h5>
                       <ul className="space-y-2 text-sm">
                           <li><a href="#" className="hover:underline">Phương thức hoạt động của Airbnb</a></li>
                           <li><a href="#" className="hover:underline">Trang tin tức</a></li>
                           <li><a href="#" className="hover:underline">Nhà đầu tư</a></li>
                           <li><a href="#" className="hover:underline">Airbnb Plus</a></li>
                           <li><a href="#" className="hover:underline">Airbnb Luxe</a></li>
                           <li><a href="#" className="hover:underline">HotelTonight</a></li>
                           <li><a href="#" className="hover:underline">Airbnb for Work</a></li>
                           <li><a href="#" className="hover:underline">Nhờ có Host, mọi điều đều có thể</a></li>
                           <li><a href="#" className="hover:underline">Cơ hội nghề nghiệp</a></li>
                           <li><a href="#" className="hover:underline">Thư của nhà sáng lập</a></li>
                       </ul>
                   </div>

                  
                   <div>
                       <h5 className="font-bold text-gray-800 mb-4">CỘNG ĐỒNG</h5>
                       <ul className="space-y-2 text-sm">
                           <li><a href="#" className="hover:underline">Sự đa dạng và Cảm giác thân thuộc</a></li>
                           <li><a href="#" className="hover:underline">Tiện nghi phù hợp cho người khuyết tật</a></li>
                           <li><a href="#" className="hover:underline">Đối tác liên kết Airbnb</a></li>
                           <li><a href="#" className="hover:underline">Chỗ ở cho tuyến đầu</a></li>
                           <li><a href="#" className="hover:underline">Lượt giới thiệu của khách</a></li>
                           <li><a href="#" className="hover:underline">Airbnb.org</a></li>
                       </ul>
                   </div>

                  
                   <div>
                       <h5 className="font-bold text-gray-800 mb-4">ĐÓN TIẾP KHÁCH</h5>
                       <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Cho thuê nhà</a></li>
                           <li><a href="#" className="hover:underline">Tổ chức Trải nghiệm trực tuyến</a></li>
                           <li><a href="#" className="hover:underline">Tổ chức trải nghiệm</a></li>
                           <li><a href="#" className="hover:underline">Đón tiếp khách có trách nhiệm</a></li>
                           <li><a href="#" className="hover:underline">Trung tâm tài nguyên</a></li>
                           <li><a href="#" className="hover:underline">Trung tâm cộng đồng</a></li>
                       </ul>
                   </div>

                
                   <div>
                       <h5 className="font-bold text-gray-800 mb-4">HỖ TRỢ</h5>
                       <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Biện pháp ứng phó với đại dịch COVID-19 của chúng tôi</a></li>
                           <li><a href="#" className="hover:underline">Trung tâm trợ giúp</a></li>
                           <li><a href="#" className="hover:underline">Các tùy chọn hủy</a></li>
                           <li><a href="#" className="hover:underline">Hỗ trợ khu dân cư</a></li>
                           <li><a href="#" className="hover:underline">Tin cậy và an toàn</a></li>
                       </ul>
                   </div>
               </div>

             
               <div className="max-w-screen-lg mx-auto mt-8 pt-8 border-t border-gray-300 flex flex-col md:flex-row items-center justify-between px-8 text-sm text-gray-600">
                  
                   <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                       <span>© 2021 Airbnb, Inc. All rights reserved</span>
                       <span>·</span>
                       <a href="#" className="hover:underline">Quyền riêng tư</a>
                       <span>·</span>
                       <a href="#" className="hover:underline">Điều khoản</a>
                       <span>·</span>
                       <a href="#" className="hover:underline">Sơ đồ trang web</a>
                   </div>

                  
                   <div className="flex items-center space-x-6 mt-4 md:mt-0">
                     
                       <div className="flex items-center space-x-2">
                           <Globe className="h-5 w-5" />
                           <a href="#" className="hover:underline">Tiếng Việt(VN)</a>
                           <span>·</span>
                           <a href="#" className="hover:underline">$ USD</a>
                       </div>
                       <div className="flex items-center space-x-4">
                           <a href="#"><Facebook className="h-5 w-5 hover:text-gray-800"/></a>
                           <a href="#"><Twitter className="h-5 w-5 hover:text-gray-800"/></a>
                           <a href="#"><Camera className="h-5 w-5 hover:text-gray-800"/></a>
                       </div>
                   </div>
               </div>
           </footer>
        </>
    )
}