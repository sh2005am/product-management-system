import React from 'react'
import { useState } from 'react'
import { MdClose } from 'react-icons/md'
import { addItem } from '../../api/productApi'

const AddProducts = (props) => {
    const [name,setName]=useState('')
    const [image,setImage]=useState('')
    const [price,setPrice]=useState('')
    const [sku,setSku]=useState('')
    const [stock,setStock]=useState('')

    const handleSubmitProduct= async (e)=> {
        e.preventDefault()
        if(name.trim()===''||price.trim()==='')
        {
            alert("enter correct value")
            return;
        }
        try {
            const newProduct= await addItem({name,image,price,sku,stock})
            props.onAdded(newProduct)
        } catch (error) {
            console.log(error.message)
        }
       
        setName('')
        setImage('')
        setPrice('')
        setSku('')
        setStock('')

    }

  return (
    <div>
         <form onSubmit={handleSubmitProduct}className="formcomp">
                    <div className="header">
                        <h1>Add Product</h1>
                        <MdClose onClick={props.onCancel} size={50} />
                    </div>
                    <label htmlFor="enter-name" >&nbsp;product name</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="glass-effect" placeholder='Enter name of product' />
                    <label htmlFor="sku">&nbsp;SKU:</label>
                    <input type="text" className=" glass-effect" value={sku} onChange={(e)=>setSku(e.target.value)} placeholder='Enter shelf or shelf no' />
                    <div className='sec'>
                        <div className="cont">
                        <label htmlFor="add-price" >&nbsp;price:</label>
                        <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)}/>
                        </div>
                        <div className="cont">
                            <label htmlFor="stock" >&nbsp;Stock:</label>
                        <input type="number" value={stock} onChange={(e)=>setStock(e.target.value)}/>
                        </div>
                        
                    </div>
                    <label htmlFor="urli" >&nbsp;Image URL:</label>
                    <input type="url" value={image} onChange={(e)=>setImage(e.target.value)} placeholder='https://...'/>
                    <div className="btns">
                        <button className="discard btn2" onClick={props.onCancel}>Discard</button>
                        <button className="addbtn btn2" type="submit" >Add Product</button>
                    </div>
                </form>
      
    </div>
  )
}

export default AddProducts
