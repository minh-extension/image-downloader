import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import BaseService from '../services/base.service';
import ImageItem from '../components/ImageItem';
import NoItem from '../components/NoItem';
import Header from '../components/Header';


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imgs, setImgs] = useState(null);
  const [imageDownload, setImageDownload] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(async () => {
    setIsLoading(true);

    try {
      const tab = await BaseService.getCurrentTab();
      const imageUrls = await BaseService.getImages(tab);

      chrome.action.setBadgeText({
        text: `${imageUrls.length || 0}`,
        tabId: tab.id
      });

      setImgs(imageUrls);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  }, [])

  const handleSelectAll = checked => {
    if (checked) {
      setImageDownload(imgs);
    } else {
      setImageDownload([]);
    }
  }

  const isCheckedItem = urlId => {
    const index = imageDownload.findIndex(element => element.id === urlId);

    return index !== -1 ? true : false;
  }

  const handleChangeSelectImage = (item, isChecked) => {
    let newImages = imageDownload;

    if (isChecked) {
      newImages.push(item);
    } else {
      newImages = imageDownload.filter(image => image.id !== item.id);
    }

    setImageDownload(newImages);
  }

  const handleDownload = () => {
    if (!imageDownload.length) {
      setErrorMessage(`You haven't selected a photo yet!`);
      return;
    }

    imageDownload.map((item, indx) => (
      setTimeout(function () {
        try {
          downloadImage(item.url);
        } catch (e) {
          console.log('Download of "' + item + '" failed.', e);
        }
      }, 100 * indx)
    ))

    setErrorMessage(null);
  }

  const downloadImage = url => {
    var a = document.createElement("a");
    a.href = url;
    a.download = "";
    a.click();
  };

  return (
    <>
      <Header handleSelectAll={handleSelectAll}
        handleDownload={handleDownload}
        totalImage={imgs && imgs.length ? imgs.length : 0}
      />
      <div className='text-danger text-center'>{errorMessage ? errorMessage : null}</div>
      <div className='container'>
        {
          isLoading
            ? <Skeleton count={4} height={100} />
            :
            <div className='row image__list'>
              {!imgs ?
                <NoItem /> :
                imgs.map((item, index) => {
                  return <ImageItem key={index} item={item} isChecked={isCheckedItem(item.id)} changeChecked={handleChangeSelectImage} />
                })}
            </div>
        }
      </div>
    </>
  );
};


export default React.memo(Home);
