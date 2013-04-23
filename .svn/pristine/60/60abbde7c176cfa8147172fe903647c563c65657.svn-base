package gui;

import static inference.InferenceMachine.classify;
import static inference.InferenceMachine.classifyResponse;
import static inference.InferenceMachine.getFirstLeafOfNodesTree;
import static model.ModelUtils.getTreeAsString;


import java.awt.EventQueue;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.IOException;

import javax.swing.JEditorPane;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.filechooser.FileNameExtensionFilter;

import model.TreeNode;

public class BaseWindow {

	private JFrame frame;
	private JTextField textField;
	private JEditorPane editorPaneMail;
	private JEditorPane editorPanePrint;
	private JEditorPane editorPaneDialog;
	private JButton btnPrintTree;
	private JButton btnPrintRules;
	private JButton btnClassify;
	private JButton btnYes;
	private JButton btnNo;
	private JButton btnWhy;
	private JButton btnHow;
	private JButton btnBrowse;
	private JScrollPane scrollPaneMail;
	private JScrollPane scrollPanePrint;
	private JScrollPane scrollPaneDialog;

	private GuiInterrogator interrogator;
	private TreeNode firstLeaf, foundLeaf;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					BaseWindow window = new BaseWindow();
					window.frame.setVisible(true);
					window.frame.setResizable(false);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	private BaseWindow() {
		construct();
		setBounds();
		setPropertiesEditorPanes();

		setWhatDoesBtnPrintTree();
		setWhatDoesBtnPrintRules();
		setWhatDoesBtnClassify();
		setWhatDoesBtnBrowse();
		setWhatDoesBtnYes();
		setWhatDoesBtnNo();
		setWhatDoesBtnWhy();
		setWhatDoesBtnHow();
		addToFrame();
	}

	

	private void construct() {
		frame = new JFrame();
		editorPaneMail = new JEditorPane();
		editorPanePrint = new JEditorPane();
		editorPaneDialog = new JEditorPane();
		interrogator = new GuiInterrogator(editorPaneDialog);
		firstLeaf = getFirstLeafOfNodesTree(interrogator);
		btnPrintTree = new JButton("Tree");
		btnPrintRules = new JButton("Rules");
		btnClassify = new JButton("Classify");
		btnClassify.setEnabled(false);
		btnYes = new JButton("Yes");
		btnYes.setEnabled(false);
		btnNo = new JButton("No");
		btnNo.setEnabled(false);
		btnWhy = new JButton("Why");
		btnWhy.setEnabled(false);
		btnHow = new JButton("How");
		btnHow.setEnabled(false);
		textField = new JTextField();
		btnBrowse = new JButton("Browse");
		scrollPaneMail = new JScrollPane(editorPaneMail);
		scrollPanePrint = new JScrollPane(editorPanePrint);
		scrollPaneDialog = new JScrollPane(editorPaneDialog);
	}

	private void setBounds() {
		frame.setBounds(50, 50, 1024, 650);
		editorPaneMail.setBounds(12, 11, 1024, 322);
		editorPanePrint.setBounds(412, 11, 1024, 129);
		editorPaneDialog.setBounds(412, 185, 1024, 83);
		btnPrintTree.setBounds(12, 570, 89, 23);
		btnPrintRules.setBounds(411, 570, 89, 23);
		btnClassify.setBounds(214, 570, 89, 23);
		btnYes.setBounds(510, 527, 89, 23);
		btnNo.setBounds(645, 527, 89, 23);
		btnWhy.setBounds(780, 527, 89, 23);
		btnHow.setBounds(908, 527, 89, 23);
		textField.setBounds(510, 572, 359, 20);
		textField.setColumns(10);
		btnBrowse.setBounds(908, 570, 89, 23);
		scrollPaneMail.setBounds(12, 12, 986, 334);
		scrollPanePrint.setBounds(12, 360, 488, 191);
		scrollPaneDialog.setBounds(510, 360, 487, 150);
	}

	private void addToFrame() {
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);

