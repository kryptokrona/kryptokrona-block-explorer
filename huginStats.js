import fetch from "node-fetch";

async function updateCacheList() {
       try {
           const data = await request({
               json: true,
               method: 'GET',
               timeout: 100,
               url: 'https://raw.githubusercontent.com/kryptokrona/hugin-cache-list/main/apis.json',
           });
           console.log(data);
           if (data.apis) {
               this.caches = data.apis;
           } else {
             this.caches = offline_cache_list.apis;
           }
       } catch (error) {
         console.log(offline_cache_list);
           this.logger.addLogMessage('Failed to get node list from API: ' + error.toString());
           this.daemons = offline_cache_list.nodes;
       }
   }


async function getBestCache() {

  let recommended_cache = undefined;


  let cache_requests = [];

   let caches = Globals.caches.sort((a, b) => 0.5 - Math.random());

  for (cache in caches) {
    let this_cache = caches[cache];

    let cacheURL = `${this_cache.url}/api/v1/posts/latest`;
    try {
      const resp = await fetch(cacheURL, {
         method: 'GET'
      }, 1000);
     if (resp.ok) {
       recommended_cache = this_cache;
       return(this_cache);
     }
  } catch (e) {
    console.log(e);
  }
}

}


async function cacheSync(silent=true, latest_board_message_timestamp=0, first=true, page=0) {


    if(first) {
      latest_board_message_timestamp = Date.now() + (60 * 60 * 24 * 7)
    }

    // let cacheURL = Globals.preferences.cache ? Globals.preferences.cache : Config.defaultCache;

    const now = new Date();

    let result = [];

    let result_label = [];

    let today_iso = now.toISOString();

    now.setDate(now.getDate() - 1)

    let yesterday_iso = now.toISOString();

    // return;
    let i = 0;


      let cacheURL = 'https://cache.hugin.chat';

      while (i < 31) {

        let thisURLBoards = `${cacheURL}/api/v1/posts?startDate=${escape(yesterday_iso)}&endDate=${escape(today_iso)}&size=1&page=1`;

        let thisURLPrivate = `${cacheURL}/api/v1/posts-encrypted?startDate=${escape(yesterday_iso)}&endDate=${escape(today_iso)}&size=1&page=1`;

        let re = await fetch(thisURLBoards);

        let json = await re.json();

        let count = json.totalPages;

        let re_pvt = await fetch(thisURLPrivate);

        let json_pvt = await re_pvt.json();

        let count_pvt = json_pvt.totalPages

        result[i] = count + count_pvt;

        result_label[i] = today_iso.split('T')[0];

          now.setDate(now.getDate() - 1);
          today_iso = now.toISOString();
          now.setDate(now.getDate() - 1)
          yesterday_iso = now.toISOString();

          i += 1;

      }
      console.log('huginstats = ');
      console.log(result);
      console.log('huginstatslabels = ');
      console.log(result_label);

}

cacheSync()
