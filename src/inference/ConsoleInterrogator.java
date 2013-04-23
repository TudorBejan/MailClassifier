package inference;

import static model.Answer.NO;
import static model.Answer.WHY;
import static model.Answer.YES;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import model.Answer;
import model.Attribute;
import model.Interrogator;
import model.TreeNode;

public class ConsoleInterrogator extends Interrogator {

	@Override
	public Answer ask(Attribute attribute, TreeNode checkedNode) {
		int option = 0;
		Answer answer = null;
		String line;
		BufferedReader buffer = new BufferedReader(new InputStreamReader(
				System.in));
		do {
			printAskMenu(attribute);
			try {
				line = buffer.readLine();
				if (line == null) {
					return null;
				}
				option = Integer.parseInt(line.trim());
				answer = transformNumberToAnswer(option);
				if (answer == WHY) {
					System.out.println(checkedNode.why());
				}
			} catch (IOException e) {
				e.printStackTrace();
			} catch (NumberFormatException e) {
				System.out.println("Please insert a valid number!!!");
			}
		} while (answer != YES && answer != NO);
		return answer;
	}
	
	private void printAskMenu(Attribute attribute) {
		System.out.println(attribute.getAskInfo());
		System.out.println("1.Yes");
		System.out.println("2.No");
		System.out.println("3.Why");
	}


}
