import React from 'react'
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { deleteItem } from '../../api/productApi';
import './Cards.css'
const placeholderColors = [
  '81B29A',
  'F2CC8F',
  'E07A5F',
  '3D405B',
  '81e19a',
];
const Cards = (props) => {
  const colorIndex = props.prodValue.name.length % placeholderColors.length;
  const backgroundColor = placeholderColors[colorIndex];
  const textColor = 'FFFFFF';

  const placeholderImageUrl = `https://placehold.co/200x200/${backgroundColor}/${textColor}?text=${encodeURIComponent(props.prodValue.name)}`;

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = placeholderImageUrl;
  };
  const handleDelete = async () => {
    try {
      const deletedItem = await deleteItem(props.prodValue._id);
      if (deletedItem) {
        props.onDelete(props.prodValue._id);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
  return (

    <div className='card glass-effect'>
      <div className="card-up">
        <img src={props.prodValue.image || placeholderImageUrl} onError={handleImageError} width={224} height={160} className='card-image' alt="no image" />
      </div>
      <div className="card-down">
        <h3>{props.prodValue.name}</h3>
        <div className="shelf">shelf-no {props.prodValue.sku}</div>
        <div className="features">
          <h2 className="price">${props.prodValue.price}</h2>
          <div className="stock">{props.prodValue.stock} in stock</div>

        </div>
        <div className="icons">
          <MdOutlineModeEdit className='edit' onClick={props.onEdit} size={50} />
          <MdOutlineDelete className='delete' onClick={handleDelete} size={50} />
        </div>
      </div>
      <div className="card-overlay"></div>
    </div>
  )
}

export default Cards
