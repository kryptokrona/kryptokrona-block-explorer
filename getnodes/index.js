import fetch from 'node-fetch';
import fs from 'fs'

//Fetch list of nodes from github
setInterval(async function() {

  fetch('https://raw.githubusercontent.com/kryptokrona/kryptokrona-nodes-list/master/nodes.json')
    .then(res => res.json())
    .then (data => {

      //Fetch all nodes and get data from each
      for(const node of data.nodes) {
        fetch('http://' + node.url + ':11898/getinfo')
          .catch(error => {
            throw(error);
          })
          .then(res => res.json())
          .then(data => {

            //Only continue with nodes replying with status: "OK" and synced
            if(data.status === "OK" && data.synced)
            createNodeList(node, data)
          })

        //Catch err
        process.on('uncaughtException', function(err) {
          console.log('problem', err);
        });

      }

      let nodes = []
      //create nodelist
      async function createNodeList(node, data) {

        nodes.push({
          nodeName: node.name,
          nodeUrl:node.url,
          nodePort: node.port,
          nodeFee: node.fee,
          nodeSsl: node.ssl,
          nodeHeight: data.height,
          connectionsIn: data.incoming_connections_count,
          connectionsOut: data.outgoing_connections_count,
          nodeSynced: data.synced,
          nodeStatus: data.status,
          nodeVersion: data.version
        })

        let jsonString = JSON.stringify({nodes: nodes})
        await createFile(jsonString)

      }

    })
}, 60000)

async function createFile(array) {
  fs.writeFile('/var/www/html/nodes.json', array, (err) => {
    if (err) {
      throw err;
    }
    console.log('JSON data is saved.');
  });

}



