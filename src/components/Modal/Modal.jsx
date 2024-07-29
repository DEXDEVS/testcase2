import React from "react";
import ProductEditForm from "../ProductEditForm/ProductEditForm";

export default function Modal() {
  return (
    <>
      <dialog id="productEditModal" className="modal" dir="rtl">
        <div className="modal-box max-w-3xl p-14 rounded-md">
          {/* if there is a button in form, it will close the modal */}
          <ProductEditForm isModal={true} />
        </div>
      </dialog>
    </>
  );
}