		frame.getContentPane().add(btnPrintTree);
		frame.getContentPane().add(btnPrintRules);
		frame.getContentPane().add(btnClassify);
		frame.getContentPane().add(btnYes);
		frame.getContentPane().add(btnNo);
		frame.getContentPane().add(btnWhy);
		frame.getContentPane().add(btnHow);
		frame.getContentPane().add(textField);
		frame.getContentPane().add(btnBrowse);
		frame.getContentPane().add(scrollPaneMail);
		frame.getContentPane().add(scrollPanePrint);
		frame.getContentPane().add(scrollPaneDialog);
	}

	private void setPropertiesEditorPanes() {
		editorPaneMail.setEditable(false);
		editorPanePrint.setEditable(false);
		editorPaneDialog.setEditable(false);
	}

	private void setWhatDoesBtnPrintTree() {
		btnPrintTree.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				editorPanePrint.setText(getTreeAsString(firstLeaf));
			}
		});
	}

	private void setWhatDoesBtnPrintRules() {
		btnPrintRules.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				editorPanePrint.setText(firstLeaf.getRulesAsString());
			}
		});
	}

	private void setWhatDoesBtnClassify() {
		btnClassify.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (btnClassify.isEnabled()) {
					btnYes.setEnabled(true);
					btnNo.setEnabled(true);
					btnWhy.setEnabled(true);
					btnHow.setEnabled(false);
					Thread t = new Thread(new Runnable() {
						public void run() {
							if (!textField.getText().isEmpty()) {
								foundLeaf = classify(firstLeaf);
								editorPaneDialog
										.setText(classifyResponse(foundLeaf));
							} else {
								JOptionPane.showMessageDialog(new JFrame(),
										"No file is selected", "Dialog",
										JOptionPane.ERROR_MESSAGE);
							}
							if (foundLeaf != null) {
								btnHow.setEnabled(true);
							}
						}
					});
					t.start();
				}
			}
		});
	}

	private void setWhatDoesBtnBrowse() {
		btnBrowse.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				JFileChooser fc = new JFileChooser();
				fc.setFileSelectionMode(JFileChooser.FILES_AND_DIRECTORIES);
				FileNameExtensionFilter filter = new FileNameExtensionFilter(
						"HTML files", "html", "htm");
				fc.setFileFilter(filter);
				fc.setCurrentDirectory(new java.io.File("."));
				if (fc.showOpenDialog(null) == JFileChooser.APPROVE_OPTION) {
					String path = fc.getSelectedFile().getPath();
					textField.setText(path);
					String pathForEditor = "file:///" + textField.getText();
					try {
						editorPaneMail.setPage(pathForEditor);
						btnClassify.setEnabled(true);
					} catch (IOException e1) {
						JOptionPane.showMessageDialog(new JFrame(),
								"IOException appeared", "Dialog",
								JOptionPane.ERROR_MESSAGE);
						e1.printStackTrace();
					}
				}
			}
		});
	}

	private void setWhatDoesBtnYes() {
		btnYes.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (btnYes.isEnabled()) {
					synchronized (interrogator.getObject()) {
						interrogator.setOption(1);
						interrogator.getObject().notify();
					}
				}
			}
		});
	}

	private void setWhatDoesBtnNo() {
		btnNo.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (btnNo.isEnabled()) {
					synchronized (interrogator.getObject()) {
						interrogator.setOption(2);
						interrogator.getObject().notify();
					}
				}
			}
		});
	}

	private void setWhatDoesBtnWhy() {
		btnWhy.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (btnWhy.isEnabled()) {
					synchronized (interrogator.getObject()) {
						interrogator.setOption(3);
						interrogator.getObject().notify();
					}
				}
			}
		});
	}

	private void setWhatDoesBtnHow() {
		btnHow.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				if (btnHow.isEnabled()) {
					editorPaneDialog.setText(foundLeaf.how());
				}
			}
		});
	}

	public void setEditorPaneDialogText(String str) {
		editorPaneDialog.setText(str);
	}

}
