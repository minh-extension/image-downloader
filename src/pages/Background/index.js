const grabImages = () => {
  const images = document.querySelectorAll("img")
  return Array.from(images).map(image => image.src)
}

const getImages = tab => {
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id, allFrames: true },
      func: grabImages
    },
    (frames) => {
      if (!frames || !frames.length) {
        return;
      }

      const imageUrls = frames.map(frame => frame.result).reduce((r1, r2) => r1.concat(r2))

      const uniqueResult = imageUrls.filter((url, index) => {
        return imageUrls.indexOf(url) === index;
      })

      chrome.action.setBadgeText({
        text: `${uniqueResult.length || 0}`,
        tabId: tab.id
      });
    }
  )
}

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0]

  getImages(currentTab)
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    getImages(tab)
  }
});