package parser;


import java.util.List;
import java.util.ArrayList;

import model.TreeNode;


public class XMLTreeHandler {
	private List<TreeNode> leavesList = new ArrayList<TreeNode>();

	public void addLeaf(TreeNode leaf) {
		leavesList.add(leaf);
	}
	
	public TreeNode getFirstLeaf() {
		formTree();
		return leavesList.get(0);
	}

	private void formTree() {
		for (int index = 0; index < leavesList.size() - 1; index++) {
			leavesList.get(index).setNextNode(leavesList.get(index + 1));
		}
	}
}