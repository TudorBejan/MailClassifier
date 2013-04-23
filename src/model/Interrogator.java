package model;

import static model.Answer.NO;
import static model.Answer.WHY;
import static model.Answer.YES;

public abstract class Interrogator {

	public abstract Answer ask(Attribute attribute, TreeNode checkedNode);

	public Answer transformNumberToAnswer(int option) {
		switch (option) {
		case 1:
			return YES;
		case 2:
			return NO;
		case 3:
			return WHY;
		}
		return null;
	}
}
