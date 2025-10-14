import React from "react";

const Modal = ({ isOpen, closeModal, title, content }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg w-80"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-4">{content}</div>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-full"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
