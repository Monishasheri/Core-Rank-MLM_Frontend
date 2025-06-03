import React, { useEffect, useState } from "react";
import axios from "axios";
import Tree from "react-d3-tree";

const buildTree = (users) => {
  let userMap = {};
  let tree = [];
  users.forEach(user => {
    userMap[user.name] = { name: user.name, attributes: { Package: user.package, Withdrawals: user.withdrawl }, children: [] };
  });
  users.forEach(user => {
    if (user.refName === "owner") {
      tree.push(userMap[user.name]); 
    } else if (userMap[user.refName]) {
      userMap[user.refName].children.push(userMap[user.name]); 
    }
  });

  return tree.length > 0 ? tree[0] : null; 
};

const MLMTree = () => {
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const fetchTreeData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/tree");
        console.log("API Response:", response.data);

        if (response.data.status && Array.isArray(response.data.data)) {
          const tree = buildTree(response.data.data);
          setTreeData(tree);
        } else {
          console.error("Invalid response structure:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tree data:", error);
      }
    };

    fetchTreeData();
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h2 style={{ textAlign: "center" }}>MLM Tree</h2>
      {treeData ? (
        <Tree
          data={treeData}
          translate={{ x: 300, y: 100 }}
          nodeSize={{ x: 200, y: 100 }}
          orientation="vertical"
        />
      ) : (
        <p style={{ textAlign: "center" }}>Loading tree data...</p>
      )}
    </div>
  );
};

export default MLMTree;
