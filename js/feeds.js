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
  // const mediumFeeds = await getFeeds('https://medium.com/feed/@philippeassis', 'medium')
  const {data: {items}} = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40philippeassis')

  for (let i = 0; i < items.length; i++) {
    const {origin, title, content, link} = items[i]
    let addClass = ''

    if (i == 0) {
      if (items.length == 1) {
        addClass = 'col-md-offset-4'
      } else if (items.length == 2) {
        addClass = 'col-md-offset-2'
      }
    }

    const domItem = `<div class="social-item col-md-4 ${addClass}">
                            <div class="social-item-wrapper">
                                <img class="social-icon" src="/img/icons/medium.png"/>
                                <h3 class="social-item-title">${title}</h3>
                                <div class="social-item-content">${content}</div>
                                <div class="social-item-border">
                                    <a class="social-item-readmore" href="${link}" title="${title}">Ler mais</a>
                                </div>
                            </div>
                        </div>`

    result.push(domItem)
  }


  $('#social-feeds').html(result.join('\n'))
}

mainFeeds()
