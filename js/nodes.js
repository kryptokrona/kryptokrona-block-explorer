async function getNodesData() {

  //Get html element
  var tbodyRef = document.getElementById('nodeList').getElementsByTagName('tbody')[0];

  //Fetch list of nodes
  await fetch("/nodes,json", {
  })
      .then(res => res.json())
      .then(data => {
        for(const node of data.nodes) {
          let tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${node.nodeName}</td>
            <td>${node.nodeUrl}:${node.nodePort}</td>
            <td>${node.nodeFee}%</td>
            <td>${node.nodeVersion}</td>
            <td>${node.nodeHeight}</td>
            <td>${node.connectionsIn}/${node.connectionsOut}</td>
            <td><span class="badge bg-success">Online</span></td>`;

          //Add raws to tbody
          tbodyRef.appendChild(tr);
        }
      })
}

//Run
getNodesData();