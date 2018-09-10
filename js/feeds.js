function getFeeds(url, origin) {
  return new Promise((resolve) => {
    axios.get(url).then((response) => {
      const parser = new DOMParser()
      const xmlDoc = parser.parseFromString(response.data, 'text/xml');
      const channels = xmlDoc.querySelectorAll('channel')
      const feeds = []
      const items = channels[0].querySelectorAll('item')

      for (let i = 0; i < items.length; i++) {
        const item = items[i]
        let obj = {origin}

        for (let e = 0; e < item.childNodes.length; e++) {
          const child = item.childNodes[e]
          if (child.nodeName === '#text') {
            continue
          }

          obj[child.nodeName.split(':')[0]] = child.innerHTML.replace("<![CDATA[", "").replace("]]>", "")
        }

        feeds.push(obj)
      }

      resolve(feeds)
    })
  })
}

async function mainFeeds() {
  let result = [];
  const mediumFeeds = await getFeeds('https://medium.com/feed/@philippeassis', 'medium')

  mediumFeeds.map(({origin, title, content, link}) => {
    const domItem = `<div class="social-item col-md-4">
                            <div class="social-item-wrapper">
                                <img class="social-icon" src="/img/icons/${origin}.png"/>
                                <h3 class="social-item-title">${title}</h3>
                                <div class="social-item-content">${content}</div>
                                <div class="social-item-border">
                                    <a class="social-item-readmore" href="${link}" title="${title}">Ler mais</a>
                                </div>
                            </div>
                        </div>`

    result.push(domItem)
  })


  $('#social-feeds').html(result.join('\n'))
}

mainFeeds()
