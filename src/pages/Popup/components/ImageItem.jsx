import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom';
import { ROUTER_NAME } from '../../../constants';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ImageItem = ({ item, isChecked = false, changeChecked }) => {
  const history = useHistory();
  const [checked, setChecked] = useState(false);
  const [size, setSize] = useState(null);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked])

  const handleChangeSelect = (e) => {
    const result = e.target.checked;

    changeChecked(item, result);
    setChecked(result);
  }

  useEffect(() => {
    const img = new Image();
    img.src = item.url;

    img.onload = () => {
      setSize({
        width: img.width,
        height: img.height
      });
    }
  }, [])

  const goToDetail = () => {
    history.push({ pathname: ROUTER_NAME.IMAGE_DETAIL, state: item });
  }

  return (
    <div className='col-6 ct__col'>
      <div className='image__item'>
        <div className="checkbox">
          <Checkbox {...label} checked={checked} onChange={handleChangeSelect} />
        </div>
        <img src={item.url} onClick={goToDetail} />
        <span className='image__item__size'>{size ? `${size.width} x ${size.height} px` : ''}</span>
      </div>
    </div>
  )
}

export default ImageItem
