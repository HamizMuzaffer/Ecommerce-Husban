import React, { memo, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase.Config";

function Card(props) {
  const { name, price, description, img, id } = props;
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  // set modal krke aik state banayi hai jisse modal mai value change hoti rahe warna aik value hi ja rhi
  const [modalOpen, setModalOpen] = useState(true);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      {/* Is function mao productid sirf id aygi kyun kai hamne prop id di hai */}
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
      } else {
        setError("No such document!");
      }
    } catch (error) {
      setError(`Error fetching document: ${error.message}`);
    }
  };

  useEffect(() => {
    if (modalOpen) { {/* if else laga diya hai kai jab bhi modal open ho tabhi function chale */}
      fetchProduct();
    }
  }, [modalOpen]);

  const openModal = () => {
    setModalOpen(true);
    document.getElementById(`my_modal_${id}`).showModal();
    {/* idher id dynamic di hai warna wo same id ki wajah sai fuction sirf aik hi baar chalega*/}
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-row justify-evenly flex-wrap" onClick={openModal}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img
            className="rounded-t-lg object-contain w-56 h-44"
            src={img}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
          </a>

          <p>Price: {price}</p>
        </div>
      </div>

      {modalOpen && (   
        <dialog id={`my_modal_${id}`} className="modal">
          {/* idher product kai name sai fetch kiya hai data to product. krke dena padegi sab chize */}
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            {product ? (
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                  <img
                    src={product.img}
                    alt="Shoes"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{product.name}</h2>
                  <p>{product.description}</p>
                  <h3>{product.price}</h3>
                  <div className="card-actions">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </dialog>
      )}
    </div>
  );
}

export default memo(Card);
