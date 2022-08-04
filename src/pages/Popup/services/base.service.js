export default class BaseService {
  static sendMessage = (messageType, options) => {
    return chrome.runtime.sendMessage({
      messageType: messageType,
      options: options
    });
  };

  static async getBackgroundTabData() {
    const tab = await this.sendMessage('getCurrentTab')
    if (tab) {
      const backgroundTabObj = await this.sendMessage('getTab', tab.id)

      return backgroundTabObj
    }
    return null
  };

  static getCurrentTab() {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        var currentTab = tabs[0];
        resolve(currentTab);
      });
    })
  }

  static getImages(tab) {
    const grabImages = () => {
      const images = document.querySelectorAll("img")
      return Array.from(images).map(image => image.src)
    }

    return new Promise((res, rej) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id, allFrames: true },
          func: grabImages
        },
        (frames) => {
          if (!frames || !frames.length) {
            res(null)
          }
          // Combine arrays of the image URLs from 
          // each frame to a single array
          const imageUrls = frames.map(frame => frame.result).reduce((r1, r2) => r1.concat(r2))

          const result = imageUrls.map((url, index) => {
            return {
              id: (new Date()).getTime() + index,
              url: url
            }
          })
          
          const uniqueResult = result.filter((img, index) => {
              return result.findIndex(item => item.url === img.url) === index;
          })

          res(uniqueResult)
        }
      )
    })

  }
}