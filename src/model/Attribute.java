package model;

public class Attribute {
	private String name;
	private String value;

	public Attribute(String name, String value) {
		this.name = name;
		this.value = value;
	}

	public String toString() {
		return name + "=\"" + value + "\" ";
	}

	public String getAskInfo() {
		if (value.equals("present")) {
			if (name.endsWith("s")) {
				return "Are " + name + " present?";
			}
			return "Is " + name + " present?";
		}
		if (name.equals("keywords")) {
			return "Is at least one of the following keywords: \"" + value
					+ "\" present?";
		}
		String askInfo = "Has \"" + name + "\" ";
		if (value.contains(",")) {
			askInfo = askInfo + "one of the following values: ";
		} else {
			askInfo = askInfo + "the following value: ";
		}
		askInfo = askInfo + "\"" + value + "?\"";
		return askInfo;
	}

	public boolean equals(Object otherAttribute) {
		if (!(otherAttribute instanceof Attribute)) {
			return false;
		}
		Attribute attribute = (Attribute) otherAttribute;
		return (attribute.name.equals(name) && attribute.value.equals(value));
	}

	public int hashCode() {
		return name.hashCode() + value.hashCode();
	}
}
