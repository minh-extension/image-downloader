import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useHistory, useLocation } from 'react-router-dom';

const ImageDetail = () => {
  const history = useHistory();
  const { state } = useLocation();
  const [data, setData] = useState(null);

  const goBack = () => {
    history.goBack();
  }

  const downloadImage = () => {
    if (data) {
      let a = document.createElement("a");
      a.href = data.url;
      a.download = "";
      a.click();
    }
  };

  useEffect(() => {
    if (state) {
      convertData(state);
    }
  }, [state])

  const convertData = async (state) => {
    let newData = state;

    const filename = (newData.url || '').substring((newData.url || '').lastIndexOf('/') + 1);
    const imageSize = await getImageSize(newData.url);

    newData.filename = filename;
    newData.size = imageSize;

    setData(newData);
  }

  const getImageSize = (url) => {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        res({
          width: img.width,
          height: img.height
        });
      }
    })
  }

  return (
    <>
      <header>
        <div className='d-flex justify-content-between align-items-center'>
          <IconButton aria-label="delete" size="small" className='clear__outline' onClick={goBack}>
            <ArrowBackIosIcon fontSize="inherit" />
          </IconButton>
          <span className='font-weight-bold'>Detail</span>
          <IconButton aria-label="delete" size="small" className='clear__outline' onClick={downloadImage}>
            <DownloadIcon fontSize="small" />
          </IconButton>
        </div>
      </header>
      <div className='image__detail'>
        <img src={data?.url} alt="" />

        <div className='image__detail__info row'>
          <div className="container mt-2">
            <div class="row">
              <div className='col-2'>Link:</div>
              <a href={data?.url} class="col-10 text-truncate" target='_blank'>
                {data?.url}
              </a>
            </div>
            <div class="row">
              <div className='col-2'>Name:</div>
              <div class="col-10 text-truncate">
                {data?.filename}
              </div>
            </div>
            <div class="row">
              <div className='col-2'>Size:</div>
              <div class="col-10 text-truncate">
                {data?.size ? `${data.size.width} x ${data.size.height} px` : '...'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageDetail;
