import React from 'react'
import { useForm } from 'react-hook-form'
import { addProduct } from './Productservice'

export default function AddProduct() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
    
      const onSubmit = async (data) => {
        try {
          await addProduct(data)
          console.log(data)
          reset()
          alert('Product added successfully')
          window.location.href = "/";
        } catch (error) {
          console.error(error)
        }
    
      }

  return (
    <>
    <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>Add Product</button>
<dialog id="my_modal_1" className="modal">
  
    
    
    <div className="modal-action">
        <div className="modal-box">
        <h3 className="font-bold text-lg">Add product Details</h3>  
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" {...register("name",{require: true })}/>
          {errors.name && <span>required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" id="price" name="price" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" {...register("price" ,{required:true})} />
          {errors.price && <span>required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" rows="3" className="mt-1 p-2 block w-full border border-gray-300 rounded-md " {...register ("description" ,{required:true})}></textarea>
          {errors.description && <span>required</span>}
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" id="image" name="image" accept="image/*" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" {...register("img" ,{required:true})} />
          {errors.img && <span>required</span>}
        </div>
        <button type="submit" className="btn">Submit</button>
        <button type="button" className="btn" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
      </form>
    </div>
  </div>
</dialog>

</>
  )
}

