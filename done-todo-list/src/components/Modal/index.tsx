import { useEffect, useState } from "react";
import GenericButton from "../Button/GenericButton";
import { ModalProps } from "./Modal.types";

function Modal({ isOpen, onClose, onAdd, bgColor }: ModalProps) {
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isOpen) setDescription("");
  }, [isOpen]);

  if (!isOpen) return null;

  const isDisabled = description.trim().length === 0;

  const handleAddCard = () => {
    if (isDisabled) return;
    onAdd(description.trim());
    setDescription("");
    onClose();
  };

  const handleCancel = () => {
    setDescription("");  
    onClose();            
  };

  return (
    <div className={`${bgColor} w-96 p-6 rounded-xl shadow-lg fixed bottom-24 right-4`}>
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-light-primary-2 text-xl font-semibold">Description</h5>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="bg-white w-full p-3 border-transparent rounded-xl text-black placeholder-light-primary-1 focus:outline-none focus:ring-2 focus:ring-light-primary-1"
        />
      </div>

      <div className="flex justify-end gap-3">
        <GenericButton
          text="Cancel"
          bgColor="bg-dark-red"
          textColor="text-light-pink-2"
          onClick={handleCancel}
        />
        <GenericButton
          text="Add"
          bgColor="bg-light-primary-2"
          textColor="text-primary"
          onClick={handleAddCard}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
}

export default Modal;



// import { useState } from "react";
// import GenericButton from "../Button/GenericButton";
// import { Modal as ModalTypes } from "./Modal.types";
// import AddButton from "../Button/AddButton";

// function Modal({ bgColor }: ModalTypes) {
//     const [description, setDescription] = useState('');
//     const [isOpen, setIsOpen] = useState(false);

//     const handleClose = () => setIsOpen(false);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setDescription(e.target.value);
//     };

//     const handleAddCard = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (description) {
//             console.log("Card added: ", description);
//             setDescription('');
//             handleClose();
//         }
//     };

//     return (
//         <div className="relative">
//             <AddButton onClick={() => {
//                 setIsOpen(!isOpen);
//                 setDescription('');
//             }} desktop={'desktop'} />
//             {isOpen && (
//                 <div className={`${bgColor} w-96 p-6 rounded-xl shadow-lg fixed bottom-22 right-4`}>
//                     <div className="flex justify-between items-center mb-4">
//                         <h5 className="text-light-primary-2 text-xl font-semibold">Description</h5>
//                     </div>
//                     <form onSubmit={handleAddCard} className="mb-4">
//                         <input
//                             type="text"
//                             value={description}
//                             onChange={handleInputChange}
//                             placeholder="Enter description"
//                             className="bg-white w-full p-3 border-transparent rounded-xl text-black placeholder-light-gray focus:outline-none focus:ring-2 focus:ring-light-primary-1"
//                         />
//                     </form>
//                     <div className="flex justify-end space-x-4">
//                         <GenericButton
//                             text="Cancel"
//                             bgColor="bg-dark-red"
//                             textColor="text-light-pink-2"
//                             onClick={handleClose}
//                         />
//                         <GenericButton
//                             text="Add"
//                             bgColor="bg-light-primary-2"
//                             textColor="text-primary"
//                             onClick={handleAddCard}
//                         />
//                     </div>
//                 </div>
//             )
//             }

//         </div>
//     );
// }

// export default Modal;