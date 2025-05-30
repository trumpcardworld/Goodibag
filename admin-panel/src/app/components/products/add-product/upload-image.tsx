import React from "react";
import Image from "next/image";
import upload_default from "@assets/img/icons/upload.png";
import { SmClose } from "@/svg";
import useCloudinary from "@/hooks/useCloudinary";

type IPropType = {
  file: { url: string; id: string };
  setFormData?: React.Dispatch<React.SetStateAction<string[]>>;
  setImgUrl?: React.Dispatch<React.SetStateAction<string>>;
  isCenter?:boolean;
};
const UploadImage = ({ file,setFormData,setImgUrl,isCenter=false }: IPropType) => {
  const {handleDeleteImg,item} = useCloudinary(file,setFormData,setImgUrl);
  return (
    <>
      {item.url && (
        <div className={`flex flex-row flex-wrap ${isCenter?'items-center justify-center':''}`}>
          <div className="relative">
            <Image
              className="inline-flex border rounded-md border-gray6 w-24 max-h-24 p-2"
              src={item.url}
              alt="productImg"
              width={100}
              height={100}
            />
            <button
              onClick={() => handleDeleteImg(file)}
              type="button"
              className="absolute -top-4 -right-3 text-red-500 focus:outline-none"
            >
              <SmClose />
            </button>
          </div>
        </div>
      )}
      {!item.url && (
        <div className={`flex flex-row flex-wrap ${isCenter?'items-center justify-center':''}`}>
          <div className="relative">
            <Image
              className="inline-flex border rounded-md border-gray6 w-24 max-h-24 p-2"
              src={upload_default}
              alt="productImg"
              width={100}
              height={100}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UploadImage;















// import React, { useState } from "react";
// import Image from "next/image";
// import upload_default from "@assets/img/icons/upload.png";
// import { SmClose } from "@/svg";
// import useCloudinary from "@/hooks/useCloudinary";

// type IPropType = {
//   file: { url: string; id: string };
//   setFormData?: React.Dispatch<React.SetStateAction<string[]>>;
//   setImgUrl?: React.Dispatch<React.SetStateAction<string>>;
//   isCenter?: boolean;
//   size?: 'sm' | 'md' | 'lg';
//   showDeleteConfirm?: boolean;
//   onDelete?: (file: { url: string; id: string }) => void;
//   className?: string;
//   alt?: string;
//   loading?: boolean;
// };

// const UploadImage = ({ 
//   file,
//   setFormData,
//   setImgUrl,
//   isCenter = false,
//   size = 'md',
//   showDeleteConfirm = false,
//   onDelete,
//   className = '',
//   alt = 'productImg',
//   loading = false
// }: IPropType) => {
//   const { handleDeleteImg, item } = useCloudinary(file, setFormData, setImgUrl);
//   const [imageError, setImageError] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   // Size configurations
//   const sizeClasses = {
//     sm: 'w-16 max-h-16',
//     md: 'w-24 max-h-24',
//     lg: 'w-32 max-h-32'
//   };

//   const sizeProps = {
//     sm: { width: 64, height: 64 },
//     md: { width: 100, height: 100 },
//     lg: { width: 128, height: 128 }
//   };

//   const handleDelete = async () => {
//     if (showDeleteConfirm) {
//       setShowConfirm(true);
//     } else {
//       await handleDeleteImg(file);
//       onDelete?.(file);
//     }
//   };

//   const confirmDelete = async () => {
//     await handleDeleteImg(file);
//     onDelete?.(file);
//     setShowConfirm(false);
//   };

//   const cancelDelete = () => {
//     setShowConfirm(false);
//   };

//   const handleImageError = () => {
//     setImageError(true);
//   };

//   const containerClasses = `
//     flex flex-row flex-wrap 
//     ${isCenter ? 'items-center justify-center' : ''} 
//     ${className}
//   `.trim();

//   return (
//     <>
//       {item.url && !imageError ? (
//         <div className={containerClasses}>
//           <div className="relative group">
//             {loading && (
//               <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md z-10">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
//               </div>
//             )}
            
//             <Image
//               className={`
//                 inline-flex border rounded-md border-gray6 p-2 transition-all duration-200
//                 ${sizeClasses[size]}
//                 ${loading ? 'opacity-50' : 'group-hover:shadow-md'}
//               `}
//               src={item.url}
//               alt={alt}
//               width={sizeProps[size].width}
//               height={sizeProps[size].height}
//               onError={handleImageError}
//               priority={false}
//               style={{ objectFit: 'cover' }}
//             />
            
//             {!loading && (
//               <button
//                 onClick={handleDelete}
//                 type="button"
//                 className="
//                   absolute -top-4 -right-3 text-red-500 hover:text-red-700 
//                   focus:outline-none opacity-0 group-hover:opacity-100 
//                   transition-opacity duration-200 bg-white rounded-full p-1 shadow-sm
//                 "
//                 aria-label="Delete image"
//               >
//                 <SmClose />
//               </button>
//             )}

//             {/* Delete Confirmation Modal */}
//             {showConfirm && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                 <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                     Delete Image?
//                   </h3>
//                   <p className="text-gray-600 mb-4">
//                     This action cannot be undone. Are you sure you want to delete this image?
//                   </p>
//                   <div className="flex justify-end space-x-3">
//                     <button
//                       onClick={cancelDelete}
//                       className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={confirmDelete}
//                       className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className={containerClasses}>
//           <div className="relative">
//             <Image
//               className={`
//                 inline-flex border rounded-md border-gray6 p-2 
//                 ${sizeClasses[size]}
//                 ${imageError ? 'border-red-300' : 'border-dashed'}
//               `}
//               src={upload_default}
//               alt="Upload placeholder"
//               width={sizeProps[size].width}
//               height={sizeProps[size].height}
//             />
            
//             {imageError && (
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <span className="text-red-500 text-xs text-center px-2">
//                   Failed to load image
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UploadImage;