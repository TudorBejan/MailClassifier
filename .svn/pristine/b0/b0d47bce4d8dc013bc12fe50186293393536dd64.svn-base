package gui;

import static model.Answer.NO;
import static model.Answer.WHY;
import static model.Answer.YES;

import javax.swing.JEditorPane;

import model.Answer;
import model.Attribute;
import model.Interrogator;
import model.TreeNode;

public class GuiInterrogator extends Interrogator {

	private int option;
	private Object synchronizationObject;
	private JEditorPane editorPane;

	public GuiInterrogator(JEditorPane editorPane) {
		this.editorPane = editorPane;
		synchronizationObject = new Object();
	}

	public void setOption(int optionValue) {
		option = optionValue;
	}

	public Object getObject() {
		return synchronizationObject;
	}

	@Override
	public Answer ask(Attribute attribute, TreeNode checkedNode) {
		Answer answer = null;
		String str = "";
		do {
			setDialogAskMenu(attribute, editorPane, str);
			try {
				synchronized (synchronizationObject) {
					try {
						synchronizationObject.wait();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
				answer = transformNumberToAnswer(option);
				if (answer == WHY) {
					str = checkedNode.why();
				}
			} catch (NumberFormatException e) {
				editorPane.setText("Please insert a valid number!!!\n");
			}
		} while (answer != YES && answer != NO);
		return answer;
	}

	private void setDialogAskMenu(Attribute attribute, JEditorPane editorPane,
			String str) {
		editorPane.setText(str + attribute.getAskInfo());
	}

}
